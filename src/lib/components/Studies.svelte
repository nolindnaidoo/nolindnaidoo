<script lang="ts">
import { caseStudies, lede } from '$content/case-studies';
</script>

<!-- The frame and the pieces are one block. Split apart, the paragraph was an
     assertion the reader had to take on faith and the links were a menu with no
     reason attached — each clause of the lede is one of the rows beneath it. -->
<p class="lede">{lede}</p>

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
	.lede {
		margin: clamp(26px, 3.4vw, 40px) 0 clamp(34px, 5vw, 60px);
		padding-inline: var(--pad);
		max-width: 78ch;
		font-size: clamp(15px, 1.75vw, 19px);
		line-height: 1.62;
		color: var(--muted);
	}

	.studies {
		margin: 0;
		padding: 0;
		list-style: none;
		border-top: 1px solid var(--hair);
	}

	li {
		border-bottom: 1px solid var(--hair);
	}

	/* The whole row is the target. A 46px headline with a separate small link
	   beside it gives the pointer two places to aim and the keyboard two stops
	   for one destination. */
	.studies a {
		display: block;
		padding: clamp(22px, 3vw, 40px) var(--pad);
		color: inherit;
		text-decoration: none;
		transition: background 180ms ease;
	}

	.studies a:hover {
		background: var(--wash);
	}

	h3 {
		margin: 0;
		max-width: 22ch;
		font-size: clamp(23px, 3.6vw, 46px);
		line-height: 1.05;
		letter-spacing: -0.034em;
		font-weight: 700;
		text-wrap: balance;
	}

	/* Slides rather than appears: the row is already a link, so the arrow
	   confirms direction, it does not announce that one exists. */
	.arrow {
		display: inline-block;
		color: var(--accent);
		transition: transform 180ms ease;
	}

	.studies a:hover .arrow {
		transform: translateX(5px);
	}

	.studies p {
		margin: clamp(12px, 1.4vw, 18px) 0 0;
		max-width: 62ch;
		font-size: clamp(14.5px, 1.5vw, 17px);
		line-height: 1.6;
		color: var(--muted);
	}

	/* Title and reason side by side above 1000px. Stacked, a 46px headline and
	   prose capped at 62ch leave most of the right half of the band empty, which
	   reads as an unfinished row rather than as space. */
	@media (min-width: 1000px) {
		.studies a {
			display: grid;
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			gap: clamp(28px, 4vw, 64px);
			align-items: start;
		}

		h3,
		.studies p {
			max-width: none;
		}

		.studies p {
			margin-top: 0;
		}
	}
</style>
