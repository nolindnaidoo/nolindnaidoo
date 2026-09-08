<script lang="ts">
import { caseStudies } from '$content/case-studies';
</script>

<!-- The written work, at display scale, in the position a thesis paragraph used
     to occupy. Three pieces the reader can open beats a paragraph claiming what
     they would find in them, and it is the only block on the page whose whole
     job is to be left through. Each row carries its annotation because an index
     of titles is an archive — the reason to open one travels with the link. -->
<ul class="studies">
	{#each caseStudies as study (study.slug)}
		<li>
			<a href="/case-studies/{study.slug}">
				<h3>{study.title}<span class="arrow" aria-hidden="true">&nbsp;→</span></h3>
				<p>{study.annotation}</p>
			</a>
		</li>
	{/each}
</ul>

<style>
	.studies {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		border-bottom: 1px solid var(--hair);
	}

	li:last-child {
		border-bottom: none;
	}

	/* The whole row is the target, not the title alone — a 46px headline with a
	   separate small link beside it gives the pointer two places to aim and the
	   keyboard two stops for one destination. */
	a {
		display: block;
		padding: clamp(22px, 3vw, 40px) var(--pad);
		color: inherit;
		text-decoration: none;
		transition: background 180ms ease;
	}

	a:hover {
		background: var(--wash);
	}

	h3 {
		margin: 0;
		max-width: 22ch;
		font-size: clamp(25px, 4.2vw, 52px);
		line-height: 1.04;
		letter-spacing: -0.036em;
		font-weight: 700;
		text-wrap: balance;
	}

	/* Slides on hover rather than appearing: the row is already a link, so the
	   arrow is confirming direction, not announcing that one exists. */
	.arrow {
		display: inline-block;
		color: var(--accent);
		transition: transform 180ms ease;
	}

	a:hover .arrow {
		transform: translateX(5px);
	}

	p {
		margin: clamp(12px, 1.4vw, 18px) 0 0;
		max-width: 62ch;
		font-size: clamp(14.5px, 1.5vw, 17px);
		line-height: 1.6;
		color: var(--muted);
	}

	/* Title and reason side by side above 1000px. Stacked, a 52px headline
	   capped at a balanced measure and prose capped at 62ch leave most of the
	   right half of the band empty, which reads as an unfinished row rather
	   than as space. Matches the split the Now section already uses. */
	@media (min-width: 1000px) {
		a {
			display: grid;
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			gap: clamp(28px, 4vw, 64px);
			align-items: start;
		}

		h3,
		p {
			max-width: none;
		}

		p {
			margin-top: 0;
		}
	}
</style>
