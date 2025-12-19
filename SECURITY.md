# Security Policy

## Supported scope
- The `main` branch and GitHub Pages deployment for the SMCM MSL static site.
- Static assets under `/assets`, `/pages`, `/docs`, and `/altius/` (agent workspace). The agent folder is intended for local use only and is not served by GitHub Pages.
- There is no production backend or database in this repo; vulnerabilities will generally involve misconfigurations, exposed secrets, or insecure client-side code.

## Reporting a vulnerability
Please report potential security issues privately:
- **Primary contact:** nate.alvarado18@outlook.com
- Include a clear description, reproduction steps, affected URLs/files, and any known impact.

We are a student-run project; acknowledged reports will be triaged as quickly as possible.

## Handling & expectations
- Confirmed issues affecting `main` or the production Pages site will be patched in a timely manner and released through the normal deploy pipeline.
- Because this is a static site, mitigation often means removing sensitive content, adjusting client-side logic, or updating GitHub configuration.
- Please avoid publicly disclosing issues until a fix is available.
