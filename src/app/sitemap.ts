import type { MetadataRoute } from "next";
import { projectsData } from "@/data/projects";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...projectsData.map((p) => ({
      url: `${SITE_URL}/projets/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: p.tier === "signature" ? 0.9 : 0.7,
    })),
  ];
}
