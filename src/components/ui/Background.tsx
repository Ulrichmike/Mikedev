"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Arrière-plan global, fixe derrière tout le site :
 * - aurores colorées qui dérivent lentement (parallaxe au scroll) ;
 * - grille fine révélée autour du curseur, comme une lampe-torche ;
 * - halo d'accent sous le curseur.
 * Gère aussi la lueur des bordures de toutes les `.card` au survol
 * (variables --mx / --my), sans code à ajouter carte par carte.
 */
export function Background() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  useEffect(() => {
    const root = ref.current;
    if (!root || reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      if (!last) return;
      const { clientX: x, clientY: y } = last;
      root.style.setProperty("--cx", `${x}px`);
      root.style.setProperty("--cy", `${y}px`);
      root.style.setProperty("--on", "1");

      // Lueur des cartes : position du curseur relative à la carte survolée
      const card = (last.target as HTMLElement | null)?.closest<HTMLElement>(".card, .glow-border, [data-torch]");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${x - r.left}px`);
        card.style.setProperty("--my", `${y - r.top}px`);
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onLeave = () => root.style.setProperty("--on", "0");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  return (
    <div ref={ref} aria-hidden="true" className="bg-stage pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Aurores */}
      <motion.div style={reduce ? undefined : { y: y1 }} className="absolute inset-0">
        <div className="aurora aurora-1" />
      </motion.div>
      <motion.div style={reduce ? undefined : { y: y2 }} className="absolute inset-0">
        <div className="aurora aurora-2" />
      </motion.div>
      <motion.div style={reduce ? undefined : { y: y3 }} className="absolute inset-0">
        <div className="aurora aurora-3" />
      </motion.div>

      {/* Grille : très discrète partout, révélée autour du curseur */}
      <div className="bg-grid absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      <div className="bg-grid bg-grid-torch absolute inset-0" />

      {/* Halo sous le curseur */}
      <div className="cursor-glow absolute inset-0" />

      {/* Vignette pour garder le texte lisible */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--paper)_100%)]" />
    </div>
  );
}
