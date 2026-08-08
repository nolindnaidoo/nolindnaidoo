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
	// Ordered for the reader being hired: the ML/agentic production lane first
	// (what senior AI roles filter on), then languages, then app frameworks,
	// then data + infra. Every entry survives "an hour of interview" — and
	// nothing names a tool behind SplitWinner's seam (model families and
	// training tooling stay out; calibration/conformal are already public
	// on splitwinner.com, so they leak nothing).
	'MLOps',
	'MLflow',
	'scikit-learn',
	'TensorFlow',
	'PyTorch',
	'ONNX',
	'Probability calibration',
	'Conformal prediction',
	'AutoML',
	'Agentic systems',
	'LangChain',
	'LangGraph',
	'Langfuse',
	'MCP',
	'RAG',
	'pgvector',
	'TypeScript',
	'Python',
	'Rust',
	'React',
	'React Native',
	'Next.js',
	'Svelte',
	'Node.js',
	'Bun',
	'GraphQL',
	'PostgreSQL',
	'Redis',
	'Kafka',
	'n8n',
	'Docker',
	'Kubernetes',
	'Terraform',
	'AWS Lambda',
	'AWS SageMaker',
	'EC2',
	'Serverless',
	'Microservices',
	'CI/CD',
	'Tailwind CSS',
]);
