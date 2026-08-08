import { stack } from '$content/credentials';
import { platform } from '$content/platform';
import { elsewhere, profile } from '$content/profile';
import { projects } from '$content/projects';
import { meta, SITE_URL } from '$content/site';

/**
 * schema.org Person, serialized for embedding in a `<script type="ld+json">`.
 *
 * This is the entity-consolidation surface: `sameAs` is what tells a crawler
 * that this site, the GitHub account, the LinkedIn profile and the three
 * product domains are one person — and, critically, a different person from the
 * other Nolin Naidoo who currently outranks him on his own name.
 *
 * Every field is derived from the content modules the page renders, so the
 * structured data cannot describe someone the page does not.
 */
const PERSON_ID = `${SITE_URL}/#person`;

const LD_JSON_OPEN = '<script type="application/ld+json">';
const LD_JSON_CLOSE = '</script>';

/**
 * The complete `<script>` element, ready for `{@html}`.
 *
 * Assembled here rather than in the component because a literal `</script>` in
 * a Svelte `<script>` block terminates it — the tag has to be built somewhere a
 * markup parser is not reading, and the render body should not be assembling
 * strings regardless.
 */
export function personSchemaTag(): string {
	return `${LD_JSON_OPEN}${graph()}${LD_JSON_CLOSE}`;
}

/**
 * The Person plus every product, in one @graph.
 *
 * Each SoftwareApplication points its `author` at the Person's `@id`, which is
 * what turns a list of links into a graph a crawler can follow: the products
 * carry real authority — seventy thousand downloads across the suite — and
 * without this edge none of it attaches to the person.
 */
export function graph(): string {
	return JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			JSON.parse(personSchema()),
			...projects.map((project) => ({
				'@type': 'SoftwareApplication',
				name: project.name,
				url: project.href,
				description: project.summary,
				applicationCategory: 'DeveloperApplication',
				operatingSystem: project.facts.find((fact) => /macOS|Windows|Linux/.test(fact)) ?? 'macOS',
				author: { '@id': PERSON_ID },
				offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
			})),
		],
	});
}

export function personSchema(): string {
	return JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': PERSON_ID,
		name: profile.name,
		alternateName: [...profile.alsoKnownAs, profile.handle],
		givenName: profile.nameParts[0],
		familyName: profile.nameParts[1],
		jobTitle: profile.title,
		description: meta.description,
		url: SITE_URL,
		address: {
			'@type': 'PostalAddress',
			addressLocality: profile.locality,
			addressRegion: profile.region,
			addressCountry: 'US',
		},
		worksFor: { '@type': 'Organization', name: platform.company },
		alumniOf: { '@type': 'CollegeOrUniversity', name: 'The University of Texas at Austin' },
		knowsAbout: stack,
		sameAs: elsewhere.map((property) => property.href),
	});
}
