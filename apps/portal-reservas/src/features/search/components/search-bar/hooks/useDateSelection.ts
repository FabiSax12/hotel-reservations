/**
 * @file useDateSelection.ts — Hook for managing date selection state.
 *
 * Delegates the core pick logic to `resolveDatePick` (domain layer)
 * and handles React state transitions + auto-advance detection.
 */

import { useState } from "react";
import type { RefObject } from "react";
import type { ActiveSection } from "../domain/types";
import { SEARCH_SECTIONS } from "../constants/search.constants";
import { resolveDatePick } from "../domain/resolveDatePick";

export function useDateSelection(
  initialCheckIn: string,
  initialCheckOut: string,
  active: ActiveSection,
  setActive: (s: ActiveSection) => void,
  lastUserActivatedSection: RefObject<ActiveSection | null>,
) {
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [invalidState, setInvalidState] = useState<{
    dayStrs: string[];
    isFading: boolean;
    animationKey?: number;
  } | null>(null);

  const handlePickDate = (dayStr: string) => {
    let workingActive = active;

    // Determine if the user explicitly clicked a section
    const explicitFocus =
      (workingActive === SEARCH_SECTIONS.CHECK_IN ||
        workingActive === SEARCH_SECTIONS.CHECK_OUT) &&
      lastUserActivatedSection.current === workingActive;

    // Clear the transient marker
    lastUserActivatedSection.current = null;
    let autoAdvanced = false;

    if (!explicitFocus) {
      workingActive = !checkIn
        ? SEARCH_SECTIONS.CHECK_IN
        : SEARCH_SECTIONS.CHECK_OUT;
      setActive(workingActive);
      autoAdvanced = true;
    }

    // Delegate to the pure domain function
    const result = resolveDatePick(
      dayStr,
      checkIn,
      checkOut,
      workingActive,
      explicitFocus,
      autoAdvanced,
    );

    setCheckIn(result.checkIn);
    setCheckOut(result.checkOut);

    // Only update active if the domain function prescribed a change
    if (result.nextActive !== workingActive) {
      setActive(result.nextActive);
    }
  };

  return {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    invalidState,
    setInvalidState,
    handlePickDate,
  };
}
