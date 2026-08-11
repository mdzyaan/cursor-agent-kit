# Handoff brief

Copy this block into the specialist chat (fill every field).

```text
## Handoff

**From:** [Master | Backend | Frontend | DevOps | <custom>]
**To:** [Backend | Frontend | DevOps | Master | <custom>]
**Status:** [pending | in_progress | done | blocked]

### Goal
[One sentence — what we're building or fixing]

### Acceptance criteria
- [ ] ...
- [ ] ...

### Scope / milestone
[Optional — e.g. MVP phase, sprint, epic name]

### Files / areas (expected)
- ...

### API contract (Backend → Frontend only)
Method: 
Path: 
Auth: 
Request: 
Response: 
Errors: 

### Env / deploy notes (if any)
- ...

### Blockers
- None | ...

### Links
- Spec / ticket / design:
- Related decision IDs: D-XX-NNN, D-YY-NNN (required — cite from agent STATE files)
```

After work completes, the specialist updates their **STATE.md** per [`STATE_PROTOCOL.md`](STATE_PROTOCOL.md):

- Completed handoff → **Handoff history**; clear **Active handoff**
- New durable choice → **Decision log** with ID + rationale
- Cross-cutting choice → **Cross-agent pointers** in affected agents
- One line in **Session log**
