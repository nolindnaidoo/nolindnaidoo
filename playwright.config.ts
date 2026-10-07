import { defineConfig, devices } from '@playwright/test';

/**
 * Runs against the built static output, not the dev server — the artifact that
 * ships is the artifact under test. Mobile first, because the base styles target
 * the smallest screen and everything above it is enhancement.
 */
export default defineConfig({
	testDir: 'e2e',
	testMatch: '**/*.e2e.ts',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? 'github' : 'list',
	use: { baseURL: 'http://localhost:4173', trace: 'on-first-retry' },
	webServer: {
		command: 'bun run preview --port 4173',
		port: 4173,
		reuseExistingServer: !process.env.CI,
	},
	projects: [
		{ name: 'mobile', use: { ...devices['Pixel 7'] } },
		{ name: 'desktop', use: { ...devices['Desktop Chrome'] } },
	],
});
