import {
  Globe,
  Play,
  Volume2,
  Sparkles,
  Layers,
  Code2,
  Activity,
  Zap,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";

import type { Project } from "@/types";

interface ProjectRealVisualPreviewProps {
  project: Project;
}

export function ProjectRealVisualPreview({
  project,
}: ProjectRealVisualPreviewProps) {
  const domain = project.domainName || `${project.id}.dev`;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-[#090b11] shadow-inner select-none transition-all duration-300 group-hover:border-amber-400/40 dark:group-hover:border-white/20">
      {/* Barre de titre / Chrome navigateur */}
      <div className="flex items-center justify-between border-b border-white/5 bg-[#0f121d] px-3 py-2 text-[11px] font-mono text-zinc-400">
        {/* Pastilles macOS */}
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 shadow-sm shadow-rose-500/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 shadow-sm shadow-amber-500/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 shadow-sm shadow-emerald-500/50" />
        </div>

        {/* URL du navigateur */}
        <div className="flex items-center gap-1.5 rounded-md border border-white/5 bg-black/40 px-2.5 py-0.5 text-[10px] text-zinc-400 transition-colors group-hover:text-zinc-200">
          <Globe className="h-3 w-3 text-zinc-500" />
          <span className="truncate max-w-[150px] sm:max-w-[180px]">
            {domain}
          </span>
        </div>

        {/* Badge LIVE */}
        <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">LIVE</span>
        </div>
      </div>

      {/* Contenu visuel selon le type de projet */}
      <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-gradient-to-b from-[#090a10] to-[#0d0f18] p-3 text-left">
        {/* ---------- 1. Zenith Studio — Timeline IA Vidéo & Audio ---------- */}
        {project.previewType === "saas-editor" && (
          <div className="flex h-full flex-col justify-between text-xs">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-mono text-indigo-300 border border-indigo-500/30">
                  4K Timeline
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  00:04:12 / 00:15:00
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                <Sparkles className="h-3 w-3" />
                <span>IA Transcribe 99%</span>
              </div>
            </div>

            <div className="relative my-2 flex flex-1 items-center justify-center rounded-lg border border-white/5 bg-black/60 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 via-transparent to-purple-950/30" />
              <div className="relative z-10 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md border border-white/15">
                <Play className="h-3.5 w-3.5 fill-current text-amber-400" />
                <span className="font-mono text-[11px] text-zinc-200">
                  Episode_42_Final.mp4
                </span>
              </div>
              <div className="absolute bottom-2 rounded bg-black/80 px-2.5 py-0.5 text-[10px] text-zinc-200 border border-white/10">
                « Un déploiement full-stack à zéro friction »
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <div className="flex h-4 items-center gap-1 rounded bg-indigo-950/40 px-2 border border-indigo-800/30">
                <span className="text-[9px] font-mono text-indigo-400">
                  VID 1
                </span>
                <div className="flex-1 h-2 rounded bg-indigo-500/30 overflow-hidden">
                  <div className="h-full w-2/3 bg-indigo-400/80 rounded" />
                </div>
              </div>
              <div className="flex h-4 items-center gap-1 rounded bg-amber-950/30 px-2 border border-amber-800/30">
                <Volume2 className="h-2.5 w-2.5 text-amber-400" />
                <span className="text-[9px] font-mono text-amber-400">
                  AUDIO
                </span>
                <div className="flex flex-1 items-center gap-[2px] h-2">
                  {[
                    40, 70, 30, 90, 60, 100, 45, 80, 20, 65, 85, 35, 95, 55, 75,
                    25, 60, 90, 40,
                  ].map((h, idx) => (
                    <span
                      key={idx}
                      aria-hidden="true"
                      className="w-1 rounded-full bg-amber-400/70"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------- 2. DevVault — Monaco Code Snippets ---------- */}
        {project.previewType === "code-snippets" && (
          <div className="flex h-full flex-col justify-between font-mono text-[11px]">
            <div className="flex items-center gap-1 border-b border-white/5 pb-2">
              <div className="flex items-center gap-1.5 rounded-t bg-[#161925] px-2.5 py-1 text-zinc-200 border-t border-x border-white/10 text-[10px]">
                <Code2 className="h-3 w-3 text-amber-400" />
                <span>ThemeButton.tsx</span>
              </div>
              <div className="px-2 py-1 text-zinc-500 text-[10px]">
                tokens.json
              </div>
              <div className="ml-auto text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <span>TypeScript 5.8</span>
              </div>
            </div>

            <div className="space-y-1 py-1.5 text-[10.5px] leading-snug">
              <div className="text-zinc-500">
                <span className="inline-block w-4 text-zinc-600">1</span>
                <span className="text-purple-400">export const </span>
                <span className="text-amber-300">useDesignTokens </span>
                <span className="text-zinc-300">= () =&gt; &#123;</span>
              </div>
              <div className="text-zinc-500">
                <span className="inline-block w-4 text-zinc-600">2</span>
                <span className="text-zinc-300">&nbsp;&nbsp;return &#123;</span>
              </div>
              <div className="text-zinc-500">
                <span className="inline-block w-4 text-zinc-600">3</span>
                <span className="text-zinc-300">
                  &nbsp;&nbsp;&nbsp;&nbsp;accent:{" "}
                </span>
                <span className="text-emerald-400">&quot;#F59E0B&quot;</span>
                <span className="text-zinc-400">, // Royal Gold</span>
              </div>
              <div className="text-zinc-500">
                <span className="inline-block w-4 text-zinc-600">4</span>
                <span className="text-zinc-300">
                  &nbsp;&nbsp;&nbsp;&nbsp;elevation:{" "}
                </span>
                <span className="text-sky-300">
                  &quot;0 20px 40px -12px rgba(0,0,0,0.8)&quot;
                </span>
              </div>
              <div className="text-zinc-500">
                <span className="inline-block w-4 text-zinc-600">5</span>
                <span className="text-zinc-300">&nbsp;&nbsp;&#125;;</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-1.5 text-[10px]">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">Tokens:</span>
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-amber-400 ring-1 ring-white/20"
                />
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-emerald-400 ring-1 ring-white/20"
                />
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-purple-400 ring-1 ring-white/20"
                />
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-blue-400 ring-1 ring-white/20"
                />
              </div>
              <span className="text-amber-400 font-mono">1.2k Stars ★</span>
            </div>
          </div>
        )}

        {/* ---------- 3. PulseAnalytics — Web Vitals temps réel ---------- */}
        {project.previewType === "metrics-dashboard" && (
          <div className="flex h-full flex-col justify-between">
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-1.5 text-center">
                <div className="font-mono text-sm font-bold text-emerald-400">
                  99
                </div>
                <div className="text-[9px] font-mono text-zinc-400">
                  LCP 0.8s
                </div>
              </div>
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-1.5 text-center">
                <div className="font-mono text-sm font-bold text-emerald-400">
                  100
                </div>
                <div className="text-[9px] font-mono text-zinc-400">
                  FID 2ms
                </div>
              </div>
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-1.5 text-center">
                <div className="font-mono text-sm font-bold text-emerald-400">
                  100
                </div>
                <div className="text-[9px] font-mono text-zinc-400">
                  CLS 0.00
                </div>
              </div>
            </div>

            <div className="my-1 rounded-lg border border-white/5 bg-black/40 p-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1">
                <span>Latence p99 (24h)</span>
                <span className="text-emerald-400 font-bold">14.2ms avg</span>
              </div>
              <svg
                className="w-full h-9"
                viewBox="0 0 200 36"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="grad-pulse" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,25 Q30,28 60,18 T120,12 T160,20 T200,8 L200,36 L0,36 Z"
                  fill="url(#grad-pulse)"
                />
                <path
                  d="M0,25 Q30,28 60,18 T120,12 T160,20 T200,8"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <div className="flex items-center gap-1">
                <Activity className="h-3 w-3 text-emerald-400" />
                <span>50M reqs/j</span>
              </div>
              <span className="rounded bg-white/5 px-2 py-0.5 text-zinc-300">
                ClickHouse Engine
              </span>
            </div>
          </div>
        )}

        {/* ---------- 4. NeuroGraph — Orchestration agentique ---------- */}
        {project.previewType === "agentic-canvas" && (
          <div className="flex h-full flex-col justify-between font-mono">
            <div className="flex items-center justify-between border-b border-white/5 pb-1 text-[10px] text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Zap className="h-3 w-3 text-purple-400" />
                <span className="text-zinc-200">
                  Pipeline: Customer_Support_Agent
                </span>
              </div>
              <span className="text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                Active
              </span>
            </div>

            <div className="relative my-2 flex-1 rounded-lg border border-white/5 bg-black/50 p-2 overflow-hidden flex items-center justify-around">
              <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-emerald-500/50 -translate-y-1/2" />

              <div className="relative z-10 rounded-lg border border-purple-500/40 bg-[#161324] px-2 py-1 text-center shadow-lg">
                <div className="text-[9px] text-purple-300 font-bold">
                  Input LLM
                </div>
                <div className="text-[8px] text-zinc-400">User Query</div>
              </div>

              <div className="relative z-10 rounded-lg border border-pink-500/40 bg-[#1f1220] px-2 py-1 text-center shadow-lg">
                <div className="text-[9px] text-pink-300 font-bold">
                  Vector RAG
                </div>
                <div className="text-[8px] text-zinc-400">Cosine 0.94</div>
              </div>

              <div className="relative z-10 rounded-lg border border-emerald-500/40 bg-[#101d19] px-2 py-1 text-center shadow-lg">
                <div className="text-[9px] text-emerald-300 font-bold">
                  Tool Exec
                </div>
                <div className="text-[8px] text-zinc-400">200 OK</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1">
              <span className="text-zinc-500">
                Streaming SSE: 142 tokens/sec
              </span>
              <span className="text-emerald-400">Latency 110ms</span>
            </div>
          </div>
        )}

        {/* ---------- 5. ChronoCraft — Pomodoro gamifié ---------- */}
        {project.previewType === "audio-focus" && (
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/5 pb-1 text-[10px] font-mono text-zinc-400">
              <span className="text-amber-400 font-semibold">
                SESSION EN COURS
              </span>
              <span>🔥 Streak: 7 jours</span>
            </div>

            <div className="my-auto flex items-center justify-center gap-6">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-400/30 bg-amber-500/5 shadow-lg shadow-amber-500/10">
                <div className="text-center font-mono">
                  <div className="text-base font-extrabold text-amber-300">
                    24:50
                  </div>
                  <div className="text-[8px] text-zinc-400 tracking-wider">
                    FOCUS
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="rounded bg-white/5 px-2.5 py-1 text-[10px] text-zinc-300 border border-white/10">
                  🎧 Ambience: 432Hz Binaural
                </div>
                <div className="rounded bg-emerald-500/10 px-2.5 py-1 text-[10px] text-emerald-300 border border-emerald-500/20">
                  ⚔️ +150 XP Deep Work
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 border-t border-white/5 pt-1">
              <span>Web Audio API Synth</span>
              <span>0% Distraction</span>
            </div>
          </div>
        )}

        {/* ---------- 6. ApexStore — E-Commerce 3D Headless ---------- */}
        {project.previewType === "ecommerce" && (
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/5 pb-1 text-[10px] font-mono text-zinc-400">
              <span className="text-cyan-400 font-bold">3D CONFIGURATOR</span>
              <span className="text-emerald-400">LCP 0.4s</span>
            </div>

            <div className="relative my-2 flex flex-1 items-center justify-between rounded-lg border border-white/5 bg-gradient-to-r from-cyan-950/20 to-blue-950/20 p-2.5">
              <div className="space-y-1">
                <div className="text-xs font-bold text-white">
                  Apex Wireless Pro
                </div>
                <div className="text-[10px] text-cyan-300 font-mono">
                  249,00 €
                </div>
                <div className="flex gap-1 pt-1">
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-mono text-zinc-300">
                    360° WebGL
                  </span>
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-mono text-zinc-300">
                    4K PBR
                  </span>
                </div>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-300">
                <ShoppingBag className="h-7 w-7" />
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 border-t border-white/5 pt-1">
              <span>Apple Pay en 1 clic</span>
              <span className="text-emerald-400 font-bold">
                +38% Conversion
              </span>
            </div>
          </div>
        )}

        {/* Fallback visuel */}
        {!project.previewType && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Layers className="h-8 w-8 text-amber-400 mb-2 opacity-80" />
            <div className="text-xs font-bold text-white">{project.title}</div>
            <div className="text-[10px] text-zinc-400 font-mono mt-1">
              {domain}
            </div>
          </div>
        )}

        {/* Overlay hover avec CTA direct */}
        <div
          aria-label="Visiter le projet en direct"
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100"
        >
          <div className="flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-xs font-bold text-black shadow-xl shadow-amber-400/30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <span>Visiter le projet en direct</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
