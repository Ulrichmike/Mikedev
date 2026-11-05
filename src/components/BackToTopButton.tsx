// src/components/BackToTopButton.tsx
"use client";

export function BackToTopButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group text-sm"
    >
      <span className="link-draw">Retour en haut</span> ↑
    </button>
  );
}
