'use strict';

const fs = require('node:fs');
const path = require('node:path');
const {
  templateCursorPath,
  ensureDir,
  exists,
  readJson,
  writeJson,
  substituteTokens,
  requireProjectRoot,
  agentsJsonPath,
  print,
} = require('./utils');

function titleCase(id) {
  return id
    .split(/[-_]/)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
}

function decisionPrefix(id) {
  const letters = id.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 2) || 'XX';
  return `D-${letters}`;
}

async function addAgentCommand(agentId, flags = {}) {
  if (!agentId || !/^[a-z][a-z0-9_-]*$/i.test(agentId)) {
    throw new Error('Agent id required: lowercase letters, numbers, hyphen/underscore (e.g. qa, product).');
  }

  const id = agentId.toLowerCase();
  if (id === 'router') {
    throw new Error('Cannot add another router agent — only one Router is supported.');
  }

  const projectRoot = requireProjectRoot(flags.cwd || process.cwd());
  const manifestPath = agentsJsonPath(projectRoot);
  const manifest = readJson(manifestPath);

  if ((manifest.agents || []).some((a) => a.id === id)) {
    throw new Error(`Agent "${id}" already exists in agents.json`);
  }

  const name = flags.name || titleCase(id);
  const description = flags.desc || flags.description || `${name} specialist`;
  const owns = flags.owns || `${id}/**`;
  const prefix = flags.prefix || decisionPrefix(id);
  const projectName = manifest.projectName || 'My Project';

  const vars = {
    AGENT_ID: id,
    AGENT_NAME: name,
    DESCRIPTION: description,
    OWNS: owns,
    DECISION_PREFIX: prefix,
    PROJECT_NAME: projectName,
  };

  const tmplDir = path.join(templateCursorPath(), 'agents', '_agent-template');
  const agentDir = path.join(projectRoot, '.cursor', 'agents', id);
  const skillDir = path.join(projectRoot, '.cursor', 'skills', `${id}-agent`);

  if (exists(agentDir)) {
    throw new Error(`Directory already exists: ${agentDir}`);
  }

  ensureDir(agentDir);
  ensureDir(skillDir);

  const roleTmpl = fs.readFileSync(path.join(tmplDir, 'ROLE.md.tmpl'), 'utf8');
  const stateTmpl = fs.readFileSync(path.join(tmplDir, 'STATE.md.tmpl'), 'utf8');
  const skillTmpl = fs.readFileSync(path.join(tmplDir, 'SKILL.md.tmpl'), 'utf8');

  fs.writeFileSync(path.join(agentDir, 'ROLE.md'), substituteTokens(roleTmpl, vars), 'utf8');
  fs.writeFileSync(path.join(agentDir, 'STATE.md'), substituteTokens(stateTmpl, vars), 'utf8');
  fs.writeFileSync(path.join(skillDir, 'SKILL.md'), substituteTokens(skillTmpl, vars), 'utf8');

  manifest.agents = manifest.agents || [];
  manifest.agents.push({
    id,
    name,
    tag: `@${id}-agent`,
    owns,
    description,
    outsideTeam: false,
    decisionPrefix: prefix,
  });
  writeJson(manifestPath, manifest);

  print(`Added agent "${name}" (${id})`);
  print(`  ROLE:  .cursor/agents/${id}/ROLE.md`);
  print(`  STATE: .cursor/agents/${id}/STATE.md`);
  print(`  Skill: .cursor/skills/${id}-agent/SKILL.md`);
  print('\nManual follow-up (markdown tables are not auto-edited):');
  print(`  1. Add a row for ${name} in .cursor/agents/router/ROLE.md routing decision tree`);
  print(`  2. Add ${name} to .cursor/agents/master/ROLE.md Interactions table`);
  print(`  3. Mention ${name} in .cursor/agents/WORKFLOW.md if it joins the feature pipeline`);
}

module.exports = { addAgentCommand };
