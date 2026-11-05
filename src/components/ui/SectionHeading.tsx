import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  aside?: ReactNode;
  /** Conservé pour compatibilité, non affiché */
  index?: string;
}

/** En-tête de section : pastille, titre net, introduction courte. */
export function SectionHeading({ label, title, intro, align = "left", aside }: SectionHeadingProps) {
  const center = align === "center";
  return (
    <header
      className={`flex flex-col gap-6 ${
        center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <Reveal className={center ? "max-w-3xl" : "max-w-2xl"}>
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {label}
        </span>
        <h2 className="text-shine mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
      </Reveal>
      {aside && <Reveal delay={0.1}>{aside}</Reveal>}
    </header>
  );
}
