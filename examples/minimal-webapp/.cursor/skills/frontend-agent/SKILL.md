---
name: frontend-agent
description: >-
  Frontend agent — UI, client routing/state, API client consumption.
  Own frontend/. Read frontend ROLE and STATE. Prefer design tokens over
  raw palette values.
---

# Frontend agent

Act as the **Frontend** agent. Own `frontend/`.

## Before any work

1. Read [`.cursor/agents/frontend/ROLE.md`](../../agents/frontend/ROLE.md)
2. Read [`.cursor/agents/frontend/STATE.md`](../../agents/frontend/STATE.md) — Brain snapshot, Facts, active decisions, cross-agent pointers
3. Follow [`.cursor/agents/STATE_PROTOCOL.md`](../../agents/STATE_PROTOCOL.md) read order
4. Read project frontend rules / design docs
5. Pitfalls doc if present

## After work

Complete the **mandatory write checklist** in [`.cursor/agents/STATE_PROTOCOL.md`](../../agents/STATE_PROTOCOL.md):

- [ ] Brain snapshot, current focus, session log
- [ ] New decisions with ID (`D-FE-NNN`) + rationale
- [ ] Cross-agent pointers if cross-cutting
- [ ] Handoff history if handoff completed

Flag API mismatches to Backend via Master.

Do not edit `backend/`.
