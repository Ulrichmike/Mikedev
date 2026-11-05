import Image from "next/image";
import type { ReactNode } from "react";
import type { Project } from "@/types";

interface ProjectCoverProps {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Affiche le nom du projet sur l'affiche */
  showTitle?: boolean;
}

/** Texte foncé sur les couleurs claires, clair sur les foncées. */
function inkFor(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? "#15130f" : "#fbf7f0";
}

/**
 * Visuel d'un projet.
 * - `heroVisual` renseigné → la vraie image.
 * - Sinon → une affiche illustrée propre au projet (motif dessiné,
 *   jamais une fausse capture d'écran).
 */
export function ProjectCover({
  project,
  className = "",
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
  showTitle = true,
}: ProjectCoverProps) {
  if (project.heroVisual) {
    return (
      <div className={`relative overflow-hidden bg-surface ${className}`}>
        <Image
          src={project.heroVisual}
          alt={`${project.name} — ${project.positioning}`}
          fill
          preload={priority}
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
    );
  }

  const ink = inkFor(project.color);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: project.color, color: ink }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        fill="none"
        stroke="currentColor"
      >
        {MOTIFS[project.slug] ?? MOTIFS.default}
      </svg>
      {showTitle && (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-[5%]">
          <p className="text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
            {project.name}
          </p>
          <p className="hidden pb-2 text-right text-xs font-semibold uppercase tracking-[0.14em] opacity-70 sm:block">
            {project.index}
          </p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------
 * Motifs — un dessin par projet, lié à son sujet
 * ------------------------------------------------------------ */
const MOTIFS: Record<string, ReactNode> = {
  // Plan de salle : tables rondes et chaises
  eventage: (
    <g strokeWidth="1.5" opacity="0.55">
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3, 4].map((c) => {
          const cx = 120 + c * 145 + (r % 2) * 40;
          const cy = 70 + r * 95;
          return (
            <g key={`${r}-${c}`}>
              <circle cx={cx} cy={cy} r="26" />
              {Array.from({ length: 8 }).map((_, k) => {
                const a = (k / 8) * Math.PI * 2;
                return <circle key={k} cx={cx + Math.cos(a) * 38} cy={cy + Math.sin(a) * 38} r="4" />;
              })}
            </g>
          );
        }),
      )}
      <rect x="300" y="-20" width="200" height="34" strokeDasharray="6 6" />
    </g>
  ),
  // Bibliothèque : documents classés, certains verrouillés (abonnement)
  last: (
    <g strokeWidth="1.5" opacity="0.55">
      {Array.from({ length: 4 }).map((_, r) =>
        Array.from({ length: 6 }).map((__, c) => {
          const x = 60 + c * 120;
          const y = 30 + r * 105;
          const locked = (r + c) % 3 === 0;
          return (
            <g key={`${r}-${c}`}>
              <rect x={x} y={y} width="84" height="84" />
              <line x1={x + 12} y1={y + 22} x2={x + 60} y2={y + 22} />
              <line x1={x + 12} y1={y + 36} x2={x + 70} y2={y + 36} />
              <line x1={x + 12} y1={y + 50} x2={x + 48} y2={y + 50} />
              {locked && (
                <g>
                  <rect x={x + 54} y={y + 58} width="18" height="14" />
                  <path d={`M${x + 57} ${y + 58} v-5 a6 6 0 0 1 12 0 v5`} />
                </g>
              )}
            </g>
          );
        }),
      )}
    </g>
  ),
  // Marque : le slogan comme motif typographique
  "africa-elite-club": (
    <g opacity="0.5" stroke="none" fill="currentColor">
      {[0, 1, 2, 3].map((r) => (
        <text
          key={r}
          x={r % 2 ? -120 : -20}
          y={80 + r * 95}
          fontSize="84"
          fontStyle="italic"
          fontFamily="var(--font-newsreader), Georgia, serif"
        >
          Be What You Wear — Be What You Wear
        </text>
      ))}
    </g>
  ),
  // Cahier : lignes réglées et marge
  "learning-academy": (
    <g strokeWidth="1.2" opacity="0.5">
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={i} x1="0" y1={20 + i * 30} x2="800" y2={20 + i * 30} />
      ))}
      <line x1="110" y1="0" x2="110" y2="500" strokeWidth="2" />
      <path d="M180 140 q 40 -40 80 0 t 80 0 t 80 0" strokeWidth="2" />
      <circle cx="560" cy="170" r="34" strokeWidth="2" />
    </g>
  ),
  // Tableau blanc avec cotes
  spacekit: (
    <g strokeWidth="1.5" opacity="0.6">
      <rect x="170" y="70" width="460" height="280" strokeWidth="2.5" />
      <line x1="170" y1="370" x2="170" y2="400" />
      <line x1="630" y1="370" x2="630" y2="400" />
      <line x1="170" y1="390" x2="630" y2="390" markerEnd="" />
      <line x1="140" y1="70" x2="110" y2="70" />
      <line x1="140" y1="350" x2="110" y2="350" />
      <line x1="125" y1="70" x2="125" y2="350" />
      <path d="M230 160 c 60 -50 120 40 180 0 s 120 -40 160 10" strokeWidth="2" />
      <line x1="260" y1="240" x2="520" y2="240" strokeDasharray="10 8" />
      <line x1="370" y1="350" x2="340" y2="460" strokeWidth="2" />
      <line x1="430" y1="350" x2="460" y2="460" strokeWidth="2" />
    </g>
  ),
  // Carte : rues, embouteillage et raccourci moto
  "road-alert": (
    <g strokeWidth="1.4" opacity="0.6">
      {[60, 150, 250, 340, 430].map((y) => (
        <path key={y} d={`M-20 ${y} C 200 ${y - 30}, 500 ${y + 40}, 820 ${y - 10}`} />
      ))}
      {[90, 260, 420, 600, 720].map((x) => (
        <path key={x} d={`M${x} -20 C ${x - 30} 150, ${x + 40} 320, ${x - 10} 520`} />
      ))}
      <path d="M90 420 C 220 380, 260 260, 420 250 S 640 120, 720 70" strokeWidth="5" strokeDasharray="2 14" strokeLinecap="round" />
      <circle cx="90" cy="420" r="10" fill="currentColor" />
      <circle cx="720" cy="70" r="14" strokeWidth="3" />
      <circle cx="720" cy="70" r="5" fill="currentColor" />
      <g strokeWidth="3">
        <line x1="470" y1="330" x2="500" y2="360" />
        <line x1="500" y1="330" x2="470" y2="360" />
      </g>
    </g>
  ),
  default: <g />,
};
