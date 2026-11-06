// src/components/Footer.tsx

import Link from "next/link";
import type { UserProfile } from "@/types";
import { BackToTopButton } from "./BackToTopButton";

const NAV = [
  { href: "/#projets", label: "Projets" },
  { href: "/#services", label: "Services" },
  { href: "/#approche", label: "Approche" },
  { href: "/#a-propos", label: "À propos" },
  { href: "/#contact", label: "Contact" },
];

export function Footer({ profile }: { profile: UserProfile }) {
  const socials = [
    { href: profile.linkedin, label: "LinkedIn" },
    { href: profile.github, label: "GitHub" },
    { href: profile.twitter, label: "X" },
  ].filter((s) => s.href);

  return (
    <footer className="overflow-hidden border-t border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-12 text-sm md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold">{profile.name}</p>
          <p className="mt-1 text-muted">
            {profile.title} — {profile.city}, {profile.country}
          </p>
        </div>
        <nav aria-label="Pied de page">
          <ul className="space-y-2 text-muted">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition-colors hover:text-ink">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="space-y-2 text-muted">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer noopener" className="transition-colors hover:text-ink">
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
        <div className="col-span-2 text-muted md:col-span-1">
          <p>
            Astuce : <kbd className="rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-xs text-ink">⌘K</kbd>{" "}
            ouvre la palette de commandes. Il y a un terminal caché.
          </p>
          <div className="mt-4">
            <BackToTopButton />
          </div>
        </div>
      </div>

      {/* Signature : les lettres s'éclairent sous le curseur */}
      <p
        aria-hidden="true"
        data-torch
        className="text-torch select-none whitespace-nowrap text-center text-[17vw] font-semibold leading-[0.8] tracking-[-0.07em]"
      >
        {profile.name}
      </p>

      <p className="mx-auto max-w-6xl px-5 py-6 text-xs text-muted">
        © {new Date().getFullYear()} {profile.name}. Conçu et codé à {profile.city}.
      </p>
    </footer>
  );
}
