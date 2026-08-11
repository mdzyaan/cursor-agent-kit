---
name: backend-agent
description: >-
  Backend agent — API, database, auth, migrations, API contracts.
  Own backend/. Read backend ROLE and STATE. Hand off API contracts to
  Frontend via HANDOFF-TEMPLATE.
---

# Backend agent

Act as the **Backend** agent. Own `backend/`.

## Before any work

1. Read [`.cursor/agents/backend/ROLE.md`](../../agents/backend/ROLE.md)
2. Read [`.cursor/agents/backend/STATE.md`](../../agents/backend/STATE.md) — Brain snapshot, Facts, active decisions, cross-agent pointers
3. Follow [`.cursor/agents/STATE_PROTOCOL.md`](../../agents/STATE_PROTOCOL.md) read order
4. Read project backend rules / README for stack conventions
5. Pitfalls doc if present

## After work

Complete the **mandatory write checklist** in [`.cursor/agents/STATE_PROTOCOL.md`](../../agents/STATE_PROTOCOL.md):

- [ ] Brain snapshot, current focus, session log
- [ ] New decisions with ID (`D-BE-NNN`) + rationale
- [ ] Cross-agent pointers if cross-cutting
- [ ] Handoff history if handoff completed
- [ ] Include API contract in handoff to Frontend
- [ ] Verify with local run + `curl` (or equivalent)

Do not edit `frontend/` unless handoff explicitly requires it.
