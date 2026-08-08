import { describe, expect, it } from 'vitest';
import { stack } from '$content/credentials';
import { elsewhere, profile } from '$content/profile';
import { projects } from '$content/projects';
import { meta, SITE_URL } from '$content/site';
import { graph, personSchema, personSchemaTag } from './person';

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

describe('personSchemaTag', () => {
	const tag = personSchemaTag();

	it('wraps the payload in a typed script element', () => {
		expect(tag.startsWith('<script type="application/ld+json">')).toBe(true);
		expect(tag.endsWith('</script>')).toBe(true);
	});

	it('carries the graph unchanged', () => {
		const inner = tag.slice('<script type="application/ld+json">'.length, -'</script>'.length);
		expect(inner).toBe(graph());
		expect(() => JSON.parse(inner)).not.toThrow();
	});

	it('closes exactly once', () => {
		// A payload containing its own closing tag would end the element early
		// and spill the remainder into the document as markup.
		expect(tag.split('</script>')).toHaveLength(2);
	});
});

describe('graph', () => {
	const parsed = JSON.parse(graph());
	const person = parsed['@graph'].find((node: { '@type': string }) => node['@type'] === 'Person');
	const apps = parsed['@graph'].filter(
		(node: { '@type': string }) => node['@type'] === 'SoftwareApplication',
	);

	it('carries the person and every project', () => {
		expect(person).toBeDefined();
		expect(apps).toHaveLength(projects.length);
	});

	it('attributes every product to the person by id', () => {
		// The edge that makes the graph a graph. Without it the products carry
		// their authority alone and none of it reaches the person.
		for (const app of apps) {
			expect(app.author['@id']).toBe(person['@id']);
		}
	});

	it('describes each product with the copy the site renders', () => {
		for (const project of projects) {
			const app = apps.find((node: { name: string }) => node.name === project.name);
			expect(app, `${project.name} is missing from the graph`).toBeDefined();
			expect(app.url).toBe(project.href);
			expect(app.description).toBe(project.summary);
		}
	});
});
