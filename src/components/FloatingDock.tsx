"use client";

import { useState, useEffect } from "react";
import {
  Home,
  Layers,
  Trophy,
  Code2,
  Briefcase,
  Calendar,
  Terminal,
  Sun,
  Moon,
  ShieldCheck,
  Palette,
  Search,
  FileText,
} from "lucide-react";
import { motion } from "motion/react";

import { useTheme } from "@/context/ThemeContext";

interface FloatingDockProps {
  onOpenTerminal: () => void;
  onOpenChallenge: () => void;
  onOpenBooking: () => void;
  onOpenCommandPalette?: () => void;
  onOpenResume?: () => void;
}

export function FloatingDock({
  onOpenTerminal,
  onOpenChallenge,
  onOpenBooking,
  onOpenCommandPalette,
  onOpenResume,
}: FloatingDockProps) {
  const { theme, toggleTheme, currentAccent, openThemeModal } = useTheme();
  const [activeSection, setActiveSection] = useState("top");

  // Suivi de la section active pour l'indicateur
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "top",
        "projets",
        "offres",
        "services",
        "defi",
        "parcours",
        "contact",
      ];
      const scrollY = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Appel initial pour synchroniser au premier rendu
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const desktopNavItems = [
    { id: "top", label: "Accueil", href: "#top", icon: Home },
    { id: "projets", label: "Projets", href: "#projets", icon: Layers },
    { id: "offres", label: "Offres", href: "#offres", icon: ShieldCheck },
    { id: "services", label: "Services", href: "#services", icon: Code2 },
    { id: "parcours", label: "Parcours", href: "#parcours", icon: Briefcase },
  ];

  const mobileNavItems = [
    { id: "top", label: "Accueil", href: "#top", icon: Home },
    { id: "projets", label: "Projets", href: "#projets", icon: Layers },
    { id: "services", label: "Services", href: "#services", icon: Code2 },
  ];

  return (
    <div
      className="fixed bottom-3 sm:bottom-5 left-1/2 z-40 -translate-x-1/2 select-none w-auto max-w-[calc(100vw-20px)] sm:max-w-none"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative flex items-center justify-center gap-1 sm:gap-1.5 rounded-full border border-black/10 dark:border-white/15 bg-white/95 dark:bg-[#10121a]/95 px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-2xl backdrop-blur-2xl transition-all duration-300"
      >
        {/* Reflet lumineux de l'accent */}
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-full opacity-30 blur-sm -z-10"
          style={{
            background: `linear-gradient(90deg, transparent, ${currentAccent.glow}, transparent)`,
          }}
        />

        {/* ---------- MOBILE (< 640px) ---------- */}
        <div className="flex sm:hidden items-center gap-1">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-all active:scale-95 ${
                  isActive
                    ? "bg-black/10 dark:bg-white/15 text-zinc-900 dark:text-white font-bold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
                title={item.label}
              >
                <Icon className="h-4 w-4" />
                {isActive && (
                  <span
                    className="absolute bottom-1 h-1 w-1 rounded-full"
                    style={{ backgroundColor: currentAccent.color }}
                  />
                )}
              </a>
            );
          })}

          <div className="h-4 w-[1px] bg-black/10 dark:bg-white/10 mx-0.5" />

          {/* Défi (mobile) */}
          <button
            type="button"
            onClick={onOpenChallenge}
            aria-label="Défi Développeur"
            className="flex h-9 w-9 items-center justify-center rounded-full text-purple-600 dark:text-purple-400 hover:bg-purple-500/15 active:scale-95"
            title="Défi Développeur"
          >
            <Trophy className="h-4 w-4" />
          </button>

          {/* Toggle thème (mobile) */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Passer en Jour" : "Passer en Nuit"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-700 dark:text-zinc-300 active:scale-95"
            title={theme === "dark" ? "Passer en Jour" : "Passer en Nuit"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-zinc-700" />
            )}
          </button>

          {/* CTA RDV (mobile) */}
          <button
            type="button"
            onClick={onOpenBooking}
            aria-label="Prendre rendez-vous"
            className={`flex h-8 items-center gap-1 rounded-full px-3 text-xs font-bold transition-all shadow-md active:scale-95 ml-1 ${currentAccent.btnClass}`}
          >
            <Calendar className="h-3 w-3" />
            <span>RDV</span>
          </button>
        </div>

        {/* ---------- DESKTOP (>= 640px) ---------- */}
        <div className="hidden sm:flex items-center gap-1">
          {desktopNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className={`group relative flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-black/5 dark:hover:bg-white/10 ${
                  isActive
                    ? "bg-black/5 dark:bg-white/10 text-zinc-900 dark:text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
                title={item.label}
              >
                <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                {isActive && (
                  <span
                    className="absolute bottom-1.5 h-1 w-1 rounded-full"
                    style={{ backgroundColor: currentAccent.color }}
                  />
                )}
                {/* Tooltip flottant */}
                <span className="pointer-events-none absolute -top-8 rounded-md bg-zinc-900 text-white px-2 py-0.5 text-[10px] font-medium opacity-0 shadow-md transition-opacity group-hover:opacity-100 whitespace-nowrap">
                  {item.label}
                </span>
              </a>
            );
          })}

          <div className="mx-1 h-5 w-[1px] bg-black/10 dark:bg-white/10" />

          {/* Toggle thème rapide */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Mode Jour" : "Mode Nuit"}
            className="group relative flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 dark:text-zinc-300 transition-all hover:bg-black/5 dark:hover:bg-white/10"
            title={theme === "dark" ? "Mode Jour" : "Mode Nuit"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400 transition-transform group-hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-zinc-700 transition-transform group-hover:-rotate-12" />
            )}
            <span className="pointer-events-none absolute -top-8 rounded-md bg-zinc-900 text-white px-2 py-0.5 text-[10px] font-medium opacity-0 shadow-md transition-opacity group-hover:opacity-100 whitespace-nowrap">
              {theme === "dark" ? "Mode Jour" : "Mode Nuit"}
            </span>
          </button>

          {/* Studio de thèmes */}
          <button
            type="button"
            onClick={openThemeModal}
            aria-label="Palette et nuances sur-mesure"
            className="group relative flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 dark:text-zinc-300 transition-all hover:bg-black/5 dark:hover:bg-white/10"
            title="Palette & Nuances sur-mesure"
          >
            <Palette
              className="h-4 w-4 transition-transform group-hover:scale-110"
              style={{ color: currentAccent.color }}
            />
            <span className="pointer-events-none absolute -top-8 rounded-md bg-zinc-900 text-white px-2 py-0.5 text-[10px] font-medium opacity-0 shadow-md transition-opacity group-hover:opacity-100 whitespace-nowrap">
              Palette &amp; Nuances
            </span>
          </button>

          {/* Défi */}
          <button
            type="button"
            onClick={onOpenChallenge}
            aria-label="Es-tu meilleur que le dev ?"
            className="group relative flex h-10 w-10 items-center justify-center rounded-full text-purple-600 dark:text-purple-400 transition-all hover:bg-purple-500/15"
            title="Es-tu meilleur que le dev ?"
          >
            <Trophy className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="pointer-events-none absolute -top-8 rounded-md bg-zinc-900 text-purple-300 px-2 py-0.5 text-[10px] font-medium opacity-0 shadow-md transition-opacity group-hover:opacity-100 whitespace-nowrap">
              Défi ⚡
            </span>
          </button>

          {/* Palette de commandes */}
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={onOpenCommandPalette}
              aria-label="Palette de commandes (Cmd+K)"
              className="group relative flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 dark:text-zinc-300 transition-all hover:bg-black/5 dark:hover:bg-white/10"
              title="Palette de commandes (⌘K)"
            >
              <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="pointer-events-none absolute -top-8 rounded-md bg-zinc-900 text-white px-2 py-0.5 text-[10px] font-medium opacity-0 shadow-md transition-opacity group-hover:opacity-100 whitespace-nowrap">
                ⌘K
              </span>
            </button>
          )}

          {/* CV */}
          {onOpenResume && (
            <button
              type="button"
              onClick={onOpenResume}
              aria-label="Consulter le CV (PDF)"
              className="group relative flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 dark:text-zinc-300 transition-all hover:bg-black/5 dark:hover:bg-white/10"
              title="Consulter le CV (PDF)"
            >
              <FileText className="h-4 w-4 transition-transform group-hover:scale-110 text-amber-500" />
              <span className="pointer-events-none absolute -top-8 rounded-md bg-zinc-900 text-amber-300 px-2 py-0.5 text-[10px] font-medium opacity-0 shadow-md transition-opacity group-hover:opacity-100 whitespace-nowrap">
                CV (PDF)
              </span>
            </button>
          )}

          {/* Terminal */}
          <button
            type="button"
            onClick={onOpenTerminal}
            aria-label="Ouvrir le terminal CLI"
            className="group relative flex h-10 w-10 items-center justify-center rounded-full text-amber-600 dark:text-amber-400 transition-all hover:bg-amber-400/15"
            title="Terminal CLI"
          >
            <Terminal className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="pointer-events-none absolute -top-8 rounded-md bg-zinc-900 text-amber-300 px-2 py-0.5 text-[10px] font-medium opacity-0 shadow-md transition-opacity group-hover:opacity-100 whitespace-nowrap">
              CLI
            </span>
          </button>

          {/* CTA RDV (desktop) */}
          <button
            type="button"
            onClick={onOpenBooking}
            aria-label="Prendre rendez-vous"
            className={`group relative ml-1 flex h-9 sm:h-10 items-center gap-1.5 rounded-full px-3.5 sm:px-4 text-xs font-bold transition-all shadow-md active:scale-95 ${currentAccent.btnClass}`}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Prendre RDV</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
