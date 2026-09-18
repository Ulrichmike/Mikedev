"use client";

import { useState } from "react";
import {
  Terminal,
  Calendar,
  Award,
  SlidersHorizontal,
  Check,
  Copy,
  Sun,
  Moon,
  Palette,
  Menu,
  X,
  Search,
  FileText,
  Volume2,
  VolumeX,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { useTheme } from "@/context/ThemeContext";
import { useModal } from "@/context/ModalContext";
import type { UserProfile } from "@/types";

interface HeaderProps {
  profile: UserProfile;
}

export function Header({ profile }: HeaderProps) {
  const {
    theme,
    toggleTheme,
    currentAccent,
    openThemeModal,
    soundEnabled,
    toggleSound,
    playSound,
  } = useTheme();

  // ✅ Toutes les actions de modales viennent du contexte
  const { openModal, scrollToSection } = useModal();

  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Le presse-papier peut échouer en contexte non sécurisé
    }
  };

  // ✅ Raccourcis réutilisables pour éviter la répétition
  const handleOpenBooking = () => scrollToSection("contact");
  const handleOpenChallenge = () => scrollToSection("defi");
  const handleOpenTerminal = () => openModal("terminal");
  const handleOpenCommandPalette = () => {
    playSound("tab");
    openModal("commandPalette");
  };
  const handleOpenResume = () => {
    playSound("click");
    openModal("resume");
  };
  const handleOpenCustomize = () => openModal("customize");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/5 dark:border-white/5 bg-white/80 dark:bg-[#090a0f]/80 backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3">
        {/* ---------- GAUCHE : BRAND MARK ---------- */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="#top" className="group flex items-center gap-2 sm:gap-3">
            <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/30 via-black/5 dark:via-white/5 to-transparent p-[1px] shadow-md shadow-black/10 dark:shadow-black/40">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-white dark:bg-[#12141c] transition-all duration-300 group-hover:scale-95 border border-black/5 dark:border-transparent">
                <span
                  className="font-mono text-xs sm:text-sm font-bold tracking-tighter"
                  style={{ color: currentAccent.color }}
                >
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("") || "MW"}
                </span>
              </div>
              {/* Pastille d'accent */}
              <div
                className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-[#090a0f]"
                style={{ backgroundColor: currentAccent.color }}
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-sans text-xs sm:text-sm font-bold tracking-tight text-zinc-900 dark:text-white transition-colors group-hover:opacity-80">
                  {profile.name}
                </span>
                <span className="hidden rounded-full bg-black/5 dark:bg-white/5 px-2 py-0.5 text-[10px] font-medium tracking-wide text-zinc-600 dark:text-zinc-400 md:inline-block border border-black/5 dark:border-white/5">
                  Tech Creator
                </span>
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-[140px] sm:max-w-[200px]">
                {profile.role.split("&")[0].trim()}
              </span>
            </div>
          </a>

          {/* Badge de disponibilité */}
          {profile.available && (
            <div className="hidden items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 lg:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>En veille / Disponible</span>
            </div>
          )}
        </div>

        {/* ---------- DESKTOP : QUICK ACTIONS (lg:) ---------- */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Palette de commandes */}
          <button
            type="button"
            onClick={handleOpenCommandPalette}
            className="flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.05] px-3 py-1.5 text-xs text-zinc-600 dark:text-zinc-300 hover:border-black/25 dark:hover:border-white/25 transition-all"
            title="Recherche & Palette de commandes (Cmd + K)"
          >
            <Search className="h-3.5 w-3.5 text-zinc-400" />
            <span className="hidden xl:inline">Commandes</span>
            <kbd className="rounded border border-black/15 dark:border-white/15 bg-white dark:bg-black/40 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
              ⌘K
            </kbd>
          </button>

          {/* CV PDF */}
          <button
            type="button"
            onClick={handleOpenResume}
            className="flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/10 transition-all"
            title="Consulter et télécharger le CV (PDF)"
          >
            <FileText className="h-3.5 w-3.5 text-amber-500" />
            <span>CV (PDF)</span>
          </button>

          {/* Copier l'email */}
          <button
            type="button"
            onClick={copyEmail}
            title="Copier l'adresse email"
            className="flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-all hover:border-black/25 dark:hover:border-white/25 hover:bg-black/5 dark:hover:bg-white/10"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  Email copié !
                </span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                <span>{profile.email}</span>
              </>
            )}
          </button>

          {/* Toggle son */}
          <button
            type="button"
            onClick={() => {
              toggleSound();
              if (!soundEnabled) playSound("success");
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 transition-all hover:scale-105"
            title={
              soundEnabled
                ? "Couper les effets sonores (Mute)"
                : "Activer les effets sonores (Unmute)"
            }
            aria-label="Effets sonores"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-emerald-500" />
            ) : (
              <VolumeX className="h-4 w-4 text-zinc-400" />
            )}
          </button>

          {/* Studio de thèmes */}
          <button
            type="button"
            onClick={openThemeModal}
            className="flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-all hover:scale-105 hover:bg-black/5 dark:hover:bg-white/10"
            title="Personnaliser les couleurs & nuances du thème"
          >
            <Palette
              className="h-3.5 w-3.5"
              style={{ color: currentAccent.color }}
            />
            <span className="hidden xl:inline">Thème</span>
            <span
              className="h-2 w-2 rounded-full ring-1 ring-white/50"
              style={{ backgroundColor: currentAccent.color }}
            />
          </button>

          {/* Toggle Jour / Nuit */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 transition-all hover:scale-105 hover:bg-amber-400/15"
            title={
              theme === "dark"
                ? "Passer en mode Jour (Light)"
                : "Passer en mode Nuit (Dark)"
            }
            aria-label="Basculer Jour / Nuit"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-zinc-700 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Terminal */}
          <button
            type="button"
            onClick={handleOpenTerminal}
            className="flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-all hover:border-amber-400/50 hover:bg-amber-400/10"
            title="Ouvrir la console développeur (CLI)"
          >
            <Terminal className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
            <span>Terminal</span>
          </button>

          {/* Défi */}
          <button
            type="button"
            onClick={handleOpenChallenge}
            className="flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-semibold text-purple-700 dark:text-purple-300 transition-all hover:border-purple-400 hover:bg-purple-500/20"
            title="Es-tu meilleur que le dev ? Relève le défi !"
          >
            <Award className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
            <span>Le Défi</span>
            <span className="rounded bg-purple-500/20 dark:bg-purple-400/20 px-1 py-0.5 text-[9px] font-mono text-purple-800 dark:text-purple-200">
              Score
            </span>
          </button>

          {/* CTA RDV */}
          <button
            type="button"
            onClick={handleOpenBooking}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all shadow-md active:scale-95 ${currentAccent.btnClass}`}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Prendre RDV</span>
          </button>

          {/* Personnalisation du profil */}
          <button
            type="button"
            onClick={handleOpenCustomize}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 transition-colors hover:border-black/20 dark:hover:border-white/20 hover:text-black dark:hover:text-white"
            title="Modifier le profil (Nom, Bio, Photo)"
            aria-label="Modifier le profil"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* ---------- MOBILE & TABLET (< lg) ---------- */}
        <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
          {/* Recherche / palette de commandes */}
          <button
            type="button"
            onClick={handleOpenCommandPalette}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 transition-colors"
            title="Palette de commandes (⌘K)"
            aria-label="Recherche et commandes"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Studio de thèmes */}
          <button
            type="button"
            onClick={openThemeModal}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 transition-colors"
            title="Thème sur-mesure"
            aria-label="Personnaliser les couleurs"
          >
            <Palette
              className="h-4 w-4"
              style={{ color: currentAccent.color }}
            />
          </button>

          {/* Toggle Jour / Nuit */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 transition-colors"
            title={theme === "dark" ? "Mode Jour" : "Mode Nuit"}
            aria-label="Basculer Jour / Nuit"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-zinc-700" />
            )}
          </button>

          {/* CTA RDV compact */}
          <button
            type="button"
            onClick={handleOpenBooking}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition-all shadow-sm ${currentAccent.btnClass}`}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">RDV</span>
          </button>

          {/* Bouton menu mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 text-zinc-800 dark:text-zinc-200 transition-colors"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-drawer"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* ---------- DRAWER MOBILE ---------- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden border-t border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#0c0e15]/95 px-4 py-4 backdrop-blur-2xl overflow-hidden shadow-2xl"
          >
            <div className="space-y-2.5">
              {/* Info profil rapide */}
              <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">
                    {profile.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="flex items-center gap-1 rounded-full bg-black/5 dark:bg-white/5 px-2.5 py-1 text-[11px] font-mono text-zinc-600 dark:text-zinc-400"
                >
                  {copied ? (
                    <span className="text-emerald-500 font-semibold">
                      Copié !
                    </span>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              </div>

              {/* Grille de navigation */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleOpenBooking();
                  }}
                  className={`flex items-center justify-center gap-2 rounded-xl p-3 text-xs font-bold col-span-2 ${currentAccent.btnClass}`}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Réserver un appel découverte (30 min)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleOpenChallenge();
                  }}
                  className="flex items-center gap-2 rounded-xl border border-purple-500/25 bg-purple-500/10 p-3 text-xs font-semibold text-purple-700 dark:text-purple-300"
                >
                  <Award className="h-4 w-4 text-purple-500" />
                  <span>Le Défi Dev ⚡</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleOpenTerminal();
                  }}
                  className="flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-3 text-xs font-medium text-zinc-800 dark:text-zinc-200"
                >
                  <Terminal className="h-4 w-4 text-amber-500" />
                  <span>Terminal CLI</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleOpenCommandPalette();
                  }}
                  className="flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-3 text-xs font-medium text-zinc-800 dark:text-zinc-200"
                >
                  <Search className="h-4 w-4 text-amber-500" />
                  <span>Recherche (⌘K)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleOpenResume();
                  }}
                  className="flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-3 text-xs font-medium text-zinc-800 dark:text-zinc-200"
                >
                  <FileText className="h-4 w-4 text-amber-500" />
                  <span>CV (PDF)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    toggleSound();
                    if (!soundEnabled) playSound("success");
                  }}
                  className="flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-3 text-xs font-medium text-zinc-800 dark:text-zinc-200"
                >
                  {soundEnabled ? (
                    <>
                      <Volume2 className="h-4 w-4 text-emerald-500" />
                      <span>Sons : Activés</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="h-4 w-4 text-zinc-400" />
                      <span>Sons : Muets</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openThemeModal();
                  }}
                  className="flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-3 text-xs font-medium text-zinc-800 dark:text-zinc-200"
                >
                  <Palette
                    className="h-4 w-4"
                    style={{ color: currentAccent.color }}
                  />
                  <span>Thème &amp; Couleurs</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleOpenCustomize();
                  }}
                  className="flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-3 text-xs font-medium text-zinc-800 dark:text-zinc-200"
                >
                  <SlidersHorizontal className="h-4 w-4 text-zinc-500" />
                  <span>Profil &amp; Photo</span>
                </button>
              </div>

              {/* Liens rapides */}
              <div className="pt-2 flex items-center justify-around border-t border-black/5 dark:border-white/5 text-xs text-zinc-500">
                <a
                  href="#projets"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-black dark:hover:text-white"
                >
                  Projets
                </a>
                <span>·</span>
                <a
                  href="#offres"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-black dark:hover:text-white"
                >
                  Offres &amp; Tarifs
                </a>
                <span>·</span>
                <a
                  href="#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-black dark:hover:text-white"
                >
                  Services
                </a>
                <span>·</span>
                <a
                  href="#parcours"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-black dark:hover:text-white"
                >
                  Parcours
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
