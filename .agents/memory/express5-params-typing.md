---
name: Express 5 req.params typing
description: Why tsc rejects req.params.id as string|string[] in this repo and how to handle it.
---

Rule: with Express 5 + `@types/express` v5, `req.params.<name>` is typed `string | string[]`, so passing it straight into a `(id: string)` helper fails `npm run check`.

**Why:** hit this in the quotes admin routes — 4 tsc errors (`TS2345 string | string[]`) on otherwise-correct code.

**How to apply:** coerce at the call site (`String(req.params.id)`) or narrow with `typeof`. Same applies to `req.query` values (`typeof q === "string" ? q : undefined`).
