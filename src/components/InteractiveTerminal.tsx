"use client";

import { useState, useRef, useEffect } from "react";
import {
  Terminal as TerminalIcon,
  X,
  Maximize2,
  Minimize2,
  CornerDownLeft,
} from "lucide-react";

import { useTheme } from "@/context/ThemeContext";
import { projectsData, technologies } from "@/data/portfolioData";
import type { UserProfile } from "@/types";

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onOpenBooking: () => void;
  onOpenChallenge: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export function InteractiveTerminal({
  isOpen,
  onClose,
  profile,
  onOpenBooking,
  onOpenChallenge,
}: InteractiveTerminalProps) {
  const { toggleTheme } = useTheme();

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-zinc-300">
          <p className="text-amber-300 font-bold">
            💻 Bienvenue sur le Terminal Interactif de {profile.name}{" "}
            [v2.4.0-prod]
          </p>
          <p className="text-zinc-400 text-xs">
            Tapez{" "}
            <span className="text-amber-400 font-mono font-bold">help</span>{" "}
            pour afficher la liste des commandes disponibles.
          </p>
        </div>
      ),
    },
  ]);
  const [commandIndex, setCommandIndex] = useState<number>(-1);
  const [enteredCommands, setEnteredCommands] = useState<string[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setEnteredCommands((prev) => [...prev, cmd]);
    setCommandIndex(-1);

    let outputNode: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        outputNode = (
          <div className="space-y-1 text-xs">
            <p className="text-zinc-400 mb-2">Commandes disponibles :</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono">
              <div>
                <span className="text-amber-400 font-bold">bio</span> :
                Présentation synthétique
              </div>
              <div>
                <span className="text-amber-400 font-bold">skills</span> : Stack
                &amp; compétences
              </div>
              <div>
                <span className="text-amber-400 font-bold">projects</span> :
                Liste des projets phares
              </div>
              <div>
                <span className="text-amber-400 font-bold">contact</span> :
                Email &amp; réseaux
              </div>
              <div>
                <span className="text-amber-400 font-bold">hire</span> :
                Déclencher un rendez-vous
              </div>
              <div>
                <span className="text-amber-400 font-bold">challenge</span> :
                Lancer le test de code
              </div>
              <div>
                <span className="text-amber-400 font-bold">theme</span> :
                Alterner mode clair/sombre
              </div>
              <div>
                <span className="text-amber-400 font-bold">clear</span> :
                Nettoyer l&apos;écran
              </div>
              <div>
                <span className="text-amber-400 font-bold">exit</span> : Fermer
                le terminal
              </div>
            </div>
          </div>
        );
        break;

      case "bio":
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="font-bold text-white">
              {profile.name} — {profile.role}
            </p>
            <p className="text-zinc-300">{profile.bio}</p>
            <p className="text-emerald-400">Statut : {profile.statusText}</p>
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-amber-300 font-bold">
              Technologies &amp; Compétences :
            </p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((t) => (
                <span
                  key={t.name}
                  className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-zinc-300"
                >
                  {t.name}{" "}
                  <span className="text-amber-400 font-bold">({t.level})</span>
                </span>
              ))}
            </div>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-amber-300 font-bold">Projets Récents :</p>
            <div className="space-y-2">
              {projectsData.map((p) => (
                <div key={p.id} className="border-l-2 border-amber-400/40 pl-2">
                  <div className="font-bold text-white">
                    {p.title}{" "}
                    <span className="text-zinc-500 font-mono text-[10px]">
                      [{p.category}]
                    </span>
                  </div>
                  <div className="text-zinc-400 text-[11px]">{p.tagline}</div>
                  <div className="text-zinc-500 text-[10px] font-mono">
                    {p.tags.join(" • ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono">
            <p>
              <span className="text-zinc-400">Email:</span>{" "}
              <span className="text-amber-300">{profile.email}</span>
            </p>
            <p>
              <span className="text-zinc-400">GitHub:</span>{" "}
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="text-blue-400 underline"
              >
                {profile.github}
              </a>
            </p>
            <p>
              <span className="text-zinc-400">LinkedIn:</span>{" "}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="text-blue-400 underline"
              >
                {profile.linkedin}
              </a>
            </p>
          </div>
        );
        break;

      case "hire":
        onClose();
        onOpenBooking();
        return;

      case "challenge":
        onClose();
        onOpenChallenge();
        return;

      case "theme":
        // ✅ Utilise le ThemeContext au lieu de manipuler le DOM en direct
        toggleTheme();
        outputNode = (
          <p className="text-xs text-amber-300 font-mono">
            Thème basculé via le ThemeContext 🎨
          </p>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "exit":
      case "quit":
        onClose();
        return;

      default:
        outputNode = (
          <div className="text-xs text-rose-400">
            Commande inconnue :{" "}
            <span className="font-mono font-bold">{trimmed}</span>. Tapez{" "}
            <span className="font-mono text-amber-300">help</span> pour afficher
            la liste.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output: outputNode }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (enteredCommands.length > 0) {
        const nextIdx =
          commandIndex === -1
            ? enteredCommands.length - 1
            : Math.max(0, commandIndex - 1);
        setCommandIndex(nextIdx);
        setInput(enteredCommands[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandIndex !== -1) {
        const nextIdx = commandIndex + 1;
        if (nextIdx < enteredCommands.length) {
          setCommandIndex(nextIdx);
          setInput(enteredCommands[nextIdx]);
        } else {
          setCommandIndex(-1);
          setInput("");
        }
      }
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Terminal interactif"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex flex-col rounded-2xl border border-white/20 bg-[#0c0d14] shadow-2xl overflow-hidden font-mono transition-all duration-300 ${
          isMaximized ? "w-full h-full" : "w-full max-w-3xl h-[520px]"
        }`}
      >
        {/* Barre de titre du terminal */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#161824] px-4 py-3 select-none">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-rose-500/80" />
            <div className="h-3 w-3 rounded-full bg-amber-500/80" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 flex items-center gap-1.5 text-xs text-zinc-300">
              <TerminalIcon className="h-3.5 w-3.5 text-amber-400" />
              <span>
                guest@{profile.name.toLowerCase().replace(/\s+/g, "")}-dev:~
              </span>
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsMaximized(!isMaximized)}
              aria-label={isMaximized ? "Réduire" : "Agrandir"}
              className="p-1 rounded text-zinc-400 hover:text-white"
              title={isMaximized ? "Réduire" : "Agrandir"}
            >
              {isMaximized ? (
                <Minimize2 className="h-3.5 w-3.5" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" />
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer le terminal"
              className="p-1 rounded text-zinc-400 hover:text-rose-400"
              title="Fermer (Echap)"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Corps du terminal */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-sm text-zinc-200">
          {history.map((item, idx) => (
            <div key={`${idx}-${item.command}`} className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="text-emerald-400">➜</span>
                <span className="text-amber-400">~</span>
                <span className="text-white font-bold">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Ligne de prompt */}
        <div className="border-t border-white/10 bg-[#0e1018] p-3 flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-emerald-400 font-bold">➜</span>
          <span className="text-amber-400 font-bold">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tapez une commande (ex: help, skills, hire)..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-zinc-600 font-mono"
            aria-label="Ligne de commande"
          />
          <button
            type="button"
            onClick={() => handleCommand(input)}
            aria-label="Exécuter la commande"
            className="rounded bg-white/10 px-2 py-1 text-[11px] text-zinc-300 hover:bg-white/20"
          >
            <CornerDownLeft className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
