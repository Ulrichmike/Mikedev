import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";

import { ThemeProvider } from "@/context/ThemeContext";

import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import Script from "next/script";

/* ============================================================
 * CHARGEMENT DES POLICES (auto-hébergées, 0 requête Google)
 * ============================================================ */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

/* ============================================================
 * MÉTADONNÉES
 * ============================================================ */
export const metadata: Metadata = {
  title: "Mike Weda · Portfolio Full-Stack",
  description:
    "Développeur Full-Stack & Tech Creator. Architectures web robustes, SaaS à fort impact, interfaces produit d'exception.",
  authors: [{ name: "Mike Weda" }],
  openGraph: {
    title: "Mike Weda · Portfolio Full-Stack",
    description: "Développeur Full-Stack & Tech Creator.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${jakarta.variable} ${instrument.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* ✅ next/script au lieu de <script> */}
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
      <body>
        <ThemeProvider>
          <ModalProvider>{children}</ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
