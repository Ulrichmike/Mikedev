"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  Layers,
  ArrowUpRight,
  Cpu,
  CheckCircle2,
  X,
  Monitor,
  Smartphone,
  Sparkles,
  TrendingUp,
  Info,
  Search,
} from "lucide-react";

import { GithubIcon } from "@/components/icons/BrandIcons";
import { ProjectRealVisualPreview } from "@/components/ProjectRealVisualPreview";
import { useTheme } from "@/context/ThemeContext";
import { projectsData } from "@/data/portfolioData";
import type { Project } from "@/types";

interface ProjectsSectionProps {
  onOpenBooking?: () => void;
}

export function ProjectsSection({ onOpenBooking }: ProjectsSectionProps) {
  const { currentAccent } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">(
    "desktop",
  );

  const categories = [
    { id: "all", label: "Tous les projets" },
    { id: "saas", label: "Full-Stack & SaaS" },
    { id: "opensource", label: "Open Source" },
    { id: "fullstack", label: "Data & Observabilité" },
    { id: "creative", label: "Créatif & Lab" },
  ];

  const filteredProjects = projectsData.filter((p) => {
    const matchesCategory =
      activeCategory === "all" || p.category === activeCategory;
    if (!matchesCategory) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      (p.metrics && p.metrics.toLowerCase().includes(q))
    );
  });

  const handleCardClick = (project: Project, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(".architecture-btn")) {
      return;
    }
    if (project.liveUrl) {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <section
      id="projets"
      className="relative py-20 md:py-28 border-t border-black/5 dark:border-white/5 transition-colors duration-300 overflow-hidden"
    >
      {/* Halo d'ambiance */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full opacity-15 dark:opacity-25 blur-3xl -z-10"
        style={{
          background: `radial-gradient(circle, ${currentAccent.color} 0%, transparent 70%)`,
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
              <Layers className="h-3.5 w-3.5" />
              <span>Réalisations &amp; Applications en Ligne</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Projets &amp;{" "}
              <span className="font-serif italic font-normal text-amber-600 dark:text-amber-300">
                démonstrations réelles
              </span>
            </h2>
            <p className="mt-2.5 max-w-2xl text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
              Explorez le rendu visuel réel de chaque application. Cliquez
              directement sur une card pour lancer le projet en direct en
              production.
            </p>
          </div>

          {/* Barre de catégories */}
          <div className="flex flex-wrap gap-1.5 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#12141e]/90 p-1.5 backdrop-blur-md shadow-sm">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? `${currentAccent.btnClass} shadow-md`
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-[#12141f]/70 p-2.5 sm:p-3 backdrop-blur-md shadow-sm">
          <div className="relative flex-1 flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Recherche par technologie, mot-clé ou fonctionnalité (ex: Next.js, IA, Audio, D3)..."
              className="w-full rounded-xl bg-black/[0.04] dark:bg-white/[0.06] py-2 pl-10 pr-10 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:ring-1 focus:ring-amber-400/50"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Effacer la recherche"
                className="absolute right-3 rounded-full p-0.5 text-zinc-400 hover:text-black dark:hover:text-white"
                title="Effacer la recherche"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 px-1">
            {/* Suggestions rapides */}
            <div className="hidden md:flex items-center gap-1 text-[11px] text-zinc-400">
              <span className="font-mono">Filtres rapides :</span>
              {["IA", "TypeScript", "Next.js", "ClickHouse", "Audio"].map(
                (keyword) => (
                  <button
                    type="button"
                    key={keyword}
                    onClick={() =>
                      setSearchQuery(searchQuery === keyword ? "" : keyword)
                    }
                    className={`rounded-lg px-2 py-0.5 font-mono text-[10px] transition-colors ${
                      searchQuery.toLowerCase() === keyword.toLowerCase()
                        ? "bg-amber-400 text-black font-bold"
                        : "bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 hover:bg-black/10 dark:hover:bg-white/10"
                    }`}
                  >
                    {keyword}
                  </button>
                ),
              )}
            </div>

            {/* Compteur de résultats */}
            <span className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1 font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
              {filteredProjects.length} projet
              {filteredProjects.length > 1 ? "s" : ""}{" "}
              {searchQuery
                ? "trouvé" + (filteredProjects.length > 1 ? "s" : "")
                : "affiché" + (filteredProjects.length > 1 ? "s" : "")}
            </span>
          </div>
        </div>

        {/* Grille de projets */}
        {filteredProjects.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-black/15 dark:border-white/15 p-12 text-center">
            <Layers className="mx-auto h-8 w-8 text-zinc-400" />
            <h4 className="mt-3 text-base font-bold text-zinc-900 dark:text-white">
              Aucun projet trouvé pour « {searchQuery} »
            </h4>
            <p className="mt-1 text-xs text-zinc-500">
              Essayez un autre mot-clé ou réinitialisez les filtres.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-4 rounded-xl bg-amber-400 px-4 py-2 text-xs font-bold text-black hover:bg-amber-300"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  onClick={(e) => handleCardClick(project, e)}
                  className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#10131d] p-5 sm:p-6 transition-all duration-300 hover:border-amber-400/50 dark:hover:border-white/25 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/60 hover:-translate-y-2 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
                >
                  {/* Halo de glow en haut */}
                  <div
                    className="pointer-events-none absolute -top-24 left-1/2 h-36 w-48 -translate-x-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-15"
                    style={{
                      backgroundColor: currentAccent.color,
                    }}
                  />

                  <div>
                    {/* Tags supérieurs + icône lien direct */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider text-zinc-700 dark:text-zinc-300">
                          {project.category.toUpperCase()}
                        </span>
                        {project.featured && (
                          <span className="flex items-center gap-1 rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300 border border-amber-400/30">
                            <Sparkles className="h-2.5 w-2.5" />
                            <span>STAR</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Bouton architecture technique */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          aria-label="Voir l'architecture technique"
                          className="architecture-btn flex h-8 w-8 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 transition-colors hover:border-amber-400/40 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-black/10 dark:hover:bg-white/10"
                          title="Voir l'architecture technique et les métriques"
                        >
                          <Info className="h-3.5 w-3.5" />
                        </button>

                        {/* Bouton lien externe */}
                        <div
                          aria-hidden="true"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 transition-all group-hover:scale-105 group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400 shadow-sm"
                          title="Ouvrir le projet en direct"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    {/* Aperçu visuel réel */}
                    <div className="mb-4">
                      <ProjectRealVisualPreview project={project} />
                    </div>

                    {/* Titre & Tagline */}
                    <div className="mt-2">
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="mt-1 font-serif italic text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-1">
                        {project.tagline}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Métrique clé */}
                    {project.metrics && (
                      <div className="mt-3.5 flex items-center gap-2 rounded-xl border border-black/5 dark:border-white/5 bg-amber-500/5 dark:bg-white/[0.03] p-2.5 text-xs font-mono text-amber-700 dark:text-amber-300">
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="truncate">{project.metrics}</span>
                      </div>
                    )}
                  </div>

                  {/* Pied : stack tags + bouton d'action */}
                  <div className="mt-5 border-t border-black/5 dark:border-white/5 pt-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-zinc-600 dark:text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="rounded-md px-1 py-0.5 text-[10px] text-zinc-500 font-mono">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        <span>Lancer</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Modale : Étude de cas technique */}
        <AnimatePresence>
          {selectedProject && (
            <div
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              role="dialog"
              aria-modal="true"
              aria-label={`Étude de cas : ${selectedProject.title}`}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-black/10 dark:border-white/15 bg-white dark:bg-[#10131d] p-6 sm:p-8 text-left shadow-2xl text-zinc-900 dark:text-zinc-100 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
              >
                {/* Bouton fermeture */}
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Fermer l'étude de cas"
                  className="absolute top-5 right-5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* En-tête modale */}
                <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-amber-600 dark:text-amber-400 uppercase font-bold">
                      Étude de Cas Complète
                    </span>
                    <span className="text-zinc-400">•</span>
                    <span className="font-mono text-xs text-zinc-500">
                      {selectedProject.domainName || selectedProject.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice("desktop")}
                      className={`flex items-center gap-1 rounded-lg px-2.5 py-1 ${
                        previewDevice === "desktop"
                          ? "bg-amber-400 text-black font-semibold"
                          : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      }`}
                    >
                      <Monitor className="h-3 w-3" />
                      <span>Desktop</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice("mobile")}
                      className={`flex items-center gap-1 rounded-lg px-2.5 py-1 ${
                        previewDevice === "mobile"
                          ? "bg-amber-400 text-black font-semibold"
                          : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      }`}
                    >
                      <Smartphone className="h-3 w-3" />
                      <span>Mobile</span>
                    </button>
                  </div>
                </div>

                {/* Aperçu visuel */}
                <div className="mt-5">
                  <ProjectRealVisualPreview project={selectedProject} />
                </div>

                {/* Titre & vue d'ensemble */}
                <div className="mt-6">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="mt-1 font-serif italic text-base text-zinc-600 dark:text-zinc-300">
                    {selectedProject.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Architecture & Points clés */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-600 dark:text-amber-300">
                      <Cpu className="h-4 w-4" />
                      <span>Architecture Technique</span>
                    </div>
                    <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-mono">
                      {selectedProject.architecture}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-300">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Points Clés &amp; Métriques</span>
                    </div>
                    <ul className="mt-2 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                      {selectedProject.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mt-6">
                  <h4 className="text-xs font-mono text-zinc-500 uppercase">
                    Technologies mises en œuvre
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-2.5 py-1 text-xs font-mono text-zinc-700 dark:text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pied de modale */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 dark:border-white/10 pt-4">
                  <div className="flex items-center gap-3">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-5 py-2.5 text-xs font-bold text-black hover:bg-amber-300 transition-colors shadow-md active:scale-95"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Lancer l&apos;application en direct</span>
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        <span>Code Source</span>
                      </a>
                    )}
                  </div>

                  {onOpenBooking && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProject(null);
                        onOpenBooking();
                      }}
                      className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      Vous voulez un projet similaire ? Parlons-en →
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
