import type {
  JourneyStep,
  Service,
  SkillGroup,
  Testimonial,
  UserProfile,
} from "@/types";

/* ============================================================
 * IDENTITÉ
 * ⚠️ Textes = brouillons à relire et ajuster (aucun chiffre inventé).
 * ============================================================ */
export const initialProfile: UserProfile = {
  name: "Mike Weda",
  title: "Digital Product Builder",
  tagline:
    "I design, engineer and build digital products that solve real-world problems.",
  intro:
    "Je conçois et développe des produits numériques de bout en bout : de la stratégie produit à l'architecture technique, jusqu'à l'interface que les utilisateurs ont plaisir à utiliser. SaaS, plateformes éducatives, commerce en ligne ou mobilité urbaine — je construis des solutions pensées pour des problèmes concrets, souvent ancrés dans les réalités africaines.",
  manifesto: [
    "Des organisateurs d'événements qui jonglent entre des outils qui ne se parlent pas.",
    "Des élèves qui peinent à trouver des ressources classées par classe et par niveau.",
    "Des motos coincées dans la congestion, faute d'information fiable sur l'état des routes.",
    "Je construis des produits pour ces problèmes-là : concrets, proches, et souvent ignorés par des outils pensés ailleurs.",
  ],
  bio: [
    "Basé à Douala, je travaille à la croisée du produit, du design et de l'ingénierie. Mon point de départ n'est jamais la technologie, mais le problème : qui le rencontre, pourquoi il compte, et ce qui empêche aujourd'hui de le résoudre.",
    "J'ai construit des plateformes très différentes — un SaaS événementiel multi-modules, une plateforme d'apprentissage par abonnement, des expériences e-commerce, une application de mobilité communautaire. Cette diversité me permet d'aborder chaque projet avec une vision produit complète.",
  ],
  philosophy:
    "Un bon produit numérique se juge à ce qu'il change pour ses utilisateurs, pas au nombre de fonctionnalités. Je privilégie des architectures simples et solides, des interfaces claires et des itérations rapides, guidées par l'usage réel.",
  differentiators: [
    {
      title: "Pensée produit",
      text: "Je ne me contente pas d'exécuter un cahier des charges : je questionne le besoin, priorise et structure le produit avant d'écrire du code.",
    },
    {
      title: "Du design au déploiement",
      text: "Interface, architecture, base de données, paiements : je prends en charge l'ensemble de la chaîne, sans perte d'information entre les étapes.",
    },
    {
      title: "Ancré dans le terrain",
      text: "Mobile Money, connectivité variable, usages mobiles : je conçois pour les contraintes réelles des utilisateurs africains.",
    },
  ],
  domains: [
    "Product Engineering",
    "Full-Stack Development",
    "SaaS Development",
    "Digital Experiences",
  ],
  email: "mikeweda10@gmail.com",
  city: "Douala",
  country: "Cameroun",
  timezone: "Africa/Douala",
  timezoneLabel: "WAT",
  available: true,
  availability: "Freelance, collaborations & opportunités",
  github: "https://github.com/Ulrichmike",
  // ⚠️ Vérifier cette URL
  linkedin: "https://linkedin.com/in/mikeweda",
  // whatsapp: "2376XXXXXXXX", // décommenter pour afficher le bouton WhatsApp
  avatarUrl: "/assets/portrait.jpg",
};

/* ============================================================
 * BANDEAU DE CRÉDIBILITÉ
 * ============================================================ */
export const marqueeItems = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Prisma",
  "Supabase",
  "PostgreSQL",
  "Stripe",
  "Flutterwave",
  "Fapshi",
  "Figma",
  "Motion",
];

export const marqueeTaglines = [
  "Product Engineering",
  "SaaS Development",
  "EdTech",
  "Digital Commerce",
  "Mobility Tech",
  "Mobile Money & paiements",
  "UI/UX Design",
  "Made in Douala",
];

/* ============================================================
 * SERVICES — ce que je construis
 * ============================================================ */
export const servicesData: Service[] = [
  {
    id: "saas",
    title: "Développement SaaS",
    description: "Concevoir et construire des produits SaaS évolutifs.",
    problems: [
      "Une idée de plateforme à transformer en produit",
      "Des outils dispersés à centraliser",
      "Un modèle d'abonnement à mettre en place",
    ],
    deliverables: [
      "Architecture multi-modules",
      "Organisations, rôles & permissions",
      "Plans & abonnements",
      "Tableaux de bord",
    ],
    proof: ["eventage", "last"],
  },
  {
    id: "webapp",
    title: "Applications web",
    description:
      "Transformer des besoins métier complexes en applications fonctionnelles.",
    problems: [
      "Des processus métier gérés à la main",
      "Des données éparpillées",
      "Un besoin spécifique sans solution du marché",
    ],
    deliverables: [
      "Application web responsive",
      "Espace administrateur",
      "Gestion des utilisateurs",
      "Intégrations tierces",
    ],
    proof: ["last", "road-alert"],
  },
  {
    id: "product-engineering",
    title: "Product Engineering",
    description:
      "De l'architecture produit à une solution prête pour la production.",
    problems: [
      "Un produit à structurer avant de le développer",
      "Une base technique qui ne suit plus",
      "Des fonctionnalités qui communiquent mal entre elles",
    ],
    deliverables: [
      "Modélisation des données",
      "Architecture technique",
      "MVP fonctionnel",
      "Plan d'évolution",
    ],
    proof: ["eventage", "road-alert"],
  },
  {
    id: "uiux",
    title: "UI/UX & design d'interface",
    description: "Créer des expériences numériques intuitives et soignées.",
    problems: [
      "Une interface confuse qui fait fuir",
      "Une marque sans présence digitale à sa hauteur",
      "Des parcours utilisateurs trop longs",
    ],
    deliverables: [
      "Parcours utilisateurs",
      "Maquettes Figma",
      "Design system",
      "Interfaces responsive",
    ],
    proof: ["africa-elite-club", "eventage"],
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    description:
      "Construire des expériences de commerce digital orientées conversion.",
    problems: [
      "Des produits mal mis en valeur",
      "Des ventes qui dépendent uniquement des réseaux sociaux",
      "Un tunnel de commande qui décourage",
    ],
    deliverables: [
      "Catalogue & fiches produits",
      "Panier & tunnel de commande",
      "Paiements en ligne",
      "Canal WhatsApp",
    ],
    proof: ["africa-elite-club", "spacekit"],
  },
  {
    id: "backend",
    title: "API & backend",
    description: "Développer les systèmes qui font tourner les produits.",
    problems: [
      "Une application sans backend fiable",
      "Des paiements à intégrer",
      "Des données à sécuriser",
    ],
    deliverables: [
      "APIs REST",
      "Authentification",
      "Intégration Mobile Money & carte",
      "Base de données PostgreSQL",
    ],
    proof: ["last", "road-alert"],
  },
  {
    id: "strategy",
    title: "Stratégie produit",
    description: "Transformer des idées en produits numériques structurés.",
    problems: [
      "Une idée encore floue",
      "Trop de fonctionnalités pour un premier lancement",
      "Une offre difficile à présenter en ligne",
    ],
    deliverables: [
      "Cadrage & priorisation",
      "Définition du MVP",
      "Parcours de conversion",
      "Feuille de route",
    ],
    proof: ["learning-academy", "eventage"],
  },
];

/* ============================================================
 * MÉTHODE — How I work
 * ============================================================ */
export const processSteps = [
  {
    id: "research",
    title: "Research & Discovery",
    text: "Comprendre le marché, les utilisateurs et le problème réel avant toute solution.",
  },
  {
    id: "definition",
    title: "Problem Definition",
    text: "Formuler précisément le problème et les objectifs mesurables du produit.",
  },
  {
    id: "architecture",
    title: "Product Architecture",
    text: "Structurer les modules, les données et les rôles pour que le produit puisse grandir.",
  },
  {
    id: "ux",
    title: "User Experience",
    text: "Dessiner les parcours : le chemin le plus court entre l'utilisateur et sa valeur.",
  },
  {
    id: "ui",
    title: "Interface Design",
    text: "Donner au produit une identité claire, cohérente et agréable à utiliser.",
  },
  {
    id: "development",
    title: "Development",
    text: "Construire avec une stack moderne, typée et maintenable, du frontend aux paiements.",
  },
  {
    id: "testing",
    title: "Testing & Refinement",
    text: "Tester avec de vrais usages, mesurer, puis affiner jusqu'au lancement — et après.",
  },
] as const;

/* ============================================================
 * COMMENT ON DÉMARRE (bloc de conversion)
 * ⚠️ Promesses à valider avant publication.
 * ============================================================ */
export const startSteps = [
  {
    title: "Un appel de 30 minutes",
    text: "Gratuit et sans engagement. Vous me parlez du problème, je pose beaucoup de questions.",
  },
  {
    title: "Un cadrage écrit",
    text: "Je vous envoie le périmètre proposé, les étapes et une estimation. Vous décidez ensuite.",
  },
  {
    title: "On construit, par itérations",
    text: "Des versions utilisables tôt, des points réguliers, et un produit qui évolue avec l'usage réel.",
  },
];

/* ============================================================
 * EXPERTISE TECHNIQUE
 * ⚠️ À vérifier : ne publier que les technologies réellement utilisées,
 * et compléter `projects` avec les slugs concernés.
 * ============================================================ */
export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    skills: [
      { name: "React", context: "Interfaces riches et composants réutilisables." },
      { name: "Next.js", context: "Applications full-stack, SEO et rendu serveur." },
      { name: "TypeScript", context: "Code typé et fiable, du frontend au backend." },
      { name: "Tailwind CSS", context: "Design systems rapides et cohérents." },
    ],
  },
  {
    id: "backend",
    title: "Backend & Database",
    skills: [
      { name: "Node.js", context: "APIs et logique métier côté serveur." },
      { name: "Prisma", context: "Modélisation et accès typé aux données." },
      {
        name: "Supabase",
        context:
          "Base de données, authentification, stockage et temps réel sur mes produits.",
      },
      { name: "PostgreSQL", context: "Données relationnelles structurées." },
    ],
  },
  {
    id: "payments",
    title: "Payment & Integrations",
    skills: [
      { name: "Flutterwave", context: "Paiements Mobile Money et carte en Afrique." },
      { name: "Fapshi", context: "Paiements Mobile Money au Cameroun." },
      { name: "Stripe", context: "Paiements par carte et abonnements." },
      { name: "REST APIs", context: "Intégrations entre services et applications." },
    ],
  },
  {
    id: "design",
    title: "Design & Prototyping",
    skills: [
      { name: "Figma", context: "Maquettes, prototypes et design systems." },
      { name: "Canva", context: "Visuels marketing et supports de communication." },
    ],
  },
  {
    id: "motion",
    title: "Motion & Interaction",
    skills: [
      { name: "Motion", context: "Animations d'interface et micro-interactions." },
      { name: "GSAP", context: "Animations avancées au scroll." },
      { name: "Three.js", context: "Expériences 3D dans le navigateur." },
    ],
  },
];

/* ============================================================
 * PARCOURS — My journey
 * ⚠️ Ajouter les périodes réelles (`period`) et la formation.
 * ============================================================ */
export const journeySteps: JourneyStep[] = [
  {
    title: "Fondations techniques",
    description: "Formation et premières bases en développement et en design numérique.",
  },
  {
    title: "Premiers projets digitaux",
    description: "Sites et interfaces pour apprendre en construisant de vrais projets.",
  },
  {
    title: "Premières expériences commerciales",
    description:
      "Présences digitales pour des activités locales : acquisition, conversion, WhatsApp.",
  },
  {
    title: "Développement de plateformes",
    description:
      "Applications complètes avec comptes, contenus, paiements et espaces d'administration.",
  },
  {
    title: "Construction de produits SaaS",
    description:
      "Produits multi-modules avec organisations, rôles et abonnements, à l'image d'Eventage.",
  },
  {
    title: "Nouveaux secteurs technologiques",
    description:
      "Exploration de la mobilité urbaine, de la cartographie et des données communautaires.",
  },
];

/* ============================================================
 * PREUVE SOCIALE
 * Uniquement des témoignages authentiques. Vide = section masquée.
 * ============================================================ */
export const testimonialsData: Testimonial[] = [];
