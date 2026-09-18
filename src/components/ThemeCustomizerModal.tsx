"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Sun, Moon, Palette, Check, RotateCcw } from "lucide-react";

import {
  useTheme,
  ACCENT_PALETTES,
  DARK_TONES,
  LIGHT_TONES,
} from "@/context/ThemeContext";
import type { ThemeAccent, DarkBgTone, LightBgTone } from "@/types";

export function ThemeCustomizerModal() {
  const {
    theme,
    accent,
    darkTone,
    lightTone,
    setTheme,
    setAccent,
    setDarkTone,
    setLightTone,
    isThemeModalOpen,
    closeThemeModal,
  } = useTheme();

  const handleReset = () => {
    setTheme("dark");
    setAccent("amber");
    setDarkTone("obsidian");
    setLightTone("alabaster");
  };

  return (
    <AnimatePresence>
      {isThemeModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Studio de personnalisation du thème"
        >
          {/* Backdrop avec blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeThemeModal}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Fenêtre de la modale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-black/10 dark:border-white/15 bg-white dark:bg-[#11131b] p-6 shadow-2xl text-zinc-900 dark:text-zinc-100"
          >
            {/* En-tête */}
            <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500/20 to-purple-500/20 text-amber-500 dark:text-amber-400 border border-amber-400/20">
                  <Palette className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
                    Studio Thème &amp; Ambiance
                    <span className="rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-300 text-[10px] font-mono px-2 py-0.5">
                      Sur-Mesure
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Personnalisez les tons et la nuance lumineuse de votre
                    expérience
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeThemeModal}
                className="rounded-full p-1.5 text-zinc-500 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-6 max-h-[72vh] overflow-y-auto pr-1">
              {/* 1. Mode principal (Jour / Nuit) */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    1. Mode Principal
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">
                    {theme === "dark"
                      ? "Mode Sombre actif"
                      : "Mode Clair actif"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTheme("dark")}
                    className={`flex items-center justify-center gap-3 rounded-2xl p-3.5 border transition-all ${
                      theme === "dark"
                        ? "border-amber-400/60 bg-zinc-900 text-white shadow-md shadow-amber-400/10 ring-1 ring-amber-400/30"
                        : "border-black/10 dark:border-white/10 bg-zinc-100/70 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 hover:border-black/25"
                    }`}
                  >
                    <Moon
                      className={`h-4 w-4 ${
                        theme === "dark" ? "text-amber-400" : ""
                      }`}
                    />
                    <div className="text-left">
                      <div className="text-xs font-bold">Nuit (Dark)</div>
                      <div className="text-[10px] opacity-70">
                        Focus &amp; immersion code
                      </div>
                    </div>
                    {theme === "dark" && (
                      <Check className="ml-auto h-4 w-4 text-amber-400" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setTheme("light")}
                    className={`flex items-center justify-center gap-3 rounded-2xl p-3.5 border transition-all ${
                      theme === "light"
                        ? "border-amber-500/60 bg-amber-50/70 text-zinc-900 shadow-md shadow-amber-500/10 ring-1 ring-amber-500/30"
                        : "border-black/10 dark:border-white/10 bg-zinc-100/70 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 hover:border-black/25"
                    }`}
                  >
                    <Sun
                      className={`h-4 w-4 ${
                        theme === "light" ? "text-amber-600" : ""
                      }`}
                    />
                    <div className="text-left">
                      <div className="text-xs font-bold">Jour (Light)</div>
                      <div className="text-[10px] opacity-70">
                        Contraste &amp; élégance papier
                      </div>
                    </div>
                    {theme === "light" && (
                      <Check className="ml-auto h-4 w-4 text-amber-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* 2. Choix de la couleur d'accent */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    2. Teinte Signature &amp; Accent
                  </span>
                  <span className="text-xs font-medium text-zinc-500">
                    {ACCENT_PALETTES[accent].name}
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2.5">
                  {(Object.keys(ACCENT_PALETTES) as ThemeAccent[]).map(
                    (key) => {
                      const item = ACCENT_PALETTES[key];
                      const isSelected = accent === key;
                      return (
                        <button
                          type="button"
                          key={key}
                          onClick={() => setAccent(key)}
                          aria-label={`Palette ${item.name}`}
                          className={`group relative flex flex-col items-center gap-1.5 rounded-2xl p-2.5 border transition-all ${
                            isSelected
                              ? "border-black/30 dark:border-white/40 bg-black/5 dark:bg-white/10 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#11131b]"
                              : "border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 bg-black/[0.02] dark:bg-white/[0.02]"
                          }`}
                          style={{
                            outlineColor: item.color,
                          }}
                        >
                          <span
                            className="h-7 w-7 rounded-full shadow-inner flex items-center justify-center transition-transform group-hover:scale-110"
                            style={{ backgroundColor: item.color }}
                          >
                            {isSelected && (
                              <Check className="h-3.5 w-3.5 text-white drop-shadow" />
                            )}
                          </span>
                          <span className="text-[10px] font-medium leading-none text-zinc-700 dark:text-zinc-300">
                            {item.name.split(" ")[0]}
                          </span>
                        </button>
                      );
                    },
                  )}
                </div>
              </div>

              {/* 3. Nuances de fond */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    3. Nuance de Fond ({theme === "dark" ? "Sombre" : "Clair"})
                  </span>
                </div>

                {theme === "dark" ? (
                  <div className="space-y-2">
                    {(Object.keys(DARK_TONES) as DarkBgTone[]).map((key) => {
                      const toneItem = DARK_TONES[key];
                      const isSelected = darkTone === key;
                      return (
                        <button
                          type="button"
                          key={key}
                          onClick={() => setDarkTone(key)}
                          className={`flex w-full items-center justify-between rounded-xl p-3 border text-left transition-all ${
                            isSelected
                              ? "border-amber-400/50 bg-black/40 text-white"
                              : "border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 bg-black/[0.02] dark:bg-white/[0.02] text-zinc-400"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="h-5 w-5 rounded-full border border-white/20"
                              style={{ backgroundColor: toneItem.bg }}
                            />
                            <div>
                              <div className="text-xs font-bold text-white">
                                {toneItem.name}
                              </div>
                              <div className="text-[11px] text-zinc-400">
                                {toneItem.desc}
                              </div>
                            </div>
                          </div>
                          {isSelected && (
                            <Check className="h-4 w-4 text-amber-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {(Object.keys(LIGHT_TONES) as LightBgTone[]).map((key) => {
                      const toneItem = LIGHT_TONES[key];
                      const isSelected = lightTone === key;
                      return (
                        <button
                          type="button"
                          key={key}
                          onClick={() => setLightTone(key)}
                          className={`flex w-full items-center justify-between rounded-xl p-3 border text-left transition-all ${
                            isSelected
                              ? "border-amber-500/50 bg-amber-50/60 text-zinc-900"
                              : "border-black/5 hover:border-black/20 bg-black/[0.02] text-zinc-600"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="h-5 w-5 rounded-full border border-black/15 shadow-sm"
                              style={{ backgroundColor: toneItem.bg }}
                            />
                            <div>
                              <div className="text-xs font-bold text-zinc-900">
                                {toneItem.name}
                              </div>
                              <div className="text-[11px] text-zinc-500">
                                {toneItem.desc}
                              </div>
                            </div>
                          </div>
                          {isSelected && (
                            <Check className="h-4 w-4 text-amber-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Pied : actions */}
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-black/10 dark:border-white/10">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Restaurer défauts</span>
              </button>

              <button
                type="button"
                onClick={closeThemeModal}
                className="rounded-full bg-amber-400 px-5 py-2 text-xs font-bold text-black transition-all hover:bg-amber-300 shadow-md shadow-amber-400/20 active:scale-95"
              >
                Appliquer &amp; Fermer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
