import { getClient } from "./provider";
import type { AgentTool, ToolContext } from "./tools";
import { storage } from "../storage";
import type { ChatCitation, ChatSession } from "@shared/schema";

const MAX_TOOL_ROUNDS = 5;
const HISTORY_LIMIT = 20;

export type SseSend = (event: string, data: unknown) => void;

export interface ChatTurnOptions {
  channel: "public" | "internal";
  session: ChatSession;
  userMessage: string;
  instructions: string;
  model: string;
  tools: AgentTool[];
  send: SseSend;
  userEmail?: string;
  reasoningEffort?: "low" | "medium";
  maxOutputTokens?: number;
}

export interface ChatTurnResult {
  assistantText: string;
  citations: ChatCitation[];
}

/**
 * Runs one agentic chat turn over the OpenAI Responses API with streaming
 * and function calling (stateless: full input array maintained locally).
 */
export async function runChatTurn(opts: ChatTurnOptions): Promise<ChatTurnResult> {
  const client = getClient();
  const toolCtx: ToolContext = {
    channel: opts.channel,
    sessionId: opts.session.id,
    userEmail: opts.userEmail,
  };
  const toolMap = new Map(opts.tools.map((t) => [t.spec.name, t]));
  const toolSpecs = opts.tools.map((t) => t.spec);

  // Build conversation input from history + new user message.
  const history = await storage.getSessionMessages(opts.session.id, HISTORY_LIMIT);
  const input: any[] = history.map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: m.content,
  }));
  input.push({ role: "user", content: opts.userMessage });

  const isGpt5 = opts.model.startsWith("gpt-5");
  const allCitations: ChatCitation[] = [];
  let assistantText = "";

  for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
    const lastRound = round === MAX_TOOL_ROUNDS;
    const stream = (await client.responses.create({
      model: opts.model,
      instructions: opts.instructions,
      input,
      tools: lastRound ? undefined : (toolSpecs as any),
      stream: true,
      store: false,
      max_output_tokens: opts.maxOutputTokens ?? 1600,
      ...(isGpt5 ? { reasoning: { effort: opts.reasoningEffort ?? "low" } } : {}),
    })) as unknown as AsyncIterable<any>;

    let finalResponse: any = null;
    for await (const event of stream) {
      switch (event.type) {
        case "response.output_text.delta":
          assistantText += event.delta;
          opts.send("token", { delta: event.delta });
          break;
        case "response.output_item.added":
          if (event.item?.type === "function_call") {
            opts.send("tool", { name: event.item.name, status: "running" });
          }
          break;
        case "response.completed":
          finalResponse = event.response;
          break;
        case "response.failed":
          throw new Error(
            event.response?.error?.message || "The AI response failed. Please try again.",
          );
        case "error":
          throw new Error(event.message || "AI stream error");
      }
    }

    const functionCalls: any[] =
      finalResponse?.output?.filter((item: any) => item.type === "function_call") ?? [];
    if (functionCalls.length === 0) break;

    // Feed the model's function_call items back, then execute each tool.
    for (const call of functionCalls) {
      input.push(call);
    }
    for (const call of functionCalls) {
      const tool = toolMap.get(call.name);
      let output: string;
      const started = Date.now();
      let summary = "";
      try {
        if (!tool) {
          output = `Unknown tool: ${call.name}`;
          summary = "unknown tool";
        } else {
          let args: Record<string, unknown> = {};
          try {
            args = call.arguments ? JSON.parse(call.arguments) : {};
          } catch {
            /* leave args empty */
          }
          const result = await tool.execute(args, toolCtx);
          output = result.output;
          summary = output.slice(0, 300);
          if (result.citations?.length) {
            for (const c of result.citations) {
              if (!allCitations.some((x) => x.slug === c.slug)) allCitations.push(c);
            }
          }
          if (result.proposal) {
            opts.send("proposal", result.proposal);
          }
        }
      } catch (err) {
        console.error(`[ai] tool ${call.name} failed:`, err);
        output = `Tool error: ${(err as Error).message}`;
        summary = output.slice(0, 300);
      }
      storage
        .logToolCall({
          sessionId: opts.session.id,
          channel: opts.channel,
          toolName: call.name,
          args: safeParse(call.arguments),
          resultSummary: summary,
          durationMs: Date.now() - started,
        })
        .catch((err) => console.error("[ai] tool log failed:", err));
      opts.send("tool", { name: call.name, status: "done" });
      input.push({
        type: "function_call_output",
        call_id: call.call_id,
        output,
      });
    }
  }

  if (allCitations.length > 0) {
    opts.send("citations", allCitations);
  }
  return { assistantText, citations: allCitations };
}

function safeParse(raw: unknown): unknown {
  if (typeof raw !== "string") return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return { raw: String(raw).slice(0, 500) };
  }
}
