"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { getProject } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/components/ui/Reveal";
import { trackSpot } from "@/components/ui/spotlight";

/** Le récit : un problème observé → le produit construit pour y répondre. */
const STORIES = [
  {
    slug: "eventage",
    problem: "Des organisateurs d'événements qui jonglent entre des outils qui ne se parlent pas.",
  },
  {
    slug: "last",
    problem: "Des élèves qui peinent à trouver des ressources classées par classe et par niveau.",
  },
  {
    slug: "road-alert",
    problem: "Des conducteurs coincés dans les bouchons de Douala, sans information fiable sur la route.",
  },
];

export function ProblemsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          label="Pourquoi je construis"
          title="Des problèmes que je vois autour de moi."
          intro="Je pars toujours d'une situation concrète. Voici trois d'entre elles, et ce que j'ai construit pour y répondre."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {STORIES.map(({ slug, problem }) => {
            const p = getProject(slug);
            if (!p) return null;
            return (
              <motion.div key={slug} variants={staggerItem}>
                <Link
                  href={`/projets/${slug}`}
                  onMouseMove={trackSpot}
                  className="card spot group flex h-full flex-col overflow-hidden"
                >
                  <div className="p-6">
                    <p className="label">Le problème</p>
                    <p className="mt-3 text-lg leading-snug">{problem}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-line px-6 py-4">
                    <span className="text-sm text-muted">
                      → <span className="font-semibold text-ink">{p.name}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted transition-all group-hover:rotate-45 group-hover:text-accent" />
                  </div>
                  {p.heroVisual && (
                    <div className="relative mx-6 mb-0 aspect-[16/9] overflow-hidden rounded-t-xl border border-b-0 border-line">
                      <Image
                        src={p.heroVisual}
                        alt={`${p.name} — capture`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
                    </div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
