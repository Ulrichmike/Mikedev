"use client";

import { useSyncExternalStore } from "react";
import { initialProfile } from "@/data/portfolioData";

const formatter = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: initialProfile.timezone,
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 10_000);
  return () => clearInterval(id);
}

const getSnapshot = () => formatter.format(new Date());
const getServerSnapshot = () => null;

/** Heure locale du studio (fuseau défini dans le profil), mise à jour en continu. */
export function LocalTime({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span className={className} suppressHydrationWarning>
      {time ?? "--:--"}
    </span>
  );
}
