---
name: Express 5 req.params typing
description: How @types/express v5 types route params and how to consume them safely.
---

Rule: with @types/express v5, `req.params.x` is typed `string | string[]`. Wrap in `String(req.params.x)` before passing to helpers that expect `string`.

**Why:** tsc fails otherwise; runtime value is a string for normal routes, so `String()` is safe.

**How to apply:** any new Express 5 route handler that reads `req.params`.
