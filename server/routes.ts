import type { Express, Request, Response } from "express";
import type { Server } from "http";
import passport from "passport";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { storage } from "./storage";
import { setupAuth, requireStaff, seedAdminUser } from "./auth";
import { hasProvider, moderateText, CHAT_MODEL, REASONING_MODEL } from "./ai/provider";
import { runChatTurn } from "./ai/chat";
import { publicTools, internalTools, serializeQuote } from "./ai/tools";
import { PUBLIC_SYSTEM_PROMPT, INTERNAL_SYSTEM_PROMPT, caseContextBlock } from "./ai/prompts";
import {
  quoteSubmissionSchema,
  QUOTE_STATUSES,
  type User,
  type ChatSession,
} from "@shared/schema";

/* ------------------------------ Feature flags ----------------------------- */
const publicChatEnabled = () => process.env.CHATBOT_PUBLIC_ENABLED !== "false";
const internalChatEnabled = () => process.env.CHATBOT_INTERNAL_ENABLED !== "false";

/* --------------------------------- Helpers -------------------------------- */
function openSse(res: Response): void {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });
  res.flushHeaders?.();
}

function sseSender(res: Response) {
  return (event: string, data: unknown) => {
    if (!res.writableEnded) {
      res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    }
  };
}

function publicUser(user: User) {
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

const chatBodySchema = z.object({
  message: z.string().trim().min(1).max(2000),
  sessionId: z.string().uuid().optional(),
  visitorId: z.string().max(100).optional(),
  quoteReference: z.string().max(30).optional(),
});

/* ------------------------------ Rate limiters ------------------------------ */
const chatLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many messages — please wait a few minutes and try again." },
});
const quoteLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 12,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many quote submissions from this connection — please try again later." },
});
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts — please wait 15 minutes." },
});
const feedbackLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

/* --------------------------------- Routes --------------------------------- */
export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  setupAuth(app);
  seedAdminUser().catch((err) => console.error("[auth] admin seeding failed:", err));

  app.get("/api/health", (_req, res) => {
    res.json({
      ok: true,
      aiConfigured: hasProvider(),
      publicChatEnabled: publicChatEnabled(),
      internalChatEnabled: internalChatEnabled(),
    });
  });

  /* -------------------------------- Auth --------------------------------- */
  app.post("/api/auth/login", loginLimiter, (req, res, next) => {
    passport.authenticate("local", (err: Error | null, user: User | false, info?: { message?: string }) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: info?.message || "Invalid email or password" });
      req.login(user, (loginErr) => {
        if (loginErr) return next(loginErr);
        res.json(publicUser(user));
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.json({ ok: true });
      });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    const user = req.user as User | undefined;
    if (!req.isAuthenticated() || !user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json(publicUser(user));
  });

  /* ---------------------------- Quote requests ---------------------------- */
  app.post("/api/quotes", quoteLimiter, async (req, res) => {
    const parsed = quoteSubmissionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Please check the highlighted fields and try again.",
        errors: parsed.error.flatten().fieldErrors,
      });
    }
    const d = parsed.data;
    const quote = await storage.createQuote({
      status: "new",
      source: d.source,
      plan: d.plan,
      frequency: d.frequency,
      propertyType: d.propertyType,
      otherPropertyType: d.otherPropertyType,
      area: d.area,
      suburb: d.suburb,
      postcode: d.postcode,
      rooms: d.rooms,
      commercial: d.commercial,
      extras: d.extras,
      otherExtras: d.otherExtras,
      schedule: d.schedule,
      customer: d.customer,
    });
    res.status(201).json({ id: quote.id, reference: quote.reference });
  });

  /* ------------------------------ Public chat ----------------------------- */
  app.post("/api/chat", chatLimiter, async (req, res) => {
    if (!publicChatEnabled()) {
      return res.status(503).json({ message: "The assistant is currently unavailable." });
    }
    if (!hasProvider()) {
      return res.status(503).json({
        message:
          "The assistant is not available right now. Please call Kevin on 0423 258 795 or use the quote form.",
      });
    }
    const parsed = chatBodySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid message." });
    }
    const { message, sessionId, visitorId } = parsed.data;

    let session: ChatSession | undefined;
    if (sessionId) {
      session = await storage.getChatSession(sessionId);
      // Role separation: a public client may never attach to an internal session.
      if (session && session.channel !== "public") {
        return res.status(403).json({ message: "Invalid session." });
      }
    }
    if (!session) {
      session = await storage.createChatSession({ channel: "public", visitorId });
    }

    openSse(res);
    const send = sseSender(res);
    send("session", { sessionId: session.id });

    try {
      const moderation = await moderateText(message);
      await storage.addChatMessage({
        sessionId: session.id,
        role: "user",
        content: message,
        flagged: moderation.flagged,
      });

      if (moderation.flagged) {
        const refusal =
          "I can't help with that topic, but I'm happy to answer questions about our cleaning services, quotes or bookings.";
        send("token", { delta: refusal });
        const saved = await storage.addChatMessage({
          sessionId: session.id,
          role: "assistant",
          content: refusal,
        });
        send("done", { sessionId: session.id, messageId: saved.id });
        return res.end();
      }

      const { assistantText, citations } = await runChatTurn({
        channel: "public",
        session,
        userMessage: message,
        instructions: PUBLIC_SYSTEM_PROMPT,
        model: CHAT_MODEL,
        tools: publicTools,
        send,
        reasoningEffort: "low",
        maxOutputTokens: 1200,
      });

      const saved = await storage.addChatMessage({
        sessionId: session.id,
        role: "assistant",
        content: assistantText || "(no reply)",
        citations: citations.length ? citations : undefined,
      });
      await storage.touchChatSession(session.id, message.slice(0, 80));
      send("done", { sessionId: session.id, messageId: saved.id });
    } catch (err) {
      console.error("[chat] public turn failed:", err);
      send("error", {
        message:
          "Sorry — something went wrong on my end. Please try again, or call Kevin on 0423 258 795.",
      });
    } finally {
      res.end();
    }
  });

  app.post("/api/chat/feedback", feedbackLimiter, async (req, res) => {
    const schema = z.object({
      sessionId: z.string().uuid(),
      messageId: z.string().uuid().optional(),
      rating: z.enum(["up", "down"]),
      comment: z.string().max(1000).optional(),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid feedback." });
    const session = await storage.getChatSession(parsed.data.sessionId);
    if (!session) return res.status(404).json({ message: "Session not found." });
    await storage.createFeedback(parsed.data);
    res.json({ ok: true });
  });

  /* ---------------------------- Admin: quotes ----------------------------- */
  app.get("/api/admin/quotes", requireStaff, async (req, res) => {
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const search = typeof req.query.search === "string" ? req.query.search : undefined;
    const list = await storage.listQuotes({ status, search });
    res.json(list);
  });

  app.get("/api/admin/quotes/:id", requireStaff, async (req, res) => {
    const quote = await storage.getQuote(String(req.params.id));
    if (!quote) return res.status(404).json({ message: "Quote request not found." });
    res.json(quote);
  });

  app.patch("/api/admin/quotes/:id/status", requireStaff, async (req, res) => {
    const schema = z.object({ status: z.enum(QUOTE_STATUSES) });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid status." });
    const user = req.user as User;
    const updated = await storage.updateQuoteStatus(String(req.params.id), parsed.data.status, user.email);
    if (!updated) return res.status(404).json({ message: "Quote request not found." });
    res.json(updated);
  });

  app.post("/api/admin/quotes/:id/notes", requireStaff, async (req, res) => {
    const schema = z.object({ text: z.string().trim().min(1).max(2000) });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Note text is required." });
    const user = req.user as User;
    const updated = await storage.addInternalNote(String(req.params.id), user.email, parsed.data.text);
    if (!updated) return res.status(404).json({ message: "Quote request not found." });
    res.json(updated);
  });

  app.patch("/api/admin/quotes/:id/amount", requireStaff, async (req, res) => {
    const schema = z.object({
      amount: z
        .string()
        .trim()
        .regex(/^\d{1,7}(\.\d{1,2})?$/, "Enter a valid amount")
        .nullable(),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid amount." });
    const updated = await storage.setQuoteAmount(String(req.params.id), parsed.data.amount);
    if (!updated) return res.status(404).json({ message: "Quote request not found." });
    res.json(updated);
  });

  app.get("/api/admin/stats", requireStaff, async (_req, res) => {
    const counts = await storage.countQuotesByStatus();
    res.json({ quoteCounts: counts });
  });

  app.get("/api/admin/escalations", requireStaff, async (_req, res) => {
    res.json(await storage.listEscalations());
  });

  /* ---------------------------- Admin: copilot ---------------------------- */
  app.post("/api/admin/chat", requireStaff, chatLimiter, async (req, res) => {
    if (!internalChatEnabled()) {
      return res.status(503).json({ message: "The copilot is currently disabled." });
    }
    if (!hasProvider()) {
      return res.status(503).json({
        message: "The copilot needs an OpenAI API key. Ask the administrator to configure it.",
      });
    }
    const parsed = chatBodySchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid message." });
    const user = req.user as User;
    const { message, sessionId, quoteReference } = parsed.data;

    let session: ChatSession | undefined;
    if (sessionId) {
      session = await storage.getChatSession(sessionId);
      // Role separation: internal sessions belong to their staff user only.
      if (session && (session.channel !== "internal" || session.userId !== user.id)) {
        return res.status(403).json({ message: "Invalid session." });
      }
    }

    let instructions = INTERNAL_SYSTEM_PROMPT;
    let quoteId: string | undefined;
    if (quoteReference) {
      const quote = await storage.getQuote(quoteReference);
      if (quote) {
        instructions += caseContextBlock(serializeQuote(quote));
        quoteId = quote.id;
      }
    }
    if (!session) {
      session = await storage.createChatSession({ channel: "internal", userId: user.id, quoteId });
    }

    openSse(res);
    const send = sseSender(res);
    send("session", { sessionId: session.id });

    try {
      await storage.addChatMessage({ sessionId: session.id, role: "user", content: message });
      const { assistantText, citations } = await runChatTurn({
        channel: "internal",
        session,
        userMessage: message,
        instructions,
        model: REASONING_MODEL,
        tools: internalTools,
        send,
        userEmail: user.email,
        reasoningEffort: "medium",
        maxOutputTokens: 2000,
      });
      const saved = await storage.addChatMessage({
        sessionId: session.id,
        role: "assistant",
        content: assistantText || "(no reply)",
        citations: citations.length ? citations : undefined,
      });
      await storage.touchChatSession(session.id, message.slice(0, 80));
      send("done", { sessionId: session.id, messageId: saved.id });
    } catch (err) {
      console.error("[chat] internal turn failed:", err);
      send("error", { message: "The copilot hit an error. Please try again." });
    } finally {
      res.end();
    }
  });

  return httpServer;
}
