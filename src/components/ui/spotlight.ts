import type { MouseEvent } from "react";

/** À brancher sur `onMouseMove` d'un élément `.spot` : place le halo sous le curseur. */
export function trackSpot(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}
