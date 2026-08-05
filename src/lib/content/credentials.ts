import type { Credential } from './types';

export const credentials: readonly Credential[] = Object.freeze([
	Object.freeze({
		title: 'Post Graduate Program, Artificial Intelligence & Machine Learning',
		issuer: 'UT Austin',
		detail:
			'Business applications of AI/ML — the formal grounding under the platform work that followed.',
	}),
	Object.freeze({
		title: 'US patent, multilingual emergency medical communication',
		issuer: 'US 20100223050 A1',
		// Stated precisely on purpose: inventorship and ownership are different
		// things, and the patent link is one click away. Implying the former
		// would break on the first reader who checks.
		detail: 'Held as a partner in Poly Lingo; filed by founder Ken Kelly.',
	}),
]);

/** Rendered as the stack chips and emitted as schema.org `knowsAbout`. */
export const stack: readonly string[] = Object.freeze([
	'TypeScript',
	'Python',
	'Rust',
	'Svelte',
	'React',
	'React Native',
	'Next.js',
	'Node.js',
	'Bun',
	'GraphQL',
	'PostgreSQL',
	'Redis',
	'Kafka',
	'Docker',
	'Kubernetes',
	'Terraform',
	'AWS Lambda',
	'AWS SageMaker',
	'EC2',
	'TensorFlow',
	'PyTorch',
	'AutoGluon',
	'AutoML',
	'MLOps',
	'RAG',
	'pgvector',
	'LangChain',
	'LangGraph',
	'MCP',
	'Agentic systems',
	'Neural networks',
	'Serverless',
	'Microservices',
	'CI/CD',
	'n8n',
	'Tailwind CSS',
]);
