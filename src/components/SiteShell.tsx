"use client";

import { useEffect, type ReactNode } from "react";
import { motion } from "motion/react";

import { useModal } from "@/context/ModalContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/** Structure commune à toutes les pages (accueil + études de cas). */
export function SiteShell({ children }: { children: ReactNode }) {
  const { profile } = useModal();

  // Un mot pour les curieux qui ouvrent la console
  useEffect(() => {
    console.log(
      "%cMike Weda%c\nVous lisez le code source ? Appuyez sur ⌘K puis ouvrez le terminal — tapez `hire`.",
      "font: 700 22px system-ui; color: #d4471b;",
      "font: 12px ui-monospace, monospace; color: #8a8378;",
    );
  }, []);

  return (
    <div className="relative min-h-screen bg-canvas font-sans text-ink antialiased">
      <Header profile={profile} />
      {/* Transition d'entrée de page : opacité seule (aucun transform,
          pour ne pas casser les éléments position: fixed) */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.main>
      <Footer profile={profile} />
    </div>
  );
}
