"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Check,
  ShieldCheck,
  Star,
  ArrowRight,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import {
  clientOffersData,
  testimonialsData,
  clientFaqs,
} from "@/data/conversionData";

interface ConversionHubProps {
  onOpenBooking: () => void;
}

export const ConversionHub: React.FC<ConversionHubProps> = ({
  onOpenBooking,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="offres"
      className="py-16 md:py-24 border-t border-black/5 dark:border-white/5 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Formules Clé-en-Main &amp; Accompagnement</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Des offres calibrées pour votre{" "}
            <span className="font-serif italic font-normal text-amber-600 dark:text-amber-300">
              croissance
            </span>
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            Aucune mauvaise surprise : des livrables contractuels précis, des
            délais fermes et un accompagnement technique haut de gamme.
          </p>
        </div>

        {/* Pricing & Offers Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {clientOffersData.map((offer) => (
            <motion.div
              whileHover={{ y: -4 }}
              key={offer.id}
              className={`relative flex flex-col justify-between rounded-3xl border p-6 sm:p-8 transition-all backdrop-blur-sm ${
                offer.popular
                  ? "border-amber-400/50 bg-white dark:bg-[#121522] shadow-xl shadow-amber-400/10 dark:shadow-amber-400/5 ring-1 ring-amber-400/30 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]"
                  : "border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#10131d] shadow-sm dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
              }`}
            >
              {/* Popular badge */}
              {offer.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-3 py-0.5 text-[11px] font-bold text-black uppercase tracking-wider shadow-md">
                  Le plus demandé
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold uppercase">
                    {offer.badge}
                  </span>
                  <span className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-2.5 py-0.5 text-[11px] font-mono text-zinc-600 dark:text-zinc-300">
                    ⏱ {offer.turnaroundTime}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-bold text-zinc-900 dark:text-white">
                  {offer.name}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {offer.description}
                </p>

                {/* Price Display */}
                <div className="mt-4 pb-4 border-b border-black/10 dark:border-white/10">
                  <div className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white font-mono">
                    {offer.priceEstimate}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    {offer.idealFor}
                  </div>
                </div>

                {/* Features List */}
                <div className="mt-5 space-y-2.5">
                  <span className="font-mono text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase">
                    Inclus dans l&apos;offre :
                  </span>
                  {offer.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300"
                    >
                      <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Guarantee */}
                <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{offer.guarantee}</span>
                </div>
              </div>

              {/* Offer CTA button */}
              <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/5">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3 text-xs font-bold transition-all ${
                    offer.popular
                      ? "bg-amber-400 text-black hover:bg-amber-300 shadow-lg shadow-amber-400/20 hover:scale-[1.02]"
                      : "border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 text-zinc-800 dark:text-white hover:bg-black/10 dark:hover:bg-white/10"
                  }`}
                >
                  <span>Démarrer avec cette offre</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Testimonials (Social Proof for Conversion) */}
        <div className="mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-700 dark:text-purple-400">
                <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                <span>Preuve Sociale &amp; Retours d&apos;Expérience</span>
              </div>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                Ils ont accéléré grâce à notre{" "}
                <span className="font-serif italic font-normal text-amber-600 dark:text-amber-300">
                  collaboration
                </span>
              </h3>
            </div>
            <div className="text-xs font-mono text-zinc-500">
              Note moyenne client :{" "}
              <span className="text-amber-500 font-bold text-sm">
                5.0 / 5.0 ★
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonialsData.map((test) => (
              <div
                key={test.id}
                className="flex flex-col justify-between rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#10131d] p-6 shadow-sm transition-all hover:border-black/20 dark:hover:border-white/20 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Impact highlight pill */}
                  <div className="mt-3 inline-block rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    {test.projectResult}
                  </div>

                  {/* Review body */}
                  <p className="mt-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300 italic">
                    &ldquo;{test.content}&rdquo;
                  </p>
                </div>

                {/* Author row */}
                <div className="mt-6 flex items-center gap-3 border-t border-black/5 dark:border-white/5 pt-4">
                  <Image
                    src={test.avatar}
                    alt={test.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover border border-amber-400/40"
                  />
                  <div>
                    <div className="text-xs font-bold text-zinc-900 dark:text-white">
                      {test.name}
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      {test.role} · {test.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              <HelpCircle className="h-3 w-3 text-amber-500" />
              <span>Questions Fréquentes</span>
            </div>
            <h3 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
              Questions &amp; Réponses sur les collaborations
            </h3>
          </div>

          <div className="mt-8 space-y-3">
            {clientFaqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#11131c] overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-panel-${index}`}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-semibold text-zinc-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-300"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-500 transition-transform ${
                      openFaq === index ? "rotate-180 text-amber-500" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-black/5 dark:border-white/5 pt-3 overflow-hidden"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Quick FAQ Bottom CTA */}
          <div className="mt-8 text-center">
            <p className="text-xs text-zinc-500">
              Une autre question spécifique ?{" "}
              <button
                type="button"
                onClick={onOpenBooking}
                className="text-amber-600 dark:text-amber-400 font-semibold underline underline-offset-2 hover:text-amber-500"
              >
                Posez-la directement lors de notre échange visio gratuit →
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
