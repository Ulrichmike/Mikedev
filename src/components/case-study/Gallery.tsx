"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ImageOff, X } from "lucide-react";

import type { Project, ProjectVisual } from "@/types";

const IS_DEV = process.env.NODE_ENV !== "production";

// true côté client uniquement (le portail n'existe pas au rendu serveur)
const noop = () => () => {};
const useIsClient = () => useSyncExternalStore(noop, () => true, () => false);

const KIND_LABEL: Record<ProjectVisual["kind"], string> = {
  desktop: "Desktop",
  mobile: "Mobile",
  detail: "Détail",
  brand: "Marque",
};

/** Galerie de captures + lightbox (clavier : ← → Échap). */
export function Gallery({ project }: { project: Project }) {
  const ready = project.visuals.filter((v) => v.src);
  const missing = project.visuals.filter((v) => !v.src);
  const [index, setIndex] = useState<number | null>(null);
  const isClient = useIsClient();

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + ready.length) % ready.length)),
    [ready.length],
  );

  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  if (ready.length === 0 && !IS_DEV) return null;

  return (
    <>
      {/* Captures desktop */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {ready.map((v, i) =>
          v.kind === "mobile" ? null : (
            <button
              key={v.src}
              type="button"
              onClick={() => setIndex(i)}
              className="group overflow-hidden rounded-2xl border border-line bg-surface text-left"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={v.src!}
                  alt={`${project.name} — ${v.caption}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <p className="border-t border-line px-4 py-3 text-sm text-muted">{v.caption}</p>
            </button>
          ),
        )}
      </div>

      {/* Captures mobiles, en rangée de téléphones */}
      {ready.some((v) => v.kind === "mobile") && (
        <div className="mt-6 flex gap-5 overflow-x-auto pb-2">
          {ready.map((v, i) =>
            v.kind !== "mobile" ? null : (
              <button key={v.src} type="button" onClick={() => setIndex(i)} className="group w-[220px] shrink-0 text-left">
                <div className="rounded-[2rem] border border-line bg-surface p-[6px] transition-transform duration-500 group-hover:-translate-y-1.5">
                  <div className="relative aspect-[9/19] overflow-hidden rounded-[1.6rem]">
                    <Image src={v.src!} alt={`${project.name} — ${v.caption}`} fill sizes="220px" className="object-cover object-top" />
                  </div>
                </div>
                <p className="mt-3 text-center text-sm text-muted">{v.caption}</p>
              </button>
            ),
          )}
        </div>
      )}

      {/* En dev uniquement : emplacements des visuels à fournir */}
      {IS_DEV && missing.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {missing.map((v) => (
            <div
              key={v.caption}
              className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-line p-4 text-center"
            >
              <ImageOff className="h-4 w-4 text-muted" />
              <p className="text-sm font-medium">{v.caption}</p>
              <p className="font-mono text-[10px] uppercase text-muted">{KIND_LABEL[v.kind]} · à fournir (dev)</p>
            </div>
          ))}
        </div>
      )}

      {isClient &&
        createPortal(
          <AnimatePresence>
            {index !== null && ready[index] && (
              <motion.div
                key="lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
                role="dialog"
                aria-modal="true"
                aria-label={ready[index].caption}
                className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-10"
              >
                <motion.div
                  key={ready[index].src}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative h-full w-full max-w-6xl"
                >
                  <Image
                    src={ready[index].src!}
                    alt={`${project.name} — ${ready[index].caption}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </motion.div>

                <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/80">
                  {ready[index].caption} · {index + 1}/{ready.length}
                </p>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Fermer"
                  className="absolute right-5 top-5 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
                {ready.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        step(-1);
                      }}
                      aria-label="Précédent"
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        step(1);
                      }}
                      aria-label="Suivant"
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
