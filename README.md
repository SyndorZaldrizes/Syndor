```markdown
# Syndor (MSL) Website — Final README

This repository is a lightweight, GitHub-first scaffold for the MSL website. It includes:
- Static site (index.html, styles.css, script.js)
- Developer tooling: ESLint, Stylelint, Prettier
- Pre-commit hooks: Husky + lint-staged
- Automated CI: lint & formatting checks on push / PR
- PR automation: runs pa11y (a11y), Lighthouse (with thresholds), Cypress E2E tests and produces a preview site under `gh-pages/pr-<PR_NUMBER>/`
- GitHub Pages workflow to publish from `main` → production (via Pages)

If you replaced an older README: great — if you want the original back, a backup file may exist at `README.md.bak`. Check with:
```bash
ls -la README.md.bak || true
```

Quick start — local (recommended)
1. Install dependencies
```bash
npm ci
```

2. Enable Husky hooks (run once)
```bash
npm run prepare
```

3. Start the dev server (live reload)
```bash
npm start
# opens http://localhost:5173
```

Common local commands
- Lint JS:
  npm run lint:js
- Lint CSS:
  npm run lint:css
- Format project:
  npm run format
- Check Prettier formatting:
  npm run check:format
- Run Lighthouse check (requires server running):
  npm run test:lh
- Run Cypress (headless; requires server running):
  npm run test:cypress
- Quick accessibility smoke test (pa11y; requires server running):
  npx pa11y http://127.0.0.1:5173 || true

Files & layout
- Root:
  - index.html, styles.css, script.js
  - package.json, .eslintrc.cjs, .prettierrc, .stylelintrc.cjs, .lintstagedrc
  - README.md (this file), .gitignore
- scripts/
  - run-lighthouse-check.js
- cypress/
  - cypress/e2e/*.cy.js
- Husky hooks:
  - .husky/pre-commit (executable file)
- GitHub workflows:
  - .github/workflows/ci.yml
  - .github/workflows/pr-preview.yml
  - .github/workflows/pages.yml
  - .github/workflows/cleanup-previews.yml

PR previews & GitHub Actions
- When a PR is opened against `main`, the `pr-preview` workflow:
  - Installs dependencies and runs a local static server on the runner
  - Runs pa11y (a11y smoke test), Lighthouse (JSON + HTML), and Cypress tests
  - Uploads artifacts (Lighthouse / pa11y / Cypress logs)
  - Copies the site into the `gh-pages` branch under `pr-<PR_NUMBER>/` and posts a comment on the PR with the preview URL:
    `https://<owner>.github.io/<repo>/pr-<PR_NUMBER>/`
- For that preview URL pattern to be publicly viewable, in your repository Settings → Pages set the source to the `gh-pages` branch (root).

Important notes / gotchas
- Fork PRs: GitHub disallows write access with the runner `GITHUB_TOKEN` for PRs from external forks. Preview-pushes to `gh-pages` will fail for fork PRs. Workarounds:
  - Create branches in this repository (preferred for contributors),
  - A maintainer can re-run the workflow with appropriate permissions, or
  - Use an external preview provider (Netlify / Vercel) for fork previews.
- Husky hooks must be executable. If the pre-commit hook fails locally:
```bash
chmod +x .husky/pre-commit
npm run prepare
```
- If `npm ci` fails on CI or locally, ensure Node version is compatible (the workflows use Node 18).
- Cypress in CI: the workflow uses the runner's default Chrome. If a test fails due to browser issues, run Cypress locally with `npx cypress open` for debugging.

Lighthouse thresholds
- The Lighthouse assertions live in `scripts/run-lighthouse-check.js`. Adjust thresholds there if your real site needs different targets (performance / accessibility / best-practices / seo).

Cleaning up previews
- When a PR is closed, the `cleanup-previews.yml` workflow removes `pr-<PR_NUMBER>/` from the `gh-pages` branch to keep previews tidy.

Best practices for daily work
1. Create a feature branch:
```bash
git checkout -b feat/your-change
```
2. Make changes, run linters & tests locally:
```bash
npm run lint:js
npm run lint:css
npm run format
npm start      # in another shell run tests
npm run test:cypress
```
3. Commit & push:
```bash
git add .
git commit -m "feat: description"
git push -u origin feat/your-change
```
4. Open a PR targeting `main`. The PR workflow will produce a preview and run the checks.

Where to look for CI artifacts & reports
- Go to the PR → Actions run → artifacts section. Download:
  - `lighthouse-report.html`
  - `pa11y-report.html`
  - `cypress/videos` and `cypress/screenshots` (when applicable)
  - `server.log` for server startup/debug logs

If something breaks — quick debugging tips
- Lint or Prettier fails: run `npm run format` and re-run `npm run lint:*`. Fix issues listed by the linters.
- Husky pre-commit blocks a commit: run `npx --no-install lint-staged` to see failing staged tasks.
- PR preview fails pushing to `gh-pages`: check Actions logs — likely a token/permissions issue (fork PR or missing Pages branch).
- Lighthouse job fails with Chrome errors: ensure the runner has Chrome (GitHub-hosted runners do). Re-run the job or run Lighthouse locally.

Next steps you might want me to add (ask for any)
- Set a stricter Lighthouse failure policy or custom thresholds per environment
- Add more Cypress tests (I already included nav tests)
- Auto-clean previews older than X days
- Add a staging branch and publish flow
- Customize site content / branding (logo, colors, copy)

Contact / help
If you want me to:
- Reprint any file contents so you can paste them again,
- Produce a one-line shell script to re-create project files,
- Or walk through a failing CI run, share the Actions run URL and I will help debug.

That's it — this README replaces the original and contains the key commands and notes to run, test, and maintain the site using the in-house GitHub workflows.
```
