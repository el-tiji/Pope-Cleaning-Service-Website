# Pope Cleaning Services — AI Chatbot & Staff Copilot

Two AI assistants share one backend:

| Channel | Who | Endpoint | Model (default) | Knowledge access |
|---|---|---|---|---|
| Public assistant | Website visitors (floating chat bubble) | `POST /api/chat` (SSE) | `gpt-5-mini` | **public** docs only |
| Staff copilot | Logged-in staff (admin panel slide-over) | `POST /api/admin/chat` (SSE) | `gpt-5` | public **and internal** docs + live quote data |

Role separation is enforced **server-side**: the public endpoint only ever retrieves `public` knowledge and refuses to discuss prices; the internal endpoint requires an authenticated staff session (cookie) and binds chat sessions to the logged-in user.

## Environment variables

| Variable | Type | Purpose |
|---|---|---|
| `OPENAI_API_KEY` | Secret (required for chat) | Enables both assistants. Without it, chat endpoints return a friendly 503 and the rest of the site works normally. |
| `ADMIN_PASSWORD` | Secret (required for admin) | Password for the seeded admin account. Rotating it and restarting updates the stored hash. |
| `ADMIN_EMAIL` | Env (shared) | Email/username of the seeded admin account. Default: `popecleaningservices@hotmail.com`. |
| `SESSION_SECRET` | Secret | Signs session cookies. |
| `DATABASE_URL` | Managed | Replit PostgreSQL (includes `pgvector`). |
| `OPENAI_MODEL_CHAT` | Env (optional) | Public assistant model. Default `gpt-5-mini`. |
| `OPENAI_MODEL_REASONING` | Env (optional) | Staff copilot model. Default `gpt-5`. |
| `CHATBOT_PUBLIC_ENABLED` / `CHATBOT_INTERNAL_ENABLED` | Env (optional) | Set to `"false"` to switch a channel off without deploying code. |
| `VITE_ENABLE_ADMIN_LOGIN` | Env (development) | Shows the admin login link in the navbar during development. Staff can always navigate to `/auth/login` directly. |

## Knowledge base

Markdown files under `knowledge/`:

```
knowledge/
  public/     ← safe for customers (services, guarantees, FAQs, areas…)
  internal/   ← staff only (pricing playbook, ops procedures, templates…)
```

Each file has front-matter:

```md
---
title: Services Overview
visibility: public   # must match its directory
---
```

### Re-ingesting after editing docs

```bash
npm run ingest          # embeds new/changed files (checksum-skips unchanged)
npm run ingest -- --force   # re-embeds everything
```

Ingestion chunks by headings (~1500 chars, 200 overlap), embeds with `text-embedding-3-small`, and stores vectors in the `knowledge_chunks` table (pgvector, HNSW index). A file's `visibility` is denormalized onto every chunk — public retrieval filters on it at SQL level.

## Write-safety model (staff copilot)

- The copilot can **propose** a status update or internal note → UI shows a card → a human clicks **Confirm**, which calls the normal authenticated REST endpoint. The model never mutates quote data directly.
- `escalate_case` / `create_contact_request` write rows to `chatbot_escalations` (visible via `GET /api/admin/escalations`).
- Every tool invocation is logged in `chatbot_tool_logs` with its arguments and result summary.

## Safety & guardrails

- Public messages pass through OpenAI moderation (fails open on API errors).
- Public prompt: never quotes prices, never reveals internal info, redirects pricing to the quote form / Kevin (0423 258 795); prompt-injection resistant phrasing.
- Rate limits: chat 20 msg/5 min per session, quotes 10/hour per IP, login 10/15 min per IP.
- Feedback: thumbs up/down per assistant message → `chatbot_feedback`.

## Local development

```bash
npm run dev        # Express + Vite on :5000
npm run db:push    # sync Drizzle schema
npm run ingest     # embed knowledge docs (needs OPENAI_API_KEY)
npm run check      # typecheck
npm run build      # production bundle (dist/)
```

## Production notes

- Deploy target: **autoscale** (server app, stateless; sessions and vectors live in Postgres).
- Build: `npm run build` → Run: `npm run start`.
- Remember to run `npm run db:push` and `npm run ingest` against production data once after first deploy (Publish tool handles env parity; ingestion is idempotent).
