<script lang="ts">
import { elsewhere } from '$content/profile';
import Band from './Band.svelte';
</script>

<Band>
	<ul>
		{#each elsewhere as property (property.href)}
			<li>
				<a href={property.href}>
					<strong>{property.label}</strong>
					<span>{property.note}</span>
				</a>
			</li>
		{/each}
	</ul>
</Band>

<style>
	/* Hairline grid drawn with gap over a ruled background — one border, no
	   doubled seams between cards. */
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
		gap: 1px;
		margin-top: clamp(32px, 4.5vw, 56px);
		padding: 0;
		list-style: none;
		background: var(--rule);
		border: 1px solid var(--rule);
	}

	a {
		display: block;
		height: 100%;
		background: var(--paper);
		padding: clamp(20px, 2.4vw, 28px);
		text-decoration: none;
		color: inherit;
		transition: background 180ms ease;
	}

	a:hover {
		background: var(--wash);
	}

	strong {
		display: block;
		font-size: clamp(17px, 2vw, 22px);
		letter-spacing: -0.02em;
		font-weight: 680;
	}

	span {
		display: block;
		margin-top: 8px;
		font-family: var(--mono);
		font-size: 13px;
		letter-spacing: 0.08em;
		color: var(--muted);
	}
</style>
