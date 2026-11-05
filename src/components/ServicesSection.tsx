"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { servicesData } from "@/data/portfolioData";
import { getProject } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/components/ui/Reveal";
import { trackSpot } from "@/components/ui/spotlight";

/** Disposition bento : certaines cartes sont larges et illustrées. */
const LAYOUT: Record<string, { span: string; image?: string }> = {
  saas: { span: "lg:col-span-2", image: "/projects/eventage/features-desktop.webp" },
  webapp: { span: "" },
  "product-engineering": { span: "" },
  uiux: { span: "" },
  ecommerce: { span: "" },
  backend: { span: "" },
  strategy: { span: "lg:col-span-2", image: "/projects/learning-academy/subjects-desktop.webp" },
};

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          label="Ce que je construis"
          title="Des problèmes résolus, pas juste du code."
          intro="Je prends en charge un besoin de bout en bout : stratégie, design, développement et mise en ligne."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {servicesData.map((s) => {
            const layout = LAYOUT[s.id] ?? { span: "" };
            return (
              <motion.article
                key={s.id}
                variants={staggerItem}
                onMouseMove={trackSpot}
                className={`card spot group flex flex-col overflow-hidden ${layout.span}`}
              >
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="text-xl font-semibold tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.description}</p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {s.deliverables.map((d) => (
                      <li key={d} className="rounded-lg border border-line bg-canvas/50 px-2.5 py-1 text-xs text-muted">
                        {d}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-6 text-sm">
                    <span className="text-muted">Preuve :</span>
                    {s.proof.map((slug) => {
                      const p = getProject(slug);
                      return p ? (
                        <Link
                          key={slug}
                          href={`/projets/${slug}`}
                          className="inline-flex items-center gap-1 font-medium text-ink transition-colors hover:text-accent"
                        >
                          {p.name}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      ) : null;
                    })}
                  </div>
                </div>

                {layout.image && (
                  <div className="relative mx-6 aspect-[16/7] overflow-hidden rounded-t-xl border border-b-0 border-line md:mx-7">
                    <Image
                      src={layout.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                )}
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
