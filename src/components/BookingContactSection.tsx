"use client";

import React, { useState } from "react";
import {
  Calendar,
  Coffee,
  Rocket,
  Check,
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Sparkles,
  Download,
  ShieldCheck,
  PhoneCall,
} from "lucide-react";
import { motion } from "motion/react";

import type { UserProfile } from "@/types";

type MeetingTypeId = "coffee" | "scoping" | "audit";
type ActiveTab = "booking" | "message";

interface BookingContactSectionProps {
  profile: UserProfile;
}

export const BookingContactSection: React.FC<BookingContactSectionProps> = ({
  profile,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("booking");

  // Booking Flow States
  const [meetingType, setMeetingType] = useState<MeetingTypeId>("scoping");
  const [selectedDate, setSelectedDate] =
    useState<string>("Mardi 22 Septembre");
  const [selectedSlot, setSelectedSlot] = useState<string>("14:30");
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Message Form States
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactBudget, setContactBudget] = useState("2k-5k");
  const [contactMessage, setContactMessage] = useState("");
  const [messageSuccess, setMessageSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const meetingTypes: {
    id: MeetingTypeId;
    icon: React.ElementType;
    title: string;
    duration: string;
    description: string;
  }[] = [
    {
      id: "coffee",
      icon: Coffee,
      title: "Café Virtuel",
      duration: "15 min",
      description:
        "Faisons connaissance, échangeons sur vos idées ou posons les premières bases sans engagement.",
    },
    {
      id: "scoping",
      icon: Rocket,
      title: "Cadrage de Projet (Offert)",
      duration: "30 min",
      description:
        "Analyse détaillée de votre besoin : stack recommandée, faisabilité, budget estimatif et planning.",
    },
    {
      id: "audit",
      icon: Sparkles,
      title: "Audit & Code Review",
      duration: "45 min",
      description:
        "Revue de vos problèmes de performance, dette technique ou architecture sous le capot.",
    },
  ];

  const availableDates = [
    { label: "Lundi 21 Sept", value: "Lundi 21 Septembre" },
    { label: "Mardi 22 Sept", value: "Mardi 22 Septembre" },
    { label: "Jeudi 24 Sept", value: "Jeudi 24 Septembre" },
    { label: "Vendredi 25 Sept", value: "Vendredi 25 Septembre" },
  ];

  const availableSlots = ["10:00", "11:30", "14:30", "16:00", "17:30"];

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail) return;
    setBookingSuccess(true);
  };

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setMessageSuccess(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silencieux : clipboard peut échouer en contexte non sécurisé
    }
  };

  const generateICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mike Weda//Portfolio Rendez-Vous//FR
BEGIN:VEVENT
SUMMARY:Rendez-vous projet avec ${profile.name} (${meetingType})
DESCRIPTION:Rendez-vous projet planifié via le portfolio.
LOCATION:Google Meet (Lien généré)
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `rdv-${profile.name.toLowerCase().replace(/\s+/g, "-")}.ics`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 border-t border-black/5 dark:border-white/5 relative overflow-hidden transition-colors duration-300"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -bottom-40 right-1/4 -z-10 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
            <Calendar className="h-3.5 w-3.5" />
            <span>Passer à l'Action</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Donnons vie à votre{" "}
            <span className="font-serif italic font-normal text-amber-600 dark:text-amber-300">
              vision
            </span>
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            Choisissez le format qui vous convient : planifiez directement un
            échange en visio ou envoyez-moi votre cahier des charges par
            message.
          </p>
        </div>

        {/* Tab switchers: Visio / Message direct */}
        <div className="mt-8 flex justify-center">
          <div className="flex rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-1.5 backdrop-blur-md shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab("booking")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${
                activeTab === "booking"
                  ? "bg-amber-400 text-black shadow-md shadow-amber-400/20"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>1. Réserver un créneau visio (Instantané)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("message")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${
                activeTab === "message"
                  ? "bg-amber-400 text-black shadow-md shadow-amber-400/20"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>2. Formulaire de brief écrit</span>
            </button>
          </div>
        </div>

        {/* ================= OPTION 1: VISIO BOOKING FLOW ================= */}
        {activeTab === "booking" && (
          <div className="mt-8 rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#10131d] p-6 sm:p-10 backdrop-blur-md shadow-xl transition-all dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
            {!bookingSuccess ? (
              <form onSubmit={handleBookingSubmit} className="space-y-8">
                {/* Step 1: Meeting Type */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold mb-3">
                    Étape 1 · Choisissez l'objectif de la visio
                  </label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {meetingTypes.map((type) => {
                      const Icon = type.icon;
                      const isSelected = meetingType === type.id;
                      return (
                        <button
                          type="button"
                          key={type.id}
                          onClick={() => setMeetingType(type.id)}
                          className={`relative text-left cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all ${
                            isSelected
                              ? "border-amber-400/60 bg-amber-400/10 ring-1 ring-amber-400/40 shadow-md"
                              : "border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-black/20 dark:hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-white/10 border border-black/5 dark:border-white/10 text-amber-600 dark:text-amber-400 shadow-sm">
                              <Icon className="h-5 w-5" />
                            </div>
                            <span className="rounded-full bg-black/5 dark:bg-white/10 px-2 py-0.5 font-mono text-[10px] text-zinc-600 dark:text-zinc-300">
                              {type.duration}
                            </span>
                          </div>

                          <h3 className="mt-4 font-bold text-zinc-900 dark:text-white text-sm">
                            {type.title}
                          </h3>
                          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {type.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Date & Time slot */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold mb-3">
                      Étape 2 · Date disponible
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableDates.map((d) => (
                        <button
                          type="button"
                          key={d.value}
                          onClick={() => setSelectedDate(d.value)}
                          className={`rounded-xl border p-3 text-left text-xs transition-all ${
                            selectedDate === d.value
                              ? "border-amber-400 bg-amber-400/15 text-zinc-900 dark:text-white font-bold ring-1 ring-amber-400/30"
                              : "border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold mb-3">
                      Étape 3 · Créneau horaire (Fuseau Paris UTC+1)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`rounded-xl border p-3 text-center text-xs font-mono transition-all ${
                            selectedSlot === slot
                              ? "border-amber-400 bg-amber-400/15 text-zinc-900 dark:text-white font-bold ring-1 ring-amber-400/30"
                              : "border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 3: Contact info */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold mb-3">
                    Étape 4 · Vos coordonnées pour la visio
                  </label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Votre nom ou prénom *"
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#151722] px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Votre adresse email professionnelle *"
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#151722] px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <textarea
                      rows={2}
                      placeholder="Quelques mots sur votre projet, URL actuelle ou vos objectifs (optionnel)..."
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#151722] p-4 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:border-amber-400 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Trust guarantee and confirmation */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-black/10 dark:border-white/10 pt-6">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>
                      Échange confidentiel &amp; sans aucun engagement
                      commercial.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-3 text-sm font-bold text-black hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/25 active:scale-95"
                  >
                    <Check className="h-4 w-4" />
                    <span>Confirmer mon Rendez-Vous Visio</span>
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-4"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Rendez-Vous Confirmé avec Succès !
                </h3>
                <p className="max-w-md mx-auto text-sm text-zinc-600 dark:text-zinc-300">
                  Merci{" "}
                  <strong className="text-zinc-900 dark:text-white">
                    {bookingName}
                  </strong>
                  . Notre rendez-vous est calé le{" "}
                  <strong className="text-amber-600 dark:text-amber-400">
                    {selectedDate} à {selectedSlot}
                  </strong>
                  .
                </p>
                <p className="text-xs text-zinc-500">
                  Une invitation avec lien Google Meet vous a été simulée à
                  l'adresse <strong>{bookingEmail}</strong>.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={generateICS}
                    className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-xs font-bold text-black hover:bg-amber-300 shadow-md"
                  >
                    <Download className="h-4 w-4" />
                    <span>Télécharger l'événement Calendrier (.ics)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setBookingSuccess(false);
                      setBookingName("");
                      setBookingEmail("");
                    }}
                    className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                  >
                    Programmer un autre rendez-vous
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* ================= OPTION 2: DETAILED BRIEF FORM ================= */}
        {activeTab === "message" && (
          <div className="mt-8 rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#10131d] p-6 sm:p-10 backdrop-blur-md shadow-xl transition-all dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
            {!messageSuccess ? (
              <form onSubmit={handleMessageSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold mb-2">
                      Nom complet / Entreprise *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alexandre · NovaMetrics"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#151722] px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold mb-2">
                      Email professionnel *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alexandre@novametrics.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#151722] px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold mb-2">
                    Enveloppe budgétaire estimée
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "1k-3k", label: "1 000 — 3 000 €" },
                      { id: "3k-6k", label: "3 000 — 6 000 €" },
                      { id: "6k-15k", label: "6 000 — 15 000 €" },
                      { id: "tjm", label: "Régie / TJM (650€)" },
                    ].map((b) => (
                      <button
                        type="button"
                        key={b.id}
                        onClick={() => setContactBudget(b.id)}
                        className={`rounded-xl border p-2.5 text-center text-xs font-mono transition-all ${
                          contactBudget === b.id
                            ? "border-amber-400 bg-amber-400/15 text-zinc-900 dark:text-white font-bold ring-1 ring-amber-400/30"
                            : "border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold mb-2">
                    Détails du projet / Problématiques techniques *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Décrivez votre besoin : refonte Next.js, développement de MVP, audit de performance, API..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#151722] p-4 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:border-amber-400 focus:outline-none resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-black/10 dark:border-white/10 pt-4">
                  <div className="text-xs text-zinc-500">
                    ⚡ Réponse garantie sous 24h ouvrées avec un premier avis
                    technique.
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-3 text-sm font-bold text-black hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/25 active:scale-95"
                  >
                    <Send className="h-4 w-4" />
                    <span>Envoyer ma demande de projet</span>
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-4"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Message Envoyé avec Succès !
                </h3>
                <p className="max-w-md mx-auto text-sm text-zinc-600 dark:text-zinc-300">
                  Merci{" "}
                  <strong className="text-zinc-900 dark:text-white">
                    {contactName}
                  </strong>{" "}
                  pour votre message. Je vous réponds personnellement dans un
                  délai maximum de 24h.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMessageSuccess(false);
                    setContactName("");
                    setContactEmail("");
                    setContactMessage("");
                  }}
                  className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                >
                  Envoyer un autre message
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* Quick connect cards below */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] p-5 backdrop-blur-sm shadow-sm flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono uppercase text-zinc-500 font-bold">
                Email Direct
              </div>
              <div className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white mt-0.5">
                {profile.email}
              </div>
            </div>
            <button
              type="button"
              onClick={copyEmail}
              className="p-2 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-zinc-600 dark:text-zinc-300"
              title="Copier l'email"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] p-5 backdrop-blur-sm shadow-sm flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <PhoneCall className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase text-zinc-500 font-bold">
                Disponibilité
              </div>
              <div className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white mt-0.5">
                Sous 7 jours · Remote ou Paris
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] p-5 backdrop-blur-sm shadow-sm flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase text-zinc-500 font-bold">
                Sécurité &amp; Confidentialité
              </div>
              <div className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white mt-0.5">
                NDA sur simple demande
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
