"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  X,
  Printer,
  Mail,
  MapPin,
  Globe,
  Sparkles,
  Briefcase,
  Layers,
  Code2,
} from "lucide-react";

import { useTheme } from "@/context/ThemeContext";
import {
  journeySteps,
  servicesData,
  skillGroups,
} from "@/data/portfolioData";
import { projectsData, STATUS_LABELS } from "@/data/projects";
import type { UserProfile } from "@/types";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export function ResumeModal({ isOpen, onClose, profile }: ResumeModalProps) {
  const { playSound } = useTheme();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    playSound("success");
    window.print();
  };

  const handleCopyEmail = async () => {
    playSound("click");
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Le presse-papier peut échouer en contexte non sécurisé
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Curriculum Vitae de ${profile.name}`}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative my-6 w-full max-w-4xl overflow-hidden rounded-3xl border border-black/10 dark:border-white/15 bg-zinc-100 dark:bg-[#0c0e16] shadow-2xl flex flex-col max-h-[92vh]"
      >
        {/* Barre de contrôle supérieure (masquée à l'impression) */}
        <div className="no-print flex items-center justify-between border-b border-black/10 dark:border-white/10 bg-white/90 dark:bg-[#121522]/90 px-5 py-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              Curriculum Vitae · {profile.name}
            </h2>
            <span className="hidden sm:inline-block rounded-full bg-black/5 dark:bg-white/5 px-2.5 py-0.5 text-[10px] font-mono text-zinc-500">
              Format A4 Standard
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-full bg-accent text-accent-fg hover:brightness-110 px-4 py-1.5 text-xs font-bold transition-all shadow-md active:scale-95"
              title="Imprimer ou enregistrer en PDF (Ctrl + P)"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Imprimer / PDF</span>
            </button>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="hidden sm:flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-black/10 dark:hover:bg-white/10"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>{copied ? "Email copié !" : "Copier email"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playSound("click");
                onClose();
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-zinc-500 hover:text-black dark:hover:text-white"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Feuille CV imprimable */}
        <div className="overflow-y-auto p-4 sm:p-8 flex justify-center bg-zinc-200/50 dark:bg-black/40">
          <div
            id="printable-resume"
            className="w-full max-w-[800px] bg-white text-zinc-900 p-8 sm:p-12 rounded-2xl shadow-xl border border-zinc-200 font-sans print:shadow-none print:border-none print:p-0 print:m-0"
          >
            {/* En-tête : Nom, Titre & Coordonnées */}
            <div className="border-b-2 border-zinc-900 pb-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="text-3xl font-black uppercase tracking-tight text-zinc-900 sm:text-4xl">
                    {profile.name}
                  </h1>
                  <p className="mt-1 font-mono text-sm font-bold uppercase tracking-wide text-zinc-600">
                    {profile.title}
                  </p>
                  <p className="mt-1 text-xs italic text-zinc-600">{profile.tagline}</p>
                </div>

                <div className="flex flex-col gap-1 font-mono text-xs text-zinc-700 sm:items-end">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-zinc-500" />
                    {profile.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                    {profile.city}, {profile.country}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                    <Globe className="h-3.5 w-3.5" />
                    {[profile.github, profile.linkedin]
                      .map((u) => u.replace(/^https?:\/\//, ""))
                      .join(" · ")}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-zinc-700">{profile.intro}</p>
              <p className="mt-2 text-[11px] font-semibold text-zinc-900">
                {profile.domains.join(" · ")}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-12">
              {/* Colonne gauche : projets & parcours */}
              <div className="space-y-6 md:col-span-7">
                <section>
                  <h3 className="mb-3 flex items-center gap-2 border-b border-zinc-300 pb-1.5 font-mono text-xs font-black uppercase tracking-wider text-zinc-900">
                    <Layers className="h-4 w-4" />
                    Projets sélectionnés
                  </h3>
                  <div className="space-y-2.5">
                    {projectsData.map((p) => (
                      <div key={p.slug} className="border-l-2 border-zinc-300 pl-3">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-sm font-bold text-zinc-900">{p.name}</span>
                          <span className="font-mono text-[10px] text-zinc-500">
                            {[p.year, p.status && STATUS_LABELS[p.status]].filter(Boolean).join(" · ")}
                          </span>
                        </div>
                        <p className="font-mono text-[10.5px] text-zinc-500">{p.positioning}</p>
                        <p className="mt-0.5 text-[11px] leading-snug text-zinc-700">{p.summary}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="mb-3 flex items-center gap-2 border-b border-zinc-300 pb-1.5 font-mono text-xs font-black uppercase tracking-wider text-zinc-900">
                    <Briefcase className="h-4 w-4" />
                    Parcours
                  </h3>
                  <ol className="space-y-2 text-[11px] text-zinc-700">
                    {journeySteps.map((step) => (
                      <li key={step.title}>
                        <span className="font-bold text-zinc-900">{step.title}</span>
                        {step.period && (
                          <span className="font-mono text-zinc-500"> · {step.period}</span>
                        )}{" "}
                        — {step.description}
                      </li>
                    ))}
                  </ol>
                </section>
              </div>

              {/* Colonne droite : services & compétences */}
              <div className="space-y-6 md:col-span-5">
                <section>
                  <h3 className="mb-3 flex items-center gap-2 border-b border-zinc-300 pb-1.5 font-mono text-xs font-black uppercase tracking-wider text-zinc-900">
                    <Sparkles className="h-4 w-4" />
                    Services
                  </h3>
                  <ul className="space-y-1 text-[11px] text-zinc-700">
                    {servicesData.map((s) => (
                      <li key={s.id}>
                        <span className="font-semibold text-zinc-900">{s.title}</span> — {s.description}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="mb-3 flex items-center gap-2 border-b border-zinc-300 pb-1.5 font-mono text-xs font-black uppercase tracking-wider text-zinc-900">
                    <Code2 className="h-4 w-4" />
                    Compétences techniques
                  </h3>
                  <div className="space-y-2.5">
                    {skillGroups.map((g) => (
                      <div key={g.id}>
                        <span className="mb-1 block font-mono text-[10.5px] font-bold uppercase text-zinc-700">
                          {g.title}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {g.skills.map((sk) => (
                            <span
                              key={sk.name}
                              className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 font-mono text-[10.5px]"
                            >
                              {sk.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <p className="border-t border-zinc-200 pt-3 text-[11px] text-zinc-600">
                  {profile.availability} · {profile.city}, {profile.country}
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-zinc-200 pt-4 font-mono text-[10px] text-zinc-400">
              <span>{profile.name} — {profile.title}</span>
              <span>{profile.email}</span>
            </div>
          </div>
        </div>

        {/* Pied de modale (no-print) */}
        <div className="no-print border-t border-black/10 dark:border-white/10 bg-white/90 dark:bg-[#121522]/90 px-6 py-3 flex items-center justify-between text-xs text-zinc-500">
          <span>
            💡 Astuce : Utilisez la fonction d&apos;impression de votre
            navigateur pour &quot;Enregistrer au format PDF&quot;.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-700 dark:text-zinc-300 font-semibold hover:underline"
          >
            Fermer la fenêtre
          </button>
        </div>
      </motion.div>
    </div>
  );
}
