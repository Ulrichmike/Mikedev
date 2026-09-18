import {
  Project,
  Service,
  Experience,
  UserProfile,
  ChallengeSnippet,
} from "../types";

export const initialProfile: UserProfile = {
  name: "Mike Wéda",
  alias: "MW.dev · Software Engineer",
  role: "Développeur Full-Stack & Tech Creator",
  specialty: "Architectures React, TypeScript & Systèmes Distribués",
  bio: "Je conçois des architectures web robustes, performantes et des interfaces produit d'exception. À la croisée de l'ingénierie logicielle moderne et de l'artisanat design.",
  email: "mikeweda10@gmail.com",
  location: "Paris, France · Remote-Friendly",
  available: true,
  statusText: "Disponible pour nouvelles missions freelance & opportunités CDI",
  github: "https://github.com/mikeweda",
  linkedin: "https://linkedin.com/in/mikeweda",
  twitter: "https://twitter.com/mikeweda_dev",
  youtube: "https://youtube.com/@mikeweda_tech",
  avatarUrl: "/assets/portrait.jpg",
};

export const technologies = [
  { name: "TypeScript", category: "lang", level: "Expert" },
  { name: "React 19", category: "frontend", level: "Expert" },
  { name: "Next.js", category: "frontend", level: "Expert" },
  { name: "Tailwind CSS", category: "styling", level: "Expert" },
  { name: "Node.js", category: "backend", level: "Avancé" },
  { name: "Express", category: "backend", level: "Avancé" },
  { name: "PostgreSQL", category: "database", level: "Avancé" },
  { name: "Docker", category: "devops", level: "Intermédiaire" },
  { name: "GraphQL", category: "backend", level: "Avancé" },
  { name: "Supabase", category: "backend", level: "Expert" },
  { name: "Redis", category: "database", level: "Avancé" },
  { name: "Figma", category: "design", level: "Avancé" },
  { name: "Vitest / Jest", category: "testing", level: "Avancé" },
  { name: "CI / CD", category: "devops", level: "Avancé" },
];

export const marqueeItems = [
  "Next.js 15",
  "TypeScript",
  "React 19",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "Supabase",
  "Redis",
  "GraphQL",
  "Figma",
  "Clean Architecture",
  "Micro-Frontends",
  "Web Performance",
  "UI/UX Craft",
];

export const marqueeTaglines = [
  "Zero Tech Debt",
  "Lighthouse Score 100",
  "Interfaces Polies au Pixel Près",
  "Code Documenté & Testé",
  "Architecture Modulaire",
  "Sécurité & Scalabilité",
  "Orientation Produit",
  "Expérience Utilisateur Fluide",
];

export const projectsData: Project[] = [
  {
    id: "zenith-saas",
    title: "Zenith Studio — Plateforme Collaboratrice IA",
    tagline:
      "Workspace d'édition vidéo et audio assisté par modèles génératifs en temps réel",
    description:
      "Une suite SaaS complète permettant aux créateurs de contenu de découper, sous-titrer et transcrire leurs podcasts et vidéos à la vitesse de l'éclair avec synchronisation en direct via WebSockets.",
    category: "saas",
    tags: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "WebSockets",
      "Node.js",
      "Redis",
    ],
    metrics: "+45k utilisateurs actifs · 99.98% uptime",
    githubUrl: "https://github.com/zenith-studio/platform",
    liveUrl: "https://zenith-preview.dev",
    domainName: "zenith.studio.ai",
    previewType: "saas-editor",
    featured: true,
    highlights: [
      "Pipeline de streaming audio avec détection de silences par WebAssembly",
      "Éditeur de timeline Canvas avec rendu fluide à 60 FPS",
      "Système d'abonnements Stripe et gestion d'équipes multi-rôles",
    ],
    architecture:
      "Architecture hybride Event-Driven avec queue BullMQ sur Redis, orchestrée par un cluster Node.js et un frontend Next.js App Router.",
    accentColor: "from-blue-500/20 to-indigo-500/10",
  },
  {
    id: "dev-vault",
    title: "DevVault — Snippet Engine & Design Tokens",
    tagline:
      "Gestionnaire de snippets de code et design tokens pour équipes d'ingénierie",
    description:
      "Outil moderne pour développeurs permettant d'organiser, versionner et partager des composants d'interface, snippets d'algorithmes et configurations DevOps avec syntax highlighting instantané.",
    category: "opensource",
    tags: ["React 19", "TypeScript", "Tailwind", "Supabase", "Monaco Editor"],
    metrics: "1.2k Stars GitHub · 250+ forks",
    githubUrl: "https://github.com/devvault-io/engine",
    liveUrl: "https://devvault.app",
    domainName: "devvault.app/explore",
    previewType: "code-snippets",
    featured: true,
    highlights: [
      "Recherche floue ultra-rapide par indexation locale IndexedDB",
      "Génération automatique de packages NPM et exports CSS / Tailwind",
      "Support hors-ligne PWA complet avec synchronisation bidirectionnelle",
    ],
    architecture:
      "Frontend SPA React avec état unifié Zustand, synchronisation temps réel Supabase Postgres Changes.",
    accentColor: "from-amber-500/20 to-orange-500/10",
  },
  {
    id: "pulse-metrics",
    title: "PulseAnalytics — Observabilité Web Vitals",
    tagline:
      "Tableau de bord de monitoring des performances front-end en production",
    description:
      "SDK ultra-léger (< 1.5kb) et dashboard analytique pour traquer FID, LCP, CLS et INP avec alertes proactives lors de régressions de vitesse.",
    category: "fullstack",
    tags: ["TypeScript", "Express", "ClickHouse", "React", "Tailwind", "D3.js"],
    metrics: "50M requêtes/jour traitées · Latence < 15ms",
    githubUrl: "https://github.com/pulse-telemetry/core",
    liveUrl: "https://pulse.dev",
    domainName: "pulse.dev/vitals",
    previewType: "metrics-dashboard",
    featured: true,
    highlights: [
      "Collecteur de métriques beacon sans impact sur le Main Thread",
      "Graphiques interactifs D3.js avec zoom temporel adaptatif",
      "Alertes Slack et Discord par webhooks automatisés",
    ],
    architecture:
      "Architecture distribuée optimisée pour l'écriture intensive en bases temporelles colonnaires.",
    accentColor: "from-emerald-500/20 to-teal-500/10",
  },
  {
    id: "neuro-graph",
    title: "NeuroGraph — Orchestrateur d'Agents IA",
    tagline:
      "Studio no-code / low-code de composition visuelle de pipelines d'agents autonomes",
    description:
      "Environnement d'orchestration pour connecter modèles LLMs, outils de scraping web, bases vectorielles et webhooks dans un graphe de flux interactif haute vélocité.",
    category: "saas",
    tags: ["React Flow", "FastAPI", "TypeScript", "LangChain", "PostgreSQL"],
    metrics: "12k agents déployés · 99.9% précision d'exécution",
    githubUrl: "https://github.com/neurograph/core",
    liveUrl: "https://neurograph.ai",
    domainName: "neurograph.ai/flow",
    previewType: "agentic-canvas",
    featured: true,
    highlights: [
      "Moteur d'exécution asynchrone avec streaming SSE de réponses",
      "Canvas infini 60 FPS avec mini-map et rollback d'état",
      "Validation stricte de schémas JSON et garde-fous de sécurité",
    ],
    architecture:
      "Microservices Docker avec broker RabbitMQ, interface React Flow et persistance état sur PostgreSQL.",
    accentColor: "from-purple-500/20 to-pink-500/10",
  },
  {
    id: "chrono-craft",
    title: "ChronoCraft — Gamified Focus OS",
    tagline:
      "Application de productivité deep work inspirée de la méthode Pomodoro et de RPGs",
    description:
      "Expérience interactive web combinant sessions de concentration chronométrées, ambiances sonores synthétisées binaurales et progression d'avatar par palier de focus.",
    category: "creative",
    tags: ["React", "Web Audio API", "Framer Motion", "Tailwind CSS"],
    metrics: "+15 000 sessions de concentration complétées",
    githubUrl: "https://github.com/chronocraft/app",
    liveUrl: "https://chrono-focus.app",
    domainName: "chronocraft.design",
    previewType: "audio-focus",
    featured: false,
    highlights: [
      "Moteur de synthèse sonore procédurale (bruit rose, pluie, fréquences 432Hz)",
      "Animations de respiration guidée avec retour tactile et haptique",
      "Sauvegarde chiffrée locale sans pistage",
    ],
    architecture:
      "Architecture entièrement exécutée côté client avec Web Workers et Web Audio API native.",
    accentColor: "from-amber-500/20 to-rose-500/10",
  },
  {
    id: "apex-commerce",
    title: "ApexStore — E-Commerce 3D Headless",
    tagline:
      "Boutique ultra-rapide avec configurateur 3D temps réel et checkout instantané",
    description:
      "Plateforme e-commerce nouvelle génération avec temps de chargement sous la seconde, personnalisation de produits en WebGL et intégration Stripe Elements.",
    category: "fullstack",
    tags: ["Next.js 15", "Three.js", "Stripe API", "Tailwind", "Zustand"],
    metrics: "Temps de chargement 0.4s · Taux de conversion +38%",
    githubUrl: "https://github.com/apex-store/headless",
    liveUrl: "https://apexstore.dev",
    domainName: "apexstore.dev/catalog",
    previewType: "ecommerce",
    featured: false,
    highlights: [
      "Visualiseur de produits 3D interactif optimisé pour mobile",
      "Architecture Headless avec gestion du panier optimiste",
      "Paiements Apple Pay & Google Pay en 1 clic",
    ],
    architecture:
      "Frontend Next.js statique régénéré (ISR) avec Edge Middleware et backend serverless.",
    accentColor: "from-cyan-500/20 to-blue-500/10",
  },
];

export const servicesData: Service[] = [
  {
    id: "fullstack-architecture",
    number: "01",
    title: "Architecture & Développement Full-Stack",
    subtitle: "Du concept à la mise en production haut débit",
    description:
      "Conception d'applications web scalables avec TypeScript, React et Node.js. Création d'architectures propres, maintenables et pensées pour grandir sans friction.",
    skills: [
      "Next.js / React",
      "Node.js & Express",
      "Bases de données SQL & NoSQL",
      "APIs RESTful & GraphQL",
    ],
    deliverables: [
      "Applications web de bout en bout",
      "Systèmes d'authentification & RBAC",
      "Intégrations de paiement (Stripe)",
      "Tests automatisés unitaires & E2E",
    ],
    icon: "Layers",
  },
  {
    id: "frontend-craft",
    number: "02",
    title: "UI/UX Craft & Design Systems",
    subtitle: "Des interfaces vivantes, précises et engageantes",
    description:
      "Transformation de maquettes Figma en code fluide et réactif. Micro-interactions soignées, accessibilité rigoureuse et typographie mesurée au millimètre.",
    skills: [
      "Design Systems modulaires",
      "Micro-animations fluides",
      "Tailwind CSS & CSS moderne",
      "Accessibilité WCAG AA",
    ],
    deliverables: [
      "Bibliothèques de composants réutilisables",
      "Animations interactives au scroll",
      "Adaptabilité responsive mobile-first",
      "Expérience utilisateur sans accroc",
    ],
    icon: "Palette",
  },
  {
    id: "perf-audit",
    number: "03",
    title: "Performance & Optimisation Web",
    subtitle: "Chaque milliseconde compte pour votre conversion",
    description:
      "Audit approfondi de la vitesse de chargement, des Core Web Vitals et du SEO technique. Élimination des goulots d'étranglement pour un score de 95+ garanti.",
    skills: [
      "Core Web Vitals (LCP, FID, CLS)",
      "Optimisation du bundle JS",
      "Stratégies de caching & CDN",
      "SEO technique & structured data",
    ],
    deliverables: [
      "Rapport d'audit de performance détaillé",
      "Refactoring du rendu critique",
      "Diminution du temps de premier octet (TTFB)",
      "Score Google Lighthouse optimisé",
    ],
    icon: "Zap",
  },
  {
    id: "consulting-tech",
    number: "04",
    title: "Mentorat & Direction Technique",
    subtitle: "Accompagnement d'équipes et culture du code propre",
    description:
      "Partage de bonnes pratiques d'ingénierie logicielle, revues de code minutieuses et cadrage technique de projets ambitieux.",
    skills: [
      "Code Review exigeante",
      "Choix de stack technologique",
      "Documentation technique claire",
      "Création de contenu technique vulgarisé",
    ],
    deliverables: [
      "Roadmaps techniques pragmatiques",
      "Standards de code d'équipe",
      "Sessions de live coding & workshops",
      "Rapports de résilience logicielle",
    ],
    icon: "Code2",
  },
];

export const experiencesData: Experience[] = [
  {
    id: "exp-1",
    period: "2024 — Présent",
    role: "Lead Développeur Full-Stack & Tech Consultant",
    company: "Freelance & Création Indépendante",
    location: "Paris / Remote",
    type: "Freelance",
    description:
      "Accompagnement de startups et agences digitales dans la conception d'applications SaaS et plateformes web modernes sous React, Next.js et Node.js.",
    achievements: [
      "Conception de 6 applications SaaS avec déploiement continu et 100% de tests passants",
      "Réduction moyenne de 40% des temps de chargement sur les refontes de clients",
      "Publication régulière d'articles et guides techniques suivis par une communauté de devs",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Docker",
      "PostgreSQL",
    ],
  },
  {
    id: "exp-2",
    period: "2022 — 2024",
    role: "Senior Frontend Engineer",
    company: "Studio Digital & Scale-up",
    location: "Paris, France",
    type: "CDI",
    description:
      "Pilotage du développement frontend pour des applications e-commerce et dashboards B2B à fort trafic.",
    achievements: [
      "Création et maintenance d'un Design System interne partagé entre 14 développeurs",
      "Refonte de l'architecture frontend ayant augmenté le taux de conversion de +18%",
      "Mise en place de tests E2E avec Playwright et pipelines GitHub Actions",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Redux Toolkit / Zustand",
      "Tailwind",
      "Jest",
    ],
  },
  {
    id: "exp-3",
    period: "2021 — 2022",
    role: "Développeur Web Full-Stack",
    company: "Agence Web & Innovation",
    location: "France",
    type: "CDI",
    description:
      "Développement de plateformes web sur-mesure, portails clients interactifs et APIs REST performantes.",
    achievements: [
      "Développement de plus de 15 projets web livrés dans les délais et budgets",
      "Intégration d'APIs tierces complexes (Stripe, HubSpot, Algolia, SendGrid)",
    ],
    technologies: [
      "JavaScript / TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "React",
    ],
  },
];

export const challengeSnippets: ChallengeSnippet[] = [
  {
    id: "typing-1",
    title: "TypeScript Type Narrowing",
    language: "typescript",
    code: `const calculateDiscount = (total: number, isVip: boolean): number => {
  if (total <= 0) return 0;
  const rate = isVip ? 0.25 : 0.10;
  return Number((total * (1 - rate)).toFixed(2));
};`,
    explanation:
      "Fonction pure TypeScript avec calcul arithmétique rigoureux et limitation des décimales.",
  },
  {
    id: "typing-2",
    title: "React Custom Hook State",
    language: "typescript",
    code: `export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}`,
    explanation:
      "Hook personnalisé React avec nettoyage d'effet propre pour éviter les memory leaks.",
  },
  {
    id: "typing-3",
    title: "Async Data Pipeline",
    language: "typescript",
    code: `async function fetchMetrics(apiKey: string): Promise<Record<string, number>> {
  const res = await fetch("/api/v1/metrics", {
    headers: { Authorization: \`Bearer \${apiKey}\` }
  });
  if (!res.ok) throw new Error("Erreur réseau");
  return res.json();
}`,
    explanation:
      "Gestion asynchrone sécurisée avec contrôle strict de la réponse HTTP.",
  },
];

export const bugHunterChallenges = [
  {
    id: "bug-1",
    title: "Le Piège de la Mutation d'État React",
    snippet: `// Trouve la ligne qui enfreint la règle d'immutabilité :
1: function TaskList({ tasks, onToggle }) {
2:   const handleComplete = (id) => {
3:     const task = tasks.find(t => t.id === id);
4:     task.completed = !task.completed; // <-- Bug
5:     onToggle([...tasks]);
6:   };
7:   return <ul>{tasks.map(renderTask)}</ul>;
8: }`,
    correctLine: 4,
    explanation:
      "Ligne 4 : mutation directe de l'objet task en mémoire ! En React, il faut cloner l'objet avec `{ ...task, completed: !task.completed }`.",
    hint: "Recherche où l'objet d'origine est modifié sur place.",
  },
  {
    id: "bug-2",
    title: "La Fuite Mémoire du Timer",
    snippet: `// Pourquoi ce composant provoque un avertissement React ?
1: function LiveClock() {
2:   const [time, setTime] = useState(new Date());
3:   useEffect(() => {
4:     setInterval(() => setTime(new Date()), 1000);
5:     // Oubli de fonction de nettoyage !
6:   }, []);
7:   return <span>{time.toLocaleTimeString()}</span>;
8: }`,
    correctLine: 4,
    explanation:
      "Ligne 4/5 : aucun `clearInterval(timer)` n'est retourné dans le cleanup du useEffect ! Chaque démontage laisse le timer actif.",
    hint: "Que se passe-t-il lorsque le composant est démonté ?",
  },
  {
    id: "bug-3",
    title: "Le Piège Asynchrone de la Boucle forEach",
    snippet: `// Trouve l'instruction asynchrone qui ne bloque pas comme attendu :
1: async function saveAll(items) {
2:   items.forEach(async (item) => {
3:     await db.insert(item);
4:   });
5:   console.log("Toutes les données sont insérées !"); // faux !
6: }`,
    correctLine: 2,
    explanation:
      "Ligne 2 : Array.prototype.forEach n'attend JAMAIS les promesses ! Il faut utiliser `for (const item of items)` ou `Promise.all(items.map(...))`.",
    hint: "forEach supporte-t-il vraiment l'attente séquentielle des promesses ?",
  },
];
