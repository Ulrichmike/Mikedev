import React from "react";
import { Briefcase, MapPin, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

import { experiencesData } from "@/data/portfolioData";
import type { Experience } from "@/types";

export const ExperienceTimeline: React.FC = () => {
  return (
    <section
      id="parcours"
      className="py-16 md:py-24 border-t border-black/5 dark:border-white/5 transition-colors duration-300"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            <Briefcase className="h-3 w-3 text-amber-500" />
            <span>Parcours &amp; Expérience</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Expérience &amp;{" "}
            <span className="font-serif italic font-normal text-amber-600 dark:text-amber-300">
              impact
            </span>
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            Évolution professionnelle, responsabilités techniques et
            réalisations mesurables.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="mt-12 space-y-6">
          {experiencesData.map((exp: Experience) => (
            <motion.div
              whileHover={{ y: -2 }}
              key={exp.id}
              className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#10131d] p-6 sm:p-8 transition-all hover:border-black/20 dark:hover:border-white/20 shadow-sm dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
            >
              {/* Ligne du haut */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-black/5 dark:border-white/5 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-amber-600 dark:text-amber-400 font-mono">
                    <span>{exp.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-zinc-500">
                      <MapPin className="h-3 w-3" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1 text-xs font-mono text-zinc-700 dark:text-zinc-300">
                    {exp.period}
                  </span>
                  <span className="rounded-full bg-amber-400/10 px-2.5 py-1 text-[11px] font-mono text-amber-700 dark:text-amber-300 border border-amber-400/20">
                    {exp.type}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {exp.description}
              </p>

              {/* Faits marquants */}
              <div className="mt-4 space-y-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Faits marquants
                </span>
                <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                  {exp.achievements.map((ach, aIdx) => (
                    <li
                      key={`${exp.id}-achievement-${aIdx}`}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mt-5 border-t border-black/5 dark:border-white/5 pt-3">
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-zinc-600 dark:text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
