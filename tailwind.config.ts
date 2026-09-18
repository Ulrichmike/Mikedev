// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/components/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/context/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/data/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ============================================================
       * COULEURS (système de tokens CSS variables)
       * ============================================================ */
      colors: {
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-2": "rgb(var(--color-surface-2) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        "text-2": "rgb(var(--color-text-2) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-hover": "rgb(var(--color-accent-hover) / <alpha-value>)",
      },

      /* ============================================================
       * TYPOGRAPHIE
       * ============================================================ */
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.4" }],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.25rem", { lineHeight: "1.5" }],
        xl: ["1.5rem", { lineHeight: "1.4" }],
        "2xl": ["2rem", { lineHeight: "1.3" }],
        "3xl": ["3rem", { lineHeight: "1.15" }],
        "4xl": ["4rem", { lineHeight: "1.05" }],
        "5xl": ["5.5rem", { lineHeight: "1" }],
      },

      /* ============================================================
       * ESPACEMENTS & LARGEURS
       * ============================================================ */
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      maxWidth: {
        content: "720px",
        container: "1440px",
      },

      /* ============================================================
       * BORDURES & TRANSITIONS
       * ============================================================ */
      borderRadius: {
        sm: "4px",
        md: "12px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },

      /* ============================================================
       * KEYFRAMES (animations custom)
       * ============================================================ */
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      /* ============================================================
       * ANIMATIONS (référencent les keyframes ci-dessus)
       * ============================================================ */
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
