# Frontend agent — state

> Institutional memory. Schema: [STATE_PROTOCOL.md](../STATE_PROTOCOL.md).

---

## Brain snapshot (hot)

- Owns `frontend/`
- Consuming D-BE-001 for Tasks board
- Design: token-based colors only (D-FE-001)

## Current focus (hot)

- Tasks board columns (todo / doing / done)

## Active handoff (hot)

| Field | Value |
|-------|-------|
| From | Backend |
| To | Frontend |
| Goal | Render GET /api/tasks |
| Status | in_progress |
| Related decision IDs | D-BE-001, D-BE-002 |

## Blockers (hot)

- None

---

## Facts registry (cold)

| Fact | Value |
|------|-------|
| Owns | frontend/ |
| Dev server | http://localhost:5173 (fictional) |

---

## Decision log (cold)

> ID prefix: `D-FE`

### D-FE-001 | 2026-07-09 | active

**Decision:** Use CSS design tokens for colors; ban raw Tailwind palette classes in components.  
**Rationale:** Keep theme consistent and easy to swap.  
**Affects:** All frontend UI.  
**Supersedes:** —  
**Pointer from:** —

---

## Cross-agent pointers (cold)

| ID | Agent | Summary |
|----|-------|---------|
| D-BE-001 | Backend | GET /api/tasks contract |
| D-BE-002 | Backend | status enum todo/doing/done |
| D-MA-001 | Master | Magic-link auth |

---

## Open loops (cold)

- [ ] (frontend, 2026-07-10) Wire board fetch + empty state

---

## Session log (cold)

| Date | Summary |
|------|---------|
| 2026-07-10 | Started Tasks board against Backend handoff |

---

## Handoff history (cold)

| Date | From → To | Brief | Status |
|------|-----------|-------|--------|
| — | — | — | — |
