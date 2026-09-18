// ✅ Pas de 'use client' → Server Component

import { Layers, Palette, Zap, Code2, Check, ArrowRight } from "lucide-react";

import { servicesData } from "@/data/portfolioData";

export function ServicesSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Layers":
        return (
          <Layers className="h-6 w-6 text-amber-500 dark:text-amber-400" />
        );
      case "Palette":
        return (
          <Palette className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        );
      case "Zap":
        return (
          <Zap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        );
      default:
        return <Code2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <section
      id="services"
      className="py-16 md:py-24 border-t border-black/5 dark:border-white/5 relative transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300">
              <Code2 className="h-3 w-3" />
              <span>Services &amp; Expertise</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Solutions &amp;{" "}
              <span className="font-serif italic font-normal text-amber-600 dark:text-amber-300">
                savoir-faire
              </span>
            </h2>
            <p className="mt-2 max-w-xl text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
              Une approche rigoureuse orientée produit, de l&apos;élaboration de
              la stratégie technique jusqu&apos;au déploiement et à
              l&apos;optimisation continue.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-5 py-2.5 text-xs font-bold text-amber-700 dark:text-amber-300 hover:bg-amber-400 hover:text-black transition-all shadow-sm"
          >
            <span>Discuter d&apos;un besoin spécifique</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Grille */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#10131d] p-6 sm:p-7 transition-all duration-300 hover:border-black/20 dark:hover:border-white/25 hover:bg-white dark:hover:bg-[#151824] hover:-translate-y-1 shadow-sm dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 transition-transform group-hover:scale-110">
                    {getIcon(service.icon)}
                  </div>
                  <span className="font-mono text-2xl font-black text-zinc-400 dark:text-zinc-600 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    {service.number}
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-1 font-serif italic text-xs text-zinc-500 dark:text-zinc-400">
                    {service.subtitle}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {service.description}
                  </p>
                </div>

                {/* Compétences */}
                <div className="mt-5 space-y-1.5 border-t border-black/5 dark:border-white/5 pt-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Compétences
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {service.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="rounded-md border border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-zinc-700 dark:text-zinc-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Livrables */}
                <div className="mt-4 space-y-1.5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Livrables
                  </span>
                  <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                    {service.deliverables.map((d, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA → ancre vers #contact */}
              <div className="mt-6 border-t border-black/5 dark:border-white/5 pt-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors"
                >
                  <span>Demander un devis</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
