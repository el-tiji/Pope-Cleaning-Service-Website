/**
 * AI provider layer.
 *
 * Currently backed by OpenAI (Responses API for chat + tool calling,
 * Embeddings API for retrieval, Moderations API for input safety).
 * Keep all direct OpenAI usage behind this module so a different provider
 * can be swapped in later by re-implementing these exports.
 */
import OpenAI from "openai";

export const CHAT_MODEL = process.env.OPENAI_MODEL_CHAT || "gpt-5-mini";
export const REASONING_MODEL = process.env.OPENAI_MODEL_REASONING || "gpt-5";
export const EMBEDDING_MODEL = process.env.OPENAI_MODEL_EMBEDDING || "text-embedding-3-small";
export const EMBEDDING_DIMENSIONS = 1536;

let client: OpenAI | null = null;

export function hasProvider(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

export function getClient(): OpenAI {
  if (!hasProvider()) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}

/** Embed a batch of texts. Returns one vector per input, in order. */
export async function embedTexts(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];
  const response = await getClient().embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts,
    dimensions: EMBEDDING_DIMENSIONS,
  });
  return response.data
    .sort((a, b) => a.index - b.index)
    .map((item) => item.embedding);
}

export async function embedText(text: string): Promise<number[]> {
  const [embedding] = await embedTexts([text]);
  return embedding;
}

export interface ModerationResult {
  flagged: boolean;
  categories: string[];
}

/** Moderate user input. Fails open (unflagged) if the API call errors. */
export async function moderateText(text: string): Promise<ModerationResult> {
  try {
    const response = await getClient().moderations.create({
      model: "omni-moderation-latest",
      input: text,
    });
    const result = response.results[0];
    if (!result) return { flagged: false, categories: [] };
    const categories = Object.entries(result.categories ?? {})
      .filter(([, v]) => v)
      .map(([k]) => k);
    return { flagged: result.flagged, categories };
  } catch (err) {
    console.error("[ai] moderation call failed:", err);
    return { flagged: false, categories: [] };
  }
}
