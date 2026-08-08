<script lang="ts">
import { platform } from '$content/platform';
import { meta, SITE_URL } from '$content/site';
import { OG_IMAGE, socialCard } from '$content/social';
import Colophon from '$lib/components/Colophon.svelte';
import Contact from '$lib/components/Contact.svelte';
import Credentials from '$lib/components/Credentials.svelte';
import Elsewhere from '$lib/components/Elsewhere.svelte';
import Hero from '$lib/components/Hero.svelte';
import Ledger from '$lib/components/Ledger.svelte';
import OpenSource from '$lib/components/OpenSource.svelte';
import Platform from '$lib/components/Platform.svelte';
import Roster from '$lib/components/Roster.svelte';
import Section from '$lib/components/Section.svelte';
import Standards from '$lib/components/Standards.svelte';
import Thesis from '$lib/components/Thesis.svelte';
import { personSchemaTag } from '$lib/seo/person';

// Computed above, rendered below: the head block holds no expressions beyond
// the values named here.
const nowHeading = `Now — ${platform.company}`;
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href={SITE_URL} />

	<meta property="og:type" content="profile" />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content={String(socialCard.width)} />
	<meta property="og:image:height" content={String(socialCard.height)} />
	<meta property="og:image:alt" content={meta.imageAlt} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta name="twitter:image" content={OG_IMAGE} />
	<meta name="twitter:image:alt" content={meta.imageAlt} />

	<!-- Injected as markup because Svelte has no element API for a script tag in
	     <svelte:head>. The tag is assembled in seo/person.ts over frozen static
	     content; person.test.ts asserts it can never carry a closing script tag. -->
	{@html personSchemaTag()}
</svelte:head>

<Hero />

<!-- tabindex="-1" makes this a real focus target. Without it the skip link
     moves the scroll position but not focus in several browsers, so the next
     Tab returns to the top of the document and the skip achieves nothing. -->
<main id="main" tabindex="-1">
	<Thesis />

	<Section id="now" title={nowHeading} aside="Current work">
		<Platform />
	</Section>

	<Section id="record" title="The record" aside="Selected work">
		<Roster />
		<Ledger />
	</Section>

	<Section id="open-source" title="Open source" aside="MIT · in public">
		<OpenSource />
	</Section>

	<Section id="credentials" title="Credentials &amp; stack" aside="What I actually run">
		<Credentials />
	</Section>

	<Section id="bar" title="The bar" aside="Claims match runs">
		<Standards />
	</Section>

	<Section id="elsewhere" title="Elsewhere" aside="All of it is me">
		<Elsewhere />
	</Section>
</main>

<Contact />
<Colophon />

<style>
	/* The focus target is programmatic, not user-visible — a ring around the
	   whole page after a skip is noise, and the heading it lands on is the
	   feedback that matters. */
	main:focus {
		outline: none;
	}
</style>
