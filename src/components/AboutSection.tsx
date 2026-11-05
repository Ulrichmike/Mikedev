"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { initialProfile, journeySteps } from "@/data/portfolioData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, staggerContainer, staggerItem } from "@/components/ui/Reveal";
import { LocalTime } from "@/components/ui/LocalTime";

/** À propos : la personne derrière les produits. */
export function AboutSection() {
  const p = initialProfile;

  return (
    <section id="a-propos" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading label="À propos" title="Derrière les produits." />

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Portrait */}
          <Reveal className="card relative min-h-[460px] overflow-hidden">
            <Image
              src={p.avatarUrl}
              alt={`Portrait de ${p.name}`}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="text-2xl font-semibold tracking-[-0.03em]">{p.name}</p>
              <p className="mt-1 text-sm text-white/70">
                {p.title} · {p.city}, {p.country} · <LocalTime className="font-mono" />
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-4">
            <Reveal className="card p-7">
              {p.bio.map((para, i) => (
                <p key={i} className={i === 0 ? "text-xl leading-relaxed" : "mt-4 leading-relaxed text-muted"}>
                  {para}
                </p>
              ))}
            </Reveal>

            <Reveal className="card border-accent/30 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--accent-color)_14%,var(--surface)),var(--surface)_60%)] p-7">
              <p className="label">Ma philosophie</p>
              <p className="mt-3 text-lg leading-relaxed">{p.philosophy}</p>
            </Reveal>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {p.differentiators.map((d) => (
                <motion.div key={d.title} variants={staggerItem} className="card p-5">
                  <h3 className="font-semibold">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{d.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Parcours */}
        <Reveal className="card mt-4 p-7">
          <p className="label">Mon parcours</p>
          <ol className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {journeySteps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="font-mono text-sm text-accent">{step.period ?? String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-medium">{step.title}</span>
                  <span className="mt-1 block text-sm text-muted">{step.description}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
