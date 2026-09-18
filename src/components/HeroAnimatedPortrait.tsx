"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ShieldCheck, Terminal, Heart } from "lucide-react";

import { useTheme } from "@/context/ThemeContext";
import type { UserProfile } from "@/types";

interface HeroAnimatedPortraitProps {
  profile: UserProfile;
  onOpenBooking: () => void;
  onOpenTerminal?: () => void;
}

export function HeroAnimatedPortrait({
  profile,
  onOpenBooking,
  onOpenTerminal,
}: HeroAnimatedPortraitProps) {
  const { currentAccent } = useTheme();
  const [imgError, setImgError] = useState(false);
  const [likesCount, setLikesCount] = useState(142);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikesCount((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const portraitSrc = profile.avatarUrl || "/assets/portrait.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]"
    >
      {/* Halo d'ambiance réactif à l'accent */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-3xl opacity-50 blur-2xl transition-all duration-700 dark:opacity-70"
        style={{
          background: `radial-gradient(circle, ${currentAccent.glow} 0%, transparent 70%)`,
        }}
      />

      {/* Cadre gradient rotatif */}
      <div className="relative rounded-3xl p-[2px] transition-all duration-500 shadow-2xl">
        {/* Bordure gradient animée */}
        <div
          className="absolute inset-0 rounded-3xl opacity-75 blur-[1px] transition-all"
          style={{
            background: `linear-gradient(135deg, ${currentAccent.color}, transparent 45%, ${currentAccent.color} 90%)`,
          }}
        />

        {/* Carte principale */}
        <div className="relative overflow-hidden rounded-[22px] border border-black/10 dark:border-white/10 bg-white/90 dark:bg-[#12141d]/90 p-3 sm:p-4 backdrop-blur-xl">
          {/* Barre d'outils supérieure */}
          <div className="flex items-center justify-between px-2 pb-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-1 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                {profile.alias || "mike.dev"}
              </span>
            </div>

            {/* Bouton like */}
            <button
              type="button"
              onClick={handleLike}
              aria-label={hasLiked ? "Déjà liké" : "Liker ce profil"}
              className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] transition-all ${
                hasLiked
                  ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 font-semibold"
                  : "bg-black/5 dark:bg-white/5 hover:text-rose-500"
              }`}
              title="Encourager le dev !"
            >
              <Heart
                className={`h-3 w-3 ${
                  hasLiked ? "fill-rose-500 text-rose-500" : ""
                }`}
              />
              <span>{likesCount}</span>
            </button>
          </div>

          {/* Scène du portrait avec cadrage animé */}
          <div className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-900 shadow-inner">
            {!imgError ? (
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5.5,
                  ease: "easeInOut",
                }}
                className="relative h-full w-full"
              >
                <Image
                  src={portraitSrc}
                  alt={`Portrait de ${profile.name}`}
                  fill
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 380px, 420px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                  onError={() => setImgError(true)}
                />
              </motion.div>
            ) : (
              /* Fallback monogramme stylé si l'image échoue */
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 p-6 text-center">
                <div
                  className="flex h-24 w-24 items-center justify-center rounded-2xl text-4xl font-extrabold text-white shadow-xl mb-3"
                  style={{ backgroundColor: currentAccent.color }}
                >
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="font-mono text-sm font-bold text-white">
                  {profile.name}
                </div>
                <div className="text-xs text-zinc-400">{profile.specialty}</div>
              </div>
            )}

            {/* Vignette cinématique en bas de l'image */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            {/* Statut en bas de la photo */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
              <div className="flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs backdrop-blur-md border border-white/10">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="font-medium text-[11px] tracking-wide">
                  {profile.available
                    ? "En direct de Paris · Prêt à coder"
                    : "Actuellement sur projet"}
                </span>
              </div>

              {onOpenTerminal && (
                <button
                  type="button"
                  onClick={onOpenTerminal}
                  aria-label="Ouvrir le terminal"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors"
                  title="Ouvrir le terminal"
                >
                  <Terminal className="h-3.5 w-3.5 text-white" />
                </button>
              )}
            </div>
          </div>

          {/* Barre de métriques sous le portrait */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] p-2">
              <span className="block font-mono text-sm font-bold text-zinc-900 dark:text-white">
                100%
              </span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                Lighthouse &amp; Clean Code
              </span>
            </div>

            <div className="rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] p-2">
              <span
                className="block font-mono text-sm font-bold"
                style={{ color: currentAccent.color }}
              >
                &lt; 24h
              </span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                Délai de réponse moyen
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges satellites flottants */}
      {/* 1. Badge haut droite : Stack */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -top-3 -right-2 sm:-right-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#151722]/95 px-3 py-1.5 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-800 dark:text-zinc-200"
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: currentAccent.color }}
        />
        <span>React 19 &amp; Next.js</span>
      </motion.div>

      {/* 2. Badge bas gauche : Garantie */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4.8,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="pointer-events-none absolute -bottom-3 -left-2 sm:-left-4 rounded-2xl border border-emerald-500/20 bg-white/95 dark:bg-[#151722]/95 px-3 py-1.5 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400"
      >
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
        <span>Garantie 0 Dette Tech</span>
      </motion.div>
    </motion.div>
  );
}
