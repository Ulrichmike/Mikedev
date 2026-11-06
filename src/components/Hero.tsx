"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";

import { LocalTime } from "@/components/ui/LocalTime";
import { EASE } from "@/components/ui/Reveal";
import { BrowserFrame, PhoneFrame } from "@/components/ui/Devices";
import { getProject, projectsData } from "@/data/projects";
import type { UserProfile } from "@/types";

const HEADLINE = "Je construis des produits numériques qui résolvent de".split(" ");
const HIGHLIGHT = ["vrais", "problèmes."];

export function Hero({ profile }: { profile: UserProfile }) {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  // La scène de produits se redresse et s'avance au scroll
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "center center"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.4 });
  const rotateX = useTransform(smooth, [0, 1], [24, 0]);
  const scale = useTransform(smooth, [0, 1], [0.9, 1]);
  const phoneLeftY = useTransform(smooth, [0, 1], [120, 0]);
  const phoneRightY = useTransform(smooth, [0, 1], [180, 0]);

  const eventage = getProject("eventage");
  const road = getProject("road-alert");
  const elite = getProject("africa-elite-club");
  const live = projectsData.filter((p) => p.url).length;

  const facts = [
    { value: String(projectsData.length), label: "produits conçus" },
    { value: String(live), label: "en ligne aujourd'hui" },
    { value: "4", label: "secteurs : SaaS, EdTech, commerce, mobilité" },
    { value: profile.city, label: profile.country },
  ];

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <section id="top" className="relative overflow-hidden pt-36 md:pt-44">
      {/* Fond : halo + trame */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-glow absolute left-1/2 top-[-12%] h-[620px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent-color)_32%,transparent),transparent)] blur-2xl" />
      </div>

      <div className="mx-auto max-w-6xl px-5 text-center">
        <motion.div
          {...fade(0)}
          className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-xs text-muted backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-ink">{profile.available ? "Disponible" : "En mission"}</span>
          <span className="h-3 w-px bg-line" />
          {profile.title} · {profile.city} <LocalTime className="font-mono" />
        </motion.div>

        <h1 className="mx-auto mt-8 max-w-5xl text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-[5.2rem]">
          {[...HEADLINE, ...HIGHLIGHT].map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className={`inline-block ${i >= HEADLINE.length ? "text-accent" : ""}`}
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.045 }}
              >
                {word}&nbsp;
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p {...fade(0.6)} className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted">
          Je conçois et développe des SaaS, des plateformes éducatives, des boutiques en
          ligne et des applications de mobilité — de l&apos;idée au produit en production.
        </motion.p>

        <motion.div {...fade(0.7)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/#projets"
            className="btn-shine group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-[15px] font-semibold text-accent-fg shadow-[0_0_40px_-8px] shadow-accent/60 transition-transform hover:scale-[1.03]"
          >
            Voir mes projets
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </Link>
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2 rounded-xl border border-line bg-surface/60 px-6 py-3.5 text-[15px] font-semibold backdrop-blur transition-colors hover:border-ink/30"
          >
            Réserver un appel de 30 min
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>

      {/* Scène : les vrais produits */}
      <div ref={stageRef} className="relative mx-auto mt-20 max-w-6xl px-5 [perspective:1600px] md:mt-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
          style={reduce ? undefined : { rotateX, scale, transformOrigin: "center top" }}
          className="relative"
        >
          {eventage?.heroVisual && (
            <Link href="/projets/eventage" aria-label="Étude de cas Eventage" className="block">
              <BrowserFrame src={eventage.heroVisual} full={eventage.fullVisual} alt="Eventage en production" url={eventage.url} sizes="(max-width: 1200px) 100vw, 1100px" preload />
            </Link>
          )}

          {road && (
            <motion.div
              style={reduce ? undefined : { y: phoneLeftY }}
              className="absolute -bottom-10 -left-2 hidden w-[19%] md:block lg:-left-10"
            >
              <Link href="/projets/road-alert" aria-label="Étude de cas Road Alert">
                <PhoneFrame src="/projects/motoalert/home-mobile.webp" alt="Road Alert sur mobile" />
              </Link>
            </motion.div>
          )}
          {elite && (
            <motion.div
              style={reduce ? undefined : { y: phoneRightY }}
              className="absolute -bottom-16 -right-2 hidden w-[19%] md:block lg:-right-10"
            >
              <Link href="/projets/africa-elite-club" aria-label="Étude de cas Africa Elite Club">
                <PhoneFrame src="/projects/africa-elite-club/home-mobile.webp" alt="Africa Elite Club sur mobile" />
              </Link>
            </motion.div>
          )}
        </motion.div>
        {/* Fondu bas de scène */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-1 h-40 bg-gradient-to-t from-canvas to-transparent" />
      </div>

      {/* Faits réels */}
      <div className="relative mx-auto mt-16 max-w-6xl px-5">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="group bg-canvas px-6 py-6 transition-colors duration-300 hover:bg-surface">
              <dt className="sr-only">{f.label}</dt>
              <dd className="text-3xl font-semibold tracking-[-0.03em] transition-colors duration-300 group-hover:text-accent">{f.value}</dd>
              <dd className="mt-1 text-sm text-muted">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
