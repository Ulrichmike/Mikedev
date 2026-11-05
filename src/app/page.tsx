import { SiteShell } from "@/components/SiteShell";
import { Hero } from "@/components/Hero";
import { ProblemsSection } from "@/components/ProblemsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ApproachSection } from "@/components/ApproachSection";
import { ExpertiseSection } from "@/components/ExpertiseSection";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { BookingContactSection } from "@/components/BookingContactSection";
import { initialProfile } from "@/data/portfolioData";

/*
 * Récit de la page :
 * qui je suis + mes produits (Hero) → pourquoi (Problèmes) →
 * la preuve (Projets) → ce que je fais pour vous (Services) →
 * comment (Méthode, Stack) → qui (À propos) → on démarre (Contact).
 */
export default function HomePage() {
  const p = initialProfile;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.title,
    description: p.tagline,
    email: `mailto:${p.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: p.city,
      addressCountry: "CM",
    },
    sameAs: [p.github, p.linkedin, p.twitter].filter(Boolean),
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero profile={p} />
      <ProblemsSection />
      <ProjectsSection />
      <ServicesSection />
      <ApproachSection />
      <ExpertiseSection />
      <AboutSection />
      <TestimonialsSection />
      <BookingContactSection profile={p} />
    </SiteShell>
  );
}
