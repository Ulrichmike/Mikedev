// src/types/index.ts

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
  /** Chemin local (ex: /images/projects/x.png) ou URL externe (à whitelister dans next.config.ts) */
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
  /** Nom d'icône lucide-react (ex: 'Code2', 'Rocket') */
  icon: string;
}

/* ============================================================
 * EXPÉRIENCES PROFESSIONNELLES
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
  /** Chemin local (ex: /avatar.webp) ou URL externe (à whitelister dans next.config.ts) */
  avatarUrl?: string;
}

/* ============================================================
 * THÈME
 * ============================================================ */

export type ThemeMode = "dark" | "light";

export type ThemeAccent = "amber" | "emerald" | "purple" | "blue" | "rose";

export type DarkBgTone = "obsidian" | "midnight" | "graphite";
export type LightBgTone = "alabaster" | "editorial" | "slate";

export interface ThemeSettings {
  mode: ThemeMode;
  accent: ThemeAccent;
  darkTone: DarkBgTone;
  lightTone: LightBgTone;
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
  /** Ligne contenant le bug (1-indexed) */
  bugLine?: number;
  bugFix?: string;
}

/* ============================================================
 * TYPES UTILITAIRES (bonus Next.js)
 * ============================================================ */

/** Utilise pour typer les callbacks d'ouverture de modales dans un contexte global */
export type ModalName =
  | "commandPalette"
  | "booking"
  | "challenge"
  | "terminal"
  | "resume"
  | "themeStudio"
  | null;

/** Utilise pour les retours de Server Actions Next.js */
export type ActionState<T = void> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

/** Nouveau type pour le mode Bug Hunter */
export interface BugChallenge {
  id: string;
  title: string;
  snippet: string;
  /** Ligne contenant le bug (1-indexed) */
  correctLine: number;
  hint: string;
  explanation: string;
}
