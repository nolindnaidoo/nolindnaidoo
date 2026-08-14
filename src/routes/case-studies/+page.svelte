<script lang="ts">
import { caseStudies, intro } from '$content/case-studies';
import { SITE_URL } from '$content/site';
import { OG_IMAGE, socialCard } from '$content/social';

const canonical = `${SITE_URL}/case-studies`;
const title = 'Case studies — Nolin Naidoo';
const description = intro[0] ?? '';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content={String(socialCard.width)} />
	<meta property="og:image:height" content={String(socialCard.height)} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={OG_IMAGE} />
</svelte:head>

<main id="main" tabindex="-1">
	<header>
		<p class="eyebrow">Case studies</p>
		<h1>The long version</h1>
	</header>

	<!-- The journey, told once, in full. It lives here rather than on the home
	     page because it is a document — fourteen paragraphs of continuous prose
	     changes what a page is, and the home page is built from compressed
	     sections that break every screen or two. -->
	<div class="intro">
		{#each intro as paragraph (paragraph)}
			<p>{paragraph}</p>
		{/each}
	</div>

	<!-- Each entry carries the reason to read it, not just its title. An index
	     that lists names is an archive; the annotation is what makes this a place
	     where a choice can be made. -->
	<ul>
		{#each caseStudies as study (study.slug)}
			<li>
				<a href="/case-studies/{study.slug}">
					<strong>{study.title}</strong>
					<span>{study.annotation}</span>
				</a>
			</li>
		{/each}
	</ul>
</main>

<style>
	/* The focus target is programmatic; a ring around the whole page after a skip
	   is noise, and the heading it lands on is the feedback that matters. */
	main:focus {
		outline: none;
	}

	main {
		padding: clamp(44px, 8vw, 104px) var(--pad) clamp(80px, 10vw, 140px);
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

	.intro {
		margin-top: clamp(34px, 4.5vw, 52px);
	}

	.intro p {
		margin: 0 0 18px;
		font-size: 16.5px;
		line-height: 1.7;
	}

	.intro p:last-child {
		margin-bottom: 0;
	}

	ul {
		display: grid;
		gap: 1px;
		margin: clamp(52px, 7vw, 88px) 0 0;
		padding: 0;
		list-style: none;
		background: var(--rule);
		border: 1px solid var(--rule);
	}

	a {
		display: block;
		background: var(--paper);
		padding: clamp(20px, 2.4vw, 28px);
		text-decoration: none;
		color: inherit;
		transition: background 180ms ease;
	}

	a:hover {
		background: color-mix(in srgb, var(--paper) 92%, var(--ink));
	}

	strong {
		display: block;
		font-size: clamp(19px, 2.4vw, 26px);
		letter-spacing: -0.025em;
		font-weight: 700;
	}

	a:hover strong {
		color: var(--accent);
	}

	span {
		display: block;
		margin-top: 8px;
		font-size: 15px;
		line-height: 1.6;
		color: var(--muted);
	}
</style>
