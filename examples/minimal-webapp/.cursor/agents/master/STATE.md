# Master agent — state

> Institutional memory. Schema: [STATE_PROTOCOL.md](../STATE_PROTOCOL.md). Master compacts weekly.

---

## Brain snapshot (hot)

- TaskBoard MVP: list + create tasks; auth is email magic-link (D-MA-001)
- Tasks list API shipped (D-BE-001); Frontend board UI in progress
- Local API port `4000` · Prod health `https://api.taskboard.example/health`
- No CI deploy yet — DevOps blocked on first GHA workflow (open loop)

## Current focus (hot)

- Close Frontend handoff for Tasks board; then DevOps CI bootstrap

## Active handoff (hot)

| Field | Value |
|-------|-------|
| From | Backend |
| To | Frontend |
| Goal | Render GET /api/tasks on board |
| Status | in_progress |
| Related decision IDs | D-BE-001, D-MA-001 |

## Blockers (hot)

- DevOps: no deploy workflow yet

---

## Facts registry (cold)

| Fact | Value |
|------|-------|
| Project | TaskBoard |
| Backend | backend/ |
| Frontend | frontend/ |
| Local port | 4000 |
| Prod URL | https://api.taskboard.example |
| Health URL | https://api.taskboard.example/health |

---

## Decision log (cold)

> ID prefix: `D-MA`

### D-MA-001 | 2026-07-08 | active

**Decision:** Auth for MVP is email magic-link; no passwords.  
**Rationale:** Faster onboarding for a personal task board demo.  
**Affects:** Backend auth module, Frontend login screen.  
**Supersedes:** —  
**Pointer from:** —

### D-MA-002 | 2026-07-09 | active

**Decision:** Ship read-only Tasks board before create/edit UI.  
**Rationale:** Unblocks Frontend with a single GET contract.  
**Affects:** Backend → Frontend handoff 2026-07-10.  
**Supersedes:** —  
**Pointer from:** —

---

## Cross-agent pointers (cold)

| ID | Agent | Summary |
|----|-------|---------|
| D-BE-001 | Backend | GET /api/tasks returns `{ items: Task[] }` |
| D-FE-001 | Frontend | Board uses shadcn-style tokens; no raw Tailwind palette |

---

## Open loops (cold)

- [ ] (frontend, 2026-07-10) Finish Tasks board against D-BE-001
- [ ] (devops, 2026-07-10) Add GitHub Actions deploy workflow

---

## Session log (cold)

| Date | Summary |
|------|---------|
| 2026-07-10 | Approved Backend → Frontend handoff for tasks list |
| 2026-07-09 | Prioritized read-only board (D-MA-002) |
| 2026-07-08 | Chose magic-link auth (D-MA-001) |

---

## Handoff history (cold)

| Date | From → To | Brief | Status |
|------|-----------|-------|--------|
| 2026-07-10 | Backend → Frontend | Tasks list GET contract | in_progress |
