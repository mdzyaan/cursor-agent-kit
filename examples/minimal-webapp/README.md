# Example: TaskBoard (minimal webapp)

Fictional two-service monorepo used to demonstrate **cursor-agent-kit** in action.

```
minimal-webapp/
├── backend/          # stub API
├── frontend/         # stub UI
└── .cursor/          # populated agent team + sample decisions
```

This is **not** a runnable app — only READMEs and a filled-in `.cursor/` so you can browse how STATE, handoffs, and Router output look after a few sessions.

## Browse

| File | What to notice |
|------|----------------|
| [`.cursor/agents/master/STATE.md`](.cursor/agents/master/STATE.md) | Decision IDs, open loops, handoff history |
| [`.cursor/agents/backend/STATE.md`](.cursor/agents/backend/STATE.md) | API facts + `D-BE-*` decisions |
| [`.cursor/agents/handoffs/2026-07-10-tasks-list.md`](.cursor/agents/handoffs/2026-07-10-tasks-list.md) | Completed Backend → Frontend handoff |
| [`.cursor/agents/router/SAMPLE_OUTPUT.md`](.cursor/agents/router/SAMPLE_OUTPUT.md) | Example Router chat plan |

## Try locally

From the kit repo root:

```bash
npx cursor-agent-kit init /tmp/my-copy --yes
# or open this example folder in Cursor and tag @router-agent
```
