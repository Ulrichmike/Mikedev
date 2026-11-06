/* ============================================================
 * PROFIL
 * ============================================================ */
export interface UserProfile {
  name: string;
  /** Titre professionnel (signature) */
  title: string;
  /** Tagline courte et mémorable */
  tagline: string;
  /** Présentation de 3 à 5 lignes */
  intro: string;
  /** Récit d'ouverture : les problèmes concrets qui motivent le travail */
  manifesto: string[];
  /** Biographie détaillée (paragraphes) */
  bio: string[];
  /** Philosophie de conception */
  philosophy: string;
  /** Ce qui me différencie */
  differentiators: { title: string; text: string }[];
  /** Domaines d'intervention */
  domains: string[];
  email: string;
  city: string;
  country: string;
  /** Fuseau IANA, ex. "Africa/Douala" */
  timezone: string;
  /** Abréviation affichée, ex. "WAT" */
  timezoneLabel: string;
  available: boolean;
  availability: string;
  github: string;
  linkedin: string;
  twitter?: string;
  /** Numéro international sans "+" ni espaces, ex. "2376XXXXXXXX" */
  whatsapp?: string;
  avatarUrl: string;
}

/* ============================================================
 * PROJETS & ÉTUDES DE CAS
 * ============================================================ */
export type ProjectStatus =
  | "production"
  | "mvp"
  | "prototype"
  | "development"
  | "concept";

export type ProjectSector = "saas" | "edtech" | "commerce" | "mobility";

/** Étapes du processus — n'indiquer que celles réellement réalisées */
export type ProcessStepId =
  | "research"
  | "definition"
  | "architecture"
  | "ux"
  | "ui"
  | "development"
  | "testing";

export interface ProjectVisual {
  /** Chemin dans /public. Sans `src`, le visuel n'apparaît qu'en dev (à fournir). */
  src?: string;
  caption: string;
  kind: "desktop" | "mobile" | "detail" | "brand";
}

export interface ProjectFeature {
  title: string;
  description?: string;
}

export interface ArchitectureLayer {
  layer: string;
  detail: string;
}

export interface Project {
  slug: string;
  index: string;
  name: string;
  /** Positionnement en une ligne, ex. "Event Management SaaS" */
  positioning: string;
  summary: string;
  tags: string[];
  /** Poids dans le storytelling */
  tier: "signature" | "featured" | "standard";
  sector: ProjectSector;
  /** Couleur de la couverture générée tant qu'aucun visuel n'est fourni */
  color: string;

  /* A. Présentation générale — laisser vide si inconnu, rien n'est inventé */
  logo?: string;
  year?: string;
  status?: ProjectStatus;
  url?: string;
  role?: string[];
  stack?: string[];
  audience?: string;

  /* B → G */
  problem: string[];
  vision: string[];
  process?: ProcessStepId[];
  features: ProjectFeature[];
  architecture?: ArchitectureLayer[];
  results?: string[];

  /** Ce que le projet démontre dans mon profil */
  demonstrates: string[];

  heroVisual?: string;
  /** Capture pleine page : la page défile dans la fenêtre au survol */
  fullVisual?: { src: string; width: number; height: number };
  visuals: ProjectVisual[];
}

/* ============================================================
 * SERVICES
 * ============================================================ */
export interface Service {
  id: string;
  title: string;
  description: string;
  problems: string[];
  deliverables: string[];
  /** slugs des projets qui prouvent la compétence */
  proof: string[];
}

/* ============================================================
 * EXPERTISE
 * ============================================================ */
export interface Skill {
  name: string;
  /** Contexte d'utilisation réel */
  context?: string;
  /** slugs des projets où la compétence a été pratiquée */
  projects?: string[];
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: Skill[];
}

/* ============================================================
 * PARCOURS
 * ============================================================ */
export interface JourneyStep {
  title: string;
  description: string;
  /** Optionnel : ne renseigner qu'avec une date réelle */
  period?: string;
}

/* ============================================================
 * PREUVE SOCIALE (ne contient que des témoignages authentiques)
 * ============================================================ */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: string;
  project?: string;
}

/* ============================================================
 * THÈME
 * ============================================================ */
export type ThemeMode = "dark" | "light";
export type ThemeAccent = "amber" | "emerald" | "purple" | "blue" | "rose";
export type DarkBgTone = "obsidian" | "midnight" | "graphite";
export type LightBgTone = "alabaster" | "editorial" | "slate";
export type CosmicMode = "galaxy" | "matrix" | "deep-space";

export interface ThemeSettings {
  mode: ThemeMode;
  accent: ThemeAccent;
  darkTone: DarkBgTone;
  lightTone: LightBgTone;
  cosmicMode?: CosmicMode;
}
