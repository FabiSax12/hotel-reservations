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
import {
  type DatePickState,
  resolveAutoAdvance,
  resolveBasicSelection,
  resolveBothDatesExplicit,
  resolveBothDatesProximity,
  resolveOneDateExplicit,
} from "./datePickHelpers";
import type { ActiveSection } from "./types";

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
  // Clicking the already-selected check-in date clears it (deselect)
  if (dayStr === checkIn) {
    return { checkIn: "", checkOut, nextActive: SEARCH_SECTIONS.CHECK_IN };
  }
  // Clicking the already-selected check-out date clears it (deselect)
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

  // ── Both dates already exist ──
  // The user is modifying an existing range; behavior depends on whether a
  // field is explicitly focused (e.g. user clicked "Check-in" first).
  if (checkIn && checkOut) {
    if (explicitFocus) {
      return resolveBothDatesExplicit(active, dayStr, checkIn, checkOut, clickedVal, inVal, outVal);
    }
    // No explicit focus → smart-replace the closer date (proximity heuristic)
    return resolveBothDatesProximity(dayStr, checkIn, checkOut, clickedVal, inVal, outVal);
  }

  // ── One date exists with explicit focus ──
  // e.g. user clicked "Check-out" and then picks a day while check-in is already set
  if (explicitFocus) {
    const result = resolveOneDateExplicit(
      active,
      dayStr,
      checkIn,
      checkOut,
      clickedVal,
      inVal,
      outVal,
    );
    if (result) return result;
  }

  // ── Auto-advancement from check-in to check-out ──
  // After the first date is picked, the UI auto-focuses the second field;
  // this branch handles the very next click in that flow.
  if (autoAdvanced && active === SEARCH_SECTIONS.CHECK_OUT && checkIn) {
    return resolveAutoAdvance(dayStr, checkIn, clickedVal, inVal);
  }

  // ── Fallback: basic selection ──
  // Covers initial selection, generic clicks, and any edge cases not caught above
  return resolveBasicSelection(active, dayStr, checkIn, checkOut, clickedVal, inVal, outVal);
}
