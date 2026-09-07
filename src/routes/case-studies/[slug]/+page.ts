import { error } from '@sveltejs/kit';
import { caseStudies } from '$content/case-studies';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

/**
 * The static adapter runs with no options, so a route it cannot enumerate is a
 * build failure rather than a fallback. Deriving the list from the content
 * module is what keeps that true: a study added to `case-studies.ts` gets a
 * page without anyone remembering to register it here.
 */
export const entries: EntryGenerator = () => caseStudies.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const study = caseStudies.find((entry) => entry.slug === params.slug);
	// Unreachable through a prerendered build, since `entries` only emits slugs
	// that resolve. It exists for the dev server and for the type, and it fails
	// loudly rather than rendering a page with nothing in it.
	if (!study) error(404, `No case study named "${params.slug}"`);
	return { study };
};
