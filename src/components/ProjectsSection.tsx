"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { BrowserFrame, PhoneFrame } from "@/components/ui/Devices";
import { projectsData, SECTOR_LABELS } from "@/data/projects";
import type { Project } from "@/types";

/**
 * Projets en grandes cartes qui s'empilent au scroll :
 * chaque carte montre le vrai produit (desktop + mobile).
 */
export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = projectsData.length;

  return (
    <section id="projets" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          label="Projets sélectionnés"
          title={
            <>
              Six produits. <span className="text-muted">Cinq déjà en ligne.</span>
            </>
          }
          intro="Un SaaS événementiel, une plateforme d'apprentissage, une marque de mode, une école, un fournisseur B2B et une application de mobilité."
        />

        <div ref={ref} className="relative mt-14">
          {projectsData.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              total={n}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  // Les cartes déjà recouvertes reculent légèrement
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index - 1) * 0.035]);
  const mobile = project.visuals.find((v) => v.kind === "mobile" && v.src)?.src;

  return (
    <div className="mb-6 md:sticky md:h-[min(78vh,660px)]" style={{ top: `${96 + index * 14}px` }}>
      <motion.article
        style={reduce ? undefined : { scale, transformOrigin: "top center" }}
        className="relative h-full overflow-hidden rounded-[2rem] border border-line bg-surface"
      >
        {/* Teinte du projet */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(80% 90% at 100% 0%, ${project.color}40, transparent 60%)`,
          }}
        />

        <div className="relative grid h-full grid-cols-1 gap-8 p-6 md:grid-cols-[0.85fr_1.15fr] md:p-10">
          {/* Texte */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full border border-line bg-canvas/40 px-2.5 py-1 font-mono text-muted">
                {project.index}
              </span>
              <span className="rounded-full border border-line bg-canvas/40 px-2.5 py-1 text-muted">
                {SECTOR_LABELS[project.sector]}
              </span>
              {project.url && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-emerald-600 dark:text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  En ligne
                </span>
              )}
            </div>

            <h3 className="mt-6 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">{project.name}</h3>
            <p className="mt-2 text-lg text-accent-ink">{project.positioning}</p>
            <p className="mt-5 leading-relaxed text-muted">{project.summary}</p>

            {project.results?.length ? (
              <ul className="mt-6 hidden space-y-2 text-sm lg:block">
                {project.results.slice(0, 3).map((r) => (
                  <li key={r} className="flex gap-2.5">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="text-ink/85">{r}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <Link
                href={`/projets/${project.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-canvas transition-transform hover:scale-[1.03]"
              >
                Étude de cas
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-semibold transition-colors hover:border-ink/30"
                >
                  Voir le site
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Visuels */}
          <Link
            href={`/projets/${project.slug}`}
            aria-label={`Étude de cas ${project.name}`}
            className="group relative flex items-center"
          >
            {project.heroVisual ? (
              <>
                <BrowserFrame
                  src={project.heroVisual}
                  alt={`${project.name} — capture du site`}
                  url={project.url}
                  className="w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5"
                />
                {mobile && (
                  <PhoneFrame
                    src={mobile}
                    alt={`${project.name} sur mobile`}
                    className="absolute -bottom-4 -right-2 w-[26%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-4 md:-right-4"
                  />
                )}
              </>
            ) : (
              <ProjectCover project={project} className="aspect-[16/10] w-full rounded-xl" />
            )}
          </Link>
        </div>
      </motion.article>
    </div>
  );
}
