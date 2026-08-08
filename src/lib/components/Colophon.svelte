<script lang="ts">
import { colophon } from '$content/site';
</script>

<aside class="colophon">
	<p>
		<strong>{colophon.lead}</strong>
		{colophon.body}
		<a href={colophon.href}>{colophon.cta}<span aria-hidden="true">&nbsp;↗</span></a>
	</p>
</aside>

<style>
	.colophon {
		margin: 0 var(--pad) clamp(40px, 6vw, 72px);
	}

	p {
		margin: 0;
		max-width: 88ch;
		font-family: var(--mono);
		font-size: clamp(12px, 1.3vw, 13.5px);
		line-height: 1.7;
		letter-spacing: 0.02em;
		color: var(--muted);
	}

	strong {
		font-weight: 700;
		color: var(--ink);
	}

	a {
		color: inherit;
		text-underline-offset: 4px;
	}

	a:hover {
		color: var(--accent);
	}
</style>
