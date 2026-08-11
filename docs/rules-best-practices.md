# Cursor rules best practices

Practical guidance for keeping agents fast and accurate. Based on common 2026 Cursor `.mdc` practices (activation modes + context budgeting).

## Prefer `.cursor/rules/*.mdc` over legacy `.cursorrules`

Agent mode is built around modular `.mdc` rules with YAML frontmatter. A single giant `.cursorrules` file is easy to ignore and expensive to load.

## Four activation modes

| Mode | Frontmatter | Use for |
|------|-------------|---------|
| Always Apply | `alwaysApply: true` | Universal bans, short project elevator pitch |
| Auto Attached | `globs: backend/**/*` | Stack conventions when editing matching files |
| Agent Requested | `description: "..."` (no globs) | Longer guides the agent pulls when relevant |
| Manual | no auto flags | Rare / compliance docs you `@` by name |

## Token budget

- Keep **always-apply** rules short — aim under **~200 words** each.
- Aim for total always-on context (rules + AGENTS.md-style indexes) under roughly **~3k tokens**.
- If a rule is rarely needed, demote it from Always Apply → Auto Attached or Agent Requested.

## Suggested split for this kit

| File | Mode | Content |
|------|------|---------|
| `project-overview.mdc` | Always Apply | Layout, agent tags, URLs (short) |
| `backend.mdc` | globs on backend | API/module conventions |
| `frontend.mdc` | globs on frontend | UI tokens / routing conventions |
| `deploy.mdc` | Agent Requested or globs | Deploy runbook pointers |

This kit ships `project-overview.mdc.example` as a starting point. Add stack-specific rules yourself — do not dump an entire product plan into always-apply.

## Skills vs rules

- **Rules** = how to code / constraints injected by path or always-on.
- **Skills** (`.cursor/skills/*/SKILL.md`) = invokable agent personas (`@backend-agent`).
- **STATE** = living memory that changes every session.

Use all three; don't stuff ROLE prose into always-apply rules.

## Audit weekly

- If an agent ignores a rule, it is probably too vague or conflicting — prune it.
- If the agent has internalized a habit, delete the rule to reclaim context.
