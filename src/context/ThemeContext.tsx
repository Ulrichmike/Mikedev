"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import type {
  ThemeMode,
  ThemeAccent,
  DarkBgTone,
  LightBgTone,
  CosmicMode,
} from "@/types";

export type Theme = ThemeMode;

export interface AccentConfig {
  id: ThemeAccent;
  name: string;
  color: string;
  glow: string;
  borderClass: string;
  bgClass: string;
  textClassDark: string;
  textClassLight: string;
  btnClass: string;
}

/* ============================================================
 * PALETTES D'ACCENT
 * ============================================================ */
export const ACCENT_PALETTES: Record<ThemeAccent, AccentConfig> = {
  amber: {
    id: "amber",
    name: "Or & Ambre",
    color: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.3)",
    borderClass: "border-amber-400/40",
    bgClass: "bg-amber-400",
    textClassDark: "text-amber-300",
    textClassLight: "text-amber-700",
    btnClass: "bg-amber-400 text-black hover:bg-amber-300 shadow-amber-400/25",
  },
  emerald: {
    id: "emerald",
    name: "Émeraude & Menthe",
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.3)",
    borderClass: "border-emerald-400/40",
    bgClass: "bg-emerald-400",
    textClassDark: "text-emerald-300",
    textClassLight: "text-emerald-700",
    btnClass:
      "bg-emerald-400 text-black hover:bg-emerald-300 shadow-emerald-400/25",
  },
  purple: {
    id: "purple",
    name: "Cyber Violet",
    color: "#a855f7",
    glow: "rgba(168, 85, 247, 0.3)",
    borderClass: "border-purple-400/40",
    bgClass: "bg-purple-400",
    textClassDark: "text-purple-300",
    textClassLight: "text-purple-700",
    btnClass:
      "bg-purple-400 text-white hover:bg-purple-300 shadow-purple-400/25",
  },
  blue: {
    id: "blue",
    name: "Azur Électrique",
    color: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.3)",
    borderClass: "border-blue-400/40",
    bgClass: "bg-blue-400",
    textClassDark: "text-blue-300",
    textClassLight: "text-blue-700",
    btnClass: "bg-blue-500 text-white hover:bg-blue-400 shadow-blue-500/25",
  },
  rose: {
    id: "rose",
    name: "Carmin Avant-Garde",
    color: "#f43f5e",
    glow: "rgba(244, 63, 94, 0.3)",
    borderClass: "border-rose-400/40",
    bgClass: "bg-rose-500",
    textClassDark: "text-rose-300",
    textClassLight: "text-rose-700",
    btnClass: "bg-rose-500 text-white hover:bg-rose-400 shadow-rose-500/25",
  },
};

/* ============================================================
 * TONS DE FOND
 * ============================================================ */
export const DARK_TONES: Record<
  DarkBgTone,
  { name: string; bg: string; card: string; desc: string }
> = {
  obsidian: {
    name: "Obsidienne Pure",
    bg: "#08090f",
    card: "#10121a",
    desc: "Contraste absolu, noir pur et sobre",
  },
  midnight: {
    name: "Bleu Minuit",
    bg: "#090e1c",
    card: "#11172a",
    desc: "Teinte indigo profonde & cosmique",
  },
  graphite: {
    name: "Charbon Graphite",
    bg: "#121318",
    card: "#1b1d25",
    desc: "Gris doux sans reflet agressif",
  },
};

export const LIGHT_TONES: Record<
  LightBgTone,
  { name: string; bg: string; card: string; desc: string }
> = {
  alabaster: {
    name: "Albâtre Lumineux",
    bg: "#fbfbfe",
    card: "#ffffff",
    desc: "Blanc pur & éclat architectural",
  },
  editorial: {
    name: "Crème Éditoriale",
    bg: "#faf7f2",
    card: "#ffffff",
    desc: "Luxe chaleureux, papier d'art",
  },
  slate: {
    name: "Ardoise Technique",
    bg: "#f1f4f9",
    card: "#ffffff",
    desc: "Gris technique studio SaaS",
  },
};

/* ============================================================
 * ✅ MODES COSMIQUES (arrière-plans spatiaux)
 * Requis par ThemeCustomizerModal et CosmicSpaceBackground
 * ============================================================ */
export const COSMIC_MODES: Record<CosmicMode, { name: string; desc: string }> =
  {
    galaxy: {
      name: "Galaxie & Nébuleuses",
      desc: "Champ d'étoiles scintillantes, nébuleuses colorées et étoiles filantes.",
    },
    matrix: {
      name: "Matrice Cyber",
      desc: "Grille numérique dense, étoiles rapides et ambiance cyberpunk.",
    },
    "deep-space": {
      name: "Espace Profond",
      desc: "Immensité cosmique, étoiles lentes et nébuleuses profondes.",
    },
  };

/* ============================================================
 * CONTEXT TYPE
 * ============================================================ */
interface ThemeContextType {
  theme: ThemeMode;
  accent: ThemeAccent;
  darkTone: DarkBgTone;
  lightTone: LightBgTone;
  cosmicMode: CosmicMode;
  currentAccent: AccentConfig;
  activeBg: string;
  activeCard: string;
  mounted: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  setAccent: (accent: ThemeAccent) => void;
  setDarkTone: (tone: DarkBgTone) => void;
  setLightTone: (tone: LightBgTone) => void;
  setCosmicMode: (mode: CosmicMode) => void;
  isThemeModalOpen: boolean;
  openThemeModal: () => void;
  closeThemeModal: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  playSound: (type?: "click" | "success" | "tab" | "switch") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/* ============================================================
 * VALEURS PAR DÉFAUT
 * ============================================================ */
const DEFAULT_THEME: ThemeMode = "dark";
const DEFAULT_ACCENT: ThemeAccent = "amber";
const DEFAULT_DARK_TONE: DarkBgTone = "obsidian";
const DEFAULT_LIGHT_TONE: LightBgTone = "alabaster";
const DEFAULT_COSMIC_MODE: CosmicMode = "galaxy";
const DEFAULT_SOUND = false;

/* ============================================================
 * PROVIDER
 * ============================================================ */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  const [theme, setThemeState] = useState<ThemeMode>(DEFAULT_THEME);
  const [accent, setAccentState] = useState<ThemeAccent>(DEFAULT_ACCENT);
  const [darkTone, setDarkToneState] = useState<DarkBgTone>(DEFAULT_DARK_TONE);
  const [lightTone, setLightToneState] =
    useState<LightBgTone>(DEFAULT_LIGHT_TONE);
  const [cosmicMode, setCosmicModeState] =
    useState<CosmicMode>(DEFAULT_COSMIC_MODE);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(DEFAULT_SOUND);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  /* ------------------------------------------------------------
   * 1. HYDRATATION DEPUIS localStorage
   * ------------------------------------------------------------ */
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(
        "mw_theme_mode",
      ) as ThemeMode | null;
      if (savedTheme === "light" || savedTheme === "dark") {
        setThemeState(savedTheme);
      }

      const savedAccent = localStorage.getItem(
        "mw_theme_accent",
      ) as ThemeAccent | null;
      if (savedAccent && ACCENT_PALETTES[savedAccent]) {
        setAccentState(savedAccent);
      }

      const savedDarkTone = localStorage.getItem(
        "mw_theme_dark_tone",
      ) as DarkBgTone | null;
      if (savedDarkTone && DARK_TONES[savedDarkTone]) {
        setDarkToneState(savedDarkTone);
      }

      const savedLightTone = localStorage.getItem(
        "mw_theme_light_tone",
      ) as LightBgTone | null;
      if (savedLightTone && LIGHT_TONES[savedLightTone]) {
        setLightToneState(savedLightTone);
      }

      const savedCosmic = localStorage.getItem(
        "mw_cosmic_mode",
      ) as CosmicMode | null;
      if (
        savedCosmic === "galaxy" ||
        savedCosmic === "matrix" ||
        savedCosmic === "deep-space"
      ) {
        setCosmicModeState(savedCosmic);
      }

      const savedSound = localStorage.getItem("mw_sound_enabled");
      if (savedSound !== null) {
        setSoundEnabled(savedSound === "true");
      }
    } catch (err) {
      console.warn("[ThemeProvider] localStorage access failed:", err);
    } finally {
      setMounted(true);
    }
  }, []);

  /* ------------------------------------------------------------
   * 2. APPLICATION AU DOM
   * ------------------------------------------------------------ */
  useEffect(() => {
    if (!mounted) return;

    try {
      localStorage.setItem("mw_theme_mode", theme);
      localStorage.setItem("mw_theme_accent", accent);
      localStorage.setItem("mw_theme_dark_tone", darkTone);
      localStorage.setItem("mw_theme_light_tone", lightTone);
      localStorage.setItem("mw_cosmic_mode", cosmicMode);

      const root = document.documentElement;

      if (theme === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
        root.setAttribute("data-theme", "dark");
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
        root.setAttribute("data-theme", "light");
      }

      root.setAttribute("data-accent", accent);
      root.setAttribute("data-tone", theme === "dark" ? darkTone : lightTone);
      root.setAttribute("data-cosmic", cosmicMode);

      // Identité figée : couleurs de marque définies dans globals.css
    } catch (err) {
      console.error("[ThemeProvider] Failed to apply theme:", err);
    }
  }, [mounted, theme, accent, darkTone, lightTone, cosmicMode]);

  /* ------------------------------------------------------------
   * 3. PERSISTANCE DU SON
   * ------------------------------------------------------------ */
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("mw_sound_enabled", String(soundEnabled));
    } catch {
      /* silencieux */
    }
  }, [mounted, soundEnabled]);

  /* ------------------------------------------------------------
   * 4. AUDIO (Web Audio API)
   * ------------------------------------------------------------ */
  const playSound = useCallback(
    (type: "click" | "success" | "tab" | "switch" = "click") => {
      if (!soundEnabled) return;
      if (typeof window === "undefined") return;

      const AudioCtor =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtor) return;

      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtor();
        }
        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === "click") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(600, now);
          osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          osc.start(now);
          osc.stop(now + 0.04);
        } else if (type === "tab") {
          osc.type = "triangle";
          osc.frequency.setValueAtTime(450, now);
          osc.frequency.exponentialRampToValueAtTime(580, now + 0.06);
          gain.gain.setValueAtTime(0.03, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
          osc.start(now);
          osc.stop(now + 0.06);
        } else if (type === "switch") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(350, now);
          osc.frequency.exponentialRampToValueAtTime(750, now + 0.08);
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          osc.start(now);
          osc.stop(now + 0.08);
        } else if (type === "success") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(523.25, now);
          osc.frequency.setValueAtTime(659.25, now + 0.07);
          osc.frequency.setValueAtTime(783.99, now + 0.14);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
          osc.start(now);
          osc.stop(now + 0.28);
        }
      } catch {
        /* Politique d'autoplay ou contexte bloqué */
      }
    },
    [soundEnabled],
  );

  /* ------------------------------------------------------------
   * 5. ACTIONS
   * ------------------------------------------------------------ */
  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const setTheme = useCallback((t: ThemeMode) => setThemeState(t), []);
  const setAccent = useCallback((a: ThemeAccent) => setAccentState(a), []);
  const setDarkTone = useCallback((dt: DarkBgTone) => setDarkToneState(dt), []);
  const setLightTone = useCallback(
    (lt: LightBgTone) => setLightToneState(lt),
    [],
  );
  const setCosmicMode = useCallback(
    (cm: CosmicMode) => setCosmicModeState(cm),
    [],
  );

  const toggleSound = useCallback(() => setSoundEnabled((prev) => !prev), []);
  const openThemeModal = useCallback(() => setIsThemeModalOpen(true), []);
  const closeThemeModal = useCallback(() => setIsThemeModalOpen(false), []);

  /* ------------------------------------------------------------
   * 6. VALEURS DÉRIVÉES
   * ------------------------------------------------------------ */
  const activeBg = useMemo(
    () =>
      theme === "dark" ? DARK_TONES[darkTone].bg : LIGHT_TONES[lightTone].bg,
    [theme, darkTone, lightTone],
  );

  const activeCard = useMemo(
    () =>
      theme === "dark"
        ? DARK_TONES[darkTone].card
        : LIGHT_TONES[lightTone].card,
    [theme, darkTone, lightTone],
  );

  const currentAccent = useMemo(() => ACCENT_PALETTES[accent], [accent]);

  const contextValue = useMemo<ThemeContextType>(
    () => ({
      theme,
      accent,
      darkTone,
      lightTone,
      cosmicMode,
      currentAccent,
      activeBg,
      activeCard,
      mounted,
      toggleTheme,
      setTheme,
      setAccent,
      setDarkTone,
      setLightTone,
      setCosmicMode,
      isThemeModalOpen,
      openThemeModal,
      closeThemeModal,
      soundEnabled,
      toggleSound,
      playSound,
    }),
    [
      theme,
      accent,
      darkTone,
      lightTone,
      cosmicMode,
      currentAccent,
      activeBg,
      activeCard,
      mounted,
      toggleTheme,
      setTheme,
      setAccent,
      setDarkTone,
      setLightTone,
      setCosmicMode,
      isThemeModalOpen,
      openThemeModal,
      closeThemeModal,
      soundEnabled,
      toggleSound,
      playSound,
    ],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ============================================================
 * HOOK
 * ============================================================ */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
