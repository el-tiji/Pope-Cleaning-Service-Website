---
name: requestSecrets ends the turn
description: Sequencing rule for requestSecrets/requestEnvVars calls.
---

Rule: `requestSecrets` / `requestEnvVars` end the current turn. Sequence all edits, tests, and docs first and make the secrets request the final action of a turn.

**Why:** anything queued after the request will not run until the user responds.

**How to apply:** whenever a task needs new secrets or env vars from the user.
