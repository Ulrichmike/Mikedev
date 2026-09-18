/* ============================================================
 * PROJETS
 * ============================================================ */
export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "fullstack" | "saas" | "opensource" | "creative";
  tags: string[];
  metrics?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  highlights: string[];
  architecture: string;
  accentColor: string;
  domainName?: string;
  previewType?:
    | "saas-editor"
    | "code-snippets"
    | "metrics-dashboard"
    | "audio-focus"
    | "ecommerce"
    | "agentic-canvas";
  image?: string;
}

/* ============================================================
 * SERVICES
 * ============================================================ */
export interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  deliverables: string[];
  icon: string;
}

/* ============================================================
 * EXPÉRIENCES
 * ============================================================ */
export interface Experience {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

/* ============================================================
 * PROFIL UTILISATEUR
 * ============================================================ */
export interface UserProfile {
  name: string;
  alias: string;
  role: string;
  specialty: string;
  bio: string;
  email: string;
  location: string;
  available: boolean;
  statusText: string;
  github: string;
  linkedin: string;
  twitter: string;
  youtube?: string;
  avatarUrl?: string;
}

/* ============================================================
 * THÈME
 * ============================================================ */
export type ThemeMode = "dark" | "light";

export type ThemeAccent = "amber" | "emerald" | "purple" | "blue" | "rose";

export type DarkBgTone = "obsidian" | "midnight" | "graphite";
export type LightBgTone = "alabaster" | "editorial" | "slate";

/* ✅ CORRECTION : 'galaxy' au lieu de 'default' */
export type CosmicMode = "galaxy" | "matrix" | "deep-space";

export interface ThemeSettings {
  mode: ThemeMode;
  accent: ThemeAccent;
  darkTone: DarkBgTone;
  lightTone: LightBgTone;
  cosmicMode?: CosmicMode;
}

/* ============================================================
 * TÉMOIGNAGES & OFFRES CLIENTS
 * ============================================================ */
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

export interface ClientFaq {
  q: string;
  a: string;
}

/* ============================================================
 * DÉFI DÉVELOPPEUR
 * ============================================================ */
export interface ChallengeSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
  explanation?: string;
  bugLine?: number;
  bugFix?: string;
}

export interface BugChallenge {
  id: string;
  title: string;
  snippet: string;
  correctLine: number;
  hint: string;
  explanation: string;
}
