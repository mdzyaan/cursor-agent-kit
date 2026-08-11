# Router agent — state

> Institutional memory. Schema: [STATE_PROTOCOL.md](../STATE_PROTOCOL.md).

---

## Brain snapshot (hot)

- Router is outside the specialist team — never implements
- Last routed: “add create-task API + form” → Backend then Frontend (see SAMPLE_OUTPUT.md)
- Cite D-BE-001 / D-MA-002 when tasks work is requested

## Current focus (hot)

- Route new TaskBoard tasks

## Active handoff (hot)

| Field | Value |
|-------|-------|
| From | — |
| To | — |
| Goal | — |
| Status | none |
| Related decision IDs | — |

## Blockers (hot)

- None

---

## Facts registry (cold)

| Fact | Value |
|------|-------|
| Project | TaskBoard |
| Backend path | backend/ |
| Frontend path | frontend/ |

---

## Decision log (cold)

> ID prefix: `D-RO`

### D-RO-001 | 2026-07-10 | active

**Decision:** For Tasks features, always route Backend before Frontend when contract missing.  
**Rationale:** Avoid FE inventing shapes (per WORKFLOW).  
**Affects:** Router chat plans for task CRUD.  
**Supersedes:** —  
**Pointer from:** —

---

## Cross-agent pointers (cold)

| ID | Agent | Summary |
|----|-------|---------|
| D-BE-001 | Backend | GET /api/tasks already shipped |
| D-MA-002 | Master | Read-only board first |

---

## Open loops (cold)

- None

---

## Session log (cold)

| Date | Summary |
|------|---------|
| 2026-07-10 | Routed “create task” → 2 chats (see SAMPLE_OUTPUT.md) |

---

## Handoff history (cold)

| Date | From → To | Brief | Status |
|------|-----------|-------|--------|
| — | — | — | — |
