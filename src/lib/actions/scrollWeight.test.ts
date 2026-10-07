// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { scrollWeight } from './scrollWeight';

/**
 * The only stateful code on the site, and the one place a leak or a missed
 * cleanup would actually cost something. It also has to honour a preference
 * that can change mid-session, which is the part most implementations get
 * wrong by reading the media query once at mount.
 */

type MediaListener = (event: MediaQueryListEvent) => void;

/** A controllable prefers-reduced-motion, since happy-dom's is inert. */
function stubReducedMotion(initial: boolean) {
	const listeners = new Set<MediaListener>();
	const query = {
		matches: initial,
		addEventListener: (_: string, listener: MediaListener) => listeners.add(listener),
		removeEventListener: (_: string, listener: MediaListener) => listeners.delete(listener),
	};

	vi.stubGlobal(
		'matchMedia',
		vi.fn(() => query),
	);

	return {
		set(matches: boolean) {
			query.matches = matches;
			for (const listener of listeners) listener({ matches } as MediaQueryListEvent);
		},
		get listenerCount() {
			return listeners.size;
		},
	};
}

function scrollTo(y: number) {
	Object.defineProperty(window, 'scrollY', { value: y, configurable: true });
	window.dispatchEvent(new Event('scroll'));
}

beforeEach(() => {
	Object.defineProperty(window, 'innerHeight', { value: 1000, configurable: true });
	Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
	// Synchronous frames keep the assertions about painted values direct.
	vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
		callback(0);
		return 1;
	});
	vi.stubGlobal('cancelAnimationFrame', vi.fn());
});

afterEach(() => vi.unstubAllGlobals());

describe('with motion allowed', () => {
	it('paints the resting weight immediately', () => {
		stubReducedMotion(false);
		const node = document.createElement('h1');
		scrollWeight(node, undefined);

		expect(node.style.fontWeight).toBe('800');
		expect(node.style.letterSpacing).toBe('-0.055em');
	});

	it('interpolates toward the end weight as the reader scrolls away', () => {
		stubReducedMotion(false);
		const node = document.createElement('h1');
		scrollWeight(node, undefined);

		scrollTo(425); // half of innerHeight * 0.85
		expect(Number(node.style.fontWeight)).toBeLessThan(800);
		expect(Number(node.style.fontWeight)).toBeGreaterThan(410);
	});

	it('clamps at the far end instead of overshooting', () => {
		stubReducedMotion(false);
		const node = document.createElement('h1');
		scrollWeight(node, undefined);

		scrollTo(100_000);
		expect(node.style.fontWeight).toBe('410');
	});

	it('coalesces two scrolls in the same frame into one paint', () => {
		// The rAF guard: without it every scroll event schedules a frame, which
		// is the difference between one paint and dozens during a flick.
		stubReducedMotion(false);
		const frames: FrameRequestCallback[] = [];
		vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
			frames.push(callback);
			return frames.length;
		});
		const node = document.createElement('h1');
		scrollWeight(node, undefined);

		scrollTo(100);
		scrollTo(200);
		expect(frames).toHaveLength(1);
	});

	it('honours a caller-supplied range', () => {
		stubReducedMotion(false);
		const node = document.createElement('h1');
		scrollWeight(node, { weight: [500, 100], tracking: [0, -0.02] });

		expect(node.style.fontWeight).toBe('500');
		scrollTo(100_000);
		expect(node.style.fontWeight).toBe('100');
	});
});

describe('with reduced motion', () => {
	it('never writes inline styles', () => {
		stubReducedMotion(true);
		const node = document.createElement('h1');
		scrollWeight(node, undefined);

		scrollTo(500);
		expect(node.style.fontWeight).toBe('');
		expect(node.style.letterSpacing).toBe('');
	});

	it('starts painting when the preference is turned off mid-session', () => {
		// Latching the query at mount is the common bug; this is the assertion
		// that would catch it.
		const motion = stubReducedMotion(true);
		const node = document.createElement('h1');
		scrollWeight(node, undefined);
		expect(node.style.fontWeight).toBe('');

		motion.set(false);
		expect(node.style.fontWeight).toBe('800');
	});

	it('clears what it painted when the preference is turned on mid-session', () => {
		const motion = stubReducedMotion(false);
		const node = document.createElement('h1');
		scrollWeight(node, undefined);
		expect(node.style.fontWeight).toBe('800');

		motion.set(true);
		expect(node.style.fontWeight).toBe('');
	});
});

describe('teardown', () => {
	it('removes its listeners and its inline styles', () => {
		const motion = stubReducedMotion(false);
		const node = document.createElement('h1');
		const action = scrollWeight(node, undefined);
		expect(motion.listenerCount).toBe(1);

		action?.destroy?.();

		expect(motion.listenerCount).toBe(0);
		expect(node.style.fontWeight).toBe('');
		expect(node.style.letterSpacing).toBe('');
	});

	it('stops responding to scroll after destroy', () => {
		stubReducedMotion(false);
		const node = document.createElement('h1');
		const action = scrollWeight(node, undefined);
		action?.destroy?.();

		scrollTo(500);
		expect(node.style.fontWeight).toBe('');
	});

	it('returns a frozen handle', () => {
		stubReducedMotion(false);
		const action = scrollWeight(document.createElement('h1'), undefined);
		expect(Object.isFrozen(action)).toBe(true);
	});
});
