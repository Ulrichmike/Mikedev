import Image from "next/image";

interface FrameProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  preload?: boolean;
}

/**
 * Fenêtre de navigateur sombre autour d'une capture desktop.
 * Avec `full` (capture pleine page), le site défile dans la fenêtre au survol.
 */
export function BrowserFrame({
  src,
  alt,
  url,
  full,
  className = "",
  sizes = "(max-width: 768px) 100vw, 60vw",
  preload,
}: FrameProps & { url?: string; full?: { src: string; width: number; height: number } }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-[#16161a] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        {url && (
          <span className="mx-auto max-w-[60%] truncate rounded-md bg-white/[0.05] px-3 py-0.5 font-mono text-[10px] text-zinc-400">
            {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
        )}
      </div>
      <div className="scroll-shot-host relative aspect-[16/10] overflow-hidden">
        {full ? (
          <Image
            src={full.src}
            alt={alt}
            width={full.width}
            height={full.height}
            sizes={sizes}
            preload={preload}
            className="scroll-shot"
          />
        ) : (
          <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover object-top" />
        )}
      </div>
    </div>
  );
}

/** Téléphone autour d'une capture mobile. */
export function PhoneFrame({ src, alt, className = "", sizes = "240px", preload }: FrameProps) {
  return (
    <div
      className={`rounded-[2.2rem] border border-white/15 bg-[#0d0d10] p-[7px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.75rem] bg-black">
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover object-top" />
        <span className="absolute left-1/2 top-2 h-[18px] w-[34%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}
