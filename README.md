# Hi, I'm Nolin

Full-stack engineer, 15 years across enterprise web, mobile, and cloud — now building
production machine learning and LLM systems.

Most of my work lives in private org repositories. This account is where the open source is.

---

## Why these exist

I'd wanted to publish open source for years and never had the time for it. So the lack of time
became the experiment: can an LLM get me to a bar I'd actually sign my name to, without taking
anything away from primary work?

It's still running, and it runs in the open. The code is public and it was built with an LLM —
I'm not hiding that, and I'm not selling it either. AI slop is real. The variable isn't the
tool, it's whether the approach is competent and whether the bar is mechanical: coverage floors,
accessibility gates, payload budgets, and visual baselines run in CI. Generated code clears the
same standard as hand-written or it doesn't merge. Nothing ships on my judgment being sharp
that day.

The other half is that users don't grade your code. They grade whether the thing works for
them. So the scoreboard is downloads — 75,000 to over 100,000 in roughly sixty days, all of it
inside a year.

That's where the experiment stands.

---

## Limited Edition Dev Tools · 97,000+ downloads

**[letools.dev](https://letools.dev)** — 16 built, 10 published to Open VSX and the VS Code
Marketplace, all 10 on the official **Model Context Protocol registry** so agents get the same
interface editors do. Counts come from the registries' own APIs, not from me.

Local, deterministic, exit codes as the API.

| | |
|---|---|
| `envsync-le` | spot missing keys across your `.env` files, with a markdown report |
| `secrets-le` | detect and sanitize credentials locally, before you commit |
| `regex-le` | find, test, and validate regular expressions with ReDoS screening |
| `scrape-le` | check whether a page is scrapeable before you write the scraper |
| `string-le` | extract string values for i18n from JSON, YAML, CSV, TOML, INI, `.env` |
| `numbers-le` | extract numeric values from JSON, YAML, CSV, TOML, INI, `.env` |
| `dates-le` | extract and analyze dates from logs, configs, and code |
| `paths-le` | extract file paths from JS/TS imports, JSON, HTML, CSS, TOML, CSV, `.env` |
| `urls-le` | extract URLs from documentation, configs, and code |
| `colors-le` | extract and analyze colors from CSS, SCSS, LESS, Stylus, HTML, JS/TS, SVG |

Six more ship the Rust crate first, extension to follow: `i18n-le`, `ids-le`, `ips-le`,
`unicode-le`, `units-le`, `versions-le`.

---

## pixelcoords · pixelactions

Two halves of one idea, in Rust, MIT: **coordinates a computer-use agent can trust, because a
human marked them.**

**[pixelcoords](https://pixelcoords.dev)** freezes the screen, lets you mark regions with real
shapes, and returns pixel-exact targets as versioned JSON — labeled crops, click code,
verification with exit codes, self-healing relocation when the UI moves.

**[pixelactions](https://pixelactions.dev)** is the execution half: click, type, chord, drag,
scroll at those coordinates, then confirm the interaction landed. Chained CLI, flow files, or a
line protocol any language can drive.

Built for driving desktop applications that never shipped an API — UI verification, accessibility
auditing, and agent computer-use, where a guessed coordinate is a failed run. It cannot act on a
coordinate a person did not verify first. That constraint is the point.

---

## Background

Fifteen years across automotive, finance, defense, healthcare, and agriculture — General Motors,
JPMorgan Chase, L3Harris, T. Rowe Price, Nutrien Ag Solutions, RumbleOn, Integrated Auction
Solutions, Brierley + Partners, Kofile Technologies.

Currently Lead AI Engineer at OffensiveEdge, building an end-to-end machine learning platform
and the LLM product on top of it — training and serving, a ReAct agent harness with tool-calling
and hybrid retrieval, and a public prediction ledger anchored to Bitcoin via OpenTimestamps and
to the Sigstore Rekor transparency log. That work is private; the ledger and its verifier are not.

Earlier: lead developer on the first multilingual EMS communication platform — Texas Fire Chief's
Lone Star Achievement Award, EMS World Top Innovation Award, a patent, acquired by ESO Solutions.
And ADA / WCAG / Section 508 remediation at Fortune 500 scale, which is why axe runs on every
page of my open source, in both themes, in CI.

**Stack** — Python · PyTorch · TypeScript · Rust · React · React Native · Next.js · Node.js ·
Bun · GraphQL · PostgreSQL · Redis · AWS · Docker · Kubernetes · Terraform · LLM · RAG · MCP ·
agentic systems · MLOps

---

## Contact

[nolindnaidoo.com](https://nolindnaidoo.com) · LinkedIn is the fastest way to reach me.
