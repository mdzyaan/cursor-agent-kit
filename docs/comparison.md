# How this compares

## Plain `.cursor/rules`

| | Rules only | cursor-agent-kit |
|--|------------|------------------|
| Coding conventions | Yes | Yes (you still write rules) |
| Who should do the work | No | **Router** outputs a chat plan |
| Ownership boundaries | Informal | Explicit per agent ROLE |
| Memory across chats | Weak | **STATE protocol** + decision IDs |
| Handoffs | Ad hoc | **HANDOFF-TEMPLATE** |

Use rules alone for a small single-repo app. Use this kit when you have a monorepo, multiple concerns, or keep re-explaining decisions.

## Memory Bank pattern

Projects like [vanzan01/cursor-memory-bank](https://github.com/vanzan01/cursor-memory-bank) and [tacticlaunch/cursor-bank](https://github.com/tacticlaunch/cursor-bank) popularized a shared `memory-bank/` of markdown files (project brief, active context, progress) that agents read/update across sessions.

| | Memory Bank | cursor-agent-kit |
|--|-------------|------------------|
| Persistent markdown memory | Yes (shared bank) | Yes (**per-agent STATE**) |
| Plan / Act workflow | Often yes | Via Cursor Plan vs Agent + Router |
| Multi-agent routing | Usually one agent persona | **Router + specialists** |
| Ownership boundaries | Soft | Hard (Backend vs Frontend paths) |
| Decision IDs | Rare | First-class (`D-BE-003`) |
| Install | Often `npx … init` | `npx cursor-agent-kit init` |

**Positioning:** Memory Bank answers “what is the project state?”  
This kit answers that **and** “which specialist chat should I open next, and what do they own?”

You can use both: keep a short product brief in `docs/`, and let agent STATE track decisions/handoffs.

## When not to use this kit

- Solo greenfield weekend project with one stack
- You only need lint-style coding rules
- You want fully autonomous multi-agent swarms (this kit is **human-scheduled** chats, not a runtime orchestrator)
