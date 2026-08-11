'use strict';

const fs = require('node:fs');
const path = require('node:path');
const {
  exists,
  readJson,
  writeJson,
  requireProjectRoot,
  agentsJsonPath,
  print,
} = require('./utils');

async function removeAgentCommand(agentId, flags = {}) {
  if (!agentId) throw new Error('Agent id required. Example: npx cursor-agent-kit remove-agent qa');

  const id = agentId.toLowerCase();
  if (id === 'router' || id === 'master') {
    throw new Error(`Refusing to remove core agent "${id}". Delete manually if you really need to.`);
  }

  const projectRoot = requireProjectRoot(flags.cwd || process.cwd());
  const manifestPath = agentsJsonPath(projectRoot);
  const manifest = readJson(manifestPath);

  const before = (manifest.agents || []).length;
  manifest.agents = (manifest.agents || []).filter((a) => a.id !== id);
  if (manifest.agents.length === before) {
    throw new Error(`Agent "${id}" not found in agents.json`);
  }
  writeJson(manifestPath, manifest);

  const agentDir = path.join(projectRoot, '.cursor', 'agents', id);
  const skillDir = path.join(projectRoot, '.cursor', 'skills', `${id}-agent`);

  if (exists(agentDir)) fs.rmSync(agentDir, { recursive: true, force: true });
  if (exists(skillDir)) fs.rmSync(skillDir, { recursive: true, force: true });

  print(`Removed agent "${id}"`);
  print('\nManual follow-up:');
  print(`  1. Remove ${id} rows from .cursor/agents/router/ROLE.md`);
  print(`  2. Remove ${id} from .cursor/agents/master/ROLE.md Interactions`);
  print('  3. Clean any references in WORKFLOW.md');
}

module.exports = { removeAgentCommand };
