import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import { ThemeProvider } from "@/context/ThemeContext";
import { ModalProvider } from "@/context/ModalContext";

import "./globals.css";

/* ============================================================
 * CHARGEMENT DES POLICES (auto-hébergées, 0 requête Google)
 * ============================================================ */
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

/* ============================================================
 * MÉTADONNÉES
 * ============================================================ */
export const metadata: Metadata = {
  // Définir NEXT_PUBLIC_SITE_URL en production (ex. https://mikeweda.dev)
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Mike Weda · Digital Product Builder",
    template: "%s · Mike Weda",
  },
  description:
    "I design, engineer and build digital products that solve real-world problems. Product engineering, SaaS et développement full-stack depuis Douala, Cameroun.",
  keywords: [
    "Digital Product Builder",
    "Product Engineering",
    "Développeur Full-Stack",
    "SaaS",
    "Next.js",
    "React",
    "Douala",
    "Cameroun",
  ],
  authors: [{ name: "Mike Weda" }],
  creator: "Mike Weda",
  openGraph: {
    title: "Mike Weda · Digital Product Builder",
    description:
      "I design, engineer and build digital products that solve real-world problems.",
    type: "website",
    locale: "fr_FR",
    images: [{ url: "/assets/portrait.jpg", alt: "Portrait de Mike Weda" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mike Weda · Digital Product Builder",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('mw_theme_mode') || 'dark';
                  var accent = localStorage.getItem('mw_theme_accent') || 'amber';
                  var tone = mode === 'dark'
                    ? (localStorage.getItem('mw_theme_dark_tone') || 'obsidian')
                    : (localStorage.getItem('mw_theme_light_tone') || 'alabaster');
                  var cosmic = localStorage.getItem('mw_cosmic_mode') || 'galaxy';
                  var root = document.documentElement;
                  root.classList.add(mode);
                  root.setAttribute('data-theme', mode);
                  root.setAttribute('data-accent', accent);
                  root.setAttribute('data-tone', tone);
                  root.setAttribute('data-cosmic', cosmic);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-noise">
        <ThemeProvider>
          <ModalProvider>{children}</ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
