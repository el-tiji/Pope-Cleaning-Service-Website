# Pope Cleaning Services

## Overview
Marketing site + quote pipeline + admin panel for Pope Cleaning Services, a family-owned cleaning company in Perth, WA (Kevin 0423 258 795, Genny 0431 450 293). Includes a public AI assistant (website chat bubble) and an internal staff AI copilot (admin slide-over), both backed by the same Express API with strict role separation. See `CHATBOT_README.md` for AI architecture and operations, and `docs/chatbot-eval-checklist.md` for the manual eval list.

## User preferences
- The user communicates in Spanish — always reply in Spanish.
- Brand palette: deep navy `#00275F`, blue `#2F7FD1`, light background `#F5F8FC`.
- Preferred contact surfacing: WhatsApp (+61 423 258 795) as the human fallback everywhere.

## Architecture
- **Frontend:** Vite + React 19, wouter routing, Tailwind v4 + shadcn/ui, framer-motion. Entry: `client/`.
- **Backend:** Express 5 (`server/index.ts`, routes in `server/routes.ts`), served with Vite middleware in dev on port 5000 (`npm run dev`).
- **DB:** Replit PostgreSQL + Drizzle (`shared/schema.ts`, `npm run db:push`). pgvector enabled; knowledge chunks use `vector(1536)` with HNSW index.
- **Auth:** passport-local + express-session + connect-pg-simple. Admin seeded on boot from `ADMIN_EMAIL` env + `ADMIN_PASSWORD` secret (scrypt hashes; rotating the secret re-hashes on boot). Client guard in `AdminLayout` via `useAuth`; server enforces `requireStaff` on all `/api/admin/*`.
- **Quotes:** `POST /api/quotes` (public, rate-limited, zod-validated) from `/quote` and `/booking` forms → `QR-xxxx` references. Admin manages status/notes/amount via `/api/admin/quotes*`.
- **AI:** OpenAI Responses API with a stateless tool loop (`server/ai/`). Public chat `POST /api/chat` (SSE, gpt-5-mini default, public knowledge only, never quotes prices). Staff copilot `POST /api/admin/chat` (SSE, gpt-5 default, internal+public knowledge, live quote tools; status/note changes are proposals the staff confirms in the UI). Knowledge base: markdown in `knowledge/{public,internal}/`, ingested with `npm run ingest`.
- **Build/deploy:** `npm run build` (vite + esbuild → `dist/`), `npm run start` in production. Deployment should be **autoscale** (server + Postgres sessions).

## Recent changes (July 2026)
- Task #3: Replaced the rule-based chat mock with the real AI assistant; added staff copilot, auth, quotes API, knowledge ingestion pipeline, admin pages wired to live data.
- Known pre-existing issue (unrelated): nested `<a>` hydration warning from the footer on public pages.
