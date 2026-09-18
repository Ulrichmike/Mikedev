export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  projectResult: string;
  projectTag: string;
  linkedin?: string;
}

export interface ClientOffer {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  idealFor: string;
  priceEstimate: string;
  turnaroundTime: string;
  description: string;
  features: string[];
  deliverables: string[];
  guarantee: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "test-1",
    name: "Alexandre Mercier",
    role: "Co-fondateur & CTO",
    company: "NovaMetrics (SaaS Analytics)",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    content:
      "Mike a refondu l'intégralité du frontend de notre plateforme analytics sous Next.js 15. Le résultat a dépassé nos prévisions : temps de chargement divisé par 3 et un taux de conversion des démos augmenté de +32% dès le premier mois.",
    projectResult: "+32% de conversions démos & TTFB < 90ms",
    projectTag: "Refonte SaaS Next.js",
    linkedin: "https://linkedin.com",
  },
  {
    id: "test-2",
    name: "Camille Dutertre",
    role: "Head of Product",
    company: "Pulse Studio",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    content:
      "Une rigueur de code remarquable et une sensibilité produit rare pour un ingénieur. Mike a su cadrer notre MVP complexe en moins de 3 semaines avec un Design System Tailwind impeccable et zéro dette technique.",
    projectResult: "MVP livré en 3 semaines sans aucun retard",
    projectTag: "Design System & MVP",
    linkedin: "https://linkedin.com",
  },
  {
    id: "test-3",
    name: "Julien Benhamou",
    role: "Founder & CEO",
    company: "Kuro Design Systems",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    content:
      "La prise de contact a été d'une fluidité exemplaire. Après un premier audit de 45 minutes, Mike nous a délivré un plan de migration précis. Notre score Google Lighthouse est passé de 62 à 99/100.",
    projectResult: "Lighthouse 99/100 & +40% de rétention",
    projectTag: "Audit & Core Web Vitals",
    linkedin: "https://linkedin.com",
  },
];

export const clientOffersData: ClientOffer[] = [
  {
    id: "sprint-mvp",
    name: "Sprint MVP & SaaS Launch",
    badge: "Idéal Lancement",
    popular: true,
    idealFor:
      "Startups, solopreneurs & PME souhaitant lancer un produit ou une fonctionnalité clé rapidement.",
    priceEstimate: "À partir de 3 500 €",
    turnaroundTime: "2 à 3 semaines",
    description:
      "Conception complète de votre MVP : de l'architecture logicielle au déploiement en production, prêt à encaisser vos premiers clients.",
    features: [
      "Architecture Next.js 15 / React 19 & TypeScript",
      "Authentification sécurisée & base de données Supabase / PostgreSQL",
      "Paiements Stripe & portail abonnements / webhooks",
      "Design System UI soigné, responsive mobile & desktop",
      "Score SEO & performance Core Web Vitals optimisé dès le départ",
      "Code documenté, typé & prêt pour scalabilité",
    ],
    deliverables: [
      "Dépôt GitHub privé avec CI/CD automatisée",
      "Déploiement live sur Cloud / Vercel configuré",
      "Session de passation en visio (1h) & documentation",
      "Support & corrections offerts pendant 30 jours",
    ],
    guarantee:
      "Garantie livraison dans les délais convenus ou pénalités appliquées.",
  },
  {
    id: "audit-perf",
    name: "Audit & Boost Performance",
    badge: "Quick Win ROI",
    idealFor:
      "Applications existantes souffrant de lenteurs, dette technique ou baisse de conversion.",
    priceEstimate: "À partir de 1 200 €",
    turnaroundTime: "3 à 5 jours",
    description:
      "Analyse chirurgicale de votre code, de vos dépendances et de votre rendu pour propulser vos métriques business et l'expérience utilisateur.",
    features: [
      "Audit Core Web Vitals complet (LCP, FID/INP, CLS)",
      "Analyse de bundle JS & élimination des surcharges",
      "Revue de code & repérage des memory leaks / re-renders",
      "Audit de sécurité basique (en-têtes HTTP, sanitization)",
      "Refactoring direct des points de friction les plus critiques",
    ],
    deliverables: [
      "Rapport d'audit PDF clair avec priorisation d'impact",
      "Pull Request clé-en-main avec optimisations appliquées",
      "Comparatif avant/après métriques chiffrées",
    ],
    guarantee: "Amélioration mesurable du score Lighthouse garantie.",
  },
  {
    id: "craft-expert",
    name: "Direction Technique & Craft Dédié",
    badge: "Accompagnement",
    idealFor:
      "Équipes techniques en recherche d'un profil senior full-stack pour accélérer la roadmap.",
    priceEstimate: "TJM : 650 € / jour",
    turnaroundTime: "Mission souple (mi-temps ou temps plein)",
    description:
      "Intégration fluide dans votre équipe pour mener des chantiers complexes : refontes, micro-frontends, intégrations tierces et mentorat.",
    features: [
      "Développement de features critiques à haute valeur",
      "Code reviews exigeantes & diffusion de standards de qualité",
      "Architecture modulaire et tests automatisés (Vitest, Playwright)",
      "Participation aux rituels agiles & communication asynchrone transparente",
    ],
    deliverables: [
      "Livraisons itératives quotidiennes ou hebdomadaires",
      "Documentation des décisions d'architecture (ADR)",
      "Accompagnement des développeurs juniors / intermédiaires",
    ],
    guarantee: "Engagement de transparence, zéro boîte noire.",
  },
];

export const clientFaqs = [
  {
    q: "Quels sont vos délais habituels pour démarrer un projet ?",
    a: "Généralement sous 7 à 10 jours ouvrés selon le planning en cours. Pour des urgences ou des audits courts (3-5 jours), je peux souvent m'organiser plus rapidement.",
  },
  {
    q: "Comment se déroule la collaboration au quotidien ?",
    a: "Transparence totale : un canal Slack/Discord dédié, des points de synchronisation vidéo réguliers, un tableau Kanban partagé (Linear ou Notion) et des accès directs aux branches de preview pour tester en temps réel.",
  },
  {
    q: "Quelle est votre politique de garantie après livraison ?",
    a: "Chaque projet au forfait bénéficie de 30 jours de garantie et support technique inclus (corrections de bugs éventuels et ajustements mineurs sans surcoût).",
  },
  {
    q: "Proposez-vous des facilités de paiement ?",
    a: "Oui, les forfaits sont généralement échelonnés : 30% d'acompte à la commande, 40% à la validation du prototype/milestone, et 30% à la livraison finale en production.",
  },
];
