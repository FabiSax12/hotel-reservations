/**
 * @file useMediaQuery.ts — Subscribes to a CSS media query.
 *
 * SSR-safe: returns `false` on the server and the first client render, then
 * syncs to the real match after mount. Used to gate behaviour that should only
 * apply at certain breakpoints (e.g. mobile-only scroll lock for the detail panel).
 */

"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handleChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
