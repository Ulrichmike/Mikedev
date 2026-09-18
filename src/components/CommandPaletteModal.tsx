"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  Layers,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Palette,
  Terminal,
  Trophy,
  Calendar,
  FileText,
  Sparkles,
  Command as CommandIcon,
  X,
  Briefcase,
  ShieldCheck,
  Code2,
  Grid,
  Compass,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { useTheme } from "@/context/ThemeContext";
import { projectsData } from "@/data/portfolioData";
import type { UserProfile, Project } from "@/types";

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onOpenBooking: () => void;
  onOpenChallenge: () => void;
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

interface CommandItem {
  id: string;
  category:
    | "Navigation"
    | "Projets Live"
    | "Actions & Profil"
    | "Thème & Audio";
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  badge?: string;
}

export function CommandPaletteModal({
  isOpen,
  onClose,
  profile,
  onOpenBooking,
  onOpenChallenge,
  onOpenTerminal,
  onOpenResume,
}: CommandPaletteModalProps) {
  const {
    theme,
    toggleTheme,
    accent,
    setAccent,
    cosmicMode,
    setCosmicMode,
    openThemeModal,
    soundEnabled,
    toggleSound,
    playSound,
  } = useTheme();

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input quand la palette s'ouvre
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleCopyEmail = async () => {
    playSound("click");
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose();
      }, 1200);
    } catch {
      // Le presse-papier peut échouer en contexte non sécurisé
    }
  };

  const scrollTo = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  /* ============================================================
   * CATALOGUE DE COMMANDES
   * ============================================================ */
  const allCommands: CommandItem[] = [
    // ---------- Navigation ----------
    {
      id: "nav-top",
      category: "Navigation",
      title: "Accueil & Présentation",
      subtitle: "Haut de page et résumé exécutif",
      icon: Sparkles,
      action: () => scrollTo("top"),
    },
    {
      id: "nav-projets",
      category: "Navigation",
      title: "Réalisations & Projets",
      subtitle: "Applications déployées et démonstrations réelles",
      icon: Layers,
      action: () => scrollTo("projets"),
      badge: "Section",
    },
    {
      id: "nav-offres",
      category: "Navigation",
      title: "Formules Clé-en-Main & Tarifs",
      subtitle: "Délais fermes, livrables et garanties",
      icon: ShieldCheck,
      action: () => scrollTo("offres"),
      badge: "Section",
    },
    {
      id: "nav-defi",
      category: "Navigation",
      title: "Le Défi Développeur (Speed Coding & Bug Hunter)",
      subtitle: "Testez votre vélocité face au développeur",
      icon: Trophy,
      action: () => {
        onClose();
        onOpenChallenge();
      },
      badge: "Jeu",
    },
    {
      id: "nav-services",
      category: "Navigation",
      title: "Services & Expertises",
      subtitle: "Architecture, Craft UI/UX, Performance et Conseil",
      icon: Code2,
      action: () => scrollTo("services"),
    },
    {
      id: "nav-parcours",
      category: "Navigation",
      title: "Parcours & Chronologie",
      subtitle: "Expériences, postes occupés et réalisations clés",
      icon: Briefcase,
      action: () => scrollTo("parcours"),
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Prendre Rendez-vous / Formulaire de Contact",
      subtitle: "Planifier un appel visio gratuit de 30 min",
      icon: Calendar,
      action: () => {
        onClose();
        onOpenBooking();
      },
      badge: "Direct",
    },

    // ---------- Projets Live ----------
    ...projectsData.map(
      (project: Project): CommandItem => ({
        id: `proj-${project.id}`,
        category: "Projets Live",
        title: project.title,
        subtitle: `${project.tagline} (${
          project.domainName || project.tags.join(", ")
        })`,
        icon: ExternalLink,
        action: () => {
          onClose();
          if (project.liveUrl) {
            window.open(project.liveUrl, "_blank", "noopener,noreferrer");
          }
        },
        badge: project.domainName || "Live App",
      }),
    ),

    // ---------- Actions & Profil ----------
    {
      id: "act-resume",
      category: "Actions & Profil",
      title: "Consulter & Télécharger le CV (PDF)",
      subtitle: "Dossier de compétences complet format A4 prêt à imprimer",
      icon: FileText,
      action: () => {
        onClose();
        onOpenResume();
      },
      badge: "CV PDF",
    },
    {
      id: "act-copy-email",
      category: "Actions & Profil",
      title: copied
        ? "Adresse e-mail copiée !"
        : `Copier l'adresse email : ${profile.email}`,
      subtitle: "Presse-papier immédiat sans ouvrir de client mail",
      icon: copied ? Check : Copy,
      action: handleCopyEmail,
      badge: copied ? "Copié" : "Presse-papier",
    },
    {
      id: "act-terminal",
      category: "Actions & Profil",
      title: "Lancer le Terminal Interactif (CLI)",
      subtitle:
        "Ligne de commande interactive avec commandes help, bio, skills",
      icon: Terminal,
      action: () => {
        onClose();
        onOpenTerminal();
      },
      badge: "CLI",
    },
    {
      id: "act-github",
      category: "Actions & Profil",
      title: "Ouvrir le profil GitHub",
      subtitle: profile.github,
      icon: GithubIcon,
      action: () => {
        onClose();
        window.open(profile.github, "_blank", "noopener,noreferrer");
      },
    },
    {
      id: "act-linkedin",
      category: "Actions & Profil",
      title: "Ouvrir le profil LinkedIn",
      subtitle: profile.linkedin,
      icon: LinkedinIcon,
      action: () => {
        onClose();
        window.open(profile.linkedin, "_blank", "noopener,noreferrer");
      },
    },

    // ---------- Thème & Audio ----------
    {
      id: "theme-toggle",
      category: "Thème & Audio",
      title:
        theme === "dark"
          ? "Passer en Mode Jour (Light)"
          : "Passer en Mode Nuit (Dark)",
      subtitle: "Changement instantané de luminosité",
      icon: theme === "dark" ? Sun : Moon,
      action: () => {
        playSound("switch");
        toggleTheme();
      },
      badge: theme === "dark" ? "Actif: Sombre" : "Actif: Clair",
    },
    {
      id: "sound-toggle",
      category: "Thème & Audio",
      title: soundEnabled
        ? "Couper les Effets Sonores (Mute)"
        : "Activer les Effets Sonores (Unmute)",
      subtitle: "Web Audio API clics et sons de confirmation",
      icon: soundEnabled ? VolumeX : Volume2,
      action: () => {
        toggleSound();
        if (!soundEnabled) {
          playSound("success");
        }
      },
      badge: soundEnabled ? "Sons ON" : "Sons OFF",
    },
    {
      id: "theme-studio",
      category: "Thème & Audio",
      title: "Ouvrir le Studio de Thèmes & Couleurs",
      subtitle: "Personnaliser nuances de noir et palettes d'accent",
      icon: Palette,
      action: () => {
        onClose();
        openThemeModal();
      },
      badge: "Couleurs",
    },
    {
      id: "accent-amber",
      category: "Thème & Audio",
      title: "Palette d'accent : Or & Ambre",
      subtitle: "Couleur noble et chaleureuse #f59e0b",
      icon: Sparkles,
      action: () => {
        playSound("tab");
        setAccent("amber");
      },
      badge: accent === "amber" ? "Actif" : undefined,
    },
    {
      id: "accent-emerald",
      category: "Thème & Audio",
      title: "Palette d'accent : Émeraude & Menthe",
      subtitle: "Teinte moderne et vivante #10b981",
      icon: Sparkles,
      action: () => {
        playSound("tab");
        setAccent("emerald");
      },
      badge: accent === "emerald" ? "Actif" : undefined,
    },
    {
      id: "accent-purple",
      category: "Thème & Audio",
      title: "Palette d'accent : Cyber Violet",
      subtitle: "Inspiration high-tech #a855f7",
      icon: Sparkles,
      action: () => {
        playSound("tab");
        setAccent("purple");
      },
      badge: accent === "purple" ? "Actif" : undefined,
    },
    {
      id: "accent-blue",
      category: "Thème & Audio",
      title: "Palette d'accent : Azur Électrique",
      subtitle: "Bleu cobalt studio #3b82f6",
      icon: Sparkles,
      action: () => {
        playSound("tab");
        setAccent("blue");
      },
      badge: accent === "blue" ? "Actif" : undefined,
    },
    {
      id: "accent-rose",
      category: "Thème & Audio",
      title: "Palette d'accent : Carmin Avant-Garde",
      subtitle: "Carmin vibrant et moderne #f43f5e",
      icon: Sparkles,
      action: () => {
        playSound("tab");
        setAccent("rose");
      },
      badge: accent === "rose" ? "Actif" : undefined,
    },

    // ---------- Ambiance spatiale ----------
    {
      id: "space-galaxy",
      category: "Thème & Audio",
      title: "Espace : Nébuleuse & Voie Lactée",
      subtitle: "Lueurs galactiques, poussière cosmique et comètes régulières",
      icon: Sparkles,
      action: () => {
        playSound("switch");
        setCosmicMode("galaxy");
      },
      badge: cosmicMode === "galaxy" ? "Cosmos Actif" : undefined,
    },
    {
      id: "space-matrix",
      category: "Thème & Audio",
      title: "Espace : Cyber-Grille & Perspective",
      subtitle: "Quadrillage spatial 3D avec micro-repères de visée et warp",
      icon: Grid,
      action: () => {
        playSound("switch");
        setCosmicMode("matrix");
      },
      badge: cosmicMode === "matrix" ? "Cosmos Actif" : undefined,
    },
    {
      id: "space-deep-space",
      category: "Thème & Audio",
      title: "Espace : Cosmos & Constellations",
      subtitle:
        "Champ d'étoiles haute densité et liens de constellations à la souris",
      icon: Compass,
      action: () => {
        playSound("switch");
        setCosmicMode("deep-space");
      },
      badge: cosmicMode === "deep-space" ? "Cosmos Actif" : undefined,
    },
  ];

  /* ============================================================
   * FILTRAGE
   * ============================================================ */
  const filteredCommands = allCommands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      (cmd.subtitle && cmd.subtitle.toLowerCase().includes(q))
    );
  });

  /* ============================================================
   * NAVIGATION CLAVIER
   * ============================================================ */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const len = filteredCommands.length;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (len === 0) return;
        setSelectedIndex((prev) => (prev + 1) % len);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (len === 0) return;
        setSelectedIndex((prev) => (prev - 1 + len) % len);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filteredCommands[selectedIndex];
        if (cmd) {
          playSound("click");
          cmd.action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose, playSound]);

  // Reset index quand la recherche change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  /* ============================================================
   * RENDU
   * ============================================================ */
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24 bg-black/75 backdrop-blur-md overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Palette de commandes"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-black/10 dark:border-white/15 bg-white dark:bg-[#10131d] shadow-2xl dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] flex flex-col max-h-[80vh]"
          >
            {/* Barre de recherche */}
            <div className="flex items-center gap-3 border-b border-black/10 dark:border-white/10 px-5 py-4">
              <Search className="h-5 w-5 text-zinc-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tapez une commande, un projet, une technologie..."
                className="flex-1 bg-transparent text-sm sm:text-base font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Effacer la recherche"
                  className="rounded-full p-1 text-zinc-400 hover:text-black dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <span className="hidden sm:inline-flex items-center gap-1 rounded-md border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-2 py-0.5 text-[10px] font-mono text-zinc-400">
                  <CommandIcon className="h-3 w-3" />
                  <span>K</span>
                </span>
              )}
            </div>

            {/* Liste des résultats */}
            <div
              ref={listRef}
              className="overflow-y-auto p-2.5 sm:p-3 space-y-1"
            >
              {filteredCommands.length === 0 ? (
                <div className="py-12 text-center text-sm text-zinc-500">
                  <p>Aucun résultat correspondant à « {query} »</p>
                  <p className="mt-1 text-xs text-zinc-400">
                    Essayez : Next.js, CV, RDV, Terminal, Thème...
                  </p>
                </div>
              ) : (
                filteredCommands.map((cmd, index) => {
                  const Icon = cmd.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      onClick={() => {
                        playSound("click");
                        cmd.action();
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      role="button"
                      tabIndex={-1}
                      className={`group flex items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 text-left cursor-pointer transition-all ${
                        isSelected
                          ? "bg-black/5 dark:bg-white/10 text-zinc-900 dark:text-white"
                          : "text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                            isSelected
                              ? "border-amber-400/40 bg-amber-400/10 text-amber-500"
                              : "border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/[0.03] text-zinc-400"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <div className="min-w-0 truncate">
                          <div className="text-xs sm:text-sm font-semibold truncate flex items-center gap-2">
                            <span>{cmd.title}</span>
                          </div>
                          {cmd.subtitle && (
                            <div className="text-[11px] text-zinc-400 truncate">
                              {cmd.subtitle}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {cmd.badge && (
                          <span className="hidden sm:inline-block rounded-md border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-2 py-0.5 text-[10px] font-mono text-zinc-500">
                            {cmd.badge}
                          </span>
                        )}
                        {isSelected && (
                          <span className="text-xs text-amber-500 font-mono flex items-center gap-0.5">
                            <span className="hidden sm:inline">Exécuter</span>
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pied : raccourcis clavier */}
            <div className="border-t border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] px-4 py-2.5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigation</span>
                <span>↵ Choisir</span>
                <span>ESC Quitter</span>
              </div>
              <span className="text-zinc-500">
                {filteredCommands.length} action
                {filteredCommands.length > 1 ? "s" : ""} disponible
                {filteredCommands.length > 1 ? "s" : ""}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
