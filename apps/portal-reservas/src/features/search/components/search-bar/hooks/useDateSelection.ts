/**
 * @file useDateSelection.ts — Hook for managing complex date selection logic.
 */

import { useState, useRef, useEffect } from "react";
import { parseDateHelper } from "@hotel/ui";
import type { ActiveSection } from "../domain/types";
import { SEARCH_SECTIONS } from "../constants/search.constants";

export function useDateSelection(
  initialCheckIn: string,
  initialCheckOut: string,
  active: ActiveSection,
  setActive: (s: ActiveSection) => void,
  lastUserActivatedSection: React.MutableRefObject<ActiveSection | null>,
) {
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [invalidState, setInvalidState] = useState<{ dayStrs: string[]; isFading: boolean; animationKey?: number } | null>(
    null,
  );

  /**
   * The core logic for picking a date in a dual-date range picker.
   *
   * It handles:
   * 1. Auto-advancement from check-in to check-out.
   * 2. Swapping dates if check-out is selected before check-in.
   * 3. Deselecting dates.
   * 4. Smart replacement based on which field is currently "focused" (active).
   */
  const handlePickDate = (dayStr: string) => {
    let workingActive = active;

    // Determine if the user explicitly clicked a section or if we are in auto-advance mode
    const explicitFocus =
      (workingActive === SEARCH_SECTIONS.CHECK_IN || workingActive === SEARCH_SECTIONS.CHECK_OUT) &&
      lastUserActivatedSection.current === workingActive;

    // Clear the transient marker — next interaction will be evaluated anew
    lastUserActivatedSection.current = null;
    let autoAdvanced = false;

    if (!explicitFocus) {
      workingActive = !checkIn ? SEARCH_SECTIONS.CHECK_IN : SEARCH_SECTIONS.CHECK_OUT;
      setActive(workingActive);
      autoAdvanced = true;
    }

    // Small helper: clicking the same date toggles (deselects)
    const tryToggleDeselect = () => {
      if (dayStr === checkIn) {
        setCheckIn("");
        setActive(SEARCH_SECTIONS.CHECK_IN);
        return true;
      }
      if (dayStr === checkOut) {
        setCheckOut("");
        setActive(!checkIn ? SEARCH_SECTIONS.CHECK_IN : SEARCH_SECTIONS.CHECK_OUT);
        return true;
      }
      return false;
    };

    if (tryToggleDeselect()) return;

    const clickedVal = parseDateHelper(dayStr);
    const inVal = parseDateHelper(checkIn);
    const outVal = parseDateHelper(checkOut);

    // Case: Both dates already exist
    if (checkIn && checkOut) {
      // If the user explicitly focused a field, replace within that field's logic
      if (explicitFocus) {
        if (workingActive === SEARCH_SECTIONS.CHECK_IN) {
          if (checkOut && clickedVal > outVal) {
            setCheckIn(checkOut);
            setCheckOut(dayStr);
          } else {
            setCheckIn(dayStr);
          }
        } else {
          if (checkIn && clickedVal < inVal) {
            setCheckOut(checkIn);
            setCheckIn(dayStr);
          } else {
            setCheckOut(dayStr);
          }
        }
        return;
      }

      // Smart replacement based on proximity when no explicit focus is present
      const distToIn = Math.abs(clickedVal - inVal);
      const distToOut = Math.abs(clickedVal - outVal);
      if (distToIn <= distToOut) {
        if (clickedVal > outVal) {
          setCheckIn(checkOut);
          setCheckOut(dayStr);
        } else {
          setCheckIn(dayStr);
        }
      } else {
        if (clickedVal < inVal) {
          setCheckOut(checkIn);
          setCheckIn(dayStr);
        } else {
          setCheckOut(dayStr);
        }
      }
      return;
    }

    // Case: One date exists and we have explicit focus
    if (explicitFocus) {
      if (workingActive === SEARCH_SECTIONS.CHECK_IN && checkOut) {
        if (clickedVal > outVal) {
          setCheckIn(checkOut);
          setCheckOut(dayStr);
        } else {
          setCheckIn(dayStr);
        }
        setActive(SEARCH_SECTIONS.CHECK_OUT);
        return;
      }
      if (workingActive === SEARCH_SECTIONS.CHECK_OUT && checkIn) {
        if (clickedVal < inVal) {
          setCheckOut(checkIn);
          setCheckIn(dayStr);
        } else {
          setCheckOut(dayStr);
        }
        setActive(!checkIn ? SEARCH_SECTIONS.CHECK_IN : SEARCH_SECTIONS.CHECK_OUT);
        return;
      }
    }

    // Case: Auto-advancement from check-in to check-out
    if (autoAdvanced && workingActive === SEARCH_SECTIONS.CHECK_OUT && checkIn) {
      if (clickedVal < inVal) {
        setCheckOut(checkIn);
        setCheckIn(dayStr);
      } else {
        setCheckOut(dayStr);
      }
      setActive(!checkIn ? SEARCH_SECTIONS.CHECK_IN : SEARCH_SECTIONS.CHECK_OUT);
      return;
    }

    // Basic selection logic (one field present / no special case reached)
    if (workingActive === SEARCH_SECTIONS.CHECK_IN && checkOut) {
      if (clickedVal > outVal) {
        setCheckIn(checkOut);
        setCheckOut(dayStr);
      } else {
        setCheckIn(dayStr);
      }
      setActive(SEARCH_SECTIONS.CHECK_OUT);
      return;
    }
    if (workingActive === SEARCH_SECTIONS.CHECK_OUT && checkIn) {
      if (clickedVal < inVal) {
        setCheckOut(checkIn);
        setCheckIn(dayStr);
      } else {
        setCheckOut(dayStr);
      }
      setActive(!checkIn ? SEARCH_SECTIONS.CHECK_IN : SEARCH_SECTIONS.CHECK_OUT);
      return;
    }

    // Fallback simple selection
    if (workingActive === SEARCH_SECTIONS.CHECK_IN) {
      setCheckIn(dayStr);
      setActive(SEARCH_SECTIONS.CHECK_OUT);
    } else if (workingActive === SEARCH_SECTIONS.CHECK_OUT) {
      setCheckOut(dayStr);
      setActive(!checkIn ? SEARCH_SECTIONS.CHECK_IN : SEARCH_SECTIONS.CHECK_OUT);
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
