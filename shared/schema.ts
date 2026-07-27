import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  integer,
  boolean,
  numeric,
  vector,
  index,
} from "drizzle-orm/pg-core";
import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*  Sessions (connect-pg-simple)                                              */
/*  Defined here so `drizzle-kit push` never tries to drop it.                */
/* -------------------------------------------------------------------------- */
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

/* -------------------------------------------------------------------------- */
/*  Users (staff/admin only — customers do not have accounts)                 */
/* -------------------------------------------------------------------------- */
export const users = pgTable("users", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull().default(""),
  role: text("role").notNull().default("staff"), // 'admin' | 'staff'
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/* -------------------------------------------------------------------------- */
/*  Quote requests                                                            */
/* -------------------------------------------------------------------------- */
export const QUOTE_STATUSES = [
  "new",
  "reviewing",
  "quote_sent",
  "accepted",
  "declined",
  "completed",
  "archived",
] as const;
export type QuoteStatus = (typeof QUOTE_STATUSES)[number];

export const quotes = pgTable(
  "quotes",
  {
    id: varchar("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    reference: text("reference").notNull().unique(), // e.g. QR-1043
    status: text("status").notNull().default("new"),
    source: text("source").notNull().default("quote_form"), // quote_form | booking_form | chatbot
    plan: text("plan").notNull(),
    frequency: text("frequency").notNull().default(""),
    propertyType: text("property_type").notNull().default(""),
    otherPropertyType: text("other_property_type").notNull().default(""),
    area: text("area").notNull().default(""),
    suburb: text("suburb").notNull().default(""),
    postcode: text("postcode").notNull().default(""),
    rooms: jsonb("rooms").$type<Record<string, number>>(),
    commercial: jsonb("commercial").$type<Record<string, unknown>>(),
    extras: jsonb("extras").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
    otherExtras: text("other_extras").notNull().default(""),
    schedule: jsonb("schedule").$type<Record<string, unknown>>(),
    customer: jsonb("customer").$type<QuoteCustomer>().notNull(),
    quoteAmount: numeric("quote_amount"),
    internalNotes: jsonb("internal_notes")
      .$type<QuoteInternalNote[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    statusHistory: jsonb("status_history")
      .$type<QuoteStatusChange[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("quotes_status_idx").on(table.status)],
);

export interface QuoteCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName?: string;
  businessRole?: string;
  contactMethod: string;
  consentQuote?: boolean;
  consentService?: boolean;
  consentMarketing?: boolean;
}

export interface QuoteInternalNote {
  id: string;
  authorEmail: string;
  text: string;
  createdAt: string;
}

export interface QuoteStatusChange {
  from: string;
  to: string;
  byEmail: string;
  at: string;
}

export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = typeof quotes.$inferInsert;

/** Zod schema for the public quote submission API payload. */
export const quoteSubmissionSchema = z.object({
  source: z.enum(["quote_form", "booking_form"]).default("quote_form"),
  plan: z.string().min(1, "Service selection is required"),
  frequency: z.string().default(""),
  propertyType: z.string().default(""),
  otherPropertyType: z.string().default(""),
  area: z.string().default(""),
  suburb: z.string().default(""),
  postcode: z.string().default(""),
  rooms: z.record(z.number()).optional(),
  commercial: z.record(z.unknown()).optional(),
  extras: z.array(z.string()).default([]),
  otherExtras: z.string().default(""),
  schedule: z
    .object({
      preferredDate: z.string().optional(),
      timeWindow: z.string().optional(),
      howSoon: z.string().optional(),
      parking: z.string().optional(),
      stairsLift: z.string().optional(),
      pets: z.string().optional(),
      accessNotes: z.string().optional(),
      photoNames: z.array(z.string()).optional(),
    })
    .optional(),
  customer: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().default(""),
    email: z.string().email("A valid email is required"),
    phone: z.string().min(6, "A valid phone number is required"),
    companyName: z.string().default(""),
    businessRole: z.string().default(""),
    contactMethod: z.string().default("email"),
    consentQuote: z.boolean().optional(),
    consentService: z.boolean().optional(),
    consentMarketing: z.boolean().optional(),
  }),
});
export type QuoteSubmission = z.infer<typeof quoteSubmissionSchema>;

/* -------------------------------------------------------------------------- */
/*  Chat                                                                      */
/* -------------------------------------------------------------------------- */
export const chatSessions = pgTable(
  "chat_sessions",
  {
    id: varchar("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    channel: text("channel").notNull(), // 'public' | 'internal'
    userId: varchar("user_id"), // staff user id (internal channel)
    visitorId: text("visitor_id"), // anonymous visitor id (public channel)
    quoteId: varchar("quote_id"), // optional case context
    title: text("title").notNull().default(""),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("chat_sessions_channel_idx").on(table.channel)],
);

export type ChatSession = typeof chatSessions.$inferSelect;

export const chatMessages = pgTable(
  "chat_messages",
  {
    id: varchar("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    sessionId: varchar("session_id").notNull(),
    role: text("role").notNull(), // 'user' | 'assistant'
    content: text("content").notNull(),
    citations: jsonb("citations").$type<ChatCitation[]>(),
    flagged: boolean("flagged").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [index("chat_messages_session_idx").on(table.sessionId)],
);

export interface ChatCitation {
  slug: string;
  title: string;
  category: string | null;
  visibility: string;
}

export type ChatMessage = typeof chatMessages.$inferSelect;

/* -------------------------------------------------------------------------- */
/*  Knowledge base (RAG)                                                      */
/* -------------------------------------------------------------------------- */
export const knowledgeDocuments = pgTable("knowledge_documents", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(), // e.g. public/services.md
  title: text("title").notNull(),
  visibility: text("visibility").notNull(), // 'public' | 'internal'
  category: text("category"),
  tags: jsonb("tags").$type<string[]>(),
  checksum: text("checksum").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type KnowledgeDocument = typeof knowledgeDocuments.$inferSelect;

export const knowledgeChunks = pgTable(
  "knowledge_chunks",
  {
    id: varchar("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    documentId: varchar("document_id").notNull(),
    // Denormalized so retrieval can filter by visibility without a join.
    visibility: text("visibility").notNull(),
    title: text("title").notNull(),
    category: text("category"),
    chunkIndex: integer("chunk_index").notNull(),
    content: text("content").notNull(),
    embedding: vector("embedding", { dimensions: 1536 }),
  },
  (table) => [
    index("knowledge_chunks_visibility_idx").on(table.visibility),
    index("knowledge_chunks_embedding_idx").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops"),
    ),
  ],
);

export type KnowledgeChunk = typeof knowledgeChunks.$inferSelect;

/* -------------------------------------------------------------------------- */
/*  Chatbot operational tables                                                */
/* -------------------------------------------------------------------------- */
export const chatbotToolLogs = pgTable("chatbot_tool_logs", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id"),
  channel: text("channel").notNull(),
  toolName: text("tool_name").notNull(),
  args: jsonb("args"),
  resultSummary: text("result_summary"),
  durationMs: integer("duration_ms"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const chatbotEscalations = pgTable("chatbot_escalations", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  channel: text("channel").notNull(), // 'public' | 'internal'
  sessionId: varchar("session_id"),
  quoteReference: text("quote_reference"),
  reason: text("reason").notNull(),
  contact: jsonb("contact").$type<Record<string, string>>(),
  urgency: text("urgency").notNull().default("normal"),
  status: text("status").notNull().default("open"), // open | resolved
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type ChatbotEscalation = typeof chatbotEscalations.$inferSelect;

export const chatbotFeedback = pgTable("chatbot_feedback", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull(),
  messageId: varchar("message_id"),
  rating: text("rating").notNull(), // 'up' | 'down'
  comment: text("comment"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
