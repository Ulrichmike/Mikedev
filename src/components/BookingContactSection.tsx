"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check, Copy, Mail, MessageCircle } from "lucide-react";

import { startSteps } from "@/data/portfolioData";
import { Reveal, EASE } from "@/components/ui/Reveal";
import { LocalTime } from "@/components/ui/LocalTime";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import type { UserProfile } from "@/types";

type Status = "idle" | "sending" | "success" | "error";

const PROJECT_TYPES = ["SaaS", "App web", "E-commerce", "Site vitrine", "Autre"];
const CONTACT_PREFS = ["Appel visio (30 min)", "Email", "WhatsApp"];

const field =
  "w-full rounded-xl border border-line bg-canvas/60 px-4 py-3 text-[15px] text-ink placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none";

/** Conversion finale : comment on démarre, canaux directs, formulaire court. */
export function BookingContactSection({ profile }: { profile: UserProfile }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [pref, setPref] = useState(CONTACT_PREFS[0]);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "message",
          name,
          email,
          projectType,
          message: `Préférence de contact : ${pref}\n\n${message}`,
          website,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // presse-papier indisponible
    }
  };

  const chip = (active: boolean) =>
    `rounded-lg border px-3.5 py-1.5 text-sm transition-colors ${
      active ? "border-accent bg-accent/15 text-ink" : "border-line text-muted hover:text-ink"
    }`;

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-line bg-surface">
          {/* Halo */}
          <div
            aria-hidden="true"
            className="animate-glow pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent-color)_28%,transparent),transparent)] blur-2xl"
          />

          <div className="relative grid grid-cols-1 gap-10 p-6 md:p-12 lg:grid-cols-[1fr_1.1fr]">
            {/* Gauche */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas/50 px-3 py-1 text-xs font-medium text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Contact
              </span>
              <h2 className="text-shine mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
                Commençons par 30 minutes.
              </h2>
              <p className="mt-4 text-lg text-muted">
                Parlez-moi du problème que vous voulez résoudre. Pas besoin d&apos;un cahier des charges.
              </p>

              <ol className="mt-8 space-y-4">
                {startSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 font-mono text-sm text-accent">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-semibold">{s.title}</span>
                      <span className="mt-0.5 block text-sm text-muted">{s.text}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-10 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-canvas/50 px-4 py-2.5 text-sm transition-colors hover:border-ink/30"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Mail className="h-4 w-4" />}
                  {copied ? "Email copié" : profile.email}
                  {!copied && <Copy className="h-3.5 w-3.5 text-muted" />}
                </button>
                {profile.whatsapp && (
                  <a
                    href={`https://wa.me/${profile.whatsapp}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                )}
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-canvas/50 transition-colors hover:border-ink/30"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-canvas/50 transition-colors hover:border-ink/30"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-4 text-sm text-muted">
                {profile.city}, {profile.country} — il est <LocalTime className="font-mono text-ink" /> ici.
              </p>
            </div>

            {/* Formulaire */}
            <div className="rounded-2xl border border-line bg-canvas/60 p-5 backdrop-blur md:p-7">
              <AnimatePresence mode="wait">
                {status !== "success" ? (
                  <motion.form key="form" onSubmit={submit} exit={{ opacity: 0, y: -10 }} className="space-y-5">
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="hidden"
                      name="website"
                    />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 block text-sm text-muted">Nom</span>
                        <input required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom ou entreprise" className={field} />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-sm text-muted">Email</span>
                        <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@entreprise.com" className={field} />
                      </label>
                    </div>

                    <fieldset>
                      <legend className="mb-2 text-sm text-muted">Type de projet</legend>
                      <div className="flex flex-wrap gap-2">
                        {PROJECT_TYPES.map((t) => (
                          <button key={t} type="button" aria-pressed={projectType === t} onClick={() => setProjectType(t)} className={chip(projectType === t)}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <label className="block">
                      <span className="mb-1.5 block text-sm text-muted">Le projet</span>
                      <textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Le contexte, le problème, ce qui existe déjà…" className={`${field} resize-none`} />
                    </label>

                    <fieldset>
                      <legend className="mb-2 text-sm text-muted">Je préfère être recontacté par</legend>
                      <div className="flex flex-wrap gap-2">
                        {CONTACT_PREFS.map((p) => (
                          <button key={p} type="button" aria-pressed={pref === p} onClick={() => setPref(p)} className={chip(pref === p)}>
                            {p}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-[15px] font-semibold text-accent-fg shadow-[0_0_40px_-10px] shadow-accent/60 transition-transform hover:scale-[1.01] disabled:opacity-60"
                    >
                      {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    {status === "error" && (
                      <p className="text-sm text-red-400">
                        L&apos;envoi a échoué. Écrivez-moi directement à{" "}
                        <a href={`mailto:${profile.email}`} className="underline">
                          {profile.email}
                        </a>
                        .
                      </p>
                    )}
                  </motion.form>
                ) : (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="py-10 text-center"
                  >
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-400">
                      <Check className="h-7 w-7" />
                    </span>
                    <p className="mt-5 text-2xl font-semibold">Merci {name.split(" ")[0]} !</p>
                    <p className="mt-2 text-muted">
                      Message bien reçu. Je reviens vers vous par{" "}
                      {pref.startsWith("Appel") ? "email pour fixer l'appel" : pref.toLowerCase()}.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
