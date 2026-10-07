<script lang="ts">
import { SITE_URL } from '$content/site';
import { OG_IMAGE, socialCard } from '$content/social';
import type { PageData } from './$types';

const { data }: { data: PageData } = $props();

const study = $derived(data.study);
const canonical = $derived(`${SITE_URL}/case-studies/${study.slug}`);
const title = $derived(`${study.title} — Nolin Naidoo`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={study.standfirst} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={study.standfirst} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content={String(socialCard.width)} />
	<meta property="og:image:height" content={String(socialCard.height)} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={study.standfirst} />
	<meta name="twitter:image" content={OG_IMAGE} />
</svelte:head>

<main id="main" tabindex="-1">
	<article>
		<header>
			<p class="eyebrow">Case study</p>
			<h1>{study.title}</h1>
			<!-- The through-line, compressed. Most readers arrive here from a link and
			     never see the homepage, so stating it only in the index would leave
			     them without the frame the piece assumes. -->
			<p class="standfirst">{study.standfirst}</p>
		</header>

		{#each study.sections as section (section.heading)}
			<section aria-labelledby={section.heading}>
				<h2 id={section.heading}>{section.heading}</h2>
				{#each section.paragraphs as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
			</section>
		{/each}

		<footer>
			<h2 id="artifacts">Go look</h2>
			<ul aria-labelledby="artifacts">
				{#each study.artifacts as artifact (artifact.href)}
					<li><a href={artifact.href} rel="external">{artifact.label}</a></li>
				{/each}
			</ul>
			<!-- One link back, not navigation. -->
			<p class="back"><a href="/case-studies">← All case studies</a></p>
		</footer>
	</article>
</main>

<style>
	/* The focus target is programmatic; a ring around the whole page after a skip
	   is noise, and the heading it lands on is the feedback that matters. */
	main:focus {
		outline: none;
	}

	article {
		padding: clamp(44px, 8vw, 104px) var(--pad) clamp(80px, 10vw, 140px);
		/* Long-form measure. The homepage sets its own per section; this page is
		   one column of prose and wants a reading width, not the full band. */
		max-width: 74ch;
	}

	.eyebrow {
		margin: 0 0 clamp(18px, 2.5vw, 28px);
		font-family: var(--mono);
		font-size: 13px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--accent);
	}

	h1 {
		margin: 0;
		font-size: clamp(38px, 7vw, 78px);
		line-height: 0.95;
		letter-spacing: -0.045em;
		font-weight: 800;
	}

	.standfirst {
		margin: clamp(22px, 3vw, 34px) 0 0;
		max-width: 62ch;
		font-size: clamp(17px, 2vw, 21px);
		line-height: 1.5;
		color: var(--muted);
	}

	section {
		margin-top: clamp(52px, 7vw, 88px);
	}

	h2 {
		margin: 0 0 20px;
		padding-bottom: 12px;
		border-bottom: 2px solid var(--ink);
		font-family: var(--mono);
		font-size: 13px;
		font-weight: 400;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--muted);
	}

	p {
		margin: 0 0 18px;
		font-size: 16.5px;
		line-height: 1.7;
	}

	p:last-child {
		margin-bottom: 0;
	}

	footer {
		margin-top: clamp(64px, 9vw, 110px);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 10px 28px;
		margin: 0;
		padding: 0;
		list-style: none;
		font-family: var(--mono);
		font-size: 13px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.back {
		margin: clamp(40px, 5vw, 60px) 0 0;
		padding-top: 20px;
		border-top: 1px solid var(--hair);
		font-family: var(--mono);
		font-size: 13px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	a {
		color: inherit;
		text-decoration: underline;
		text-decoration-color: var(--rule);
		text-underline-offset: 4px;
	}

	a:hover {
		color: var(--accent);
		text-decoration-color: currentColor;
	}
</style>
