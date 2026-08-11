'use strict';

const fs = require('node:fs');
const path = require('node:path');
const {
  DEFAULT_VARS,
  DEFAULT_TEAM_AGENTS,
  ALWAYS_INSTALL,
  templateCursorPath,
  ensureDir,
  exists,
  copyDir,
  substituteInTree,
  prompt,
  print,
  printError,
  readJson,
  writeJson,
} = require('./utils');

async function collectVars(flags) {
  const vars = { ...DEFAULT_VARS, ...(flags.var || {}) };
  if (flags.yes) return vars;

  print('Configure project placeholders (press Enter to accept defaults):\n');
  vars.PROJECT_NAME = await prompt('Project name', vars.PROJECT_NAME);
  vars.BACKEND_DIR = await prompt('Backend directory', vars.BACKEND_DIR);
  vars.FRONTEND_DIR = await prompt('Frontend directory', vars.FRONTEND_DIR);
  vars.PROD_URL = await prompt('Production API URL', vars.PROD_URL);
  vars.HEALTH_URL = await prompt('Health check URL', vars.HEALTH_URL);
  vars.LOCAL_PORT = await prompt('Local API port', vars.LOCAL_PORT);
  return vars;
}

function parseAgentFilter(flags) {
  if (!flags.agents) return [...ALWAYS_INSTALL, ...DEFAULT_TEAM_AGENTS];
  const requested = String(flags.agents)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const set = new Set([...ALWAYS_INSTALL, ...requested]);
  return [...set];
}

function pruneUnselectedAgents(cursorDest, selectedIds) {
  const selected = new Set(selectedIds);
  const agentsDir = path.join(cursorDest, 'agents');
  const skillsDir = path.join(cursorDest, 'skills');

  if (exists(agentsDir)) {
    for (const entry of fs.readdirSync(agentsDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      if (entry.name === '_agent-template') continue;
      if (!selected.has(entry.name)) {
        fs.rmSync(path.join(agentsDir, entry.name), { recursive: true, force: true });
      }
    }
  }

  if (exists(skillsDir)) {
    for (const entry of fs.readdirSync(skillsDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      if (!entry.name.endsWith('-agent')) continue;
      const agentId = entry.name.replace(/-agent$/, '');
      if (!selected.has(agentId)) {
        fs.rmSync(path.join(skillsDir, entry.name), { recursive: true, force: true });
      }
    }
  }

  const agentsJsonPath = path.join(agentsDir, 'agents.json');
  if (exists(agentsJsonPath)) {
    const manifest = readJson(agentsJsonPath);
    manifest.agents = (manifest.agents || []).filter((a) => selected.has(a.id));
    writeJson(agentsJsonPath, manifest);
  }
}

async function initCommand(targetDir, flags = {}) {
  const destRoot = path.resolve(targetDir || process.cwd());
  const cursorDest = path.join(destRoot, '.cursor');
  const templateSrc = templateCursorPath();

  if (!exists(templateSrc)) {
    throw new Error(`Template not found at ${templateSrc}`);
  }

  if (exists(cursorDest) && !flags.force) {
    throw new Error(
      `.cursor/ already exists at ${cursorDest}. Re-run with --force to overwrite, or remove it first.`,
    );
  }

  const selectedIds = parseAgentFilter(flags);
  const vars = await collectVars(flags);

  print(`\nInstalling cursor-agent-kit into ${destRoot}`);
  print(`Agents: ${selectedIds.join(', ')}`);

  if (exists(cursorDest) && flags.force) {
    fs.rmSync(cursorDest, { recursive: true, force: true });
  }

  ensureDir(destRoot);
  copyDir(templateSrc, cursorDest);
  pruneUnselectedAgents(cursorDest, selectedIds);
  substituteInTree(cursorDest, vars);

  const overviewExample = path.join(cursorDest, 'rules', 'project-overview.mdc.example');
  const overviewDest = path.join(cursorDest, 'rules', 'project-overview.mdc');
  if (exists(overviewExample) && !exists(overviewDest)) {
    fs.copyFileSync(overviewExample, overviewDest);
  }

  print('\nDone.');
  print(`  Project: ${vars.PROJECT_NAME}`);
  print(`  Backend: ${vars.BACKEND_DIR}/`);
  print(`  Frontend: ${vars.FRONTEND_DIR}/`);
  print('\nNext steps:');
  print('  1. Open this folder as your Cursor workspace root');
  print('  2. Edit .cursor/rules/project-overview.mdc for your stack');
  print('  3. Start a chat with @router-agent and describe a task');
  print('  4. Add agents later: npx cursor-agent-kit add-agent <id>');
}

module.exports = { initCommand };
