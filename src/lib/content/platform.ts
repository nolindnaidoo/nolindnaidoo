import type { Capability, PlatformSystem } from './types';

/**
 * Current work. The company name appears here and nowhere else in the codebase,
 * so a rebrand is a one-line edit rather than a grep across components and
 * structured data.
 */
export const platform: Readonly<{
	company: string;
	lede: string;
	body: string;
	systems: readonly PlatformSystem[];
	capabilities: readonly Capability[];
}> = Object.freeze({
	company: 'Offensive Edge',
	lede: 'On-premise AI systems for partners who can’t send their data anywhere.',
	body: `I architect and scale the Offensive Edge Intelligence Platform — predictive and
		sentiment intelligence delivered as high-performance systems that run inside the
		customer’s own boundary. The differentiator isn’t the models, it’s the deployment
		posture: a cloudless API framework that gives enterprise and classified clients full
		data sovereignty, with no third-party cloud in the path.`,
	systems: Object.freeze([
		Object.freeze({
			kind: 'Predictive',
			name: 'EdgeSeeker',
			summary:
				'A quant-verified sports intelligence system built on a proprietary AutoML ensemble, benchmarked against professional bettors and validated by independent quantitative reviewers.',
		}),
		Object.freeze({
			kind: 'Sentiment',
			name: 'SentimentPro',
			summary:
				'Computational media analysis — bias, tone, and influence quantified in real time across news and social streams.',
		}),
	]),
	capabilities: Object.freeze([
		Object.freeze({
			label: 'Modeling',
			detail:
				'Proprietary AutoML ensemble architecture holding verified 80%+ accuracy and high-80s ROC-AUC across thousands of out-of-sample validations.',
		}),
		Object.freeze({
			label: 'MLOps',
			detail:
				'SageMaker and AutoGluon behind containerized Node.js microservices — parallel model deployment, automated versioning, sub-second inference.',
		}),
		Object.freeze({
			label: 'Sovereignty',
			detail:
				'A cloudless API framework enabling secure API-level integration with no third-party cloud exposure.',
		}),
		Object.freeze({
			label: 'Product',
			detail:
				'Full-stack architecture across Next.js, React, React Native, TypeScript and Python, unifying every product surface on one inference backbone.',
		}),
		Object.freeze({
			label: 'Validation',
			detail:
				'Independent quantitative and academic review used deliberately as an outside check on institutional-grade reliability claims.',
		}),
	]),
});
