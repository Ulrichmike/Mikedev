"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

/* ============================================================
 * TYPES
 * ============================================================ */
interface Star {
  x: number;
  y: number;
  z: number; // 0.5 to 2.5 (profondeur)
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  hasSpikes?: boolean;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  dx: number;
  dy: number;
  opacity: number;
  maxOpacity: number;
  life: number;
  maxLife: number;
  color: string;
}

interface NebulaCloud {
  xRatio: number;
  yRatio: number;
  radiusRatio: number;
  baseHue: string;
  speed: number;
  angle: number;
  phase: number;
}

/* ============================================================
 * COMPOSANT
 * ============================================================ */
export function CosmicSpaceBackground() {
  const { theme, currentAccent, cosmicMode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; isInside: boolean }>({
    x: -1000,
    y: -1000,
    isInside: false,
  });

  const [fpsNominal] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // DPR plafonné à 1.5 pour garantir 60fps
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initStars();
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isInside = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isInside = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    /* ============================================================
     * INITIALISATION DES ÉTOILES
     * ============================================================ */
    let stars: Star[] = [];
    const densityDivider =
      cosmicMode === "deep-space"
        ? 4200
        : cosmicMode === "matrix"
          ? 7000
          : 5500;
    const starCount = Math.floor((width * height) / densityDivider);

    const initStars = () => {
      stars = [];
      const isDark = theme === "dark";
      for (let i = 0; i < starCount; i++) {
        const z = 0.5 + Math.random() * 2;
        const radius = (0.5 + Math.random() * 1.3) * (z > 1.8 ? 1.3 : 0.9);
        const spikeProbability = cosmicMode === "deep-space" ? 0.08 : 0.04;
        const hasSpikes = Math.random() < spikeProbability;

        const tintRand = Math.random();
        let starColor = isDark ? "#ffffff" : "#334155";
        if (isDark) {
          if (tintRand < 0.15) starColor = "#93c5fd";
          else if (tintRand < 0.25) starColor = "#fde68a";
          else if (tintRand < 0.3) starColor = "#fbcfe8";
        } else {
          if (tintRand < 0.2) starColor = "#0284c7";
          else if (tintRand < 0.3) starColor = "#d97706";
        }

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          radius,
          baseAlpha:
            (cosmicMode === "deep-space" ? 0.35 : 0.2) + Math.random() * 0.7,
          twinkleSpeed: 0.015 + Math.random() * 0.04,
          twinklePhase: Math.random() * Math.PI * 2,
          color: starColor,
          hasSpikes,
        });
      }
    };

    initStars();

    /* ============================================================
     * ÉTOILES FILANTES
     * ============================================================ */
    let shootingStars: ShootingStar[] = [];
    const cometIntervalBase =
      cosmicMode === "matrix"
        ? 1800
        : cosmicMode === "deep-space"
          ? 3500
          : 2800;
    let nextShootingStarTime = Date.now() + 1500;

    const spawnShootingStar = () => {
      const angle = (35 + (Math.random() * 20 - 10)) * (Math.PI / 180);
      const speedMultiplier = cosmicMode === "matrix" ? 1.4 : 1.0;
      const speed = (12 + Math.random() * 10) * speedMultiplier;
      const length = 90 + Math.random() * 140;
      const maxLife = 50 + Math.random() * 35;
      const startX = Math.random() * (width * 1.2) - width * 0.1;
      const startY = Math.random() * (height * 0.45);

      shootingStars.push({
        x: startX,
        y: startY,
        length,
        speed,
        angle,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        opacity: 0,
        maxOpacity: 0.7 + Math.random() * 0.3,
        life: 0,
        maxLife,
        color: currentAccent.color || "#f59e0b",
      });

      nextShootingStarTime =
        Date.now() + cometIntervalBase + Math.random() * 3500;
    };

    /* ============================================================
     * NÉBULEUSES
     * ============================================================ */
    const nebulas: NebulaCloud[] = [
      {
        xRatio: 0.2,
        yRatio: 0.25,
        radiusRatio: 0.45,
        baseHue: "accent",
        speed: 0.0004,
        angle: 0,
        phase: 0,
      },
      {
        xRatio: 0.8,
        yRatio: 0.7,
        radiusRatio: 0.5,
        baseHue: "indigo",
        speed: 0.0003,
        angle: 2,
        phase: 1.5,
      },
      {
        xRatio: 0.5,
        yRatio: 0.9,
        radiusRatio: 0.4,
        baseHue: "purple",
        speed: 0.0005,
        angle: 4,
        phase: 3,
      },
      {
        xRatio: 0.85,
        yRatio: 0.2,
        radiusRatio: 0.35,
        baseHue: "accent",
        speed: 0.00035,
        angle: 1,
        phase: 4.5,
      },
    ];

    let lastFrameTime = performance.now();

    /* ============================================================
     * BOUCLE DE RENDU
     * ============================================================ */
    const render = (time: number) => {
      const dt = Math.min((time - lastFrameTime) / 1000, 0.1);
      lastFrameTime = time;

      ctx.clearRect(0, 0, width, height);

      const isDark = theme === "dark";

      /* 1. Nébuleuses volumétriques */
      nebulas.forEach((nebula) => {
        nebula.angle += nebula.speed;
        const currentX =
          (nebula.xRatio + Math.cos(nebula.angle) * 0.04) * width;
        const currentY =
          (nebula.yRatio + Math.sin(nebula.angle) * 0.04) * height;
        const radius = nebula.radiusRatio * Math.max(width, height);

        const gradient = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          radius,
        );

        let glowColor = currentAccent.color;
        if (nebula.baseHue === "indigo")
          glowColor = isDark ? "#3b82f6" : "#60a5fa";
        if (nebula.baseHue === "purple")
          glowColor = isDark ? "#8b5cf6" : "#a78bfa";

        const maxAlpha = isDark ? 0.09 : 0.04;
        gradient.addColorStop(0, hexToRgba(glowColor, maxAlpha));
        gradient.addColorStop(0.5, hexToRgba(glowColor, maxAlpha * 0.3));
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      /* 2. Halo gravitationnel de la souris */
      if (mouseRef.current.isInside) {
        const mouseGrad = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          260,
        );
        const mouseAlpha = isDark ? 0.08 : 0.035;
        mouseGrad.addColorStop(0, hexToRgba(currentAccent.color, mouseAlpha));
        mouseGrad.addColorStop(
          0.6,
          hexToRgba(currentAccent.color, mouseAlpha * 0.2),
        );
        mouseGrad.addColorStop(1, "transparent");
        ctx.fillStyle = mouseGrad;
        ctx.fillRect(0, 0, width, height);
      }

      /* 3. Étoiles & constellations vers le curseur */
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const mouseDistThreshold =
        cosmicMode === "deep-space" ? 140 : cosmicMode === "matrix" ? 85 : 110;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Dérive cosmique lente
        star.y -= 0.08 * star.z;
        if (star.y < -10) {
          star.y = height + 10;
          star.x = Math.random() * width;
        }

        // Scintillement
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase);
        const alpha = Math.max(
          0.1,
          Math.min(1, star.baseAlpha + twinkle * 0.35),
        );

        // Lignes de constellation
        if (mouseRef.current.isInside) {
          const dx = mouseX - star.x;
          const dy = mouseY - star.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseDistThreshold) {
            const lineAlpha =
              (1 - dist / mouseDistThreshold) * (isDark ? 0.35 : 0.18);
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = hexToRgba(currentAccent.color, lineAlpha);
            ctx.lineWidth = 0.7;
            ctx.stroke();

            star.x += (dx / dist) * 0.2;
            star.y += (dy / dist) * 0.2;
          }
        }

        // Cœur de l'étoile
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(star.color, alpha);
        ctx.fill();

        // Aigrettes de diffraction
        if (star.hasSpikes && isDark && alpha > 0.6) {
          const spikeLength = star.radius * 6;
          ctx.beginPath();
          ctx.moveTo(star.x - spikeLength, star.y);
          ctx.lineTo(star.x + spikeLength, star.y);
          ctx.moveTo(star.x, star.y - spikeLength);
          ctx.lineTo(star.x, star.y + spikeLength);
          ctx.strokeStyle = hexToRgba("#ffffff", alpha * 0.45);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      /* 4. Étoiles filantes */
      if (Date.now() > nextShootingStarTime) {
        spawnShootingStar();
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.x += s.dx;
        s.y += s.dy;

        if (s.life < s.maxLife * 0.3) {
          s.opacity = (s.life / (s.maxLife * 0.3)) * s.maxOpacity;
        } else {
          s.opacity =
            (1 - (s.life - s.maxLife * 0.3) / (s.maxLife * 0.7)) * s.maxOpacity;
        }

        if (s.life >= s.maxLife || s.x > width + 100 || s.y > height + 100) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const meteorGrad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        meteorGrad.addColorStop(0, hexToRgba("#ffffff", s.opacity));
        meteorGrad.addColorStop(0.2, hexToRgba(s.color, s.opacity * 0.8));
        meteorGrad.addColorStop(0.7, hexToRgba(s.color, s.opacity * 0.2));
        meteorGrad.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba("#ffffff", s.opacity * 1.2);
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    /* ============================================================
     * PAUSE QUAND L'ONGLET EST INACTIF
     * ============================================================ */
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastFrameTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [theme, currentAccent, cosmicMode]);

  /* ============================================================
   * OPACITÉS DYNAMIQUES
   * ============================================================ */
  const gridOpacity =
    cosmicMode === "matrix"
      ? theme === "dark"
        ? "opacity-90"
        : "opacity-60"
      : cosmicMode === "deep-space"
        ? theme === "dark"
          ? "opacity-40"
          : "opacity-20"
        : theme === "dark"
          ? "opacity-70"
          : "opacity-35";

  const horizonOpacity =
    cosmicMode === "matrix"
      ? "opacity-50 dark:opacity-75"
      : cosmicMode === "deep-space"
        ? "opacity-15 dark:opacity-25"
        : "opacity-25 dark:opacity-45";

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* 1. Canvas galaxie & starfield */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-100 transition-opacity duration-700"
      />

      {/* 2. Grille matricielle cyber */}
      <div
        className={`absolute inset-0 bg-space-matrix transition-opacity duration-500 ${gridOpacity}`}
      />

      {/* 3. Vignette deep-space */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          theme === "dark"
            ? "bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,9,15,0.4)_65%,rgba(8,9,15,0.85)_100%)]"
            : "bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.3)_65%,rgba(255,255,255,0.8)_100%)]"
        }`}
      />

      {/* 4. Grille d'horizon en perspective */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-72 overflow-hidden pointer-events-none transition-opacity duration-500 ${horizonOpacity}`}
      >
        <div className="space-horizon-grid" />
      </div>

      {/* 5. HUD télémétrie (2xl+) */}
      <div className="hidden 2xl:flex items-center justify-between absolute bottom-4 left-6 right-6 font-mono text-[9.5px] text-zinc-600 dark:text-zinc-500 tracking-wider pointer-events-none opacity-60">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>SYS_STATUS: NOMINAL</span>
          <span className="text-zinc-400 dark:text-zinc-600">|</span>
          <span>ORBIT: PARIS (48.8566° N, 2.3522° E)</span>
        </div>

        <div className="flex items-center gap-3">
          <span>COSMIC_GRID: ACTIVE</span>
          <span className="text-zinc-400 dark:text-zinc-600">|</span>
          <span className="text-amber-500/80">WEBB ENGINE 60FPS</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
 * HELPER : hex → rgba
 * ============================================================ */
function hexToRgba(hex: string, alpha: number): string {
  if (!hex) return `rgba(255, 255, 255, ${alpha})`;
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c
      .split("")
      .map((char) => char + char)
      .join("");
  }
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
