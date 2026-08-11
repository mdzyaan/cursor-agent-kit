# STATE protocol — agent brain

Each agent owns one [`STATE.md`](.) file. It is **institutional memory** — not a session log.  
Template: [`STATE_TEMPLATE.md`](STATE_TEMPLATE.md)

## What STATE is for

| Store in STATE | Store elsewhere |
|----------------|-----------------|
| Project-specific implementation choices | Product / scoring rules → your product spec docs |
| Ports, env patterns, "how we run things here" | Design tokens → your design system docs |
| Decision rationale and cross-agent pointers | Schema / API contracts → your schema docs |
| Open loops, handoff history, session log | Repeated anti-patterns → `docs/AGENT_PITFALLS.md` (optional) |

## Hot vs cold

| Layer | Sections | Rule |
|-------|----------|------|
| **Hot** (overwrite) | Brain snapshot, Current focus, Active handoff, Blockers | Replace each session to reflect *now* |
| **Cold** (append) | Facts, Decision log, Cross-agent pointers, Open loops, Session log, Handoff history | Append; never delete without Master review |

## Before work (mandatory read order)

1. This agent's [`ROLE.md`](.)
2. This agent's [`STATE.md`](.) — read in order:
   - **Brain snapshot**
   - **Facts registry**
   - **Decision log** (entries with status `active`)
   - **Cross-agent pointers**
   - **Open loops**
   - **Active handoff** (if any)
3. Other agents' `STATE.md` only when handoff or cross-agent pointers reference them
4. Canonical docs listed in ROLE

**Do not re-ask** the user if an `active` decision or fact already answers the question — cite the decision ID (e.g. "Per D-BE-004, auth uses JWT refresh tokens").

## After work (mandatory write checklist)

- [ ] **Brain snapshot** reflects current reality (3–5 bullets)
- [ ] **Current focus** updated
- [ ] New durable choice → append **Decision** with next ID (`D-XX-NNN`), date, rationale, affects
- [ ] Cross-cutting choice → add **Cross-agent pointer** in every affected agent's STATE
- [ ] Completed handoff → row in **Handoff history**; clear or update **Active handoff**
- [ ] One line in **Session log** (date, what changed, key files)
- [ ] **Open loops**: close (note in session log), add, or reassign with owner + date
- [ ] **Facts registry**: add or update stable truths discovered this session
- [ ] Same mistake twice → Master promotes to a shared pitfalls doc (e.g. `docs/AGENT_PITFALLS.md`)

## Decision log format

```markdown
### D-BE-003 | 2026-07-05 | active
**Decision:** `.env` = shared defaults; `.env.local` = machine overrides.
**Rationale:** Single repo; local overrides without touching shared credentials.
**Affects:** `{{BACKEND_DIR}}/` env loading, all developers.
**Supersedes:** —
**Pointer from:** —
```

**Status values:** `active` | `superseded` | `deprecated` — never delete; mark superseded and set **Supersedes** link on the new entry.

**ID prefixes (defaults):** `D-MA` Master · `D-BE` Backend · `D-FE` Frontend · `D-DO` DevOps · `D-RO` Router  
Add a new prefix when you add a custom agent (e.g. `D-QA` for a QA agent).

## Handoffs

Use [`HANDOFF-TEMPLATE.md`](HANDOFF-TEMPLATE.md). Always include **Related decision IDs**.

When handoff completes:
1. Add row to **Handoff history**
2. Set **Active handoff** to `none` or next in-flight handoff
3. Log in **Session log**

## Compaction (Master, weekly)

- Trim **Session log** to 10 entries (newest first)
- Trim **Handoff history** to 5 entries (newest first)
- Mark stale decisions `superseded`; link forward
- Remove resolved **Open loops** (note resolution date in session log)
- If Brain snapshot contradicts Decision log → fix snapshot (Master task)

## Backup

STATE lives under `.cursor/`. If `.cursor/` is gitignored or local-only, back it up after decision-heavy sessions. Prefer committing framework files (ROLE, protocol, skills) while keeping live STATE private if it contains secrets — never put passwords, tokens, or full `.env` contents in STATE (use path pointers only).
