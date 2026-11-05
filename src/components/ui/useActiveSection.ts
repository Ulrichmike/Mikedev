"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

export const SECTION_IDS = [
  "top",
  "projets",
  "offres",
  "defi",
  "services",
  "parcours",
  "contact",
] as const;

/** Section actuellement visible (IntersectionObserver, sans écouteur de scroll). */
export function useActiveSection(ids: readonly string[] = SECTION_IDS) {
  const [active, setActive] = useState<string>(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // Bande horizontale au tiers supérieur de l'écran
      { rootMargin: "-35% 0px -60% 0px" },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/** true quand la page a défilé au-delà de `threshold` px. */
export function useScrolledPast(threshold: number) {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > threshold,
    () => false,
  );
}
