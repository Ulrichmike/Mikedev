"use client";

import dynamic from "next/dynamic";

import { useTheme } from "@/context/ThemeContext";
import { useModal } from "@/context/ModalContext";

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

/* Chargement client-only du fond cosmique (canvas) */
// ✅ Après (robuste, fonctionne partout)
const CosmicSpaceBackground = dynamic(
  () =>
    import("@/components/CosmicSpaceBackground").then(
      (mod) => mod.CosmicSpaceBackground,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="pointer-events-none fixed inset-0 z-0 bg-[#08090f]" />
    ),
  },
);

export function PortfolioApp() {
  const { theme, activeBg } = useTheme();
  const { profile } = useModal(); // ✅ Le profil vient du contexte global

  return (
    <div
      style={{ backgroundColor: activeBg }}
      className={`min-h-screen ${
        theme === "dark" ? "dark text-[#eceef4]" : "light text-[#0f172a]"
      } font-sans antialiased selection:bg-amber-400 selection:text-black relative transition-colors duration-300`}
    >
      {/* Fond cosmique animé */}
      <CosmicSpaceBackground />

      {/* Header — plus aucune prop de callback */}
      <Header profile={profile} />

      <main className="relative z-10">
        {/* Hero — plus aucune prop de callback */}
        <Hero profile={profile} />

        <TechMarquee />

        {/* Projets — plus aucune prop */}
        <ProjectsSection />

        {/* Conversion Hub */}
        <ConversionHub />

        {/* Défi développeur */}
        <DevChallenge />

        {/* Services */}
        <ServicesSection />

        {/* Timeline */}
        <ExperienceTimeline />

        {/* Contact & RDV */}
        <BookingContactSection profile={profile} />
      </main>

      <Footer profile={profile} />

      {/* Floating Dock — plus aucune prop */}
      <FloatingDock />

      {/* ✅ Toutes les modales sont rendues par ModalProvider */}
    </div>
  );
}
