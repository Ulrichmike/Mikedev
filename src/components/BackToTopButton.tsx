// src/components/BackToTopButton.tsx
"use client";

import { ArrowUp } from "lucide-react";

export function BackToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Retour en haut de page"
      className="group inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-all hover:border-black/25 dark:hover:border-white/25 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white shadow-sm"
    >
      <span>Retour en haut</span>
      <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
