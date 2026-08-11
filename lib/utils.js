'use strict';

const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

const PACKAGE_ROOT = path.resolve(__dirname, '..');
const TEMPLATE_CURSOR = path.join(PACKAGE_ROOT, 'template', '.cursor');

const DEFAULT_VARS = {
  PROJECT_NAME: 'My Project',
  BACKEND_DIR: 'backend',
  FRONTEND_DIR: 'frontend',
  HEALTH_URL: 'https://api.example.com/health',
  PROD_URL: 'https://api.example.com',
  LOCAL_PORT: '3000',
};

const DEFAULT_TEAM_AGENTS = ['master', 'backend', 'frontend', 'devops'];
const ALWAYS_INSTALL = ['router'];

function packageRoot() {
  return PACKAGE_ROOT;
}

function templateCursorPath() {
  return TEMPLATE_CURSOR;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function exists(p) {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function copyDir(src, dest, { filter } = {}) {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (filter && !filter(from, entry)) continue;
    if (entry.isDirectory()) {
      copyDir(from, to, { filter });
    } else if (entry.isFile()) {
      ensureDir(path.dirname(to));
      fs.copyFileSync(from, to);
    }
  }
}

function walkFiles(dir, out = []) {
  if (!exists(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, out);
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

function substituteTokens(text, vars) {
  return text.replace(/\{\{\s*([A-Z0-9_]+)\s*\}\}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(vars, key)) return String(vars[key]);
    return match;
  });
}

function substituteInTree(rootDir, vars) {
  for (const file of walkFiles(rootDir)) {
    const original = fs.readFileSync(file, 'utf8');
    const next = substituteTokens(original, vars);
    if (next !== original) fs.writeFileSync(file, next, 'utf8');
  }
}

function parseArgs(argv) {
  const args = { _: [], flags: {} };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--') continue;
    if (token.startsWith('--')) {
      const eq = token.indexOf('=');
      if (eq !== -1) {
        const key = token.slice(2, eq);
        const value = token.slice(eq + 1);
        if (key === 'var') {
          args.flags.var = args.flags.var || {};
          const [k, ...rest] = value.split('=');
          args.flags.var[k] = rest.join('=');
        } else {
          args.flags[key] = value;
        }
      } else {
        const key = token.slice(2);
        const next = argv[i + 1];
        if (key === 'var' && next && !next.startsWith('--')) {
          const [k, ...rest] = next.split('=');
          args.flags.var = args.flags.var || {};
          args.flags.var[k] = rest.join('=');
          i += 1;
        } else if (next && !next.startsWith('--') && key !== 'yes' && key !== 'help') {
          args.flags[key] = next;
          i += 1;
        } else {
          args.flags[key] = true;
        }
      }
    } else {
      args._.push(token);
    }
  }
  return args;
}

async function prompt(question, defaultValue) {
  const rl = readline.createInterface({ input, output });
  try {
    const suffix = defaultValue !== undefined && defaultValue !== '' ? ` [${defaultValue}]` : '';
    const answer = (await rl.question(`${question}${suffix}: `)).trim();
    return answer || defaultValue;
  } finally {
    rl.close();
  }
}

function findProjectRoot(startDir = process.cwd()) {
  let current = path.resolve(startDir);
  while (true) {
    const agentsJson = path.join(current, '.cursor', 'agents', 'agents.json');
    if (exists(agentsJson)) return current;
    const parent = path.dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

function requireProjectRoot(startDir) {
  const root = findProjectRoot(startDir);
  if (!root) {
    throw new Error(
      'No cursor-agent-kit project found. Run `npx cursor-agent-kit init` in your project root first.',
    );
  }
  return root;
}

function agentsJsonPath(projectRoot) {
  return path.join(projectRoot, '.cursor', 'agents', 'agents.json');
}

function print(msg) {
  output.write(`${msg}\n`);
}

function printError(msg) {
  process.stderr.write(`${msg}\n`);
}

module.exports = {
  DEFAULT_VARS,
  DEFAULT_TEAM_AGENTS,
  ALWAYS_INSTALL,
  packageRoot,
  templateCursorPath,
  ensureDir,
  exists,
  readJson,
  writeJson,
  copyDir,
  walkFiles,
  substituteTokens,
  substituteInTree,
  parseArgs,
  prompt,
  findProjectRoot,
  requireProjectRoot,
  agentsJsonPath,
  print,
  printError,
};
