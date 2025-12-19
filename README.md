# SMCM Maryland Student Legislature Website

This repository powers the **Maryland Student Legislature – St. Mary’s College of Maryland Chapter** site, hosted on GitHub Pages. It is a static, front-end–only project built with HTML, CSS, and vanilla JavaScript.

## Purpose
- Share chapter information, resources, and events for students.
- Host lightweight interactive content (games, bill builders, forms) without requiring a backend.
- Publish documents (constitution, bylaws, handouts) in an easily accessible place.

## Run the site locally
1. Install dependencies (Node 18+):
   ```bash
   npm ci
   ```
2. Start the dev server with live reload:
   ```bash
   npm start
   # opens http://localhost:5173
   ```
3. Optional checks:
   ```bash
   npm run lint:js
   npm run lint:css
   npm run format
   ```

## Deploy
- Production is published from the `main` branch via GitHub Pages.
- The existing Pages workflow builds the static files and serves them from the root of the repository.
- For preview builds, create a branch and open a PR; the CI workflow will generate a temporary `gh-pages` preview.

## Repository layout
- `index.html` and `/pages/` — primary site content.
- `assets/` — shared CSS, JS, and images.
- `docs/` — downloadable PDFs linked from the site.
- `scripts/` and `cypress/` — tooling for CI/linting and any UI tests.
- `/altius/` — local-only agent workspace (not deployed to GitHub Pages). See [altius/README.md](altius/README.md).

## Disclaimers
- This site is student-run and not an official publication of St. Mary’s College of Maryland or the State of Maryland.
- No backend is deployed on GitHub Pages; interactive features rely on client-side code only.
- Do not commit secrets, API keys, or personally identifiable information.

## Contributing
Contributions should preserve accessibility, keep navigation consistent across pages, and avoid adding server-side dependencies. Please run the linters/formatters above before opening a PR.
