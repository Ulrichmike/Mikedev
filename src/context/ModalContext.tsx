"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";

import { useTheme } from "@/context/ThemeContext";
import { initialProfile } from "@/data/portfolioData";
import type { UserProfile } from "@/types";

import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { ProfileModal } from "@/components/ProfileModal";
import { ResumeModal } from "@/components/ResumeModal";
import { CommandPaletteModal } from "@/components/CommandPaletteModal";
import { ThemeCustomizerModal } from "@/components/ThemeCustomizerModal";

/* ============================================================
 * TYPES
 * ============================================================ */
export type ModalName =
  | "terminal"
  | "challenge"
  | "booking"
  | "customize"
  | "resume"
  | "commandPalette"
  | "themeStudio"
  | null;

interface ModalContextType {
  /** Nom de la modale actuellement ouverte (ou null) */
  activeModal: ModalName;
  /** Ouvre une modale spécifique (remplace toute autre) */
  openModal: (name: ModalName) => void;
  /** Ferme la modale active */
  closeModal: () => void;
  /** Toggle une modale (utile pour ⌘K) */
  toggleModal: (name: ModalName) => void;
  /** Profil courant (partagé par toutes les modales) */
  profile: UserProfile;
  /** Sauvegarde le profil dans localStorage */
  saveProfile: (newProfile: UserProfile) => void;
  /** Scroll vers une section (booking, challenge, etc.) */
  scrollToSection: (sectionId: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

/* ============================================================
 * PROVIDER
 * ============================================================ */
export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalName>(null);
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [mounted, setMounted] = useState(false);

  /* ------------------------------------------------------------
   * 1. Hydratation du profil depuis localStorage
   * ------------------------------------------------------------ */
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("mw_portfolio_profile");
      if (saved) {
        setProfile(JSON.parse(saved));
      }
    } catch (err) {
      console.warn("[ModalProvider] Failed to load profile:", err);
    }
  }, []);

  /* ------------------------------------------------------------
   * 2. Persistance du profil
   * ------------------------------------------------------------ */
  const saveProfile = useCallback((newProfile: UserProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem("mw_portfolio_profile", JSON.stringify(newProfile));
    } catch (err) {
      console.error("[ModalProvider] Failed to save profile:", err);
    }
  }, []);

  /* ------------------------------------------------------------
   * 3. Scroll helper
   * ------------------------------------------------------------ */
  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  /* ------------------------------------------------------------
   * 4. Actions modales
   * ------------------------------------------------------------ */
  const openModal = useCallback((name: ModalName) => {
    setActiveModal(name);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const toggleModal = useCallback((name: ModalName) => {
    setActiveModal((prev) => (prev === name ? null : name));
  }, []);

  /* ------------------------------------------------------------
   * 5. Raccourci global Cmd/Ctrl + K → Command Palette
   * ------------------------------------------------------------ */
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

  /* ------------------------------------------------------------
   * 6. Ferme les modales fullscreen quand on clique en dehors
   *    (géré par chaque modale via onClose)
   * ------------------------------------------------------------ */

  const contextValue = useMemo<ModalContextType>(
    () => ({
      activeModal,
      openModal,
      closeModal,
      toggleModal,
      profile,
      saveProfile,
      scrollToSection,
    }),
    [
      activeModal,
      openModal,
      closeModal,
      toggleModal,
      profile,
      saveProfile,
      scrollToSection,
    ],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}

      {/* ============================================================
       * RENDU GLOBAL DES MODALES
       * Chaque modale lit son propre état isOpen depuis activeModal
       * ============================================================ */}

      {/* Terminal CLI */}
      <InteractiveTerminal
        isOpen={activeModal === "terminal"}
        onClose={closeModal}
        profile={profile}
        onOpenBooking={() => openModal("booking")}
        onOpenChallenge={() => {
          closeModal();
          scrollToSection("defi");
        }}
      />

      {/* Personnalisation du profil */}
      <ProfileModal
        isOpen={activeModal === "customize"}
        onClose={closeModal}
        profile={profile}
        onSave={saveProfile}
      />

      {/* CV PDF */}
      <ResumeModal
        isOpen={activeModal === "resume"}
        onClose={closeModal}
        profile={profile}
      />

      {/* Palette de commandes */}
      <CommandPaletteModal
        isOpen={activeModal === "commandPalette"}
        onClose={closeModal}
        profile={profile}
        onOpenBooking={() => openModal("booking")}
        onOpenChallenge={() => {
          closeModal();
          scrollToSection("defi");
        }}
        onOpenTerminal={() => openModal("terminal")}
        onOpenResume={() => openModal("resume")}
      />

      {/* Studio de thème */}
      <ThemeCustomizerModal />
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
