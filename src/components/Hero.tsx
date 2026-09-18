"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowDown,
  Sparkles,
  Trophy,
  Check,
  Terminal,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  FileText,
} from "lucide-react";

import { useTheme } from "@/context/ThemeContext";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/icons/BrandIcons";
import { HeroAnimatedPortrait } from "./HeroAnimatedPortrait";
import type { UserProfile } from "@/types";

interface HeroProps {
  profile: UserProfile;
  onOpenChallenge: () => void;
  onOpenTerminal: () => void;
  onOpenBooking: () => void;
  onOpenResume?: () => void;
}

export function Hero({
  profile,
  onOpenChallenge,
  onOpenTerminal,
  onOpenBooking,
  onOpenResume,
}: HeroProps) {
  const { currentAccent } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Le presse-papier peut échouer en contexte non sécurisé
    }
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24"
    >
      {/* Éclairage d'ambiance */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full blur-3xl opacity-60 dark:opacity-80 transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at center, ${currentAccent.glow} 0%, rgba(147, 51, 234, 0.1) 40%, transparent 70%)`,
        }}
      />
      <div className="pointer-events-none absolute top-1/3 -right-20 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Grille principale : texte à gauche, portrait à droite */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Colonne gauche : contenu éditorial (cols 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Badge d'accroche avec statut */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex flex-wrap items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/[0.04] px-4 py-1.5 backdrop-blur-md shadow-sm"
            >
              <Sparkles
                className="h-3.5 w-3.5 animate-pulse-subtle"
                style={{ color: currentAccent.color }}
              />
              <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                {profile.specialty}
              </span>
              <span className="h-1 w-1 rounded-full bg-zinc-400 dark:bg-zinc-500" />
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Disponible immédiatement
              </span>
            </motion.div>

            {/* Titre principal */}
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08]"
              >
                Développeur Full-Stack &amp;{" "}
                <span
                  className="font-serif italic font-normal text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${currentAccent.color}, #f59e0b, #fbbf24)`,
                  }}
                >
                  Tech Creator
                </span>
                <span style={{ color: currentAccent.color }}>.</span>
              </motion.h1>

              {/* Portrait mobile (affiché entre le titre et le texte) */}
              <div className="block lg:hidden pt-2 pb-2">
                <HeroAnimatedPortrait
                  profile={profile}
                  onOpenBooking={onOpenBooking}
                  onOpenTerminal={onOpenTerminal}
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-lg md:text-xl font-normal max-w-2xl"
              >
                Je conçois des architectures web{" "}
                <span className="text-zinc-900 dark:text-white font-medium underline underline-offset-4 decoration-amber-400/50">
                  robustes
                </span>
                , des SaaS à fort impact et des interfaces produit
                d&apos;exception. À la croisée du{" "}
                <span
                  className="font-serif italic text-lg sm:text-xl font-medium"
                  style={{ color: currentAccent.color }}
                >
                  craftsmanship moderne
                </span>{" "}
                et d&apos;une exécution pragmatique taillée pour convertir.
              </motion.p>
            </div>

            {/* Badges de confiance */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25 }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-medium text-zinc-600 dark:text-zinc-400"
            >
              <div className="flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] px-3 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>Garantie 30j après livraison</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] px-3 py-1">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                <span>Score Lighthouse 95+ garanti</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] px-3 py-1">
                <Clock className="h-3.5 w-3.5 text-blue-500" />
                <span>Cadrage offert (30 min)</span>
              </div>
            </motion.div>

            {/* Boutons d'action */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1"
            >
              {/* CTA principal */}
              <button
                type="button"
                onClick={onOpenBooking}
                className={`group relative inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-all shadow-xl active:scale-95 ${currentAccent.btnClass}`}
              >
                <span>Réserver un appel découverte (Offert)</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* CTA secondaire : Projets */}
              <a
                href="#projets"
                className="group inline-flex items-center gap-2 rounded-full border border-black/15 dark:border-white/15 bg-white dark:bg-white/5 px-5 py-3.5 text-sm font-semibold text-zinc-800 dark:text-white transition-all hover:bg-zinc-100 dark:hover:bg-white/10 hover:border-black/30 dark:hover:border-white/30"
              >
                <span>Voir les réalisations</span>
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5 text-zinc-500" />
              </a>

              {/* CV direct */}
              {onOpenResume && (
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="group inline-flex items-center gap-2 rounded-full border border-black/15 dark:border-white/15 bg-white dark:bg-white/5 px-4 sm:px-5 py-3.5 text-sm font-semibold text-zinc-800 dark:text-white transition-all hover:bg-zinc-100 dark:hover:bg-white/10 hover:border-black/30 dark:hover:border-white/30 active:scale-95"
                  title="Consulter et télécharger le CV (PDF)"
                >
                  <FileText className="h-4 w-4 text-amber-500 transition-transform group-hover:scale-110" />
                  <span>CV (PDF)</span>
                </button>
              )}

              {/* Signature : Défi développeur */}
              <button
                type="button"
                onClick={onOpenChallenge}
                className="group inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/10 px-4 py-3.5 text-sm font-semibold text-purple-700 dark:text-purple-200 transition-all hover:border-purple-400 hover:bg-purple-500/20 active:scale-95"
              >
                <Trophy className="h-4 w-4 text-purple-600 dark:text-purple-400 transition-transform group-hover:scale-110" />
                <span className="hidden sm:inline">
                  Es-tu meilleur que le dev ?
                </span>
                <span className="sm:hidden">Défi ⚡</span>
                <span className="rounded-full bg-purple-500/20 dark:bg-purple-400/20 px-2 py-0.5 text-[10px] font-mono text-purple-800 dark:text-purple-300">
                  Score
                </span>
              </button>
            </motion.div>

            {/* Réseaux sociaux + connexion directe */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-between gap-4 border-t border-black/10 dark:border-white/10 pt-5"
            >
              <div className="flex items-center gap-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Profil GitHub"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 transition-all hover:border-black/25 dark:hover:border-white/25 hover:text-black dark:hover:text-white hover:scale-105"
                  title="GitHub Profile"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Profil LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 transition-all hover:border-black/25 dark:hover:border-white/25 hover:text-blue-500 hover:scale-105"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>

                {profile.twitter && (
                  <a
                    href={profile.twitter}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Profil Twitter / X"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 transition-all hover:border-black/25 dark:hover:border-white/25 hover:text-sky-500 hover:scale-105"
                    title="Twitter / X"
                  >
                    <TwitterIcon className="h-4 w-4" />
                  </a>
                )}

                {profile.youtube && (
                  <a
                    href={profile.youtube}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Chaîne YouTube"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 transition-all hover:border-black/25 dark:hover:border-white/25 hover:text-red-500 hover:scale-105"
                    title="YouTube Channel"
                  >
                    <YoutubeIcon className="h-4 w-4" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={onOpenTerminal}
                  className="ml-2 hidden items-center gap-1.5 rounded-full border border-dashed border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-mono text-amber-700 dark:text-amber-300 hover:bg-amber-400/20 sm:inline-flex"
                >
                  <Terminal className="h-3 w-3" />
                  <span>terminal: help</span>
                </button>
              </div>

              {/* Copier l'email */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      Copié dans le presse-papier !
                    </span>
                  </>
                ) : (
                  <>
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>{profile.email}</span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                      (copier)
                    </span>
                  </>
                )}
              </button>
            </motion.div>
          </div>

          {/* Colonne droite : portrait animé (cols 8-12) */}
          <div className="hidden lg:col-span-5 lg:block pl-4">
            <HeroAnimatedPortrait
              profile={profile}
              onOpenBooking={onOpenBooking}
              onOpenTerminal={onOpenTerminal}
            />
          </div>
        </div>

        {/* Métriques d'impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] p-4 text-center backdrop-blur-sm shadow-sm transition-all hover:-translate-y-1 hover:border-amber-400/30">
            <div
              className="font-mono text-3xl font-extrabold sm:text-4xl"
              style={{ color: currentAccent.color }}
            >
              +4 ans
            </div>
            <div className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
              d&apos;expérience Full-Stack
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] p-4 text-center backdrop-blur-sm shadow-sm transition-all hover:-translate-y-1 hover:border-amber-400/30">
            <div className="font-mono text-3xl font-extrabold text-zinc-900 dark:text-white sm:text-4xl">
              25+
            </div>
            <div className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Projets livrés &amp; SaaS
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] p-4 text-center backdrop-blur-sm shadow-sm transition-all hover:-translate-y-1 hover:border-amber-400/30">
            <div className="font-mono text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 sm:text-4xl">
              100%
            </div>
            <div className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Respect des délais annoncés
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] p-4 text-center backdrop-blur-sm shadow-sm transition-all hover:-translate-y-1 hover:border-amber-400/30">
            <div className="font-mono text-3xl font-extrabold text-purple-600 dark:text-purple-400 sm:text-4xl">
              99+
            </div>
            <div className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Score Lighthouse &amp; SEO
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
