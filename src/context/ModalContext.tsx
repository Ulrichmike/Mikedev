"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

import { initialProfile } from "@/data/portfolioData";
import type { UserProfile } from "@/types";

import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { ResumeModal } from "@/components/ResumeModal";
import { CommandPaletteModal } from "@/components/CommandPaletteModal";

/* ============================================================
 * TYPES
 * ============================================================ */
export type ModalName = "terminal" | "resume" | "commandPalette" | null;

interface ModalContextType {
  /** Nom de la modale actuellement ouverte (ou null) */
  activeModal: ModalName;
  /** Ouvre une modale spécifique (remplace toute autre) */
  openModal: (name: ModalName) => void;
  /** Ferme la modale active */
  closeModal: () => void;
  /** Toggle une modale (utile pour ⌘K) */
  toggleModal: (name: ModalName) => void;
  /** Profil (statique, défini dans data/portfolioData) */
  profile: UserProfile;
  /** Scroll vers une section de l'accueil, depuis n'importe quelle page */
  scrollToSection: (sectionId: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

/* ============================================================
 * PROVIDER
 * ============================================================ */
export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalName>(null);
  const profile = initialProfile;
  const router = useRouter();

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Section absente (page projet) → retour à l'accueil sur l'ancre
      router.push(`/#${sectionId}`);
    }
  }, [router]);

  const openModal = useCallback((name: ModalName) => setActiveModal(name), []);
  const closeModal = useCallback(() => setActiveModal(null), []);
  const toggleModal = useCallback((name: ModalName) => {
    setActiveModal((prev) => (prev === name ? null : name));
  }, []);

  /* Raccourci global Cmd/Ctrl + K → Command Palette */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggleModal("commandPalette");
      }
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleModal]);

  const contextValue = useMemo<ModalContextType>(
    () => ({
      activeModal,
      openModal,
      closeModal,
      toggleModal,
      profile,
      scrollToSection,
    }),
    [activeModal, openModal, closeModal, toggleModal, profile, scrollToSection],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}

      <InteractiveTerminal
        isOpen={activeModal === "terminal"}
        onClose={closeModal}
        profile={profile}
        onOpenBooking={() => {
          closeModal();
          scrollToSection("contact");
        }}
      />

      <ResumeModal
        isOpen={activeModal === "resume"}
        onClose={closeModal}
        profile={profile}
      />

      <CommandPaletteModal
        isOpen={activeModal === "commandPalette"}
        onClose={closeModal}
        profile={profile}
        onOpenBooking={() => {
          closeModal();
          scrollToSection("contact");
        }}
        onOpenTerminal={() => openModal("terminal")}
        onOpenResume={() => openModal("resume")}
      />

    </ModalContext.Provider>
  );
}

/* ============================================================
 * HOOK
 * ============================================================ */
export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
