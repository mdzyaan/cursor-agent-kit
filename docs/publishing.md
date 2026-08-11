# Publishing (maintainers)

Public npm packages are free. You need a free [npm](https://www.npmjs.com) account.

## One-time setup

```bash
npm login
```

Update `package.json` `repository`, `homepage`, and `bugs` URLs to your real GitHub repo before the first publish.

## Release checklist

1. Bump version:

```bash
npm version patch   # or minor / major
```

2. Confirm pack contents:

```bash
npm pack --dry-run
```

You should see `bin/`, `lib/`, `template/`, `LICENSE`, `README.md` — not `examples/` or personal junk.

3. Publish:

```bash
npm publish --access public
```

4. Tag / release on GitHub to match the version.

## Verify

```bash
npx cursor-agent-kit@latest --help
mkdir /tmp/cak-smoke && cd /tmp/cak-smoke
npx cursor-agent-kit@latest init --yes
```

## Notes

- Package name: `cursor-agent-kit` (confirm still available if publishing under a scope instead).
- Zero runtime dependencies — keep it that way unless there is a strong reason.
- Do not commit npm tokens. Use `npm login` locally or CI secrets for automation later.
