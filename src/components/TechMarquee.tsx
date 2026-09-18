// ✅ Pas de 'use client' → Server Component, 0 JS envoyé

import { marqueeItems, marqueeTaglines } from "@/data/portfolioData";

export function TechMarquee() {
  return (
    <div
      className="relative w-full overflow-hidden border-y border-black/5 dark:border-white/5 bg-[#f5f6fa]/60 dark:bg-[#07080c]/60 py-4 select-none backdrop-blur-md transition-colors duration-300"
      role="marquee"
      aria-label="Technologies et engagements qualité"
    >
      {/* Fades latéraux pour effet carrousel infini */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#fbfbfe] dark:from-[#090a0f] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#fbfbfe] dark:from-[#090a0f] to-transparent" />

      {/* Ligne 1 : Stack technologique */}
      <div className="flex overflow-hidden py-1">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={`tech-${idx}`} className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                {item}
              </span>
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-amber-500/70"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Ligne 2 : Taglines craft & ingénierie */}
      <div className="mt-2 flex overflow-hidden py-1 border-t border-black/[0.03] dark:border-white/[0.03]">
        <div className="animate-marquee-reverse flex items-center gap-8 whitespace-nowrap">
          {[...marqueeTaglines, ...marqueeTaglines].map((tagline, idx) => (
            <div key={`tagline-${idx}`} className="flex items-center gap-3">
              <span className="font-serif italic text-sm text-zinc-600 dark:text-zinc-400">
                {tagline}
              </span>
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rotate-45 bg-purple-500/70"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
