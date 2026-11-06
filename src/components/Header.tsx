"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, Moon, Sun, X } from "lucide-react";

import { useTheme } from "@/context/ThemeContext";
import { useModal } from "@/context/ModalContext";
import { EASE } from "@/components/ui/Reveal";
import { useActiveSection, useScrolledPast } from "@/components/ui/useActiveSection";
import type { UserProfile } from "@/types";

export const NAV_ITEMS = [
  { id: "projets", label: "Projets" },
  { id: "services", label: "Services" },
  { id: "approche", label: "Approche" },
  { id: "a-propos", label: "À propos" },
] as const;

const OBSERVED_IDS = ["top", ...NAV_ITEMS.map((n) => n.id), "contact"];

export function Header({ profile }: { profile: UserProfile }) {
  const { theme, toggleTheme } = useTheme();
  const { openModal } = useModal();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolledPast(30);
  const active = useActiveSection(OBSERVED_IDS);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-3 py-2 transition-all duration-500 ${
            scrolled || menuOpen
              ? "border-line bg-canvas/70 shadow-2xl shadow-black/20 backdrop-blur-xl"
              : "border-transparent"
          }`}
        >
          <Link href="/#top" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-sm font-bold text-accent-fg transition-transform duration-500 hover:rotate-[-10deg] hover:scale-110">
              {initials}
            </span>
            <span className="hidden text-sm font-semibold sm:block">{profile.name}</span>
          </Link>

          <nav
            aria-label="Navigation principale"
            className="hidden items-center gap-1 rounded-full border border-line bg-surface/60 p-1 md:flex"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <Link
                  key={item.id}
                  href={`/#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative isolate rounded-full px-4 py-1.5 text-sm transition-colors ${
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-muted transition-colors hover:bg-surface hover:text-ink"
              aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link
              href="/#contact"
              className="hidden rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-canvas transition-transform hover:scale-[1.03] sm:block"
            >
              Parlons-en
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-ink md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col bg-canvas px-6 pb-8 pt-28 md:hidden"
          >
            <nav aria-label="Navigation mobile" className="flex flex-col gap-1">
              {[...NAV_ITEMS, { id: "contact", label: "Contact" }].map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + i * 0.05, duration: 0.5, ease: EASE }}
                >
                  <Link
                    href={`/#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-4xl font-semibold tracking-[-0.04em]"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto flex items-center justify-between text-sm text-muted">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openModal("resume");
                }}
              >
                Voir le CV
              </button>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
