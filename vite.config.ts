import { sveltekit } from '@sveltejs/kit/vite';
// vitest/config, not vite — `test` is not part of Vite's own config type.
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.test.ts'],
		environment: 'node',
	},
});
