import type { CaseStudy } from './types';

/**
 * The long version of the work — the connective narrative plus one page per
 * study.
 *
 * `intro` is told as a story rather than stated as a thesis, and it is the only
 * place the through-line appears in full: input, action, record and method are
 * four layers of the same problem, which is that a long chain fails silently
 * and nothing tells you which link went wrong. Each study restates that
 * compressed in its own `standfirst`, because a reader arriving from a link
 * never sees this page.
 *
 * A study is added here when its prose is finished, never as a placeholder —
 * the index renders what exists, and an entry linking to a page that isn't
 * written is the failure this whole section argues against.
 *
 * It used to say one study per *shipped* record. `model-zero` is the deliberate
 * exception: the product is half built and the study says which half, in the
 * same words its own specification uses. The rule that replaced it is that a
 * study about unfinished work states what is unfinished inside itself, rather
 * than leaving a reader to find out by trying to use the thing.
 */
export const intro: readonly string[] = Object.freeze([
	'I spent fifteen years building things for other people. Banks, defense, automotive retail, healthcare, state records. Some of it was first of its kind, some of it won awards, and one of it was acquired.',
	'Almost none of it can be shown to you.',
	'You can confirm a bank shipped a single-page application in 2014. You cannot read the code, see what I argued for and lost, or watch what happened the week before it went live. That is the trade every senior engineer makes: the more the environment mattered, the less of the work can ever leave it.',
	'I had wanted to write open source that entire time and never found anything reasonable enough to build. Not a shortage of ideas — a shortage of problems I actually had, repeatedly, and understood well enough to solve properly. Libraries written for problems you have merely read about come out looking right and being useless.',
	'Then I went and learned the machine-learning side properly, started building my own models, and discovered that most of the job isn’t modeling.',
	'It is data. Arriving from scraped pages and from APIs, in every format there is, none of them agreeing. Pieces of the same record living in different sources under different names, needing to be merged, labeled, and passed up through the pipeline in a form the next stage can trust. Every value point-in-time accurate — as it faithfully stood then, not as it reads now. The opposite side derived when only one side exists. A growing case space deciding whether a datum is usable at all.',
	'So many pieces have to pass through that chain, and each must be correct at all times, because one mistake anywhere degrades the model.',
	'And nothing tells you. That’s the part that reorganized how I build. If a future value leaks backward into training, the model doesn’t get worse — it gets better. Accuracy climbs. The backtest improves. Every number moves the way you were hoping. Nothing fails, nothing alerts, and everything built on top of that measurement is resting on nothing.',
	'That was the problem I had been waiting for, and everything since has been the same problem at a different layer.',
	'The tools came out of that. Every one of them is a thing I needed twice in a week and got tired of doing by hand — checking whether a page could be scraped before writing the scraper, pulling values out of formats that had no interest in cooperating, finding the key missing from one environment file before a deploy went out. I published them because they were already written, and they found an audience I did not have and never asked for. Sixteen models now cover six sports year-round as their seasons rotate, retrained weekly at minimum in season, behind the same discipline: if a stage cannot say whether it worked, it does not ship.',
	'Then I hit the version of it that scared me. A prediction record is worthless if the person who published it can edit it afterward, and I could not prove I had not. Not because I would lie — because a schema migration does not feel like lying, and from the outside the two are identical. So I built a ledger that commits each day into Bitcoin and into a public transparency log, neither of which I can reach.',
	'Six weeks in, a schema migration rewrote an anchor that was already published. I broke my own append-only rule, and that day’s Bitcoin proof can never be made to bind again. The record says so, permanently, because a rule that bends when it’s inconvenient for its author isn’t a rule.',
	'The worse finding was underneath it. The verifier’s offline mode had never checked the binding it laid its output out as though it were checking. The one piece of software whose entire job was to catch me was reporting a pass on a test it was not running. That is what the rebuild is designed around — not the broken rule, but the tool that failed to notice.',
	'The tools are becoming Rust command-line binaries now, for the reason everything else here happened: a pipeline cannot click a menu, and the consumer that matters next isn’t a person.',
	'I have never written about any of this publicly. That was deliberate — I wanted the work standing on its own before I said anything about it. This is the long version.',
]);

/**
 * The home page's one-paragraph frame for the studies. Each clause is one of
 * them, in the order they are rendered — the confident wrong answer is the
 * tools piece, the lost zeros are Model Zero, the leak is the validation piece,
 * the edited record is the ledger — so the rows below read as the evidence for
 * the sentence rather than as a menu. A study added here needs a clause.
 */
export const lede =
	'A tool answers confidently with the wrong number and the pipeline stays green. A column loses its leading zeros on the way in and no later step recovers them. A value that was never knowable leaks into a model and accuracy climbs. A published record gets edited and looks identical from the outside. Nothing fails, nothing alerts, and everything built on top of it is resting on nothing. Four write-ups, one problem at four layers, and what I built so each of them has something that catches it.';

export const caseStudies: readonly CaseStudy[] = Object.freeze([
	Object.freeze({
		slug: 'le-tools',
		title: 'Less magic, more factory',
		// No install figure here on purpose. The count lives in `ledger` and
		// `projects`, which `check-content-drift` reads and verifies against the
		// registries; restating it in a third place would put a number on the site
		// that no gate is watching.
		annotation:
			'Sixteen tools that came out of a data pipeline I could not take on trust, grown with no launch and no marketing. A year of building them with a model, the rewrite that threw the first version away, and the honest accounting of what the Rust port costs me.',
		standfirst:
			'Sixteen developer tools, grown entirely by word of mouth. They exist because I was training my own models and the data kept being wrong in ways nothing told me about. What follows is the whole build, including the parts that went badly.',
		sections: Object.freeze([
			Object.freeze({
				heading: 'The chain',
				paragraphs: Object.freeze([
					'I was building models. Most of that work wasn’t modeling.',
					'The data arrived from wherever it arrived — some scraped, some through APIs, none of it agreeing on shape. JSON, YAML, CSV, TOML, INI, .env. Pieces of the same record living in different sources under different names, needing to be merged, labeled, and passed up through the pipeline in a form the next stage could trust.',
					'Underneath that sat the requirements that actually made it hard. Every value had to be point-in-time accurate — the data as it factually stood at that moment, not as it reads today. When only one side of a pair existed, the opposite had to be derived rather than assumed. A large and growing case space decided whether a given datum was usable at all, and that space grew every time a source changed its mind. And the whole pipeline needed end-to-end auditing, with features checked as they went into the model and as they came back out.',
					'So many pieces have to pass up through the chain, and all of them have to be correct at all times. One mistake anywhere degrades the model.',
					'That sentence sounds like perfectionism. It isn’t.',
				]),
			}),
			Object.freeze({
				heading: 'What silent failure looks like',
				paragraphs: Object.freeze([
					'Take point-in-time accuracy, because it is the clearest case.',
					'If a value leaks backward — if the pipeline hands the model something that wasn’t knowable at the timestamp attached to it — the model doesn’t get worse. It gets better. Accuracy climbs. The backtest improves. Every number you’re looking at moves in the direction you were hoping for.',
					'Nothing fails. Nothing alerts. The pipeline runs green.',
					'You find out much later, if you find out at all, and everything built on that measurement rests on nothing.',
					'That’s the shape of every serious failure in this kind of work. A mislabeled field merges cleanly. A silently truncated parse returns a number. A source switches from YYYY-MM-DD to MM/DD/YYYY without telling anyone and every row still parses — the third of March quietly becomes the first of March, and the file stays internally consistent the whole way down.',
					'None of those trip an alert, because nothing about them looks like an error. They look like data.',
					'This is why my tools stop and tell you what they need, rather than guessing. A tool that answers confidently and wrongly is worse than one that refuses, because a refusal costs you ten minutes and a confident wrong answer costs you everything downstream of it.',
				]),
			}),
			Object.freeze({
				heading: 'Why I built them',
				paragraphs: Object.freeze([
					'I had wanted to write open-source software for years but never found anything worth building. Not a shortage of ideas — a shortage of problems I actually had, repeatedly, that I understood well enough to solve properly. Writing a library for a problem you have read about produces a library that looks right.',
					'The data work gave me the problem. Same operations, every day, across every format, between every pair of sources. The goal was blunt: mangle any data source, for any reason, with speed. Get a value out of whatever it is trapped in, see what is actually there, find the drift between two things that are supposed to agree.',
					'Sixteen tools is what it looks like from the outside. From the inside, it is one capability with sixteen entry points.',
					'The shape was also the argument. Every one does a single job, runs locally, returns the same answer twice, and reports through an exit code — which is the same shape a job has to have before an agent can be trusted to run it unattended. That is the bet: not one long autonomous session that impresses in a demo, but many short jobs with hard edges that a person or a model can call and verify. A node in an orchestration graph is only worth as much as the job sitting inside it — fan-out and join are easy to draw and worth nothing over steps that cannot say whether they worked, and that is the half people skip. Publishing them to the Model Context Protocol registry cost almost nothing precisely because they were already built that way.',
				]),
			}),
			Object.freeze({
				heading: 'The shape of the suite is the shape of the job',
				paragraphs: Object.freeze([
					'I wasn’t only training models. The span was the whole stack — the brand, every document, the websites, the backend, the APIs, the data modeling, secure transport, the market data integration, and the parsing of disparate sources into feeds anything could consume. It ended at sixteen models on one pipeline.',
					'That span explains the suite better than any feature list. Six of the first ten came out of the ingestion chain — checking whether a page could be scraped before writing the scraper, extracting strings, numbers, dates, paths, and URLs from formats that had no interest in cooperating. The other four came from everything surrounding it: keeping credentials out of commits, finding the missing key across environment files before a deploy, testing a regular expression before it went somewhere it could hang, and auditing color across a brand I also owned.',
					'Nobody else was going to catch a mistake in any of it, which is why each one is built to fail loudly rather than quietly. A tool that silently does the wrong thing costs more than no tool at all — so every one of them exits non-zero when it should, and says why.',
				]),
			}),
			Object.freeze({
				heading: 'Making them survive an enterprise',
				paragraphs: Object.freeze([
					'Getting a tool adopted inside a real company is a different problem from getting it downloaded.',
					'The rule I settled on is that none of them touch the network. Not for updates, not for telemetry, not for a convenient lookup. Your data stays on your machine because there is no path for it to leave.',
					'That sounds like a privacy stance. It’s really a procurement one. A tool that makes a request is a tool somebody has to review, approve, and then re-review the next time it changes. A tool that cannot make a request is a much shorter conversation, and inside a company that conversation is the entire difference between useful and installed.',
					'The same instinct shows up in the smaller decisions. paths-le resolves symlinks and canonicalizes paths rather than reporting whatever string it was handed — because a path that looks right but points somewhere else is exactly the silent-failure shape I keep describing, and in a monorepo behind a build system, it is routine rather than exotic.',
				]),
			}),
			Object.freeze({
				heading: 'Sixteen repositories and no shared library',
				paragraphs: Object.freeze([
					'Sixteen tools that share a shape have an obvious home: one repository, one core package, sixteen thin wrappers. I went the other way. Sixteen separate repositories, each carrying its own copy of the pieces they have in common.',
					'The reason is the person installing one. A shared core means every tool ships the union of what all sixteen need, and you take a dependency on machinery your tool never calls. Kept separate, each one carries only its own code, updates on its own schedule, and can be installed, pinned, or removed without touching the other fifteen. Nothing is forced on you because something else needed it.',
					'That choice has a real cost and it is the one the rest of this page keeps warning about: duplication drifts. Two copies of the same extraction rule stay identical only until somebody fixes one of them.',
					'So the line is drawn at the repository boundary rather than pretended away. Inside a repo, define it once — duplicate regexes and duplicate scheme checks have each already shipped as a bug there. Across repos, copy, and pay for the copy with gates that fail when the copies disagree. The duplication is a decision I have to fund, not a shortcut I got away with.',
				]),
			}),
			Object.freeze({
				heading: 'The rewrite',
				paragraphs: Object.freeze([
					'The first versions were built with whatever cost nothing. Gemini Flash, free tier, working around the limits. That was the right call for what it was: it got ten tools written and shipped, and shipped is the only state that teaches you anything.',
					'What it produced was ten working tools sitting on a codebase that could not be extended. Layers that had grown rather than been chosen. Tests that confirmed the happy path. Enough structural debt that every new feature cost more than the last one.',
					'So I threw it away and rewrote all of them on Claude Opus 4.5. Not a refactor — a different architecture, adopted deliberately across the family at once, with the previous version left behind rather than migrated.',
					'The dates are the part I would check if somebody told me this. Version 2.0.0 landed across the fleet on 29 July 2026. Between 4 and 16 August the same repos went 2.0.1, 2.1.0, 2.2.1, 2.2.2, 2.2.3, 2.2.4, 2.3.0, 2.3.1. Six more tools were built in that window and never got an extension at all — they were born as Rust crates, because by then that was the shape.',
					'That pace is not a model typing quickly. It is sixteen repositories holding the same architecture on purpose, so a decision gets made once and applied sixteen times, and a gate rather than my attention says whether it landed correctly in all sixteen.',
				]),
			}),
			Object.freeze({
				heading: 'What managing a fleet with a model actually is',
				paragraphs: Object.freeze([
					'Every repository carries the same standard in six files: a canonical one plus byte-identical mirrors for the other assistants, each of which reads a different filename. A test fails when they diverge. One standard, six copies, one check — the same trade as the code, made for the same reason.',
					'The review procedure lives in exactly one place instead of sixteen, because sixteen copies of a checklist drift. Its governing rule is the opposite of what a model is good at: review one tool properly, fix it, then move to the next. Do not sweep a change across the family and fix the fallout afterwards.',
					'The scope of that rule is behaviour, not mechanics. Propagating a config file or rewording a rule in every instruction file is fine to do fleet-wide, because the gates fail on a bad copy. Changing what the code does is not, because a batch produces batch-shaped blind spots and passes every check while doing it.',
					'I know that because it happened. A pass that localized label: properties silently broke seven quick-pick selections in one repo — the labels were translated and the identity comparisons were still testing English literals, so the match simply never fired. It passed typecheck, lint, 210 unit tests and 8 integration tests. A later sweep found 35 unlocalized progress messages across five repos, two of them in a repo that had already been declared finished.',
					'The second rule came out of the same week: do not let your verification share a blind spot with your edit. A fleet-wide renumbering matched only the lines where a number and its keyword appeared together, and was checked with that same filter — so eight files where the phrase wrapped across two lines passed a check that structurally could not see them. Verify with a different query than the one that made the change.',
					'That is the actual skill in working this way, and it is not prompting. It is knowing which changes a machine may make sixteen times unattended, which ones have to be made once and read by a person, and how to build the check that catches the difference.',
				]),
			}),
			Object.freeze({
				heading: 'Why they are becoming Rust',
				paragraphs: Object.freeze([
					'The extensions have a ceiling, and it isn’t performance.',
					'An editor extension needs a person. Someone has to be at the keyboard, in that specific editor, choosing from a menu. That’s the right shape for the work I originally built them for — I was the person at the keyboard, and the interactive version is genuinely better when a human is making the judgment call.',
					'It’s the wrong shape for everything else. A pipeline cannot open a quick-pick. CI cannot click. An agent cannot drive a menu — it runs a command and reads an exit code. Every one of those consumers needs the same capability with a different door, and the door is a binary.',
					'So the cores are being republished as Rust crates with command-line front ends: the same work, callable from CI, a Makefile, an agent, or anything that can run a process. Exit codes are the API. The editor stays because the interactive path is still the better one when an individual is making a decision.',
					'That means two codebases, alone, indefinitely. If installs flatten I will probably retire the editor versions inside a year or two, and I would rather say that now than discover it looks like abandonment later.',
					'That’s the honest arithmetic. I gained a consumer that isn’t a human, and I took on a second codebase to feed forever.',
					'Worth saying plainly: these aren’t meant to be the end of anything. They are enablers. Small tools that unblock the work in front of you and get out of the way — not a platform, not a framework, not something you’re supposed to adopt wholesale.',
				]),
			}),
			Object.freeze({
				heading: 'Two implementations, one answer',
				paragraphs: Object.freeze([
					'Porting to Rust means the same tool now exists twice, in two languages, written months apart. extract_colors is one tool with one schema offered by two different servers, and an agent that reaches either has to get the same answer. That is a contract, so it is checked like one.',
					'Two gates hold it. The first runs both implementations over a shared corpus that lives inside the crate: a multiline rgb() normalised to single spaces, a five-digit hex rejected, a commented-out declaration skipped, a named colour sitting in prose that is not a colour. That pins the cases somebody thought of.',
					'The second generates the cases nobody thought of. It builds documents from a format, a value, a wrapper and a neighbourhood — including multi-byte neighbours, which is exactly where two regex engines disagree without anyone noticing — and requires both servers to answer identically. It is deterministic: the seed prints on every run and reprints on failure, and the failing document is dumped with every non-ASCII character escaped, so it pastes straight into a test.',
					'It exists because of a specific bug. The xml language id ran the markup-HTML extractor in the crate and the markup-SVG one in the extension, so a fill attribute was found by one surface and missed by the other. One hand-written probe eventually found it. The generator would have found it on day one.',
					'What the gates deliberately do not check is the surfaces themselves. The crate walks trees, takes a palette, writes JSON Lines and has exit codes; the extension is editor-first and has none of that. Those divergences are listed in the crate spec by name. Asserting one against the other would manufacture failures out of decisions.',
				]),
			}),
			Object.freeze({
				heading: 'Treating them like enterprise software',
				paragraphs: Object.freeze([
					'Editor extensions do not normally get any of this, and that is a rational choice. Nobody is paying, nobody has an SLA, and English-only with a smoke test is a sensible amount of effort for a side project.',
					'These get it anyway. Twelve translated locales per extension. A coverage table in the README generated from a real run and failed by CI when it drifts from the numbers a fresh run produces. An integration suite that executes inside a real editor host, and an end-to-end test that installs the built artifact into a clean profile — because a passing unit suite has never once proven that a package installs. CodeQL on every push, dependency updates that merge themselves when the gates pass, signed provenance on the published packages, and a separate release pipeline for the crate beside the one for the extension.',
					'The numbers are inspectable rather than asserted. One tool sits at 347 test cases across 24 files, 90.79% statements and 79.43% branches, and those figures are in its README because a script wrote them there from coverage-summary.json and the build fails when they stop matching. The performance table beside it prints the machine, the input sizes and the method, and is deliberately not gated in CI — a benchmark that gates a build only tells you how busy the runner was.',
					'The reason for all of it is not the extensions. Working alone, the thing that decays first is not the ability to write code. It is the habits that only exist because other people depend on you: releasing on a schedule, honouring a deprecation, keeping a changelog somebody reads, shipping a translation you cannot personally proofread, refusing to merge your own broken build at midnight.',
					'So I run these the way I would run software with a team behind it, and the practice is the point. It also produced the thing I did not plan: a fleet small enough to hold in my head and strict enough to be honest, which turns out to be the only environment where you can find out what a model can actually be trusted to do.',
				]),
			}),
			Object.freeze({
				heading: 'This is phase one',
				paragraphs: Object.freeze([
					'The ten manual tools are the first phase of something I have been building deliberately, and I would rather say that out loud than let it look like ten utilities that happened.',
					'The organizing axis is sourcing and auditing — getting data in from wherever it lives and checking it end-to-end afterward. Everything I have shipped so far serves the manual version of that: a person, at a keyboard, working a source over until it is usable.',
					'The Rust and MCP layers make the same capability available to machines, which turns a set of utilities into something a pipeline can be built on. After that come more capable modeling tools under the same name, on the same axis, usable by hand and callable by a system.',
					'I am stating the roadmap because it is a verifiable claim. It can be held against what actually ships.',
				]),
			}),
			Object.freeze({
				heading: 'Check it yourself',
				paragraphs: Object.freeze([
					'Everything above is inspectable. Sixteen repositories with their commit history, CI you can watch run, releases with provenance you can verify, packages on five registries. The download figures come from the registries’ own APIs, not from me, and this site fails its own build when they drift from what it claims.',
					'I would rather you look than take my word for it. That preference is the reason all of this is built the way it is.',
				]),
			}),
		]),
		artifacts: Object.freeze([
			Object.freeze({ label: 'letools.dev', href: 'https://letools.dev' }),
			Object.freeze({
				label: 'Open VSX namespace',
				href: 'https://open-vsx.org/namespace/OffensiveEdge',
			}),
			Object.freeze({ label: 'GitHub', href: 'https://github.com/nolindnaidoo' }),
		]),
	}),
	Object.freeze({
		slug: 'model-zero',
		title: 'Built to refuse',
		annotation:
			'Managed tools hand you a high number on a leaked dataset and call it a result. Model Zero is the answer to that: a data tool designed around refusing to guess, and the honest accounting of which half of it is built.',
		standfirst:
			'A tool that answers confidently with the wrong number is worse than one that stops. This is the product I built on that principle, why the loop it replaces is the reason nobody checks their data, and what is not finished yet.',
		sections: Object.freeze([
			Object.freeze({
				heading: 'The tool told me I was right',
				paragraphs: Object.freeze([
					'A managed AutoML service will read your dataset, fit something cheap, and hand back an accuracy figure. If your data has a leak in it, that figure is high. It is high *because* of the leak, and nothing in the interface says so.',
					'That is not a bug in their code. Their number is correct for what it measured. The problem is that it is presented as a result rather than as a claim that could be wrong, and there is no provenance on the split it was measured against — so a reader has no way to ask the one question that matters, which is whether the thing being measured was knowable at the time it claims to have been known.',
					'It is a tool that lies to you safely. Nothing errors. Nothing warns. You get a good number early, you believe it, and every decision after that rests on it. I have described this failure shape elsewhere on this site at three other layers. This is where it starts, because the data is upstream of all of them.',
					'What made me angry rather than merely careful is that the number arrives at the exact moment a person is least equipped to doubt it — before they have built anything, when the tool is supposed to be telling them whether to bother.',
				]),
			}),
			Object.freeze({
				heading: 'So I built my own',
				paragraphs: Object.freeze([
					'The response was to stop consuming the answer and build the thing that produces it. My own AutoML on AutoGluon, end to end, so that every stage was mine and every failure was mine to find.',
					'That is a slower way to learn the failure modes and it is the only way I trust. A list of data hazards read in an article is a list you can recite. The same list arrived at by shipping a pipeline, getting a number you cannot explain, and tracing it back to a column, is a list you can recognise on sight in somebody else’s file.',
					'Everything in the product that came later is that inventory. Not a survey of what can go wrong with data, which anyone can write. The specific set of things that went wrong for me, in order, with what each one cost to find.',
				]),
			}),
			Object.freeze({
				heading: 'Then the data bit me anyway',
				paragraphs: Object.freeze([
					'Months into running that system, a defect surfaced in the corpus underneath it. The details are written up in another piece here; what matters for this one is what happened next, because that is the part nobody writes about.',
					'Finding it was not the expensive part. Once I suspected the number, the audit took an afternoon. The expensive part was everything after: exclude the affected fields, regenerate historical splits across several seasons, re-run discovery, re-train, re-validate, and then check whether the new number was real or whether I had simply moved the problem.',
					'Hours per turn of that loop, and every turn ran on code I had written for this dataset and no other. I could do it. That is not the same as it being cheap, and it is not remotely the same as somebody else being able to do it.',
				]),
			}),
			Object.freeze({
				heading: 'The loop is why nobody checks',
				paragraphs: Object.freeze([
					'People do not skip data validation because they are careless. They skip it because the loop is slow, and because it is gated behind writing code.',
					'To answer a question as basic as *is this column safe to split on*, you open a notebook, load the file, remember which of six date formats you are looking at, write the check, get an answer, and lose it when the kernel restarts. Ask a second question and repeat. Exploration dies at the point where trying one thing costs an afternoon, and what dies with it is the habit of trying the fourth and fifth thing — which is where the defects live, because the first three are the ones everybody thinks of.',
					'So the industry answer to *is my data any good* became: fit something cheap, report the number, report what drove it. It is fast, it requires no code, and it answers a different question than the one being asked while looking exactly like an answer to it.',
					'That is the whole opening. Not that the established tools are bad, but that being fast and being right were treated as a trade, and the trade was made in the wrong direction by default.',
				]),
			}),
			Object.freeze({
				heading: 'Built to refuse',
				paragraphs: Object.freeze([
					'The design decision the rest of the product hangs off is that it is allowed to refuse.',
					'Most tools answer. Faced with a column it cannot confidently read, a tool infers, coerces, picks the most likely interpretation and moves on — and the file still parses, so nothing tells you a choice was made on your behalf. Every reason my product can raise exists because that choice, made silently, costs something specific and unrecoverable.',
					'So the reasons are a closed set. Every reason the engine can raise is named in a document, and a test fails the build when the code can raise one the document does not name. A reason that is not in that file cannot reach a user. That is not documentation discipline for its own sake — it is the mechanism that stops the set drifting into a grab bag of warnings nobody reads.',
					'They arrive in ways that are deliberately not interchangeable. A **finding** is worth knowing and stops nothing. A **refusal** is a question only the person in front of the screen can answer, because the file does not contain the information needed to settle it. An **error** means the operation did not happen. A **blocker** refuses the action before it is attempted and replaces the button with the reason, and calling the same intent programmatically returns that reason rather than doing the thing anyway.',
					'The distinction that took longest to get right is the second one. A refusal is not the tool being unsure. It is the tool being certain that the answer is not in the file, and declining to manufacture one.',
				]),
			}),
			Object.freeze({
				heading: 'The column that matters is what it costs',
				paragraphs: Object.freeze([
					'The registry of reasons has three columns, and the third one is the product.',
					'Not what the check found. What it costs you. A whole-number column whose century is not in the file is not reported as "ambiguous year format" — it is reported as the fact that no later reading can recover the century, and any comparison against a source that wrote years in full is now wrong in a way that will not surface. A column whose offsets were discarded is not "timezone data missing" — it is that a row within one offset of a split boundary lands on the wrong side of it.',
					'This sounds like a writing decision and it is an engineering one. A person deciding whether to care about a finding needs to know what continuing costs them, and that is a fact about the pipeline downstream, not about the column. No constant holds it. It cannot be generated from the code, because a generated table is a rendering of what it renders and there is nothing left for a gate to catch.',
					'So the table is written by hand for a reader, and a test holds it to the code. Both halves survive: wording that means something, and a set that cannot drift.',
				]),
			}),
			Object.freeze({
				heading: 'A threshold you invent is the bug this product exists to prevent',
				paragraphs: Object.freeze([
					'That sentence is a rule in the repository, and it is the one I would point at first if somebody asked what makes this different from a weekend of heuristics.',
					'Every number in the specification is either measured against the fixture corpus and cited, or it is explicitly marked *proposed*. A proposed number is a hypothesis with a label on it. It is never promoted by quietly deleting the word.',
					'The reason is that this product exists because somebody, somewhere, picked a cutoff that felt right and shipped it, and everything downstream inherited a number nobody measured. A tool that catches that class of mistake while committing it is worse than no tool, because it launders the same error through an interface that looks authoritative.',
					'It is also the least fun rule in the codebase to follow. It means the honest state of a check is frequently "we think this floor is about right and we have not proven it," written down in those words, in public, in the specification.',
				]),
			}),
			Object.freeze({
				heading: 'It tells you what it did not look at',
				paragraphs: Object.freeze([
					'Type inference and the hazard checks read a bounded number of rows. The profile reads every row. Those are different guarantees, and a tool that reports both under one heading is telling you something false by omission.',
					'So the bound is carried in the output. A defect past the row the checks stopped at was never examined, and the result says so rather than leaving absence to be read as a clean bill.',
					'This is the same move as publishing what a system does not prove, and it is worth more than any check in the product. A reader who knows exactly where the light stops can decide what to do about the dark. A reader who is shown a green result with no boundary on it has been handed a conclusion they did not earn.',
				]),
			}),
			Object.freeze({
				heading: 'The gate that waived itself',
				paragraphs: Object.freeze([
					'One of the build gates enforces a boundary: certain modules may not touch the filesystem. Violations can be waived with a marked comment, because a small number of legitimate exceptions exist and each has to say why.',
					'The waiver marker was the string `fs:`. Which is a substring of `fs::read`.',
					'So a comment explaining the rule — prose, in the file, describing why filesystem access was forbidden there — matched the waiver pattern and silently exempted the line beneath it. The gate read its own documentation as permission and passed. The check ran, reported success, and had stopped checking.',
					'That is the failure this entire product is about, found inside the thing built to find it. The marker is now unambiguous, and the story stays in the repository because a gate that can disable itself is the most expensive kind of bug there is: it does not merely fail to catch things, it produces evidence that there was nothing to catch.',
				]),
			}),
			Object.freeze({
				heading: 'Twelve documents, deleted',
				paragraphs: Object.freeze([
					'The specification directory used to hold twelve documents. They described behaviour in careful detail. One of them was read by a test. The other eleven described work nobody had written.',
					'I deleted them, and the rule that replaced them is that anything added there which no test reads is a candidate for the same treatment.',
					'Specification fiction is comfortable. It reads like progress, it survives review, and it is indistinguishable from a finished system right up until somebody tries to use it. The three documents that remain are a contract precisely because a build fails when the code and the document disagree — the reasons registry is checked against what the engine can actually raise, and a new reason plus its row land in one commit or the build is red.',
					'A document a gate does not read is a wish. Keeping eleven of them would have made the project look further along than it was, to me first and to anyone else second.',
				]),
			}),
			Object.freeze({
				heading: 'What exists and what does not',
				paragraphs: Object.freeze([
					'The read side is built. It reads CSV, JSON and Parquet, profiles every column, runs the read-time hazard checks, and records declarations, renames, row removals and a split declaration into a document on disk. There is a desktop application over it and a headless binary that does the same reading without a window.',
					'Nothing else exists, and none of the following is an omission I am glossing. There is no build step, no verify, no export, no manifest, no golden vectors, and no licensing. Every leakage detector is unwritten: a split can be declared and counted, and nothing yet checks it for leakage. A finding can be read and waived; it cannot yet be acted on. The document describing the analysis phase opens by saying that everything on the page is intent rather than shipped, and that every threshold in it has been measured against nothing.',
					'I am stating that here for the same reason the specification states it there. The claim this product will eventually make is that you can trust its answer, and a product making that claim cannot begin by being vague about which parts of it are finished.',
				]),
			}),
			Object.freeze({
				heading: 'Not a black box, and not a notebook',
				paragraphs: Object.freeze([
					'What I wanted was narrow. Churn a dataset quickly, repeatably, without writing code, and get the same answer every time on the same input. Not a service that returns a number. Not a notebook that returns a number and loses it on restart.',
					'Deterministic, because a data check that returns something different on the second run is not a check. Local and closed rather than hosted, because the answer should not depend on a machine you cannot see and data should not have to leave to be examined. Not a black box, because the whole complaint that started this was being handed a number with no way to interrogate how it was reached.',
					'Closed source is the honest tension in that last sentence and I am not going to pretend otherwise. The resolution I have settled on is that the reasons are public, the bounds are public, what is measured and what is merely proposed is public, and the specification is a contract a build enforces. You cannot read the implementation. You can read exactly what it will and will not claim, and hold the product to it.',
					'It will be available at no cost when the analysis phase lands. Until then the honest description is the one above: a read side that works, a design I will defend, and a roadmap that has not shipped.',
				]),
			}),
		]),
		artifacts: Object.freeze([
			Object.freeze({ label: 'splitwinner.com', href: 'https://www.splitwinner.com' }),
			Object.freeze({ label: 'letools.dev', href: 'https://letools.dev' }),
		]),
	}),
	Object.freeze({
		slug: 'validation',
		title: 'When the bug improves your score',
		annotation:
			'The characteristic failure in machine learning makes your metrics better, so a good number proves nothing. Two times I was fooled, and the apparatus built so a desk does not have to take my word for any of it.',
		standfirst:
			'A leak does not make a model worse. It makes it better, and nothing tells you. This is the validation apparatus that assumes I am the one who cannot be trusted with the result.',
		sections: Object.freeze([
			Object.freeze({
				heading: 'Every failure in this work improves the number',
				paragraphs: Object.freeze([
					'In most software a bug makes something worse. Something returns wrong, something crashes, a test goes red, and the badness of the outcome is roughly proportional to how wrong you were.',
					'This work inverts that. The characteristic failure here makes your metrics better. If a value that was not knowable at prediction time reaches the model, discrimination climbs, the backtest improves, and every number you are looking at moves in the direction you were hoping. Nothing fails. Nothing alerts. The pipeline runs green and the result is worthless.',
					'So the job is not building a model that scores well. Anyone can build a model that scores well, and the fastest way to do it is by accident. The job is building a validation apparatus you cannot fool, and then repeatedly failing to fool it.',
					'What follows is two occasions where I did fool it, and what I built afterwards.',
				]),
			}),
			Object.freeze({
				heading: 'The number that was too good',
				paragraphs: Object.freeze([
					'A round of training on one sport came back with a discrimination score far above what that sport permits. Games in it are close to coin flips at the margin the model was pricing; the number implied a level of skill nobody has.',
					'Nothing was broken. Every stage reported success. The only thing that flagged it was knowing the domain well enough to find the result implausible — which is not a control, it is luck with a lab coat on. If the same leak had produced a merely good number instead of an absurd one, it would have shipped.',
					'The audit found one family of fields, sourced from a third-party API at scrape time, that encoded the outcome of the very game being predicted.',
					'Two independent paths had put it there, which is why it survived. The first was a historical backfill: the API answers with state as of the moment you ask, so a backfill run this year stamps this year’s state onto rows from four seasons ago. The second was a nightly re-pull: the morning fetch captures the genuine pre-game state, and the evening fetch overwrites the same row with the post-game state, so by the next morning yesterday’s row has quietly become a record of what happened.',
					'The evidence that made it undeniable was opening day. Before a single game of that season had been played, the field already separated the eventual winners from the eventual losers perfectly. A pre-game record that knows the result of a game nobody has played yet.',
					'The other half of the audit was the useful half. Every rolling-window feature family was checked line by line, and all of them were clean by construction — strict before-this-game iteration, gated on completed-before-this-timestamp, no off-by-one anywhere in the set. The leak was not a systemic design failure. It was one external source trusted at face value.',
				]),
			}),
			Object.freeze({
				heading: 'The lesson that generalized',
				paragraphs: Object.freeze([
					'Any value sourced from a third-party API at scrape time is suspect unless that API guarantees point-in-time semantics, and almost none of them do. An API answers as of now. Your row is dated then. Nothing in the response tells you which one you received, and the response is well-formed either way.',
					'The fix went in two layers. The materializer stopped reading the fields at all, so future scrapes cannot carry them. And an exclusion list was added so that the historical rows still holding the values cannot feed them into training while the proper re-run is outstanding. The cheap fix is instant and the correct fix is a multi-season regeneration; running the cheap one first is not a compromise when the expensive one is scheduled.',
					'Then everything downstream was re-discovered and re-trained, and the post-fix number is the system’s actual skill. The headline it replaced was never mine.',
				]),
			}),
			Object.freeze({
				heading: 'The apparatus',
				paragraphs: Object.freeze([
					'Cross-validation is time-series aware, with a purge gap and an embargo, so no fold trains on the window immediately adjacent to what it tests. Ordinary k-fold on temporal data is a leak with a respectable name.',
					'Holdout years are isolated, and a configuration that quietly folds test years back into training is written down as a named failure rather than left to vigilance, because the consequence is that every validation number produced afterwards is fiction and nothing about it looks wrong.',
					'Probabilities are calibrated rather than merely accurate. A model that says seventy percent should win seventy percent of the time, and accuracy does not check that — a model can be accurate and systematically overconfident at once. Four calibrators are fit on a held-out split and the winner is selected by the lowest expected calibration error, not by the best accuracy.',
					'The published metrics are proper scoring rules: Brier and log loss. Both are minimized only by honest probabilities, which is the entire reason for choosing them. You cannot improve a proper scoring rule by miscalibrating, and you can inflate accuracy simply by being confident and wrong. Losers are in the denominator by construction.',
					'A drift monitor watches calibration after settlement, because a model calibrated in training drifts as a season moves and rosters, rules and the market all adapt. The monitor is the early warning; a re-train is the fix.',
				]),
			}),
			Object.freeze({
				heading: 'The refusal is the product',
				paragraphs: Object.freeze([
					'The bet-or-skip decision is not a confidence threshold. A threshold is a guessed number with no guarantee behind it, and the guess is always made by the person who benefits from it being permissive.',
					'It is conformal abstention. For every game the model produces a prediction set with a coverage guarantee: the set contains the true outcome at least as often as the configured level. The size of that set is a calibrated measure of the model’s own uncertainty. One outcome in the set means the model can separate them at that coverage level and the game is eligible. Two means both are plausible and the model genuinely cannot tell, so it skips.',
					'That is a principled refusal with a proof behind it rather than a tuned cutoff, and it is the same instinct as everything else I build: a system that answers confidently and wrongly is worse than one that declines.',
					'The part that matters for anyone checking the record is where the decision is written. The prediction set, its size, and the pass-or-skip flag are all inside the hashed payload that goes into the audit ledger, before the game. The classification is fixed on day one and cannot be re-litigated afterwards. Nobody can decide in hindsight that a loss was really a skip, and that includes me.',
					'A published hit rate is only meaningful if the denominator was fixed before the outcomes were known. This is the mechanism that fixes it, and it is a design property rather than a promise.',
				]),
			}),
			Object.freeze({
				heading: 'Beating the close, not the record',
				paragraphs: Object.freeze([
					'Win rate over any short horizon is noise. You can be right and lose, wrong and win, and a run of either proves nothing about the model that produced it.',
					'Closing line value is the measure that survives the variance. The closing price is the market’s most informed estimate, having absorbed everything the sharp money knows; the difference between the price you took and where the market settled is a direct read on whether you were early to something real. Beat the close consistently and you have an edge. Fail to, and you do not, regardless of what any individual result did.',
					'That is why it is wired into the risk loop rather than only reported. When a sport’s rolling closing-line value goes negative, new bets in that sport are automatically scored riskier and become more likely to be skipped — the edge decaying throttles itself without anyone having to notice and intervene.',
					'Its limits are documented beside it. The order-based measure only sees bets that were actually placed, so it is blind to the skip universe until the per-book version is wired in. And a rolling window lags: a sport whose edge is decaying right now does not trip the penalty until the window fills.',
				]),
			}),
			Object.freeze({
				heading: 'The second silent failure was in the validation itself',
				paragraphs: Object.freeze([
					'A feature-adjudication stage had been fully written, listed in the dependency file, and documented. For weeks it did not run.',
					'The dependency was not installed in the interpreter that runs in production. The import error fell into a graceful-skip path, which recorded a verdict of skipped and carried on, and the docstring still described the stage as deferred. Every run was green. The stage was in the code, in the requirements, and in the documentation, and it was not executing.',
					'A graceful skip is indistinguishable from not implemented. That is now a written rule: before trusting any deferred or to-do claim in this codebase, grep for the function, and wherever a graceful-skip pattern exists, check that the dependency is actually installed in the interpreter that runs in production rather than the one on your laptop.',
					'Two silent failures, one in the data and one in the apparatus meant to catch failures in the data. Both found weeks late, both found by me, because nobody else was looking. That is the honest texture of this work, and any account of it without those in it is an advertisement.',
				]),
			}),
			Object.freeze({
				heading: 'Determinism, stated in tiers',
				paragraphs: Object.freeze([
					'Reproducibility is what makes the ledger’s hash mean something about correctness rather than only about what was asserted. Without it, a reader can confirm a prediction is unaltered but not that it was right.',
					'Determinism is not one property, though, and claiming it flat would be a lie. So it is stated as tiers with a posture on each one. Bit-exact reproduction of training — re-run it and get an identical artifact — is not claimed; it is the hardest tier and not a realistic target for this kind of model. Statistical reproduction, where a re-train lands within epsilon on calibration and score, is the target. Inference determinism is hard-guaranteed and live. Data determinism for rows already written is a confirmed gap, named as a gap.',
					'The guarantee that is live is enforced rather than hoped for. Seeds are pinned across every generator. BLAS thread counts are forced to one before the numerical libraries load, because those libraries lock their thread pools at import and a floating-point reduction whose order depends on thread count is not deterministic — and the pinning is asserted at startup rather than assumed to have worked. Ordered structures are sorted before serialization so the hashed output is stable, with a regression test holding it.',
					'Every model carries its full numerical environment in the registry: interpreter and package versions, CPU model, BLAS variant, thread settings. A reproduction is only meaningful against a matching environment, and recording it is what lets a verifier confirm the match instead of guessing at it.',
					'The claim that survives all that is narrow and precise: given the registered model and the audited feature vector, you get this prediction byte for byte. Not that any past prediction can be re-derived from scratch. The second sentence is the one people want and it is not true, so it is not said.',
				]),
			}),
			Object.freeze({
				heading: 'Every document ends with its limitations',
				paragraphs: Object.freeze([
					'The internal documentation for each part of this system ends the same way, under a heading for limitations and honest edges. The calibration split is fixed, so sports with less data get a noisier calibrator. Calibration is frozen with the artifact at training time and can only be monitored between re-trains, never corrected. The closing-line window lags. The per-book measurement surface exists and is not yet wired into the live loop.',
					'None of that is there as humility. It is there because the alternative is that somebody else finds it, and the distance between disclosing a limitation and having one discovered is the entire distance between a system a desk will use and one it will not.',
					'It is the same pattern as the ledger’s list of what it does not prove, written for the same reason. A document that only enumerates its strengths has told you who wrote it and why.',
				]),
			}),
			Object.freeze({
				heading: 'What all of it is for',
				paragraphs: Object.freeze([
					'The output is a calibrated probability with a coverage-guaranteed refusal attached, hashed and anchored to a public timestamp before the event starts.',
					'A desk evaluating that does not have to trust a win rate, or me. It can confirm the skip was declared before the outcome was known, score the probabilities with rules that cannot be improved by lying, and measure the whole set against the closing line rather than against a curated highlight reel.',
					'That was the design goal from the beginning: make the numbers checkable by somebody who starts from the assumption that they are wrong. Everything above is what that costs.',
				]),
			}),
		]),
		artifacts: Object.freeze([
			Object.freeze({ label: 'splitwinner.com', href: 'https://www.splitwinner.com' }),
			Object.freeze({
				label: 'The ledger the predictions are anchored to',
				href: 'https://github.com/SplitWinner/audit_trail',
			}),
		]),
	}),
	Object.freeze({
		slug: 'audit-trail',
		title: 'The public audit trail',
		annotation:
			'A prediction record nobody has to trust, including me. Two independent roots, a verifier that needs nothing from me, and the three disclosures the alpha cost.',
		standfirst:
			'Every operation in this category publishes a record and none of them are checkable. This one was built so that a reader who assumes I am lying can prove it, without an account and without my cooperation.',
		sections: Object.freeze([
			Object.freeze({
				heading: 'Everyone in this category publishes a record',
				paragraphs: Object.freeze([
					'Every operation that sells sports predictions publishes a record, and there is no reason to believe any of them.',
					'There are two ways to lie about one and neither looks like lying. The first is to edit the history: a schema change, a corrected row, a cleanup of something that was obviously wrong. From the outside, a maintenance window and a rewrite are the same event. The second is to select what gets published — post the plays that won, and simply never mention the ones that did not. Every number in that record is true. The set is the lie.',
					'The second is the common one, and it is the more effective, because nothing was falsified and no individual claim is checkable as false. A record that shows only what its author chose to show is not evidence. It is marketing with arithmetic in it.',
					'Third-party verification services narrow the first problem and leave the second untouched: an operator stays free to submit some plays and not others, and a verified record of a chosen subset is a verified subset.',
					'I could not find a way to prove I was not doing either of those things. Promising is not proving, and anyone can promise. So the requirement became making it impossible rather than saying it was not happening.',
				]),
			}),
			Object.freeze({
				heading: 'The test was a desk, not a bettor',
				paragraphs: Object.freeze([
					'The bar I set was not what a customer would accept. It was what a trading desk would accept from a vendor it had every reason to distrust.',
					'A desk does not ask whether your numbers look good. It asks when the number existed, whether the timestamp is yours to move, what happens to your record on a day you would rather not discuss, and who has to cooperate for the check to work. If the answer to that last one is you, the check is not a check.',
					'That rules out almost every design. A database I control proves nothing. A signature I issue proves nothing about time. A git commit proves nothing either, because history can be rewritten and force-pushed, and the platform hosting it is choosing timestamps on my behalf.',
					'What survives is narrow: a commitment published into a system I cannot reach, before the outcome is known.',
				]),
			}),
			Object.freeze({
				heading: 'Two roots, neither of them mine',
				paragraphs: Object.freeze([
					'Every prediction is hashed into an append-only ledger the moment it is made. One row per prediction, enforced by a uniqueness constraint; UPDATE and DELETE rejected by a database trigger rather than by policy.',
					'Each day, the day’s rows are sealed into a single manifest and attested into two independent roots before the games settle: a Bitcoin timestamp through OpenTimestamps, and a signed entry in the Sigstore Rekor transparency log.',
					'Two rather than one, because they fail in unrelated ways and prove different things. Bitcoin gives a block height that a prediction demonstrably preceded, and no outage takes that back — a confirmed proof lives in the chain, not in a calendar server. Rekor gives attribution: the entry carries a signature over the anchor’s bytes by a key whose public half is published in the repository and kept there forever, including superseded ones, so historical entries stay checkable. A timestamp alone tells you something existed. It does not tell you whose it was.',
					'Neither root can be checked away by the failure of the other, and neither is a fallback for the other. Both are produced for every anchor, and if either becomes unreachable, publication continues and the affected anchors carry one root until the other returns — which is itself a disclosable event with a stated deadline.',
					'Each anchor also commits to the previous anchor’s exact file bytes. The sequence of days is therefore tamper-evident as a sequence, not just day by day. A missing day is visible. It can be explained, but it cannot be erased.',
				]),
			}),
			Object.freeze({
				heading: 'Publishing the commitment without publishing the picks',
				paragraphs: Object.freeze([
					'A prediction has commercial value right up until the game starts, which is exactly the window in which it has to be published to prove it existed. Publishing the picks to prove they existed gives away the thing being sold.',
					'So the day’s manifest is sealed under a fresh 32-byte salt with HMAC-SHA256. The published manifest commits irrevocably to the exact set of rows, and the salt is what prevents anyone reconstructing the day’s picks from it by working through the possibilities. Customers receive the salt under contract and can recompute the entire day themselves.',
					'There is a second mode that needs no salt at all: given the full rows, it recomputes each row hash directly. Anyone holding the data can check the data, and the operator is not in the loop for either path.',
				]),
			}),
			Object.freeze({
				heading: 'What it proves, and the list of what it does not',
				paragraphs: Object.freeze([
					'The methodology document states five properties: existence in time under two independent roots, attribution to a published key, integrity of every row and every day, continuity across the chain, and the binding of each published performance report into the following day’s anchor so a metric inherits the timestamp of the predictions it describes.',
					'Immediately after that list is a second one, headed what is not proven. It says the ledger does not prove the predictions are good — it is provenance, not endorsement. It says the ledger discloses nothing about how predictions are made, and that training lineage never appears in a row.',
					'The second list is the one that does the work. A document that only enumerates its strengths has told you who wrote it.',
				]),
			}),
			Object.freeze({
				heading: 'The verifier is the product',
				paragraphs: Object.freeze([
					'The check is one file: 560 lines of Python. Five of its six modes are pure standard library and need no network, no account, no key and no API. Clone the repository and run it.',
					'Golden vectors ship alongside it, so the first thing you can do is verify the verifier — check that it produces known answers on known inputs before trusting what it says about anything else. The chain mode walks the previous-anchor links. The Bitcoin mode is the only one with a dependency, a pinned OpenTimestamps client, and it is there because that check is the binding one.',
					'This is the part the whole design exists to reach. Nothing in the trust chain routes through me, including the tool you use to check it.',
				]),
			}),
			Object.freeze({
				heading: 'Disclosure is the other half',
				paragraphs: Object.freeze([
					'A tamper-evident chain says nothing about the days that never appear in it. Integrity and completeness are different properties, and only one of them can be enforced with a hash.',
					'So the protocol names, in advance and in writing, what has to be disclosed and by when. Seven days from detection, append-only, never rewritten — an error in a disclosure is corrected by appending a follow-up, not by force-pushing a better version of the past.',
					'The thresholds are specific rather than aspirational: an anchor landing more than 24 hours after the activity it covers; an anchor carrying only one of its two attestations for more than 72 hours; a signing key rotated or suspected to have left custody; any committed artifact changing after commit; a salt leaving custody outside a contract; a verifier release that alters the meaning of any past verification.',
					'Writing the thresholds down before anything goes wrong is the entire trick. Afterwards, every threshold is negotiable, and the person doing the negotiating is the one who needs it moved.',
				]),
			}),
			Object.freeze({
				heading: 'What the alpha cost me to admit',
				paragraphs: Object.freeze([
					'The public alpha ran 29 anchored days between 19 May and 25 June 2026, with 25 model registrations and 41 daily reports. It is sealed byte-identical under the product’s previous name, with a manifest of every file in it timestamped into Bitcoin at sealing — an independent bound on when the corpus existed, over and above each anchor’s own proof.',
					'Sealing it meant writing down the complete list of what had gone wrong, including two things that were never disclosed while it was running.',
					'The first is the one that counts. On 11 June a schema migration rewrote an anchor that had already been published — schema 3 to 4, in place, on a committed file, with a new manifest hash and a new publication time. The Bitcoin proof for that date had been stamped against the original bytes, so it can no longer be bound to the file sitting there now. The day still verifies against the ledger rows. Its timestamp claim does not, and the record states it in those words: not established.',
					'That cannot be repaired. Repairing it would mean deleting or restamping a proof, which is the exact operation the system exists to make impossible. So it stands permanently, in a file anyone can read, and the official protocol makes that entire failure class mechanically impossible by requiring schema changes to go forward only, enforced in CI.',
					'The first: two predictions got duplicate intermediate rows because a slate listed the same game twice inside one batch. Both were classified as skips, neither was a bet, no customer saw either, and no published figure moved. The superseded rows are still in the ledger and always will be, because removing them is precisely the operation the ledger exists to make impossible.',
					'The second: an ingestion fault stopped one sport’s inputs refreshing for four days, and on the last of those the morning run did not execute at all, so that day has no anchor. The gap is stated rather than smoothed. The predictions a healthy pipeline would have produced were not generated afterwards, because backfilling them would have violated the live-timing guarantee the whole system exists to protect. They are recorded as never having existed, which is what they are.',
					'The third is still open. That sport has been offline since 25 June 2026 for a hardware migration, with no estimated restart date, and the disclosure says exactly that — including that a follow-up will be appended when it resumes.',
					'Sealing added the rest of the accounting. Nine dates in the alpha window carry no anchor. Twelve report dates have no anchor beside them, and reports were never inside the manifest hash at all — a gap the official ledger closes by binding each report’s bytes into the following day’s anchor.',
					'None of it had to be published. Every one of these was found by my own review and nobody else was looking. Publishing them is the only thing that makes the remaining days worth anything, because a record with no bad days in it is the exact shape of a record that has been curated.',
				]),
			}),
			Object.freeze({
				heading: 'The verifier was the thing that broke',
				paragraphs: Object.freeze([
					'The second undisclosed item is the one that changed the design, and it is the reason there is a version two at all.',
					'The alpha verifier’s offline Bitcoin mode read the block height out of each proof and never confirmed that the proof committed to the anchor file’s digest — while laying its output out as though that were exactly what it had done. Somebody running the offline check saw a pass. The check they believed they were running was not being run.',
					'That is the failure this entire site is about, and it had gotten into the one piece of software whose only job was to catch it. A tool that answers confidently and wrongly is worse than one that refuses, because a refusal costs ten minutes and a confident wrong answer costs everything downstream. Mine answered confidently, about the thing I was asking readers to trust least.',
					'The other half of the same problem was versioning. Each anchor pinned the verifier it was published with, so the sealed alpha spans two generations: sixteen anchors check against one file, thirteen against another, and the repository has to hand you a table explaining which is which. That works, and it hands the reader a job I created for them by shipping a fix.',
					'So the official ledger inverts the relationship. Verifier identity lives in an append-only release registry rather than inside the anchors, each row carrying that release’s own SHA-256, and the governing rule is that the current release must verify every anchor, every schema and every golden vector ever published on the chain. CI fails the build when it cannot. One file, the newest one, works across the whole history including the parts published before it existed.',
					'That constraint is deliberately expensive, because the alternative is worse. It means a change to the verifier can never quietly redefine what a past verification meant — which is itself one of the disclosure thresholds, written down before there was anything to disclose.',
				]),
			}),
			Object.freeze({
				heading: 'One operator, stated as a limitation',
				paragraphs: Object.freeze([
					'The operations document opens by saying the ledger is run by a single operator, that this is a real limitation, and that the mitigations are disclosed rather than hidden.',
					'It then names the problem precisely. The operator holds the database service role, the publishing credential and the salt store. Somebody with those keys could disable the triggers, rewrite rows and re-enable them.',
					'And then it names what the operator cannot rewrite: Bitcoin attestations already published, the anchor chain as it exists in customers’ clones, and the disclosure record itself. Anchoring is automated rather than ceremonial, so publication does not wait on a person remembering.',
					'That is what a threat model looks like when it is honest. Assume the operator is the adversary — because to a desk evaluating a vendor, the operator always is — then state which properties survive that assumption and which ones simply do not.',
				]),
			}),
			Object.freeze({
				heading: 'Where it actually stands',
				paragraphs: Object.freeze([
					'The specification, the verifier and its release registry, the key history, the payload schemas and the disclosure policy are published now. The alpha record is sealed at 29 anchors with its incidents and its post-mortem attached.',
					'The official chain has not opened. Its first anchor is still ahead of it, one sport first and the others joining as their seasons begin, and nothing has been anchored between the alpha’s last day and that first anchor. The gap is written into the README as a fact rather than smoothed into a continuous-sounding history.',
					'I am stating that plainly for the same reason everything else here is built the way it is. Whether a chain is live is a fact about the world at a moment in time, and it is false right up until it is true. The way to make that claim is to publish the thing and let somebody check, which is what the next paragraph is for.',
				]),
			}),
			Object.freeze({
				heading: 'Check it yourself',
				paragraphs: Object.freeze([
					'Clone the repository, run the self-test against the golden vectors, then walk the chain. Neither needs a network connection or anything from me. Read the methodology, then read the list of what it does not prove. Read the incidents, including the one that is still open.',
					'If any of it fails, that is a finding you can publish, and I would rather you found it than that nobody looked.',
				]),
			}),
		]),
		artifacts: Object.freeze([
			Object.freeze({ label: 'The ledger', href: 'https://github.com/SplitWinner/audit_trail' }),
			Object.freeze({
				label: 'The sealed alpha record',
				href: 'https://github.com/SplitWinner/audit_trail_alpha',
			}),
			Object.freeze({ label: 'splitwinner.com', href: 'https://www.splitwinner.com' }),
		]),
	}),
]);
