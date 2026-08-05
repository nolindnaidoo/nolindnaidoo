<script lang="ts">
import { ledger } from '$content/ledger';
</script>

<ul>
	{#each ledger as entry (entry.id)}
		<li>
			<h3 class="claim">{entry.claim}</h3>
			<p class="value">
				{entry.value}
				{#if entry.secondary}<small>{entry.secondary}</small>{/if}
			</p>
			<div class="foot">
				<span class="at">{entry.attribution}</span>
				{#each entry.detail as sentence (sentence)}
					<span>{sentence}</span>
				{/each}
				{#each entry.sources as source (source.href)}
					<a href={source.href}>{source.label}<span aria-hidden="true">&nbsp;↗</span></a>
				{/each}
			</div>
		</li>
	{/each}
</ul>

<style>
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	/* The claim is the layout: headline-scale left, the datum right-aligned on
	   the same baseline, supporting prose spanning both columns underneath. */
	li {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: baseline;
		gap: 6px clamp(16px, 3vw, 48px);
		padding: clamp(18px, 2.3vw, 30px) var(--pad);
		border-bottom: 1px solid var(--hair);
		transition: background 180ms ease;
	}

	li:hover {
		background: var(--wash);
	}

	.claim {
		margin: 0;
		font-size: clamp(19px, 2.9vw, 40px);
		line-height: 1.08;
		letter-spacing: -0.03em;
		font-weight: 640;
		text-wrap: balance;
	}

	.value {
		grid-column: 2;
		grid-row: 1;
		margin: 0;
		font-family: var(--mono);
		font-size: clamp(15px, 1.9vw, 26px);
		font-variant-numeric: tabular-nums;
		letter-spacing: -0.02em;
		text-align: right;
		white-space: nowrap;
	}

	.value small {
		display: block;
		margin-top: 6px;
		font-size: 12.5px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--muted);
	}

	.foot {
		grid-column: 1 / -1;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px 18px;
		margin-top: 10px;
		font-family: var(--mono);
		font-size: 13px;
		letter-spacing: 0.06em;
		color: var(--muted);
	}

	.at {
		font-size: 12.5px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--accent);
	}

	.foot a {
		color: inherit;
		text-underline-offset: 3px;
		text-decoration-color: var(--rule);
	}

	.foot a:hover {
		color: var(--accent);
		text-decoration-color: currentColor;
	}
</style>
