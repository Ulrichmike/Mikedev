"use client";

import { testimonialsData } from "@/data/portfolioData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Preuve sociale — n'affiche que des témoignages authentiques.
 * La section disparaît tant que `testimonialsData` est vide.
 */
export function TestimonialsSection() {
  if (testimonialsData.length === 0) return null;

  return (
    <section id="temoignages" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading index="✦" label="In their words" title="Ce qu'ils en disent." />
        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2">
          {testimonialsData.map((t, i) => (
            <Reveal as="article" key={t.id} delay={i * 0.06} className="border-t border-line pt-6">
              <blockquote className="text-xl leading-relaxed">« {t.content} »</blockquote>
              <p className="mt-6 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="text-muted">
                  {" "}
                  — {t.role}
                  {t.company && `, ${t.company}`}
                </span>
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
