'use strict';

const {
  readJson,
  requireProjectRoot,
  agentsJsonPath,
  print,
} = require('./utils');

async function listAgentsCommand(flags = {}) {
  const projectRoot = requireProjectRoot(flags.cwd || process.cwd());
  const manifest = readJson(agentsJsonPath(projectRoot));

  print(`Project: ${manifest.projectName || '(unnamed)'}`);
  print(`Root:    ${projectRoot}`);
  print('');

  const agents = manifest.agents || [];
  if (agents.length === 0) {
    print('No agents installed.');
    return;
  }

  const rows = agents.map((a) => ({
    id: a.id,
    name: a.name,
    tag: a.tag,
    owns: a.owns || '—',
    team: a.outsideTeam ? 'outside' : 'team',
  }));

  const widths = {
    id: Math.max(2, ...rows.map((r) => r.id.length)),
    name: Math.max(4, ...rows.map((r) => r.name.length)),
    tag: Math.max(3, ...rows.map((r) => r.tag.length)),
    owns: Math.max(4, ...rows.map((r) => String(r.owns).length)),
    team: Math.max(4, ...rows.map((r) => r.team.length)),
  };

  const header = `${'ID'.padEnd(widths.id)}  ${'NAME'.padEnd(widths.name)}  ${'TAG'.padEnd(widths.tag)}  ${'OWNS'.padEnd(widths.owns)}  ${'TEAM'.padEnd(widths.team)}`;
  print(header);
  print('-'.repeat(header.length));
  for (const r of rows) {
    print(
      `${r.id.padEnd(widths.id)}  ${r.name.padEnd(widths.name)}  ${r.tag.padEnd(widths.tag)}  ${String(r.owns).padEnd(widths.owns)}  ${r.team.padEnd(widths.team)}`,
    );
  }
}

module.exports = { listAgentsCommand };
