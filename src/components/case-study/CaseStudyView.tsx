"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { processSteps } from "@/data/portfolioData";
import { SECTOR_LABELS, STATUS_LABELS } from "@/data/projects";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { BrowserFrame, PhoneFrame } from "@/components/ui/Devices";
import { Reveal, EASE, staggerContainer, staggerItem } from "@/components/ui/Reveal";
import { Gallery } from "./Gallery";
import type { Project } from "@/types";

const IS_DEV = process.env.NODE_ENV !== "production";

function Block({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal className="card p-7 md:p-9">
      <p className="label">{label}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{title}</h2>
      <div className="mt-5">{children}</div>
    </Reveal>
  );
}

export function CaseStudyView({ project, next }: { project: Project; next: Project }) {
  const reduce = useReducedMotion();
  const mobile = project.visuals.find((v) => v.kind === "mobile" && v.src)?.src;

  const meta = [
    { label: "Secteur", value: SECTOR_LABELS[project.sector] },
    { label: "Statut", value: project.status && STATUS_LABELS[project.status] },
    { label: "Rôle", value: project.role?.join(", ") },
    { label: "Pour", value: project.audience },
    { label: "Année", value: project.year },
  ].filter((m): m is { label: string; value: string } => Boolean(m.value));

  const steps = project.process ? processSteps.filter((s) => project.process!.includes(s.id)) : [];

  const gaps = [
    !project.year && "Année",
    !project.role?.length && "Rôle personnel",
    !project.process?.length && "Étapes de processus réalisées",
    !project.architecture?.length && "Architecture technique",
    !project.heroVisual && "Visuel principal (heroVisual)",
    project.visuals.some((v) => !v.src) && `${project.visuals.filter((v) => !v.src).length} capture(s) à fournir`,
  ].filter(Boolean) as string[];

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <article className="relative overflow-hidden pt-32">
      {/* Halo teinté par le projet */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[700px] w-[1100px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(closest-side, ${project.color}45, transparent)` }}
      />

      <div className="mx-auto max-w-6xl px-5">
        <motion.div {...fade(0)}>
          <Link href="/#projets" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> Tous les projets
          </Link>
        </motion.div>

        <motion.div {...fade(0.05)} className="mt-8 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-muted">{project.index}</span>
          <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-muted">{SECTOR_LABELS[project.sector]}</span>
          {project.url && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-emerald-600 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> En ligne
            </span>
          )}
        </motion.div>

        <motion.h1
          {...fade(0.1)}
          className="text-shine mt-5 text-5xl font-semibold leading-[1] tracking-[-0.05em] sm:text-7xl"
        >
          {project.name}
        </motion.h1>
        <motion.p {...fade(0.15)} className="mt-3 text-xl text-accent-ink">
          {project.positioning}
        </motion.p>
        <motion.p {...fade(0.2)} className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {project.summary}
        </motion.p>

        <motion.div {...fade(0.25)} className="mt-8 flex flex-wrap gap-3">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-shine inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-fg shadow-[0_0_40px_-10px] shadow-accent/60 transition-transform hover:scale-[1.03]"
            >
              Visiter le site en ligne <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-sm font-semibold transition-colors hover:border-ink/30"
          >
            Un projet similaire ? <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Visuel phare */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
          className="relative mt-16"
        >
          {project.heroVisual ? (
            <>
              <BrowserFrame src={project.heroVisual} full={project.fullVisual} alt={`${project.name} — page d'accueil`} url={project.url} sizes="(max-width: 1200px) 100vw, 1100px" preload />
              {mobile && (
                <PhoneFrame
                  src={mobile}
                  alt={`${project.name} sur mobile`}
                  className="absolute -bottom-10 -right-2 hidden w-[20%] md:block lg:-right-8"
                />
              )}
            </>
          ) : (
            <ProjectCover project={project} priority className="aspect-[16/9] w-full rounded-2xl" sizes="100vw" />
          )}
        </motion.div>

        {/* Fiche */}
        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-5"
        >
          {meta.map((m) => (
            <motion.div key={m.label} variants={staggerItem} className="bg-canvas p-5">
              <dt className="label">{m.label}</dt>
              <dd className="mt-1.5 text-sm">{m.value}</dd>
            </motion.div>
          ))}
        </motion.dl>

        {IS_DEV && gaps.length > 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-accent/50 bg-accent/5 p-5 text-sm">
            <p className="font-semibold text-accent-ink">À compléter dans src/data/projects.ts (visible en dev seulement)</p>
            <p className="mt-1 text-muted">{gaps.join(" · ")}</p>
          </div>
        )}

        {/* Problème / Vision */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Block label="Le problème" title="Pourquoi ce projet">
            <div className="space-y-4 leading-relaxed text-ink/85">
              {project.problem.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Block>
          <Block label="La vision" title="La solution imaginée">
            <ul className="space-y-3">
              {project.vision.map((v) => (
                <li key={v} className="flex gap-3 leading-relaxed text-ink/85">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {v}
                </li>
              ))}
            </ul>
          </Block>
        </div>

        {/* Ce qui a été livré */}
        {project.results && project.results.length > 0 && (
          <Reveal className="card mt-4 border-accent/30 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--accent-color)_12%,var(--surface)),var(--surface)_55%)] p-7 md:p-9">
            <p className="label">Résultat</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Ce qui est en ligne aujourd&apos;hui</h2>
            <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {project.results.map((r) => (
                <li key={r} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent/20 text-accent">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-ink/90">{r}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {/* Galerie */}
        {(IS_DEV || project.visuals.some((v) => v.src)) && (
          <section className="mt-20">
            <Reveal>
              <p className="label">Galerie</p>
              <h2 className="mb-8 mt-2 text-3xl font-semibold tracking-[-0.03em]">Le produit en images</h2>
            </Reveal>
            <Gallery project={project} />
          </section>
        )}

        {/* Fonctionnalités */}
        <section className="mt-20">
          <Reveal>
            <p className="label">Fonctionnalités</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">Ce que fait le produit</h2>
          </Reveal>
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {project.features.map((f, i) => (
              <motion.li key={f.title} variants={staggerItem} className="card p-5">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-semibold">{f.title}</p>
                {f.description && <p className="mt-1 text-sm text-muted">{f.description}</p>}
              </motion.li>
            ))}
          </motion.ul>
        </section>

        {/* Stack, processus, architecture */}
        <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-2">
          {project.stack?.length ? (
            <Block label="Stack" title="Technologies utilisées">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <li key={t} className="rounded-lg border border-line bg-canvas/50 px-3 py-1.5 text-sm">
                    {t}
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}
          <Block label="Ce projet démontre" title="Ce que ça dit de mon travail">
            <ul className="space-y-2.5">
              {project.demonstrates.map((d) => (
                <li key={d} className="flex gap-3 text-ink/85">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {d}
                </li>
              ))}
            </ul>
          </Block>
          {steps.length > 0 && (
            <Block label="Processus" title="Comment j'ai travaillé">
              <ol className="space-y-2">
                {steps.map((s) => (
                  <li key={s.id}>
                    <span className="font-semibold">{s.title}</span>
                    <span className="text-muted"> — {s.text}</span>
                  </li>
                ))}
              </ol>
            </Block>
          )}
          {project.architecture?.length ? (
            <Block label="Architecture" title="Sous le capot">
              <dl className="space-y-2">
                {project.architecture.map((a) => (
                  <div key={a.layer}>
                    <dt className="font-semibold">{a.layer}</dt>
                    <dd className="text-muted">{a.detail}</dd>
                  </div>
                ))}
              </dl>
            </Block>
          ) : null}
        </div>

        {/* Projet suivant */}
        <Link href={`/projets/${next.slug}`} className="card group mt-20 block overflow-hidden">
          <div className="flex items-center justify-between gap-6 p-7 md:p-9">
            <div>
              <p className="label">Projet suivant</p>
              <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">{next.name}</p>
              <p className="mt-1 text-muted">{next.positioning}</p>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-fg transition-transform duration-500 group-hover:rotate-[-45deg]">
              <ArrowRight className="h-5 w-5" />
            </span>
          </div>
          {next.heroVisual ? (
            <div className="relative mx-7 aspect-[16/6] overflow-hidden rounded-t-xl border border-b-0 border-line md:mx-9">
              <Image
                src={next.heroVisual}
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          ) : (
            <ProjectCover project={next} showTitle={false} className="mx-7 aspect-[16/6] rounded-t-xl md:mx-9" />
          )}
        </Link>
      </div>
      <div className="h-24" />
    </article>
  );
}
