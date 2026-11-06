import type { Project } from "@/types";

/* ============================================================
 * PROJETS — cœur du portfolio
 *
 * Règle : rien n'est inventé. Les champs optionnels vides
 * (year, status, url, role, stack, audience, process,
 * architecture, results, visuels sans `src`) ne s'affichent pas
 * en production. En `npm run dev`, chaque étude de cas liste
 * ce qu'il reste à compléter.
 *
 * Visuels : déposer les fichiers dans /public/projects/<slug>/
 * puis renseigner `src` (ex. "/projects/eventage/dashboard.jpg").
 * ============================================================ */
export const projectsData: Project[] = [
  /* ---------------------------------------------------------- */
  {
    slug: "eventage",
    index: "01",
    name: "Eventage",
    positioning: "All-in-One Event Management SaaS",
    summary:
      "Une plateforme de gestion événementielle qui centralise l'organisation, les invités, la billetterie, les prestataires et l'expérience événementielle.",
    tags: ["Product Strategy", "UI/UX", "SaaS", "Full-Stack"],
    tier: "signature",
    sector: "saas",
    color: "#2f2a8f",
    audience: "Organisateurs d'événements en Afrique francophone",
    url: "https://eventage-tawny.vercel.app/",
    status: "production",
    role: ["Stratégie produit", "UI/UX", "Développement full-stack"],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL (Neon)", "Neon Auth", "Vercel Blob", "Zod", "QR codes"],
    results: [
      "Produit en ligne avec quatre plans, du Gratuit à l'Enterprise, facturés en FCFA ou en euros.",
      "Invitations et relances personnalisées par WhatsApp.",
      "Accueil des invités par scan de QR code, même quand le réseau coupe.",
      "Billetterie avec suivi des encaissements Mobile Money.",
    ],
    heroVisual: "/projects/eventage/home-desktop.webp",
    fullVisual: { src: "/projects/eventage/full-desktop.webp", width: 1200, height: 4333 },
    problem: [
      "Les organisateurs d'événements jonglent avec des outils déconnectés pour gérer invités, billets, prestataires, programme et budget.",
      "Chaque outil détient une partie de l'information : rien n'est synchronisé, les erreurs se multiplient et l'expérience des invités en pâtit.",
    ],
    vision: [
      "Réunir toutes les opérations d'un événement dans un seul espace de travail.",
      "Concevoir un SaaS modulaire où chaque module (invités, billetterie, placement, budget…) partage les mêmes données et communique avec les autres.",
      "Offrir aux organisateurs une vue d'ensemble claire, du premier invité au dernier bilan.",
    ],
    features: [
      { title: "Event management", description: "Création, configuration et gestion d'événements." },
      { title: "Guest management", description: "Invitations, listes d'invités et QR codes." },
      { title: "Ticketing", description: "Billetterie et types de tickets." },
      { title: "Schedule", description: "Programme et calendrier de l'événement." },
      { title: "Seating", description: "Placement et disposition des tables." },
      { title: "Vendors", description: "Gestion des prestataires." },
      { title: "Budget", description: "Suivi des dépenses et budgets." },
      { title: "Crowdfunding", description: "Collecte de contributions." },
      { title: "Polls", description: "Sondages et interactions." },
      { title: "Gallery", description: "Galerie de photos." },
      { title: "Guestbook", description: "Livre d'or." },
      { title: "Notifications", description: "Communications et notifications." },
      { title: "Analytics", description: "Suivi et indicateurs." },
      { title: "SaaS management", description: "Plans, abonnements et gestion des organisations." },
    ],
    demonstrates: [
      "Organiser un produit complexe composé de nombreux modules.",
      "Structurer les données pour que les modules communiquent entre eux.",
      "Penser les rôles et permissions d'un SaaS multi-organisations.",
      "Concevoir une expérience organisateur claire malgré la richesse fonctionnelle.",
    ],
    visuals: [
      { src: "/projects/eventage/home-desktop.webp", caption: "Page d'accueil", kind: "desktop" },
      { src: "/projects/eventage/features-desktop.webp", caption: "Fonctionnalités", kind: "desktop" },
      { src: "/projects/eventage/pricing-desktop.webp", caption: "Plans et tarifs (FCFA / euro)", kind: "desktop" },
      { src: "/projects/eventage/home-mobile.webp", caption: "Version mobile", kind: "mobile" },
      { caption: "Dashboard organisateur", kind: "desktop" },
      { caption: "Scan QR à l'entrée", kind: "mobile" },
      { caption: "Plan de salle", kind: "desktop" },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    slug: "learning-academy",
    index: "02",
    name: "Learning Academy",
    positioning: "Learning & Assessment Platform",
    summary:
      "Une plateforme éducative complète : répétiteurs à domicile, bibliothèque de ressources et d'évaluations par classe et par niveau, abonnements et paiement Mobile Money. Elle repose sur LAST (Learning Academy Soft Teaching), le moteur que j'ai conçu pour les contenus et les accès.",
    tags: ["EdTech", "Subscription", "Conversion", "Product Engineering"],
    tier: "featured",
    sector: "edtech",
    color: "#2a62c9",
    audience: "Familles et élèves des sections francophone et anglophone",
    url: "https://www.belearningacademy.com/",
    status: "production",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Supabase", "next-intl (FR/EN)", "React PDF", "Cloudinary", "Resend", "Stripe", "Mobile Money"],
    results: [
      "Plateforme en ligne, bilingue français / anglais.",
      "Deux offres claires : répétiteurs à domicile et ressources pédagogiques.",
      "Espace élève avec connexion par email ou Google.",
      "Paiement par Mobile Money et Orange Money.",
      "Conversion directe : boutons WhatsApp et appel visibles sur chaque page.",
    ],
    heroVisual: "/projects/learning-academy/home-desktop.webp",
    fullVisual: { src: "/projects/learning-academy/full-desktop.webp", width: 1200, height: 4333 },
    problem: [
      "Les ressources pédagogiques et les évaluations sont dispersées, difficiles à trouver et rarement organisées par classe et par niveau.",
      "Les familles hésitent à confier la scolarité de leurs enfants sans comprendre clairement l'offre, ni avoir de raisons de faire confiance.",
      "Proposer ces contenus en ligne suppose de contrôler qui y accède, et d'accepter les moyens de paiement réellement utilisés localement.",
    ],
    vision: [
      "Une seule plateforme pour deux besoins : l'accompagnement à domicile et les ressources en ligne.",
      "Une bibliothèque structurée par section, classe, niveau et catégorie d'évaluation, propulsée par LAST.",
      "Un modèle d'abonnement (mensuel, trimestriel, annuel) qui conditionne l'accès aux ressources.",
      "Rassurer les familles et transformer une visite en demande de contact, notamment via WhatsApp.",
    ],
    features: [
      { title: "Répétiteurs à domicile", description: "Présentation de l'accompagnement, des matières et des niveaux." },
      { title: "Bibliothèque de ressources", description: "Ressources pédagogiques organisées et consultables." },
      { title: "Sections FR / EN", description: "Navigation par section francophone et anglophone." },
      { title: "Classes & niveaux", description: "Contenus organisés par classe et niveau scolaire." },
      { title: "Catégories d'évaluations", description: "Évaluations classées par type." },
      { title: "Abonnements", description: "Formules mensuelles, trimestrielles et annuelles." },
      { title: "Accès conditionnel", description: "Ressources débloquées selon l'abonnement." },
      { title: "Documents PDF", description: "Gestion et diffusion des documents." },
      { title: "Paiements", description: "Mobile Money, Orange Money et carte bancaire." },
      { title: "Expirations", description: "Suivi des abonnements et de leurs échéances." },
      { title: "Espace élève & administrateur", description: "Gestion des utilisateurs et des contenus." },
      { title: "WhatsApp & appel", description: "Canaux de conversion visibles sur chaque page." },
    ],
    demonstrates: [
      "Concevoir une plateforme qui sert à la fois la vente d'un service et la diffusion de contenus.",
      "Gérer des abonnements par niveau scolaire et contrôler finement l'accès aux contenus.",
      "Intégrer des paiements adaptés au marché local.",
      "Transformer une visite en demande de contact.",
    ],
    visuals: [
      { src: "/projects/learning-academy/home-desktop.webp", caption: "Page d'accueil", kind: "desktop" },
      { src: "/projects/learning-academy/subjects-desktop.webp", caption: "Les deux services : répétiteurs et ressources PDF", kind: "desktop" },
      { src: "/projects/last/login-desktop.webp", caption: "Connexion à l'espace élève (LAST)", kind: "desktop" },
      { src: "/projects/learning-academy/home-mobile.webp", caption: "Version mobile", kind: "mobile" },
      { src: "/projects/learning-academy/subjects-mobile.webp", caption: "Services sur mobile", kind: "mobile" },
      { src: "/projects/last/login-mobile.webp", caption: "Espace élève sur mobile", kind: "mobile" },
      { caption: "Catalogue des ressources (connecté)", kind: "desktop" },
      { caption: "Interface d'abonnement", kind: "desktop" },
      { caption: "Dashboard administrateur", kind: "desktop" },
    ],
  },


  /* ---------------------------------------------------------- */
  {
    slug: "africa-elite-club",
    index: "03",
    name: "Africa Elite Club",
    positioning: "Premium Fashion & Digital Commerce",
    summary:
      "Une expérience e-commerce premium centrée sur les casquettes, le branding, le storytelling et une identité visuelle distinctive.",
    tags: ["E-commerce", "Branding", "UI/UX", "Digital Commerce"],
    tier: "featured",
    sector: "commerce",
    color: "#d2ab52",
    url: "https://www.africaeliteclub.com/",
    status: "production",
    audience: "Clientèle premium, boutique en dollars canadiens",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Supabase", "Stripe", "PayPal", "next-intl (FR/EN)", "Upstash Redis", "Resend"],
    results: [
      "Boutique en ligne : six casquettes signature, en éditions limitées.",
      "Site bilingue français / anglais, prix en dollars canadiens.",
      "Paiement par carte (Stripe) et PayPal.",
      "Fiches produits détaillées : galerie, coloris, tailles, broderies.",
    ],
    heroVisual: "/projects/africa-elite-club/home-desktop.webp",
    fullVisual: { src: "/projects/africa-elite-club/full-desktop.webp", width: 1200, height: 4244 },
    problem: [
      "Une marque premium ne se vend pas comme un simple catalogue : sans univers visuel ni récit, le produit perd sa valeur perçue.",
    ],
    vision: [
      "Construire une expérience de commerce où branding, produit et parcours d'achat travaillent ensemble.",
      "Porter la promesse de la marque : « Be What You Wear ».",
    ],
    features: [
      { title: "Identité de marque", description: "Logo, univers graphique et positionnement premium." },
      { title: "Catalogue", description: "Présentation de la collection de casquettes." },
      { title: "Fiches produits", description: "Mise en valeur détaillée de chaque modèle." },
      { title: "Panier" },
      { title: "Tunnel de commande", description: "Parcours d'achat et expérience de paiement." },
      { title: "Responsive design", description: "Une expérience soignée sur mobile." },
    ],
    demonstrates: [
      "Sortir du registre purement technique.",
      "Construire une expérience de commerce premium.",
      "Faire travailler ensemble branding, produit et expérience utilisateur.",
    ],
    visuals: [
      { src: "/projects/africa-elite-club/home-desktop.webp", caption: "Hero — Be What You Wear", kind: "desktop" },
      { src: "/projects/africa-elite-club/shop-desktop.webp", caption: "La collection", kind: "desktop" },
      { src: "/projects/africa-elite-club/product-desktop.webp", caption: "Fiche produit — Elite Forêt", kind: "desktop" },
      { src: "/projects/africa-elite-club/home-mobile.webp", caption: "Version mobile", kind: "mobile" },
      { src: "/projects/africa-elite-club/product-mobile.webp", caption: "Fiche produit mobile", kind: "mobile" },
    ],
  },


  /* ---------------------------------------------------------- */
  {
    slug: "spacekit",
    index: "04",
    name: "Spacekit",
    positioning: "B2B Office Solutions & Digital Commerce",
    summary:
      "Un projet commercial autour des accessoires de bureau, notamment les tableaux blancs et les écrans de projection.",
    tags: ["B2B", "Product Presentation", "Commerce", "Branding"],
    tier: "standard",
    sector: "commerce",
    color: "#cfd5d1",
    audience: "Clientèle professionnelle à Douala",
    problem: [
      "Un acheteur professionnel a besoin d'informations précises (dimensions, caractéristiques, prix, livraison) avant de passer commande.",
    ],
    vision: [
      "Valoriser des produits physiques avec une présentation claire et commerciale.",
      "Faciliter la prise de contact et la commande, notamment par WhatsApp.",
    ],
    features: [
      { title: "Gamme de tableaux blancs", description: "Dimensions et caractéristiques." },
      { title: "Écrans de projection" },
      { title: "Tarification" },
      { title: "Livraison à Douala" },
      { title: "Parcours de commande", description: "Commande ou prise de contact." },
      { title: "WhatsApp", description: "Communication commerciale directe." },
    ],
    demonstrates: [
      "Valoriser un produit physique en ligne.",
      "Construire une expérience commerciale adaptée à une clientèle professionnelle.",
    ],
    visuals: [
      { caption: "Homepage", kind: "desktop" },
      { caption: "Catalogue", kind: "desktop" },
      { caption: "Fiches produits", kind: "desktop" },
      { caption: "Présentation des dimensions", kind: "detail" },
      { caption: "Produits en situation", kind: "brand" },
      { caption: "Version mobile", kind: "mobile" },
      { caption: "Créations publicitaires", kind: "brand" },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    slug: "road-alert",
    index: "05",
    name: "Road Alert",
    positioning: "Intelligent Urban Mobility Platform",
    summary:
      "Une application de mobilité communautaire pensée pour les villes africaines congestionnées, d'abord Douala : itinéraires, raccourcis moto, signalements et guidage vocal. Anciennement MotoAlert.",
    tags: ["Mobility Tech", "Mapping", "Geolocation", "Full-Stack"],
    tier: "featured",
    sector: "mobility",
    color: "#f2b705",
    audience: "Conducteurs de Douala, en particulier les motos",
    url: "https://road-alert-five.vercel.app/",
    status: "production",
    stack: ["Next.js", "TypeScript", "Supabase", "Prisma", "MapLibre GL", "Leaflet", "Capacitor (Android)", "PWA", "Géolocalisation en arrière-plan", "Synthèse vocale"],
    results: [
      "En service à Douala, Yaoundé annoncé.",
      "Trois itinéraires comparés et guidage vocal en français, avec les repères locaux.",
      "Alertes confirmées ou infirmées par les conducteurs.",
      "Raccourcis moto proposés seulement après plusieurs confirmations.",
      "Application installable (PWA et Android).",
    ],
    heroVisual: "/projects/motoalert/home-desktop.webp",
    fullVisual: { src: "/projects/motoalert/full-desktop.webp", width: 1200, height: 4333 },
    problem: [
      "Dans les villes africaines congestionnées, les applications de navigation classiques ignorent les réalités du terrain : raccourcis empruntés par les motos, état des routes, incidents.",
      "Ces informations existent, mais elles circulent de bouche à oreille au lieu d'être partagées et vérifiées.",
    ],
    vision: [
      "Une carte qui s'enrichit grâce à la communauté : raccourcis, incidents et état des routes.",
      "Des itinéraires optimisés selon les conditions réelles, pensés pour les motos.",
    ],
    features: [
      { title: "Carte interactive" },
      { title: "Recherche de destination" },
      { title: "Calcul d'itinéraires", description: "Avec itinéraires alternatifs." },
      { title: "Raccourcis moto", description: "Découverte et validation communautaire." },
      { title: "Signalement communautaire", description: "Incidents routiers et état des routes." },
      { title: "Zones congestionnées", description: "Informations sur le trafic." },
      { title: "Géolocalisation" },
      { title: "Optimisation", description: "Itinéraires adaptés aux conditions." },
    ],
    demonstrates: [
      "Intégrer une cartographie et calculer des itinéraires.",
      "Traiter des données géographiques et la géolocalisation.",
      "Exploiter des informations communautaires en temps réel.",
      "Concevoir des solutions adaptées aux réalités africaines.",
    ],
    visuals: [
      { src: "/projects/motoalert/home-desktop.webp", caption: "Page d'accueil", kind: "desktop" },
      { src: "/projects/motoalert/features-desktop.webp", caption: "Fonctionnalités", kind: "desktop" },
      { src: "/projects/motoalert/home-mobile.webp", caption: "Version mobile", kind: "mobile" },
      { src: "/projects/motoalert/features-mobile.webp", caption: "Fonctionnalités sur mobile", kind: "mobile" },
      { caption: "Navigation guidée (dans l'app)", kind: "mobile" },
      { caption: "Signalement d'incident (dans l'app)", kind: "mobile" },
    ],
  },
];

export const SECTOR_LABELS: Record<Project["sector"], string> = {
  saas: "SaaS",
  edtech: "EdTech",
  commerce: "Commerce",
  mobility: "Mobilité",
};

export const STATUS_LABELS: Record<NonNullable<Project["status"]>, string> = {
  production: "En production",
  mvp: "MVP",
  prototype: "Prototype",
  development: "En développement",
  concept: "Concept",
};

export function getProject(slug: string) {
  return projectsData.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projectsData.findIndex((p) => p.slug === slug);
  return projectsData[(i + 1) % projectsData.length];
}
