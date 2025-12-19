# Altius Agent Workspace (Local Only)

This folder is a staging area for an Altius-based agent the team plans to run locally alongside the SMCM MSL site. It is **not** served on GitHub Pages and should stay out of production builds.

## What this folder is for
- Host agent code, prompts, and embeddings that connect to SMCM MSL resources.
- Keep local datasets (indices, vector stores) and experiment scripts in one place.
- Provide a clear separation between the static website and any AI-powered tools.

## Local-only usage
1. Copy your agent code into this folder (do not commit secrets).
2. Duplicate `config.example.json` to `config.json` and fill in local-only values.
3. Create and activate a virtual environment for any Python components.
4. Run the agent locally; expose any webhooks or APIs via tunnels if you need to test them with the site.

## Basic run sketch (placeholder)
- Install dependencies (for example): `python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt`.
- Start the agent or API server (document the command in this README once added).
- Keep indexes/embeddings under a `data/` or `vector_store/` subfolder that is gitignored.

## Connecting to the static site
- Any front-end hooks should be written to call a local endpoint (e.g., `http://localhost:8000`).
- Do not reference these endpoints from the GitHub Pages build; they are for local development only.

## Deployment note
GitHub Pages only serves the static site in `/` and `/pages/`. This `/altius/` directory is not published and should not contain production secrets or credentials.
