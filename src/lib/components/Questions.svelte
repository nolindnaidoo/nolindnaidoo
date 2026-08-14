<script lang="ts">
import { closedWorkQuote, questions } from '$content/questions';
import Band from './Band.svelte';
</script>

<Band>
	<!--
		A description list rather than headings: each question is a term and its
		answer is the description of that term, which is what `dl` is for. Headings
		would put four more entries into the document outline for a block that is
		one idea, and a screen reader would announce a heading level where the page
		has none.
	-->
	<dl>
		{#each questions as question (question.ask)}
			<div class="qa">
				<!-- The quotation marks are punctuation, not decoration: they are what
				     marks the line as the reader's voice rather than mine. -->
				<dt>“{question.ask}”</dt>
				<dd>{question.answer}</dd>
			</div>
		{/each}
	</dl>

	<!--
		Attributed and linked, because it is lifted from the case study rather than
		written here. The link is also the only route from this page into
		/case-studies — a citation the reader can follow, not a nav item.
	-->
	<figure>
		<blockquote>{closedWorkQuote}</blockquote>
		<figcaption>
			<a href="/case-studies">The long version</a>
		</figcaption>
	</figure>
</Band>

<style>
	dl {
		margin: clamp(30px, 4vw, 48px) 0 0;
	}

	.qa {
		max-width: 78ch;
		padding: clamp(20px, 2.4vw, 30px) 0;
		border-bottom: 1px solid var(--hair);
	}

	dt {
		font-size: clamp(18px, 2.3vw, 30px);
		line-height: 1.2;
		letter-spacing: -0.025em;
		font-weight: 660;
		text-wrap: balance;
	}

	dd {
		margin: 12px 0 0;
		font-size: 15.5px;
		line-height: 1.62;
		color: var(--muted);
	}

	/* The quote is the section's closing beat, so it gets the accent rule and a
	   tighter measure than the answers above it. */
	figure {
		margin: clamp(34px, 4.5vw, 56px) 0 0;
		max-width: 64ch;
		padding-left: clamp(18px, 2.2vw, 28px);
		border-left: 3px solid var(--accent);
	}

	blockquote {
		margin: 0;
		font-size: clamp(16px, 1.9vw, 21px);
		line-height: 1.5;
		letter-spacing: -0.012em;
	}

	figcaption {
		margin-top: 14px;
		font-family: var(--mono);
		font-size: 12.5px;
		letter-spacing: 0.13em;
		text-transform: uppercase;
	}

	figcaption a {
		color: var(--muted);
		text-underline-offset: 4px;
	}

	figcaption a:hover {
		color: var(--accent);
	}
</style>
