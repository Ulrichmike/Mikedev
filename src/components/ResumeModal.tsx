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
  GraduationCap,
  Layers,
  Code2,
} from "lucide-react";

import { useTheme } from "@/context/ThemeContext";
import { experiencesData, projectsData } from "@/data/portfolioData";
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
              className="flex items-center gap-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black px-4 py-1.5 text-xs font-bold transition-all shadow-md active:scale-95"
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 uppercase">
                    {profile.name}
                  </h1>
                  <p className="mt-1 font-mono text-sm sm:text-base font-bold text-amber-600 tracking-wide uppercase">
                    {profile.role}
                  </p>
                  <p className="mt-1 text-xs text-zinc-600 font-medium">
                    {profile.specialty}
                  </p>
                </div>

                {/* Colonne contact */}
                <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-zinc-700">
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-zinc-500" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-500 text-[11px]">
                    <Globe className="h-3.5 w-3.5" />
                    <span>github.com/mikeweda · linkedin.com/in/mikeweda</span>
                  </div>
                </div>
              </div>

              {/* Résumé exécutif */}
              <div className="mt-4 rounded-xl bg-zinc-50 p-3.5 text-xs text-zinc-700 leading-relaxed border border-zinc-200/80">
                <span className="font-bold text-zinc-900">
                  Profil Exécutif :{" "}
                </span>
                {profile.bio} Spécialiste du cycle complet de développement web,
                de l&apos;élaboration d&apos;architectures résilientes à
                l&apos;optimisation extrême des performances (Core Web Vitals
                95+). Culture du code testé, maintenable et aligné sur les
                objectifs business.
              </div>
            </div>

            {/* Grille : Expériences à gauche, Compétences à droite */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Colonne gauche : Expériences */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2 border-b border-zinc-300 pb-1.5 mb-4">
                    <Briefcase className="h-4 w-4 text-amber-600" />
                    <h3 className="font-mono text-xs font-black uppercase tracking-wider text-zinc-900">
                      Expériences Professionnelles
                    </h3>
                  </div>

                  <div className="space-y-5">
                    {experiencesData.map((exp) => (
                      <div
                        key={exp.id}
                        className="relative pl-3 border-l-2 border-zinc-300"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="text-sm font-bold text-zinc-900">
                            {exp.role}
                          </h4>
                          <span className="font-mono text-[11px] font-semibold text-zinc-500 whitespace-nowrap">
                            {exp.period}
                          </span>
                        </div>

                        <div className="text-xs font-medium text-amber-700 font-mono">
                          {exp.company} · {exp.location}
                        </div>

                        <p className="mt-1.5 text-xs text-zinc-600 leading-snug">
                          {exp.description}
                        </p>

                        <ul className="mt-2 space-y-1 text-[11.5px] text-zinc-700">
                          {exp.achievements.map((ach, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span
                                aria-hidden="true"
                                className="text-amber-500 font-bold"
                              >
                                •
                              </span>
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-2 flex flex-wrap gap-1">
                          {exp.technologies.map((t) => (
                            <span
                              key={t}
                              className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono text-zinc-700 border border-zinc-200"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projets clés */}
                <div>
                  <div className="flex items-center gap-2 border-b border-zinc-300 pb-1.5 mb-3">
                    <Layers className="h-4 w-4 text-amber-600" />
                    <h3 className="font-mono text-xs font-black uppercase tracking-wider text-zinc-900">
                      Projets Clés en Ligne
                    </h3>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    {projectsData.slice(0, 3).map((proj) => (
                      <div
                        key={proj.id}
                        className="rounded-lg bg-zinc-50 p-2.5 border border-zinc-200/80"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-zinc-900">
                            {proj.title.split("—")[0].trim()}
                          </span>
                          <span className="font-mono text-[10px] text-emerald-700 font-semibold">
                            {proj.metrics}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-600 mt-0.5">
                          {proj.tagline}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Colonne droite : Compétences & Formation */}
              <div className="md:col-span-5 space-y-6">
                {/* Compétences techniques */}
                <div>
                  <div className="flex items-center gap-2 border-b border-zinc-300 pb-1.5 mb-4">
                    <Code2 className="h-4 w-4 text-amber-600" />
                    <h3 className="font-mono text-xs font-black uppercase tracking-wider text-zinc-900">
                      Compétences Techniques
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="font-mono font-bold text-[11px] text-zinc-700 block mb-1">
                        LANGAGES &amp; FONDATIONS :
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "TypeScript",
                          "JavaScript (ESNext)",
                          "SQL",
                          "HTML5 / CSS3",
                          "GraphQL",
                        ].map((s) => (
                          <span
                            key={s}
                            className="rounded bg-zinc-100 px-2 py-0.5 text-[10.5px] font-mono border border-zinc-200"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-mono font-bold text-[11px] text-zinc-700 block mb-1">
                        FRONTEND &amp; UI CRAFT :
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "React 19",
                          "Next.js 15 (App Router)",
                          "Tailwind CSS",
                          "Vite",
                          "Zustand",
                          "Framer Motion",
                        ].map((s) => (
                          <span
                            key={s}
                            className="rounded bg-zinc-100 px-2 py-0.5 text-[10.5px] font-mono border border-zinc-200"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-mono font-bold text-[11px] text-zinc-700 block mb-1">
                        BACKEND &amp; DONNÉES :
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "Node.js",
                          "Express",
                          "PostgreSQL",
                          "Supabase",
                          "Redis",
                          "RESTful APIs",
                        ].map((s) => (
                          <span
                            key={s}
                            className="rounded bg-zinc-100 px-2 py-0.5 text-[10.5px] font-mono border border-zinc-200"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-mono font-bold text-[11px] text-zinc-700 block mb-1">
                        DEVOPS, TESTS &amp; PERFORMANCE :
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "Docker",
                          "CI/CD GitHub Actions",
                          "Vitest / Jest",
                          "Core Web Vitals",
                          "Figma",
                        ].map((s) => (
                          <span
                            key={s}
                            className="rounded bg-zinc-100 px-2 py-0.5 text-[10.5px] font-mono border border-zinc-200"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formation */}
                <div>
                  <div className="flex items-center gap-2 border-b border-zinc-300 pb-1.5 mb-3">
                    <GraduationCap className="h-4 w-4 text-amber-600" />
                    <h3 className="font-mono text-xs font-black uppercase tracking-wider text-zinc-900">
                      Formation &amp; Diplômes
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="font-bold text-zinc-900">
                        Master 2 / Titre d&apos;Ingénieur Logiciel
                      </div>
                      <div className="text-[11px] text-zinc-600">
                        Spécialisation Systèmes d&apos;Information &amp; Web
                      </div>
                      <div className="font-mono text-[10px] text-zinc-500">
                        2018 — 2021 · Mention Très Bien
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-zinc-900">
                        Licence Informatique Générale
                      </div>
                      <div className="text-[11px] text-zinc-600">
                        Algorithmique, Structures de Données &amp; Réseaux
                      </div>
                      <div className="font-mono text-[10px] text-zinc-500">
                        2015 — 2018
                      </div>
                    </div>
                  </div>
                </div>

                {/* Langues & Soft Skills */}
                <div>
                  <div className="flex items-center gap-2 border-b border-zinc-300 pb-1.5 mb-3">
                    <Sparkles className="h-4 w-4 text-amber-600" />
                    <h3 className="font-mono text-xs font-black uppercase tracking-wider text-zinc-900">
                      Langues &amp; Atouts
                    </h3>
                  </div>

                  <div className="space-y-1.5 text-xs text-zinc-700">
                    <div className="flex justify-between">
                      <span>Français :</span>
                      <span className="font-mono font-semibold">
                        Langue Maternelle
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Anglais :</span>
                      <span className="font-mono font-semibold">
                        Courant / Technique (C1)
                      </span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-zinc-200 text-[11px] text-zinc-600">
                      Disponibilité immédiate en freelance, télétravail complet
                      ou déplacements ponctuels sur Paris.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cachet de pied de page */}
            <div className="mt-8 border-t border-zinc-200 pt-4 flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span>{profile.name} — Dossier de compétences certifié</span>
              <span>Dernière mise à jour : 2025/2026</span>
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
