# Virtual team workflow — {{PROJECT_NAME}}

Cursor runs **one agent per chat**. You (or Master) schedule work linearly across chats. STATE files are **agent brains** — see [`STATE_PROTOCOL.md`](STATE_PROTOCOL.md) and [`STATE_TEMPLATE.md`](STATE_TEMPLATE.md).

## Step 0 — Router (optional)

New task and unsure where to start? Open a chat with **`@router-agent`**, describe the requirement, get a numbered chat plan with copy-paste prompts. Router is **outside** the specialist team and never implements.

## Standard feature pipeline

1. **Master** — Read `master/ROLE.md` + `master/STATE.md`. Set priority. Decide which specialists are needed.
2. **Backend** (if API/DB/auth) — Implement in `{{BACKEND_DIR}}/`. Update `backend/STATE.md`. Add API contract notes to handoff.
3. **Frontend** (if UI/client) — Implement in `{{FRONTEND_DIR}}/`. Consume Backend handoff. Update `frontend/STATE.md`.
4. **DevOps** (if deploy, env, CI secrets) — Coordinate deploy. Update `devops/STATE.md`.
5. **Master (loop back)** — Review diff, run smoke tests, close or reopen loops.

Skip specialists that the change does not touch. Add custom agents (e.g. Product, QA) via `npx cursor-agent-kit add-agent` and insert them into this pipeline where they belong.

## When to skip agents

| Task type | Pipeline |
|-----------|----------|
| One-line fix in one area | Specialist only; update that agent's STATE if >30 min or recurring |
| UI-only, no API change | Frontend → Master review |
| Backend-only bugfix | Backend → Master review |
| Prod deploy / env | DevOps → Master review |
| Unclear scope / cross-cutting | Master first (Plan mode) |

## Loop-back rules

| Trigger | Loop to |
|---------|---------|
| API shape wrong on device/client | Backend → Frontend |
| UI violates design / product rules | Frontend (+ Product/Master if flow wrong) |
| Prod failure / deploy failed | DevOps → Backend if code |
| Scope creep / invented requirements | Master (or Product if you added one) |
| Same bug twice | Master → update pitfalls doc + relevant STATE |
| Stale Brain snapshot contradicts Decision log | Master → fix STATE per STATE_PROTOCOL compaction |

Record open loops on **Master STATE** until closed.

## Chat prompt pattern

```text
Act as the [Backend] agent.
Read .cursor/agents/backend/ROLE.md and .cursor/agents/backend/STATE.md (Brain snapshot first).
Handoff: [paste from HANDOFF-TEMPLATE.md]
Update STATE.md per STATE_PROTOCOL.md when done (decision IDs, session log, handoff history).
Do not change files outside your ownership unless the handoff explicitly allows it.
```

Or invoke skill: `@backend-agent` (same role; read STATE before work).

## Definition of Done

| Agent | Done when |
|-------|-----------|
| Backend | Endpoint/migration verified locally; contract in handoff; Backend STATE updated |
| Frontend | UI matches design conventions; consumes agreed contract; Frontend STATE updated |
| DevOps | Deploy/health OK or failure documented; DevOps STATE updated |
| Master | Smoke tests pass; loops closed or reassigned; weekly STATE compaction when due |

## Ownership boundaries

| Owns | Path / artifact |
|------|-----------------|
| Backend | `{{BACKEND_DIR}}/**`, API contracts in handoffs |
| Frontend | `{{FRONTEND_DIR}}/**` |
| DevOps | Deploy configs, CI, env documentation (coordinates with Backend/Frontend for vars) |
| Master | Priorities, review, pitfalls updates after incidents |

Rules (`.cursor/rules/`) and skills (`.cursor/skills/`) remain auto-loaded knowledge — do not duplicate large product specs into ROLE files.

## Smoke tests (customize)

```bash
# Backend health (example)
curl -s {{HEALTH_URL}}

# Local API (example)
curl -s http://localhost:{{LOCAL_PORT}}/health
```
