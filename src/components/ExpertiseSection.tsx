"use client";

import { motion } from "motion/react";

import { skillGroups } from "@/data/portfolioData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/components/ui/Reveal";

/** Stack : un bandeau qui défile + les outils regroupés par domaine. */
export function ExpertiseSection() {
  const all = skillGroups.flatMap((g) => g.skills.map((s) => s.name));

  return (
    <section id="expertise" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          label="Stack technique"
          title="Les outils avec lesquels je livre."
          align="center"
        />
      </div>

      {/* Bandeau défilant */}
      <div className="mask-x mt-12 overflow-hidden">
        <div className="animate-marquee flex w-max gap-3 hover:[animation-play-state:paused]">
          {[...all, ...all].map((name, i) => (
            <span
              key={i}
              className="rounded-xl border border-line bg-surface px-5 py-3 text-lg font-medium text-ink/90 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:text-accent hover:shadow-[0_10px_30px_-12px] hover:shadow-accent/50"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 px-5 sm:grid-cols-2 lg:grid-cols-5"
      >
        {skillGroups.map((g) => (
          <motion.div key={g.id} variants={staggerItem} className="card p-5">
            <h3 className="text-sm font-semibold">{g.title}</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-muted">
              {g.skills.map((s) => (
                <li key={s.name} title={s.context}>
                  {s.name}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
