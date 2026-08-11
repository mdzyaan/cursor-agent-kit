# STATE protocol

Each specialist owns a `STATE.md` file under `.cursor/agents/<id>/`. It is **institutional memory**, not a chat transcript.

Full rules ship with the template: `.cursor/agents/STATE_PROTOCOL.md`.

## Why it exists

Cursor chats are ephemeral. STATE files keep:

- Stable facts (ports, paths, env patterns)
- Decisions with IDs (`D-BE-003`) so agents cite instead of re-asking
- Open loops and handoff history across sessions

## Hot vs cold

| Layer | Sections | Rule |
|-------|----------|------|
| Hot | Brain snapshot, Current focus, Active handoff, Blockers | Overwrite every session |
| Cold | Facts, Decision log, Cross-agent pointers, Open loops, Session log, Handoff history | Append; Master compacts weekly |

## Decision IDs

```markdown
### D-BE-003 | 2026-07-05 | active
**Decision:** `.env` = shared defaults; `.env.local` = machine overrides.
**Rationale:** Local overrides without touching shared credentials.
**Affects:** backend env loading.
**Supersedes:** —
```

Default prefixes: `D-MA` Master · `D-BE` Backend · `D-FE` Frontend · `D-DO` DevOps · `D-RO` Router.

Custom agents get a prefix via `add-agent --prefix D-XX`.

## Product invariants pattern

Do **not** invent scoring, pricing, or business numbers in ROLE files. Put stable product rules in:

- a short always-apply rule (keep under ~200 words), and/or
- a canonical product spec doc outside `.cursor/`

Agents should **cite** those sources (or a decision ID that points to them).

## Compaction

Master, weekly:

- Keep last 10 session-log rows and last 5 handoffs
- Mark stale decisions `superseded`
- Fix Brain snapshots that contradict the Decision log

## Secrets

Never store passwords, JWT secrets, SSH keys, or full `.env` contents in STATE. Reference paths only (e.g. `backend/.env.example`).
