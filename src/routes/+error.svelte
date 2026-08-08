<script lang="ts">
import { page } from '$app/state';
import { profile } from '$content/profile';
import { meta } from '$content/site';

// Computed above, rendered below.
const status = $derived(page.status);
const headline = $derived(status === 404 ? 'No page here.' : 'Something broke.');
const detail = $derived(
	status === 404
		? 'That address does not exist on this site. Nothing was moved — it was never there.'
		: 'An unexpected error. The address is valid; the page failed to render.',
);
</script>

<svelte:head>
	<title>{status} · {profile.name}</title>
	<meta name="description" content={meta.description} />
	<!-- An error page has nothing worth indexing, and letting it rank would put a
	     dead end in front of someone searching the name. -->
	<meta name="robots" content="noindex" />
</svelte:head>

<main id="main" tabindex="-1">
	<p class="code">{status}</p>
	<h1>{headline}</h1>
	<p class="detail">{detail}</p>
	<a href="/">Back to the start</a>
</main>

<style>
	main {
		min-height: 100dvh;
		padding: var(--pad);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		gap: 18px;
	}

	main:focus {
		outline: none;
	}

	.code {
		margin: 0;
		font-family: var(--mono);
		font-size: 13px;
		letter-spacing: 0.18em;
		color: var(--accent);
	}

	h1 {
		margin: 0;
		font-size: clamp(44px, 11vw, 140px);
		line-height: 0.86;
		letter-spacing: -0.05em;
		font-weight: 800;
		text-transform: uppercase;
		text-wrap: balance;
	}

	.detail {
		margin: 0;
		max-width: 46ch;
		font-size: clamp(15px, 1.75vw, 19px);
		line-height: 1.62;
		color: var(--muted);
	}

	a {
		margin-top: 20px;
		padding-bottom: 4px;
		font-size: clamp(18px, 2.4vw, 28px);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: inherit;
		text-decoration: none;
		border-bottom: 3px solid var(--accent);
	}

	a:hover {
		color: var(--accent);
	}
</style>
