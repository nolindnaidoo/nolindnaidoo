# Changelog

Notable changes to the site. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Vendored **Geist Variable** (latin subset, 26 KB, full 100–900 axis) as the
  display face, preloaded alongside JetBrains Mono. The page previously used a
  system stack, so its oversized type rendered as SF Pro on macOS and Segoe UI
  elsewhere — materially different pages for different readers.
- `static/og.png`, rendered from the site's own hero by Playwright. The document
  declared `twitter:card: summary_large_image` with no image, so every share
  rendered as a bare link.
- Styled 404 page carrying `noindex`.
- `robots.txt` and a generated `sitemap.xml` deriving from the canonical origin.
- Security headers in `vercel.json` — CSP, `Referrer-Policy`,
  `X-Content-Type-Options`, `Permissions-Policy`, COOP, immutable font caching.
- **Payload budgets** (`bun run budget`) per asset class, enforced in CI.
- **Content drift check** (`bun run verify:content`) comparing countable claims
  against the sources that own them.
- v8 coverage with thresholds at 95/95/90/95 over the pure modules.
- Visual-regression baselines for the hero and the record.
- Landmark regions, a skip link that genuinely moves focus, `prefers-contrast`
  support, and keyboard-reachability coverage for every link.

### Fixed

- `format('woff2-variations')` is not a recognised format string, so the display
  face never loaded and the page silently fell back to a system font.
- `commit-lint` aborted when GitHub sent an unreachable base SHA after a force
  push, failing CI on a repository whose commits were all valid.
- `adapter-static` was passed options identical to its defaults, which opts out
  of Vercel zero-config and broke the deploy after a green build.
- Decorative `↗` and `→` glyphs lived in content strings and were announced as
  part of link names by screen readers.

[Unreleased]: https://github.com/nolindnaidoo/nolindnaidoo/commits/main
