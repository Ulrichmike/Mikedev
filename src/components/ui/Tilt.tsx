"use client";

import type { ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

/** Inclinaison 3D douce qui suit le curseur, avec un reflet de lumière. */
export function Tilt({
  children,
  className = "",
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const cfg = { stiffness: 160, damping: 18, mass: 0.5 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), cfg);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), cfg);
  const glare = useTransform(
    [px, py],
    ([x, y]) =>
      `radial-gradient(600px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(255,255,255,0.12), transparent 50%)`,
  );

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div className={`[perspective:1400px] ${className}`}>
      <motion.div
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onMouseLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {children}
        <motion.div
          aria-hidden="true"
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 [div:hover>&]:opacity-100"
        />
      </motion.div>
    </div>
  );
}
