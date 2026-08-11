# Getting started

## Install into a project

From your project root (monorepo root if you have one):

```bash
npx cursor-agent-kit init
```

Non-interactive (CI / demos):

```bash
npx cursor-agent-kit init --yes \
  --var PROJECT_NAME="Acme" \
  --var BACKEND_DIR=api \
  --var FRONTEND_DIR=web \
  --var LOCAL_PORT=8080 \
  --var PROD_URL=https://api.example.com \
  --var HEALTH_URL=https://api.example.com/health
```

Install a subset of specialists (Router is always included):

```bash
npx cursor-agent-kit init --yes --agents master,backend,frontend
```

## After init

1. Open the **project root** as your Cursor workspace (so `.cursor/rules` and `.cursor/skills` load).
2. Edit `.cursor/rules/project-overview.mdc` for your real layout and invariants.
3. Start a chat and tag **`@router-agent`** with a plain-language task.
4. Open new chats from the Router's copy-paste prompts.

## Manage agents

```bash
npx cursor-agent-kit list-agents
npx cursor-agent-kit add-agent product --name "Product" --desc "Scope and AC" --owns "docs/**"
npx cursor-agent-kit remove-agent product
```

After `add-agent`, manually add one row to:

- `.cursor/agents/router/ROLE.md` (routing decision tree)
- `.cursor/agents/master/ROLE.md` (Interactions table)
- optionally `.cursor/agents/WORKFLOW.md`

## Daily loop

1. `@router-agent` → get a chat plan  
2. Run Chat 1…N with the tagged specialists  
3. Each specialist updates its `STATE.md` (decision IDs, session log)  
4. `@master-agent` loop-back to review and close loops  

See [state-protocol.md](./state-protocol.md) and [../ARCHITECTURE.md](../ARCHITECTURE.md).
