/**
 * @file resolveDatePick.ts — Pure domain function for dual-date range picker logic.
 *
 * Given the current state (checkIn, checkOut, active section, explicit focus)
 * and a clicked date string, returns the new state: { checkIn, checkOut, nextActive }.
 *
 * Zero side effects. Zero hooks. Zero JSX. Fully testable with Node.
 */

import { parseDateHelper } from "@hotel/ui";
import { SEARCH_SECTIONS } from "../constants/search.constants";
import type { ActiveSection } from "./types";
import {
  type DatePickState,
  resolveBothDatesExplicit,
  resolveBothDatesProximity,
  resolveOneDateExplicit,
  resolveAutoAdvance,
  resolveBasicSelection,
} from "./datePickHelpers";

export type { DatePickState };

/**
 * Core logic for picking a date in a dual-date range picker.
 *
 * Handles auto-advancement, date swapping, deselection,
 * and smart replacement based on active focus.
 */
export function resolveDatePick(
  dayStr: string,
  checkIn: string,
  checkOut: string,
  active: ActiveSection,
  explicitFocus: boolean,
  autoAdvanced: boolean,
): DatePickState {
  // Clicking the same date toggles (deselects)
  if (dayStr === checkIn) {
    return { checkIn: "", checkOut, nextActive: SEARCH_SECTIONS.CHECK_IN };
  }
  if (dayStr === checkOut) {
    return {
      checkIn,
      checkOut: "",
      nextActive: !checkIn ? SEARCH_SECTIONS.CHECK_IN : SEARCH_SECTIONS.CHECK_OUT,
    };
  }

  const clickedVal = parseDateHelper(dayStr);
  const inVal = parseDateHelper(checkIn);
  const outVal = parseDateHelper(checkOut);

  // Both dates already exist
  if (checkIn && checkOut) {
    if (explicitFocus) {
      return resolveBothDatesExplicit(active, dayStr, checkIn, checkOut, clickedVal, inVal, outVal);
    }
    return resolveBothDatesProximity(dayStr, checkIn, checkOut, clickedVal, inVal, outVal);
  }

  // One date exists with explicit focus
  if (explicitFocus) {
    const result = resolveOneDateExplicit(active, dayStr, checkIn, checkOut, clickedVal, inVal, outVal);
    if (result) return result;
  }

  // Auto-advancement from check-in to check-out
  if (autoAdvanced && active === SEARCH_SECTIONS.CHECK_OUT && checkIn) {
    return resolveAutoAdvance(dayStr, checkIn, clickedVal, inVal);
  }

  // Fallback: basic selection
  return resolveBasicSelection(active, dayStr, checkIn, checkOut, clickedVal, inVal, outVal);
}
