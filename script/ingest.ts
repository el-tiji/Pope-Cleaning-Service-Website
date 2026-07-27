/**
 * Knowledge base ingestion.
 *
 * Reads knowledge/public/*.md and knowledge/internal/*.md, chunks them,
 * embeds new/changed documents and stores chunks (with denormalized
 * visibility) in Postgres/pgvector.
 *
 * Run with: npm run ingest        (re-embeds only changed files)
 *           npm run ingest -- --force   (re-embeds everything)
 */
import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { storage } from "../server/storage";
import { embedTexts, hasProvider } from "../server/ai/provider";
import { pool } from "../server/db";

const KNOWLEDGE_DIR = path.resolve(import.meta.dirname, "..", "knowledge");
const CHUNK_SIZE = 1500;
const CHUNK_OVERLAP = 200;
const EMBED_BATCH = 64;

interface ParsedDoc {
  slug: string;
  title: string;
  visibility: "public" | "internal";
  category: string | null;
  tags: string[];
  content: string;
  checksum: string;
}

function chunkText(text: string): string[] {
  // Split on headings first so chunks align with sections where possible.
  const sections = text
    .split(/\n(?=##? )/)
    .map((s) => s.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  for (const section of sections) {
    if (section.length <= CHUNK_SIZE) {
      chunks.push(section);
      continue;
    }
    let start = 0;
    while (start < section.length) {
      let end = Math.min(start + CHUNK_SIZE, section.length);
      if (end < section.length) {
        const lastBreak = section.lastIndexOf("\n", end);
        if (lastBreak > start + CHUNK_SIZE / 2) end = lastBreak;
      }
      chunks.push(section.slice(start, end).trim());
      if (end >= section.length) break;
      start = Math.max(end - CHUNK_OVERLAP, start + 1);
    }
  }
  // Merge tiny trailing chunks into the previous one.
  const merged: string[] = [];
  for (const chunk of chunks) {
    if (merged.length > 0 && chunk.length < 200 && merged[merged.length - 1].length + chunk.length < CHUNK_SIZE + 300) {
      merged[merged.length - 1] += `\n\n${chunk}`;
    } else {
      merged.push(chunk);
    }
  }
  return merged.filter((c) => c.length > 0);
}

async function loadDocs(): Promise<ParsedDoc[]> {
  const docs: ParsedDoc[] = [];
  for (const visibility of ["public", "internal"] as const) {
    const dir = path.join(KNOWLEDGE_DIR, visibility);
    let files: string[] = [];
    try {
      files = (await readdir(dir)).filter((f) => f.endsWith(".md"));
    } catch {
      continue;
    }
    for (const file of files.sort()) {
      const raw = await readFile(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      const fmVisibility = data.visibility === "internal" ? "internal" : "public";
      if (fmVisibility !== visibility) {
        throw new Error(
          `${visibility}/${file}: front-matter visibility "${data.visibility}" does not match its directory — refusing to ingest to avoid leaking internal docs.`,
        );
      }
      docs.push({
        slug: `${visibility}/${file}`,
        title: String(data.title ?? file.replace(/\.md$/, "")),
        visibility,
        category: data.category ? String(data.category) : null,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        content: content.trim(),
        checksum: createHash("sha256").update(raw).digest("hex"),
      });
    }
  }
  return docs;
}

async function main() {
  if (!hasProvider()) {
    console.error("OPENAI_API_KEY is not set — cannot embed documents.");
    process.exit(1);
  }
  const force = process.argv.includes("--force");
  const docs = await loadDocs();
  console.log(`Found ${docs.length} knowledge documents.`);

  let skipped = 0;
  let ingested = 0;
  let totalChunks = 0;

  for (const doc of docs) {
    const existing = await storage.getDocumentBySlug(doc.slug);
    if (existing && existing.checksum === doc.checksum && !force) {
      skipped++;
      continue;
    }
    const record = await storage.upsertDocument({
      slug: doc.slug,
      title: doc.title,
      visibility: doc.visibility,
      category: doc.category,
      tags: doc.tags,
      checksum: doc.checksum,
    });
    await storage.deleteChunksForDocument(record.id);

    const chunks = chunkText(doc.content);
    for (let i = 0; i < chunks.length; i += EMBED_BATCH) {
      const batch = chunks.slice(i, i + EMBED_BATCH);
      // Prefix with title for better retrieval anchoring.
      const embeddings = await embedTexts(batch.map((c) => `${doc.title}\n\n${c}`));
      await storage.insertChunks(
        batch.map((content, j) => ({
          documentId: record.id,
          visibility: doc.visibility,
          title: doc.title,
          category: doc.category,
          chunkIndex: i + j,
          content,
          embedding: embeddings[j],
        })),
      );
    }
    totalChunks += chunks.length;
    ingested++;
    console.log(`  ✓ ${doc.slug} — ${chunks.length} chunks (${doc.visibility})`);
  }

  console.log(`Done. Ingested ${ingested}, skipped ${skipped} unchanged, ${totalChunks} chunks embedded.`);
  await pool.end();
}

main().catch((err) => {
  console.error("Ingestion failed:", err);
  process.exit(1);
});
