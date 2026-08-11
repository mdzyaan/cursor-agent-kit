#!/usr/bin/env node
'use strict';

const { parseArgs, print, printError } = require('../lib/utils');
const { initCommand } = require('../lib/init');
const { addAgentCommand } = require('../lib/addAgent');
const { removeAgentCommand } = require('../lib/removeAgent');
const { listAgentsCommand } = require('../lib/listAgents');

const USAGE = `
cursor-agent-kit — multi-agent orchestration for Cursor IDE

Usage:
  npx cursor-agent-kit init [targetDir] [options]
  npx cursor-agent-kit add-agent <id> [options]
  npx cursor-agent-kit remove-agent <id>
  npx cursor-agent-kit list-agents
  npx cursor-agent-kit --help

init options:
  --yes                 Use defaults without prompts
  --force               Overwrite an existing .cursor/ directory
  --agents a,b,c        Install only these team agents (router always included)
                        Default: master,backend,frontend,devops
  --var KEY=value       Set a placeholder (repeatable)
                        Keys: PROJECT_NAME, BACKEND_DIR, FRONTEND_DIR,
                              HEALTH_URL, PROD_URL, LOCAL_PORT

add-agent options:
  --name "Display Name"
  --desc "One-line description"
  --owns "path/glob"
  --prefix D-XX         Decision ID prefix (default derived from id)

Examples:
  npx cursor-agent-kit init
  npx cursor-agent-kit init ./my-app --yes --var PROJECT_NAME=Acme
  npx cursor-agent-kit add-agent qa --name "QA" --owns "tests/**"
  npx cursor-agent-kit list-agents
`.trim();

async function main() {
  const argv = process.argv.slice(2);
  const args = parseArgs(argv);

  if (args.flags.help || args._[0] === 'help' || args._.length === 0) {
    print(USAGE);
    if (args._.length === 0 && !args.flags.help) process.exitCode = 0;
    return;
  }

  const command = args._[0];

  try {
    switch (command) {
      case 'init': {
        const target = args._[1];
        await initCommand(target, args.flags);
        break;
      }
      case 'add-agent': {
        const id = args._[1];
        await addAgentCommand(id, args.flags);
        break;
      }
      case 'remove-agent': {
        const id = args._[1];
        await removeAgentCommand(id, args.flags);
        break;
      }
      case 'list-agents': {
        await listAgentsCommand(args.flags);
        break;
      }
      default:
        printError(`Unknown command: ${command}\n`);
        print(USAGE);
        process.exitCode = 1;
    }
  } catch (err) {
    printError(`Error: ${err.message}`);
    process.exitCode = 1;
  }
}

main();
