// src/components/Footer.tsx
// ✅ Pas de 'use client' → Server Component, 0 JS envoyé pour ce contenu

import { Coffee } from "lucide-react";
import type { UserProfile } from "@/types";
import { BackToTopButton } from "./BackToTopButton";

interface FooterProps {
  profile: UserProfile;
}

export function Footer({ profile }: FooterProps) {
  return (
    <footer className="border-t border-black/5 dark:border-white/5 bg-[#f5f6fa] dark:bg-[#07080c] py-12 pb-24 text-sm text-zinc-500 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright & auteur */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="font-medium text-zinc-700 dark:text-zinc-400">
              © {new Date().getFullYear()} {profile.name} ·{" "}
              <span className="text-zinc-900 dark:text-zinc-300 font-serif italic">
                {profile.alias}
              </span>
            </p>
            <p className="text-xs text-zinc-500 flex items-center gap-1.5">
              <span>Conçu avec</span>
              <span className="text-amber-600 dark:text-amber-400 font-mono font-semibold">
                TypeScript, React 19 &amp; Tailwind
              </span>
              <span>&amp; passion du code</span>
              <Coffee className="h-3.5 w-3.5 text-amber-500" />
            </p>
          </div>

          {/* Crédits d'inspiration */}
          <div className="text-center md:text-left text-xs text-zinc-500 max-w-md">
            <span>Inspiré par le minimalisme et l&apos;artisanat web de </span>
            <a
              href="https://jk.nameksociety.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="text-zinc-700 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-300 underline underline-offset-2 transition-colors font-medium"
            >
              jk.nameksociety.com
            </a>
            <span> et </span>
            <a
              href="https://aquidev.com"
              target="_blank"
              rel="noreferrer noopener"
              className="text-zinc-700 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-300 underline underline-offset-2 transition-colors font-medium"
            >
              aquidev.com
            </a>
          </div>

          {/* Bouton client isolé */}
          <div>
            <BackToTopButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
