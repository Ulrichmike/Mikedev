"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Check, SlidersHorizontal, RotateCcw } from "lucide-react";

import { initialProfile } from "@/data/portfolioData";
import type { UserProfile } from "@/types";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (newProfile: UserProfile) => void;
}

export function ProfileModal({
  isOpen,
  onClose,
  profile,
  onSave,
}: ProfileModalProps) {
  const [formData, setFormData] = useState<UserProfile>({ ...profile });
  const firstInputRef = useRef<HTMLInputElement>(null);

  // ✅ Resynchronise le formulaire à chaque ouverture
  useEffect(() => {
    if (isOpen) {
      setFormData({ ...profile });
      const t = setTimeout(() => firstInputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    setFormData({ ...initialProfile });
  };

  const handleBackdropClick = () => {
    onClose();
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Personnalisation du profil"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-black/10 dark:border-white/15 bg-white dark:bg-[#12141d] p-6 sm:p-8 shadow-2xl text-left text-zinc-900 dark:text-zinc-100"
      >
        {/* Bouton fermeture */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la fenêtre"
          className="absolute top-5 right-5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Titre */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <SlidersHorizontal className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              Personnaliser votre Portfolio
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Modifiez vos informations en direct (sauvegardé dans votre
              navigateur).
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-1">
                Votre Nom
              </label>
              <input
                ref={firstInputRef}
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-xl border border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/5 px-3 py-2 text-sm text-zinc-900 dark:text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-1">
                Titre / Rôle
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full rounded-xl border border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/5 px-3 py-2 text-sm text-zinc-900 dark:text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-1">
              Spécialité / Tagline
            </label>
            <input
              type="text"
              value={formData.specialty}
              onChange={(e) =>
                setFormData({ ...formData, specialty: e.target.value })
              }
              className="w-full rounded-xl border border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/5 px-3 py-2 text-sm text-zinc-900 dark:text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-1">
              Email de contact
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded-xl border border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/5 px-3 py-2 text-sm text-zinc-900 dark:text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-1">
              Photo de portrait (URL ou image statique)
            </label>
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-black/15 dark:border-white/15 bg-zinc-900">
                <Image
                  src={formData.avatarUrl || "/assets/portrait.jfif"}
                  alt="Aperçu du portrait"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                  unoptimized={!formData.avatarUrl?.startsWith("http")}
                />
              </div>
              <input
                type="text"
                placeholder="/assets/portrait.jfif ou https://..."
                value={formData.avatarUrl || ""}
                onChange={(e) =>
                  setFormData({ ...formData, avatarUrl: e.target.value })
                }
                className="w-full rounded-xl border border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/5 px-3 py-2 text-sm text-zinc-900 dark:text-white focus:border-amber-400 focus:outline-none font-mono text-xs"
              />
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    avatarUrl: "/assets/portrait.jfif",
                  })
                }
                className="whitespace-nowrap rounded-xl border border-black/10 dark:border-white/10 px-3 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5"
              >
                Par défaut
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-1">
              Bio / Présentation
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full rounded-xl border border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/5 p-3 text-sm text-zinc-900 dark:text-white focus:border-amber-400 focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-1">
                Lien GitHub
              </label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) =>
                  setFormData({ ...formData, github: e.target.value })
                }
                className="w-full rounded-xl border border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/5 px-3 py-2 text-sm text-zinc-900 dark:text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-1">
                Lien LinkedIn
              </label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) =>
                  setFormData({ ...formData, linkedin: e.target.value })
                }
                className="w-full rounded-xl border border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/5 px-3 py-2 text-sm text-zinc-900 dark:text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Toggle disponibilité */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="available-check"
              checked={formData.available}
              onChange={(e) =>
                setFormData({ ...formData, available: e.target.checked })
              }
              className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-amber-500 focus:ring-amber-400"
            />
            <label
              htmlFor="available-check"
              className="text-xs text-zinc-700 dark:text-zinc-300"
            >
              Afficher le badge{" "}
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                🟢 Disponible pour des missions
              </span>
            </label>
          </div>

          {/* Boutons */}
          <div className="pt-4 flex items-center justify-between border-t border-black/10 dark:border-white/10">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Valeurs par défaut</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-black/10 dark:border-white/10 px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-5 py-2 text-xs font-bold text-black hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Enregistrer</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
