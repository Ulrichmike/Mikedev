"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Trophy,
  Zap,
  Bug,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Play,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { challengeSnippets, bugHunterChallenges } from "@/data/portfolioData";
import type { ChallengeSnippet, BugChallenge } from "@/types";

interface DevChallengeProps {
  onOpenBooking?: () => void;
}

export const DevChallenge: React.FC<DevChallengeProps> = ({
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<"typing" | "bug">("typing");

  // ==================== MODE 1 : SPEED CODING ====================
  const [snippetIndex, setSnippetIndex] = useState(0);
  const currentSnippet: ChallengeSnippet = challengeSnippets[snippetIndex];
  const [userInput, setUserInput] = useState("");
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // ==================== MODE 2 : BUG HUNTER ====================
  const [bugIndex, setBugIndex] = useState(0);
  const currentBug: BugChallenge = bugHunterChallenges[bugIndex];
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [bugFeedback, setBugFeedback] = useState<"correct" | "wrong" | null>(
    null,
  );
  const [bugScore, setBugScore] = useState(0);

  // ==================== TIMER ====================
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isTypingStarted && !isFinished && startTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const seconds = Math.floor((now - startTime) / 1000);
        setElapsedSeconds(seconds);

        if (seconds > 0) {
          const wordsTyped = userInput.trim().length / 5;
          const currentWpm = Math.round(wordsTyped / (seconds / 60));
          setWpm(currentWpm);
        }
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTypingStarted, isFinished, startTime, userInput]);

  // ==================== HANDLERS TYPING ====================
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (!isTypingStarted) {
      setIsTypingStarted(true);
      setStartTime(Date.now());
    }

    setUserInput(value);

    // Calcul de la précision
    let errors = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentSnippet.code[i]) {
        errors++;
      }
    }
    const acc =
      value.length > 0
        ? Math.max(
            0,
            Math.round(((value.length - errors) / value.length) * 100),
          )
        : 100;
    setAccuracy(acc);

    // Vérification de la complétion
    if (value === currentSnippet.code) {
      setIsFinished(true);
    }
  };

  const handleOverlayClick = () => {
    inputRef.current?.focus();
  };

  const resetTypingGame = (index?: number) => {
    const newIdx =
      index !== undefined
        ? index
        : (snippetIndex + 1) % challengeSnippets.length;

    setSnippetIndex(newIdx);
    setUserInput("");
    setIsTypingStarted(false);
    setStartTime(null);
    setElapsedSeconds(0);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);

    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // ==================== HANDLERS BUG HUNTER ====================
  const handleLineClick = (lineNum: number) => {
    setSelectedLine(lineNum);

    if (lineNum === currentBug.correctLine) {
      setBugFeedback("correct");
      setBugScore((prev) => prev + 100);
    } else {
      setBugFeedback("wrong");
    }
  };

  const nextBugChallenge = () => {
    setBugIndex((prev) => (prev + 1) % bugHunterChallenges.length);
    setSelectedLine(null);
    setBugFeedback(null);
  };

  // ==================== RANG ====================
  const getTypingRank = (speed: number) => {
    if (speed >= 80)
      return {
        title: "Grand Architecte du Code ⚡",
        color: "text-amber-500",
        badge: "Legendary",
      };
    if (speed >= 60)
      return {
        title: "Senior Software Crafter 🚀",
        color: "text-purple-500",
        badge: "Pro",
      };
    if (speed >= 40)
      return {
        title: "Full-Stack Développeur 💻",
        color: "text-blue-500",
        badge: "Solid",
      };
    return {
      title: "Apprenti Codeur 🌱",
      color: "text-emerald-500",
      badge: "Junior",
    };
  };

  const rank = getTypingRank(wpm);

  // ==================== RENDU ====================
  return (
    <section
      id="defi"
      className="py-16 md:py-24 border-t border-black/5 dark:border-white/5 relative overflow-hidden transition-colors duration-300"
    >
      {/* Lumières d'ambiance */}
      <div className="pointer-events-none absolute -top-40 right-10 -z-10 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 -z-10 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300 shadow-sm">
              <Trophy className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
              <span>Mini-Jeu Interactif (Signature jk.nameksociety)</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Es-tu meilleur que le{" "}
              <span className="font-serif italic font-normal text-purple-600 dark:text-purple-300">
                développeur ?
              </span>
            </h2>
            <p className="mt-2 max-w-xl text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
              Mettez vos réflexes de développeur à l&apos;épreuve : vitesse de
              frappe en TypeScript pur ou détection chirurgicale de bugs
              pernicieux.
            </p>
          </div>

          {/* Onglets de mode */}
          <div className="flex rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-1.5 backdrop-blur-md shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab("typing")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "typing"
                  ? "bg-amber-400 text-black shadow-md shadow-amber-400/20"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Speed Coding (WPM)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("bug")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "bug"
                  ? "bg-purple-500 text-white shadow-md shadow-purple-500/20"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              }`}
            >
              <Bug className="h-3.5 w-3.5" />
              <span>Chasseur de Bugs</span>
            </button>
          </div>
        </div>

        {/* ================= MODE 1 : SPEED CODING ================= */}
        {activeTab === "typing" && (
          <div className="mt-8 rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#10131d] p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
            {/* Barre de stats */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-4">
              <div className="flex items-center gap-6">
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
                    {wpm}
                  </div>
                  <div className="text-[10px] font-mono uppercase text-zinc-500">
                    Mots / Min (WPM)
                  </div>
                </div>

                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
                    {accuracy}%
                  </div>
                  <div className="text-[10px] font-mono uppercase text-zinc-500">
                    Précision
                  </div>
                </div>

                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
                    {elapsedSeconds}s
                  </div>
                  <div className="text-[10px] font-mono uppercase text-zinc-500">
                    Temps écoulé
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1 text-xs">
                  <span className="text-zinc-500">Rang :</span>
                  <span className={`font-mono font-bold ${rank.color}`}>
                    {rank.title}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => resetTypingGame()}
                  className="flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:border-black/25 dark:hover:border-white/25 hover:text-black dark:hover:text-white transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Réinitialiser</span>
                </button>
              </div>
            </div>

            {/* Sélection du snippet */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-zinc-500">
                Snippets :
              </span>
              {challengeSnippets.map((snip, sIdx) => (
                <button
                  type="button"
                  key={snip.id}
                  onClick={() => resetTypingGame(sIdx)}
                  aria-label={`Charger le snippet ${snip.title}`}
                  className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-colors ${
                    snippetIndex === sIdx
                      ? "bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-400/40 font-bold"
                      : "border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {snip.title}
                </button>
              ))}
            </div>

            {/* Affichage du code cible */}
            <div className="mt-5 rounded-2xl border border-black/10 dark:border-white/10 bg-[#f8f9fc] dark:bg-[#0c0d14] p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto select-none">
              <pre className="text-zinc-700 dark:text-zinc-300">
                {currentSnippet.code.split("").map((char, index) => {
                  let colorClass = "text-zinc-400 dark:text-zinc-500";

                  if (index < userInput.length) {
                    colorClass =
                      userInput[index] === char
                        ? "text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 rounded-sm"
                        : "text-rose-600 dark:text-rose-400 bg-rose-500/20 rounded-sm";
                  }

                  return (
                    <span key={index} className={colorClass}>
                      {char}
                    </span>
                  );
                })}
              </pre>
            </div>

            {/* Zone de saisie */}
            <div className="mt-4 relative">
              <textarea
                ref={inputRef}
                value={userInput}
                disabled={isFinished}
                onChange={handleInputChange}
                placeholder="Tapez le code ci-dessus aussi vite et fidèlement que possible..."
                rows={4}
                className="w-full rounded-2xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#151722] p-4 font-mono text-xs sm:text-sm text-zinc-900 dark:text-white focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 resize-none transition-all placeholder:text-zinc-400"
              />
              {!isTypingStarted && !isFinished && (
                <button
                  type="button"
                  onClick={handleOverlayClick}
                  aria-label="Commencer le test de frappe"
                  className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-black/40 backdrop-blur-[1px] rounded-2xl cursor-pointer"
                >
                  <div className="flex items-center gap-2 rounded-full bg-white dark:bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 border border-black/10 dark:border-white/10 shadow-lg">
                    <Play className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                    <span>Cliquez ici pour commencer le test de frappe</span>
                  </div>
                </button>
              )}
            </div>

            {/* Bannière de résultat */}
            <AnimatePresence>
              {isFinished && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center sm:text-left sm:flex sm:items-center sm:justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Challenge Validé avec Succès !</span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300">
                      Score final :{" "}
                      <strong className="font-mono text-zinc-900 dark:text-white">
                        {wpm} WPM
                      </strong>{" "}
                      avec une précision de{" "}
                      <strong className="font-mono text-zinc-900 dark:text-white">
                        {accuracy}%
                      </strong>
                      .
                    </p>
                  </div>

                  <div className="mt-4 sm:mt-0 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => resetTypingGame()}
                      className="rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/10 px-4 py-2 text-xs font-semibold text-zinc-800 dark:text-white hover:bg-black/5 dark:hover:bg-white/20"
                    >
                      Snippet Suivant
                    </button>
                    {onOpenBooking && (
                      <button
                        type="button"
                        onClick={onOpenBooking}
                        className="rounded-full bg-amber-400 px-4 py-2 text-xs font-bold text-black hover:bg-amber-300 shadow-md shadow-amber-400/20"
                      >
                        Défier le dev en visio →
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ================= MODE 2 : BUG HUNTER ================= */}
        {activeTab === "bug" && (
          <div className="mt-8 rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#10131d] p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs text-purple-700 dark:text-purple-400 uppercase font-bold">
                  Bug Hunter Challenge ({bugIndex + 1}/
                  {bugHunterChallenges.length})
                </span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-1">
                  {currentBug.title}
                </h3>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs font-mono font-bold text-purple-700 dark:text-purple-300">
                  Score : {bugScore} pts
                </div>
                <button
                  type="button"
                  onClick={nextBugChallenge}
                  className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                >
                  Passer au suivant
                </button>
              </div>
            </div>

            <p className="mt-4 text-xs text-zinc-600 dark:text-zinc-400">
              👉{" "}
              <strong className="text-zinc-900 dark:text-white">
                Consigne :
              </strong>{" "}
              Cliquez directement sur le numéro de la ligne de code contenant le
              bug ou l&apos;anomalie critique.
            </p>

            {/* Lignes de code interactives */}
            <div className="mt-4 rounded-2xl border border-black/10 dark:border-white/10 bg-[#f8f9fc] dark:bg-[#0c0d14] p-4 font-mono text-xs sm:text-sm overflow-x-auto">
              <div className="space-y-1">
                {currentBug.snippet
                  .split("\n")
                  .map((line: string, idx: number) => {
                    const lineNum = idx + 1;
                    const isBugLine = lineNum === currentBug.correctLine;
                    const isSelected = selectedLine === lineNum;

                    let lineBg = "hover:bg-black/5 dark:hover:bg-white/5";
                    if (isSelected) {
                      lineBg = isBugLine
                        ? "bg-emerald-500/20 border-l-2 border-emerald-500"
                        : "bg-rose-500/20 border-l-2 border-rose-500";
                    }

                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => handleLineClick(lineNum)}
                        className={`w-full flex items-center gap-4 px-2 py-1 rounded cursor-pointer transition-colors text-left ${lineBg}`}
                      >
                        <span className="w-6 text-right text-zinc-400 select-none">
                          {lineNum}
                        </span>
                        <span className="text-zinc-800 dark:text-zinc-200">
                          {line}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {bugFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className={`mt-6 rounded-2xl p-5 border ${
                    bugFeedback === "correct"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
                      : "border-rose-500/30 bg-rose-500/10 text-rose-800 dark:text-rose-300"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {bugFeedback === "correct" ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        <span>
                          Bien joué ! C&apos;est exactement l&apos;anomalie.
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5 text-rose-500" />
                        <span>
                          Ce n&apos;est pas cette ligne. Indice :{" "}
                          {currentBug.hint}
                        </span>
                      </>
                    )}
                  </div>

                  <p className="mt-2 text-xs leading-relaxed opacity-90">
                    <strong className="font-semibold">Explication : </strong>
                    {currentBug.explanation}
                  </p>

                  {bugFeedback === "correct" && (
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={nextBugChallenge}
                        className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-500 shadow-md"
                      >
                        <span>Bug Suivant</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
