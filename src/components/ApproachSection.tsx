"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

import { processSteps } from "@/data/portfolioData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Ma méthode : sept étapes, reliées par une ligne qui se remplit au scroll. */
export function ApproachSection() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 28 });

  return (
    <section id="approche" className="py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            label="Ma méthode"
            title="Comprendre avant de construire."
            intro="De la découverte au lancement, chaque étape a un but. Elles s'adaptent à la maturité du projet : un prototype n'a pas besoin de tout."
          />
        </div>

        <ol ref={ref} className="relative space-y-3">
          <span aria-hidden="true" className="absolute bottom-8 left-[27px] top-8 w-px bg-line" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute bottom-8 left-[27px] top-8 w-px origin-top bg-accent shadow-[0_0_12px] shadow-accent"
          />
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.id} delay={i * 0.03} className="relative flex gap-5">
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line bg-surface font-mono text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="card flex-1 px-5 py-4">
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
