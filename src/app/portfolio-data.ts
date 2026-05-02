export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  impact: string[];
  stack: string[];
  details: string[];
};

export const projects: Project[] = [
  {
    slug: 'convertlab',
    title: 'ConvertLab',
    eyebrow: 'Product engineering',
    summary:
      'A practical web product for file conversion, PDF and image workflows, authenticated utilities, and AI document chat.',
    impact: [
      'Built polished product flows for common document tasks.',
      'Connected web workflows with backend APIs and user journeys.',
      'Explored AI-powered document conversations with retrieval-style context.',
    ],
    stack: ['Angular', 'Spring Boot', 'REST APIs', 'AI workflows', 'PDF tools', 'Authentication'],
    details: [
      'ConvertLab represents the kind of product work I enjoy: useful utilities, clear user journeys, and reliable full-stack execution.',
      'The product combines document tooling, file workflows, authentication, backend services, and AI-assisted document experiences.',
      'For this portfolio, it is positioned as proof of practical delivery rather than a visual style reference.',
    ],
  },
  {
    slug: 'dashboard-systems',
    title: 'Dashboard Systems',
    eyebrow: 'Business tools',
    summary:
      'Focused interfaces for tracking operations, surfacing metrics, and making everyday product work easier to manage.',
    impact: [
      'Designed layouts that keep repeated workflows clear and fast.',
      'Created reusable UI patterns for lists, filters, forms, and detail views.',
      'Balanced interface polish with maintainable application structure.',
    ],
    stack: ['Angular', 'TypeScript', 'REST APIs', 'Forms', 'Charts-ready UI'],
    details: [
      'Dashboard work benefits from restraint: tight hierarchy, dependable states, and layouts built for scanning.',
      'The same thinking shapes this portfolio, especially in the skills, experience, and services pages.',
    ],
  },
  {
    slug: 'api-integrations',
    title: 'API Integrations',
    eyebrow: 'Backend collaboration',
    summary:
      'Web and backend integration work around authentication, payments, documents, and product workflows.',
    impact: [
      'Connected user-facing flows to backend services with clear error states.',
      'Handled practical product concerns like validation, loading states, and data shape changes.',
      'Kept implementation approachable for long-term maintenance.',
    ],
    stack: ['Spring Boot', 'Angular', 'Payments', 'Auth', 'REST'],
    details: [
      'I like working close to the boundary between UI and backend because that is where product quality often shows up.',
      'Good integrations make complex systems feel calm to the person using them.',
    ],
  },
];

export const services = [
  {
    title: 'MVP Builds',
    text: 'Shape and ship focused first versions with the right amount of polish, structure, and momentum.',
  },
  {
    title: 'Web Interfaces',
    text: 'Build responsive interfaces, forms, dashboards, and product flows with maintainable frontend code.',
  },
  {
    title: 'Backend APIs',
    text: 'Create and connect Spring Boot services, authentication flows, and practical REST integrations.',
  },
  {
    title: 'AI Document Workflows',
    text: 'Design document chat, extraction, retrieval-style experiences, and productivity tools around files.',
  },
  {
    title: 'Product Maintenance',
    text: 'Improve existing products through bug fixes, UI cleanup, performance work, and feature delivery.',
  },
  {
    title: 'Payments and Utilities',
    text: 'Support payment-focused journeys, file tools, PDF workflows, and operational business features.',
  },
];

export const skillGroups = [
  {
    title: 'Frontend',
    skills: [
      'Angular',
      'React',
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS',
      'Responsive UI',
      'Reactive Forms',
      'Design systems',
    ],
  },
  {
    title: 'Backend',
    skills: [
      'Spring Boot',
      'Node.js',
      'REST APIs',
      'OAuth',
      'Authentication',
      'Validation',
      'Service design',
    ],
  },
  {
    title: 'Data and Cloud',
    skills: ['SQL', 'AWS', 'AWS Bedrock', 'Deployments', 'Integrations'],
  },
  {
    title: 'Product Workflows',
    skills: ['Dashboards', 'Highcharts', 'File tools', 'PDF workflows', 'Image utilities', 'Payments'],
  },
  {
    title: 'AI and Documents',
    skills: ['Document chat', 'RAG-style retrieval', 'Prompted workflows', 'Content extraction'],
  },
  {
    title: 'Delivery',
    skills: ['Maintainable code', 'Debugging', 'Iteration', 'Clean handoff', 'Client communication'],
  },
];

export const experienceItems = [
  {
    period: '7 years',
    title: 'Web product development',
    text: 'Built and improved web products across modern interfaces, backend APIs, document workflows, dashboards, and business tools.',
  },
  {
    period: 'Recent focus',
    title: 'AI-assisted document products',
    text: 'Exploring practical AI workflows where document retrieval, chat, and file utilities help users complete real work faster.',
  },
  {
    period: 'Ongoing',
    title: 'Freelance-ready product support',
    text: 'Available for MVPs, maintenance, dashboard features, integrations, and focused product execution.',
  },
];
