import { randomUUID } from "node:crypto";
import { and, desc, eq, ilike, inArray, or, sql, cosineDistance } from "drizzle-orm";
import { db } from "./db";
import {
  users,
  quotes,
  chatSessions,
  chatMessages,
  knowledgeDocuments,
  knowledgeChunks,
  chatbotToolLogs,
  chatbotEscalations,
  chatbotFeedback,
  type User,
  type InsertUser,
  type Quote,
  type QuoteStatus,
  type QuoteInternalNote,
  type ChatSession,
  type ChatMessage,
  type ChatCitation,
  type KnowledgeDocument,
  type ChatbotEscalation,
} from "@shared/schema";

export interface KnowledgeSearchResult {
  chunkId: string;
  content: string;
  title: string;
  category: string | null;
  visibility: string;
  slug: string;
  similarity: number;
}

export const storage = {
  /* ------------------------------- Users -------------------------------- */
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  },

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  },

  async createUser(user: InsertUser): Promise<User> {
    const [created] = await db.insert(users).values(user).returning();
    return created;
  },

  async updateUserPassword(id: string, passwordHash: string): Promise<void> {
    await db.update(users).set({ passwordHash }).where(eq(users.id, id));
  },

  /* ------------------------------- Quotes ------------------------------- */
  async createQuote(data: Omit<typeof quotes.$inferInsert, "reference">): Promise<Quote> {
    // Generate the next QR-xxxx reference; retry on rare unique collisions.
    for (let attempt = 0; attempt < 5; attempt++) {
      const [row] = await db
        .select({
          max: sql<number | null>`max(nullif(regexp_replace(${quotes.reference}, '\\D', '', 'g'), '')::int)`,
        })
        .from(quotes);
      const next = (row?.max ?? 1042) + 1 + attempt;
      try {
        const [created] = await db
          .insert(quotes)
          .values({ ...data, reference: `QR-${next}` })
          .returning();
        return created;
      } catch (err: unknown) {
        const code = (err as { code?: string }).code;
        if (code !== "23505") throw err; // not a unique violation
      }
    }
    throw new Error("Could not allocate a quote reference");
  },

  async listQuotes(filters?: { status?: string; search?: string; limit?: number }): Promise<Quote[]> {
    const conditions = [];
    if (filters?.status) conditions.push(eq(quotes.status, filters.status));
    if (filters?.search) {
      const term = `%${filters.search}%`;
      conditions.push(
        or(
          ilike(quotes.reference, term),
          ilike(quotes.suburb, term),
          sql`${quotes.customer}->>'firstName' ILIKE ${term}`,
          sql`${quotes.customer}->>'lastName' ILIKE ${term}`,
          sql`${quotes.customer}->>'email' ILIKE ${term}`,
        ),
      );
    }
    return db
      .select()
      .from(quotes)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(quotes.createdAt))
      .limit(filters?.limit ?? 100);
  },

  async getQuote(idOrReference: string): Promise<Quote | undefined> {
    const [quote] = await db
      .select()
      .from(quotes)
      .where(
        or(eq(quotes.reference, idOrReference.toUpperCase()), eq(quotes.id, idOrReference)),
      );
    return quote;
  },

  async updateQuoteStatus(id: string, status: QuoteStatus, byEmail: string): Promise<Quote | undefined> {
    const existing = await this.getQuote(id);
    if (!existing) return undefined;
    const history = [
      ...(existing.statusHistory ?? []),
      { from: existing.status, to: status, byEmail, at: new Date().toISOString() },
    ];
    const [updated] = await db
      .update(quotes)
      .set({ status, statusHistory: history, updatedAt: new Date() })
      .where(eq(quotes.id, existing.id))
      .returning();
    return updated;
  },

  async addInternalNote(id: string, authorEmail: string, text: string): Promise<Quote | undefined> {
    const existing = await this.getQuote(id);
    if (!existing) return undefined;
    const note: QuoteInternalNote = {
      id: randomUUID(),
      authorEmail,
      text,
      createdAt: new Date().toISOString(),
    };
    const [updated] = await db
      .update(quotes)
      .set({ internalNotes: [...(existing.internalNotes ?? []), note], updatedAt: new Date() })
      .where(eq(quotes.id, existing.id))
      .returning();
    return updated;
  },

  async setQuoteAmount(id: string, amount: string | null): Promise<Quote | undefined> {
    const existing = await this.getQuote(id);
    if (!existing) return undefined;
    const [updated] = await db
      .update(quotes)
      .set({ quoteAmount: amount, updatedAt: new Date() })
      .where(eq(quotes.id, existing.id))
      .returning();
    return updated;
  },

  async countQuotesByStatus(): Promise<Record<string, number>> {
    const rows = await db
      .select({ status: quotes.status, count: sql<number>`count(*)::int` })
      .from(quotes)
      .groupBy(quotes.status);
    return Object.fromEntries(rows.map((r) => [r.status, r.count]));
  },

  /* -------------------------------- Chat -------------------------------- */
  async createChatSession(data: {
    channel: "public" | "internal";
    userId?: string;
    visitorId?: string;
    quoteId?: string;
  }): Promise<ChatSession> {
    const [created] = await db.insert(chatSessions).values(data).returning();
    return created;
  },

  async getChatSession(id: string): Promise<ChatSession | undefined> {
    const [session] = await db.select().from(chatSessions).where(eq(chatSessions.id, id));
    return session;
  },

  async touchChatSession(id: string, title?: string): Promise<void> {
    await db
      .update(chatSessions)
      .set({ updatedAt: new Date(), ...(title ? { title } : {}) })
      .where(eq(chatSessions.id, id));
  },

  async addChatMessage(data: {
    sessionId: string;
    role: "user" | "assistant";
    content: string;
    citations?: ChatCitation[];
    flagged?: boolean;
  }): Promise<ChatMessage> {
    const [created] = await db.insert(chatMessages).values(data).returning();
    return created;
  },

  async getSessionMessages(sessionId: string, limit = 30): Promise<ChatMessage[]> {
    const rows = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(desc(chatMessages.createdAt))
      .limit(limit);
    return rows.reverse();
  },

  /* ----------------------------- Knowledge ------------------------------ */
  async getDocumentBySlug(slug: string): Promise<KnowledgeDocument | undefined> {
    const [doc] = await db
      .select()
      .from(knowledgeDocuments)
      .where(eq(knowledgeDocuments.slug, slug));
    return doc;
  },

  async upsertDocument(data: {
    slug: string;
    title: string;
    visibility: string;
    category?: string | null;
    tags?: string[];
    checksum: string;
  }): Promise<KnowledgeDocument> {
    const existing = await this.getDocumentBySlug(data.slug);
    if (existing) {
      const [updated] = await db
        .update(knowledgeDocuments)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(knowledgeDocuments.id, existing.id))
        .returning();
      return updated;
    }
    const [created] = await db.insert(knowledgeDocuments).values(data).returning();
    return created;
  },

  async deleteChunksForDocument(documentId: string): Promise<void> {
    await db.delete(knowledgeChunks).where(eq(knowledgeChunks.documentId, documentId));
  },

  async insertChunks(
    rows: Array<{
      documentId: string;
      visibility: string;
      title: string;
      category: string | null;
      chunkIndex: number;
      content: string;
      embedding: number[];
    }>,
  ): Promise<void> {
    if (rows.length === 0) return;
    await db.insert(knowledgeChunks).values(rows);
  },

  async listDocuments(): Promise<KnowledgeDocument[]> {
    return db.select().from(knowledgeDocuments).orderBy(knowledgeDocuments.slug);
  },

  async searchKnowledge(
    embedding: number[],
    visibilities: string[],
    limit = 5,
  ): Promise<KnowledgeSearchResult[]> {
    const similarity = sql<number>`1 - (${cosineDistance(knowledgeChunks.embedding, embedding)})`;
    return db
      .select({
        chunkId: knowledgeChunks.id,
        content: knowledgeChunks.content,
        title: knowledgeChunks.title,
        category: knowledgeChunks.category,
        visibility: knowledgeChunks.visibility,
        slug: knowledgeDocuments.slug,
        similarity,
      })
      .from(knowledgeChunks)
      .innerJoin(knowledgeDocuments, eq(knowledgeChunks.documentId, knowledgeDocuments.id))
      .where(inArray(knowledgeChunks.visibility, visibilities))
      .orderBy(desc(similarity))
      .limit(limit);
  },

  /* --------------------------- Chatbot ops ------------------------------ */
  async logToolCall(data: {
    sessionId?: string;
    channel: string;
    toolName: string;
    args?: unknown;
    resultSummary?: string;
    durationMs?: number;
  }): Promise<void> {
    await db.insert(chatbotToolLogs).values({
      sessionId: data.sessionId,
      channel: data.channel,
      toolName: data.toolName,
      args: data.args as Record<string, unknown> | undefined,
      resultSummary: data.resultSummary,
      durationMs: data.durationMs,
    });
  },

  async createEscalation(data: {
    channel: string;
    sessionId?: string;
    quoteReference?: string;
    reason: string;
    contact?: Record<string, string>;
    urgency?: string;
  }): Promise<ChatbotEscalation> {
    const [created] = await db.insert(chatbotEscalations).values(data).returning();
    return created;
  },

  async listEscalations(limit = 50): Promise<ChatbotEscalation[]> {
    return db
      .select()
      .from(chatbotEscalations)
      .orderBy(desc(chatbotEscalations.createdAt))
      .limit(limit);
  },

  async createFeedback(data: {
    sessionId: string;
    messageId?: string;
    rating: "up" | "down";
    comment?: string;
  }): Promise<void> {
    await db.insert(chatbotFeedback).values(data);
  },
};

export type Storage = typeof storage;
