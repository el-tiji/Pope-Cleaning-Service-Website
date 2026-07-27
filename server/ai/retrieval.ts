import { embedText } from "./provider";
import { storage, type KnowledgeSearchResult } from "../storage";
import type { ChatCitation } from "@shared/schema";

export interface RetrievalOutput {
  results: KnowledgeSearchResult[];
  citations: ChatCitation[];
  /** Formatted context block to hand to the model. */
  context: string;
}

const MIN_SIMILARITY = 0.15;

/**
 * Semantic search over the knowledge base.
 * `visibilities` controls role separation: the public channel may only ever
 * pass ["public"], while the internal channel passes ["public", "internal"].
 */
export async function searchKnowledge(
  query: string,
  visibilities: Array<"public" | "internal">,
  limit = 5,
): Promise<RetrievalOutput> {
  const embedding = await embedText(query);
  const all = await storage.searchKnowledge(embedding, visibilities, limit);
  const results = all.filter((r) => r.similarity >= MIN_SIMILARITY);

  const seen = new Set<string>();
  const citations: ChatCitation[] = [];
  for (const r of results) {
    if (seen.has(r.slug)) continue;
    seen.add(r.slug);
    citations.push({
      slug: r.slug,
      title: r.title,
      category: r.category,
      visibility: r.visibility,
    });
  }

  const context = results
    .map(
      (r, i) =>
        `[Source ${i + 1}: ${r.title} (${r.slug})]\n${r.content}`,
    )
    .join("\n\n---\n\n");

  return { results, citations, context };
}
