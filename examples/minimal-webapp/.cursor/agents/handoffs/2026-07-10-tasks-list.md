# Handoff — Tasks list (sample)

Filled example of [`HANDOFF-TEMPLATE.md`](../HANDOFF-TEMPLATE.md).

```text
## Handoff

**From:** Backend
**To:** Frontend
**Status:** done

### Goal
Expose a read-only tasks list for the board UI.

### Acceptance criteria
- [x] GET /api/tasks returns items array
- [x] Requires Bearer auth
- [x] status is todo | doing | done
- [ ] Frontend renders three columns (owned by Frontend next)

### Scope / milestone
MVP — read-only board (D-MA-002)

### Files / areas (expected)
- backend/src/routes/tasks.ts
- backend/src/validators/task.ts

### API contract (Backend → Frontend only)
Method: GET
Path: /api/tasks
Auth: Bearer access token
Request: (none)
Response: { "items": [ { "id": "uuid", "title": "string", "status": "todo|doing|done", "createdAt": "ISO-8601" } ] }
Errors: 401 unauthorized, 500 server

### Env / deploy notes (if any)
- Local: http://localhost:4000

### Blockers
- None

### Links
- Spec / ticket / design: MVP board
- Related decision IDs: D-BE-001, D-BE-002, D-MA-002
```
