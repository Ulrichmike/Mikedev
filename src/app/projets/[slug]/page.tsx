import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/SiteShell";
import { CaseStudyView } from "@/components/case-study/CaseStudyView";
import { getNextProject, getProject, projectsData } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.name} — ${project.positioning}`;
  return {
    title,
    description: project.summary,
    keywords: project.tags,
    alternates: { canonical: `/projets/${project.slug}` },
    openGraph: {
      title,
      description: project.summary,
      type: "article",
      images: project.heroVisual ? [{ url: project.heroVisual, alt: title }] : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <SiteShell>
      <CaseStudyView project={project} next={getNextProject(slug)} />
    </SiteShell>
  );
}
