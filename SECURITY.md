# Security

This repository holds a static, prerendered personal site. It has no server
surface, no database, no authentication, and collects nothing from visitors.
The realistic surface is the supply chain and the deploy path, not the page.

## Reporting

Report anything you find privately through GitHub's
[security advisories](https://github.com/nolindnaidoo/nolindnaidoo/security/advisories/new),
or by message on [LinkedIn](https://www.linkedin.com/in/nolindnaidoo/).

Please do not open a public issue — issues are disabled on this repository, and
a public report gives everyone else the finding at the same time as me.

Expect an acknowledgement within a few days. There is no bounty; there is
credit in the changelog if you want it.

## What is in scope

- Dependency or toolchain compromise reachable through this repository
- Anything in the GitHub Actions workflows that could leak a token or allow
  code execution from an untrusted input
- Content injection into the built page

## What is not

- Findings on the deployed platform itself (report those to Vercel)
- Missing headers that are already documented as deliberate in `vercel.json`
- Automated scanner output with no demonstrated impact

## What is already enforced

- Actions are pinned to commit SHAs, never tags
- CodeQL runs on push, pull request, and weekly
- Dependabot covers `bun` and `github-actions`; alerts and automated fixes are on
- Secret scanning and push protection are enabled
- `main` blocks deletion and non-fast-forward pushes
