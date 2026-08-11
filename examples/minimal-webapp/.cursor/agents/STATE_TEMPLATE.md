# [Agent name] agent — state

> Institutional memory for this agent. Schema: [STATE_PROTOCOL.md](STATE_PROTOCOL.md).  
> **Hot** sections (overwrite each session) · **Cold** sections (append; Master compacts weekly).

---

## Brain snapshot (hot)

> 3–5 bullets. If you read nothing else, know this. Overwrite every session.

- …
- …
- …

## Current focus (hot)

- …

## Active handoff (hot)

| Field | Value |
|-------|-------|
| From | — |
| To | — |
| Goal | — |
| Status | none \| pending \| in_progress \| blocked \| done |
| Related decision IDs | — |

## Blockers (hot)

- None

---

## Facts registry (cold)

> Stable truths — ports, env patterns, canonical paths. Append when new; update inline if value changes.

| Fact | Value |
|------|-------|
| … | … |

---

## Decision log (cold)

> Append-only. Never delete — mark `superseded` and link forward.  
> ID prefix: `D-MA` Master · `D-BE` Backend · `D-FE` Frontend · `D-DO` DevOps · `D-RO` Router (add custom prefixes as needed)

### D-XX-001 | YYYY-MM-DD | active

**Decision:** …  
**Rationale:** …  
**Affects:** …  
**Supersedes:** —  
**Pointer from:** —

---

## Cross-agent pointers (cold)

> Active decisions owned by other agents that affect this agent's work. Cite ID — do not re-ask.

| ID | Agent | Summary |
|----|-------|---------|
| … | … | … |

---

## Open loops (cold)

> Checkbox items. Close with date in session log when resolved.

- [ ] (owner, YYYY-MM-DD) …

---

## Session log (cold)

> Last 10 entries (newest first). Master trims beyond 10.

| Date | Summary |
|------|---------|
| YYYY-MM-DD | … |

---

## Handoff history (cold)

> Last 5 completed handoffs (newest first). Master trims beyond 5.

| Date | From → To | Brief | Status |
|------|-----------|-------|--------|
| YYYY-MM-DD | … → … | … | done |
