import { describe, expect, it } from 'vitest';
import { stack } from '$content/credentials';
import { elsewhere, profile } from '$content/profile';
import { meta, SITE_URL } from '$content/site';
import { personSchema } from './person';

/**
 * The structured data is the entity-consolidation surface. If `sameAs` drifts
 * away from the links the page renders, a crawler stops resolving them as one
 * person — which is the entire reason the block exists.
 */
describe('personSchema', () => {
	const schema = JSON.parse(personSchema());

	it('is a Person rooted at the canonical origin', () => {
		expect(schema['@type']).toBe('Person');
		expect(schema.url).toBe(SITE_URL);
		expect(schema['@id']).toBe(`${SITE_URL}/#person`);
	});

	it('mirrors the rendered identity network exactly', () => {
		expect(schema.sameAs).toEqual(elsewhere.map((property) => property.href));
	});

	it('claims the handle as an alternate name', () => {
		expect(schema.alternateName).toContain(profile.handle);
	});

	it('derives knowsAbout from the rendered stack', () => {
		expect(schema.knowsAbout).toEqual([...stack]);
	});

	it('describes the person the way the document does', () => {
		expect(schema.description).toBe(meta.description);
	});

	it('emits JSON that cannot break out of a script tag', () => {
		// A literal closing tag in the payload would end the block early and
		// spill the remainder into the document as markup.
		expect(personSchema()).not.toContain('</script');
	});
});
