# Sample Router output

User said:

```text
@router-agent

I want to add create-task: API + a simple form on the board.
```

Router replied:

---

## Summary
Route create-task as **2 chats** — Backend contract first, then Frontend form (per D-RO-001 / D-MA-002).

## Skip
Skip: DevOps (no deploy/env change). Master review only at the end.

## Chat plan

### Chat 1 — Backend — Agent mode
**Tag:** `@backend-agent`  
**Also read:** `.cursor/agents/backend/STATE.md`, handoff template  
**Why this chat:** POST /api/tasks does not exist yet (only GET per D-BE-001).

**Copy-paste prompt:**
```text
Act as the Backend agent.
Read .cursor/agents/backend/ROLE.md and .cursor/agents/backend/STATE.md (Brain snapshot first).
Goal: add POST /api/tasks for creating a task { title } → returns created Task.
Align status default with D-BE-002 (todo).
Write API contract into a handoff for Frontend using HANDOFF-TEMPLATE.md.
Update STATE.md with a new D-BE-NNN decision.
Do not edit frontend/.
```

### Chat 2 — Frontend — Agent mode
**Tag:** `@frontend-agent`  
**Also read:** Backend handoff from Chat 1  
**Why this chat:** Form + optimistic refresh after POST.

**Copy-paste prompt:**
```text
Act as the Frontend agent.
Read .cursor/agents/frontend/ROLE.md and STATE.md.
Handoff: [paste Backend handoff]
Add a simple create-task form on the board; respect D-FE-001 tokens.
Update Frontend STATE when done.
Do not edit backend/.
```

## Loop-back
Return to `@master-agent` after Chat 2 for smoke review (create one task locally).

## Notes
- Cite D-BE-001 / D-BE-002; do not invent a new status enum.
- Update STATE.md after each chat.
