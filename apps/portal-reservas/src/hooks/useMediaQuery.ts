/**
 * @file useMediaQuery.ts — Subscribes to a CSS media query.
 *
 * SSR-safe: returns `false` on the server and the first client render, then
 * syncs to the real match after mount. Used to gate behaviour that should only
 * apply at certain breakpoints (e.g. mobile-only scroll lock for the detail panel).
 */

"use client";

import { useEffect, useState } from "react";
import { DOM_EVENTS } from "@/constants/dom-events.constants";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handleChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener(DOM_EVENTS.CHANGE, handleChange);
    return () => mql.removeEventListener(DOM_EVENTS.CHANGE, handleChange);
  }, [query]);

  return matches;
}
