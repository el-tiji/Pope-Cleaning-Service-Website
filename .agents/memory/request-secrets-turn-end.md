---
name: requestSecrets ends the turn
description: Sequencing rule for asking the user for secrets/env vars mid-task.
---

Rule: `requestSecrets(...)` / `requestEnvVars(...)` stop the current turn — nothing after them runs until the user responds in a future turn.

**Why:** planning around this avoided a stalled build: all code, schema push, workflow switch, smoke tests and docs were completed first, and the secrets request was issued as the very last action.

**How to apply:** when a task needs user-provided secrets, front-load every step that doesn't depend on the secret; call requestSecrets as the final callback of the turn, and plan a follow-up turn for the steps that need the secret (e.g. ingestion/e2e tests that call the paid API).
