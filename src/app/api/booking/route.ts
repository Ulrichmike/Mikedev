// src/app/api/booking/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "mikeweda10@gmail.com";
// À remplacer par une adresse de ton domaine vérifié sur Resend
const FROM_EMAIL = "Portfolio <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MEETING_LABELS: Record<string, string> = {
  coffee: "Café virtuel (15 min)",
  scoping: "Cadrage de projet (30 min)",
  audit: "Audit & code review (45 min)",
};

const clean = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  // Honeypot anti-spam : champ invisible rempli uniquement par les bots
  if (clean(body.website)) {
    return NextResponse.json({ success: true });
  }

  const type = body.type === "message" ? "message" : "booking";
  const name = clean(body.name, 120);
  const email = clean(body.email, 200);

  if (!name || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Nom ou email invalide" },
      { status: 400 },
    );
  }

  let subject: string;
  let text: string;

  if (type === "booking") {
    const date = clean(body.date, 80);
    const slot = clean(body.slot, 10);
    const meeting = MEETING_LABELS[clean(body.meetingType, 20)] ?? "Visio";
    if (!date || !slot) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }
    subject = `Demande de RDV — ${name} · ${meeting}`;
    text = [
      `Nom : ${name}`,
      `Email : ${email}`,
      `Type : ${meeting}`,
      `Créneau souhaité : ${date} à ${slot} (heure de Douala)`,
      `Notes : ${clean(body.notes) || "Aucune"}`,
    ].join("\n");
  } else {
    const message = clean(body.message, 5000);
    if (!message) {
      return NextResponse.json({ error: "Message vide" }, { status: 400 });
    }
    subject = `Nouveau brief projet — ${name}`;
    text = [
      `Nom / entreprise : ${name}`,
      `Email : ${email}`,
      `Type de projet : ${clean(body.projectType, 40) || "Non précisé"}`,
      "",
      message,
    ].join("\n");
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[api/booking] RESEND_API_KEY manquante");
    return NextResponse.json(
      { error: "Service d'envoi non configuré" },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      text,
    });
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/booking] Erreur envoi email:", err);
    return NextResponse.json({ error: "Échec de l'envoi" }, { status: 500 });
  }
}
