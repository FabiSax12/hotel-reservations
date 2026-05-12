/**
 * @file useSearchBarState.ts — Hook for managing the overall state and interactions of the search bar.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { SEARCH_SECTIONS, SEARCH_VARIANTS } from "../constants/search.constants";
import type { ActiveSection, SearchBarVariant } from "../domain/types";

export function useSearchBarState(size: SearchBarVariant, onHeroCalendarOpen?: () => void) {
  const [active, setActive] = useState<ActiveSection>(null);
  const [hasHeroTitleDismissed, setHasHeroTitleDismissed] = useState(false);
  const [hasHeroCalendarOpened, setHasHeroCalendarOpened] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const lastUserActivatedSection = useRef<ActiveSection | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isHero = size === SEARCH_VARIANTS.HERO;

  // Sync hero state based on active section
  useEffect(() => {
    if (isHero && active && !hasHeroTitleDismissed) {
      setHasHeroTitleDismissed(true);
    }

    if (
      isHero &&
      (active === SEARCH_SECTIONS.CHECK_IN || active === SEARCH_SECTIONS.CHECK_OUT) &&
      !hasHeroCalendarOpened
    ) {
      setHasHeroCalendarOpened(true);
      if (onHeroCalendarOpen) onHeroCalendarOpen();
    }
  }, [active, isHero, hasHeroCalendarOpened, hasHeroTitleDismissed, onHeroCalendarOpen]);

  // Global ESC key listener
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Click outside listener
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActive(null);
      }
    };
    if (active) window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [active]);

  const activateSection = useCallback((section: ActiveSection, onClearError?: () => void) => {
    if (onClearError) onClearError();
    setActive(section);
    lastUserActivatedSection.current = section;
  }, []);

  return {
    active,
    setActive,
    hasHeroTitleDismissed,
    setHasHeroTitleDismissed,
    hasHeroCalendarOpened,
    setHasHeroCalendarOpened,
    isSearching,
    setIsSearching,
    lastUserActivatedSection,
    containerRef,
    activateSection,
    isHero,
  };
}
