"use client";

import { useState, useEffect, useCallback } from "react";

import { useTheme } from "@/context/ThemeContext";
import { initialProfile } from "@/data/portfolioData";
import type { UserProfile } from "@/types";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TechMarquee } from "@/components/TechMarquee";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ConversionHub } from "@/components/ConversionHub";
import { DevChallenge } from "@/components/DevChallenge";
import { ServicesSection } from "@/components/ServicesSection";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { BookingContactSection } from "@/components/BookingContactSection";
import { Footer } from "@/components/Footer";
import { FloatingDock } from "@/components/FloatingDock";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { ProfileModal } from "@/components/ProfileModal";
import { ThemeCustomizerModal } from "@/components/ThemeCustomizerModal";
import { ResumeModal } from "@/components/ResumeModal";
import { CommandPaletteModal } from "@/components/CommandPaletteModal";

export function PortfolioApp() {
  const { theme, activeBg } = useTheme();

  // ⚠️ On initialise avec initialProfile (safe en SSR)
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [mounted, setMounted] = useState(false);

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // ✅ Hydratation depuis localStorage (uniquement après montage)
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("mw_portfolio_profile");
      if (saved) {
        setProfile(JSON.parse(saved));
      }
    } catch (err) {
      console.warn("[PortfolioApp] Failed to load profile:", err);
    }
  }, []);

  const handleSaveProfile = useCallback((newProfile: UserProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem("mw_portfolio_profile", JSON.stringify(newProfile));
    } catch (err) {
      console.error("[PortfolioApp] Failed to save profile:", err);
    }
  }, []);

  const scrollToBooking = useCallback(() => {
    const el = document.getElementById("contact");
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToChallenge = useCallback(() => {
    const el = document.getElementById("defi");
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Raccourci global : Cmd/Ctrl + K pour la palette de commandes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      style={{ backgroundColor: activeBg }}
      className={`min-h-screen ${
        theme === "dark" ? "dark text-[#eceef4]" : "light text-[#0f172a]"
      } font-sans antialiased selection:bg-amber-400 selection:text-black relative transition-colors duration-300`}
    >
      {/* Motif de grille en arrière-plan */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid-pattern opacity-40" />

      {/* Header */}
      <Header
        profile={profile}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenChallenge={scrollToChallenge}
        onOpenBooking={scrollToBooking}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      <main className="relative z-10">
        {/* Hero */}
        <Hero
          profile={profile}
          onOpenChallenge={scrollToChallenge}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenBooking={scrollToBooking}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Double marquee technologique */}
        <TechMarquee />

        {/* Projets */}
        <ProjectsSection onOpenBooking={scrollToBooking} />

        {/* Conversion Hub */}
        <ConversionHub onOpenBooking={scrollToBooking} />

        {/* Défi développeur */}
        <DevChallenge onOpenBooking={scrollToBooking} />

        {/* Services */}
        <ServicesSection />

        {/* Timeline d'expérience */}
        <ExperienceTimeline />

        {/* Section contact & RDV */}
        <BookingContactSection profile={profile} />
      </main>

      {/* Footer */}
      <Footer profile={profile} />

      {/* Floating Dock */}
      <FloatingDock
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenChallenge={scrollToChallenge}
        onOpenBooking={scrollToBooking}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Modales */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        profile={profile}
        onOpenBooking={scrollToBooking}
        onOpenChallenge={scrollToChallenge}
      />

      <ProfileModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
      />

      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        profile={profile}
        onOpenBooking={scrollToBooking}
        onOpenChallenge={scrollToChallenge}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      <ThemeCustomizerModal />
    </div>
  );
}
