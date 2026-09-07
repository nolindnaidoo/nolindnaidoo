import { injectAnalytics } from '@vercel/analytics/sveltekit';
import { dev } from '$app/environment';

// Vercel Web Analytics — the official SvelteKit injection point per Vercel's
// docs. No-ops outside Vercel; dev mode logs instead of sending.
injectAnalytics({ mode: dev ? 'development' : 'production' });

// Static site: prerender everything, ship no client router work we don't need.
export const prerender = true;
export const ssr = true;
export const trailingSlash = 'never';
