/**
 * @file datePickHelpers.ts — Pure helper functions for dual-date range picker logic.
 *
 * Used by `resolveDatePick.ts`. Each function resolves {checkIn, checkOut, nextActive}
 * for a specific scenario (both dates exist, one date + explicit focus, etc.).
 */

import { SEARCH_SECTIONS } from "../constants/search.constants";
import type { ActiveSection } from "./types";

export interface DatePickState {
  checkIn: string;
  checkOut: string;
  nextActive: ActiveSection;
}

export function resolveBothDatesExplicit(
  active: ActiveSection, dayStr: string, checkIn: string, checkOut: string,
  clickedVal: number, inVal: number, outVal: number,
): DatePickState {
  // Explicit focus on CHECK_IN: replace check-in, swapping if clicked date is after current check-out
  if (active === SEARCH_SECTIONS.CHECK_IN) {
    if (checkOut && clickedVal > outVal) {
      return { checkIn: checkOut, checkOut: dayStr, nextActive: active };
    }
    return { checkIn: dayStr, checkOut, nextActive: active };
  }
  // Explicit focus on CHECK_OUT: if clicked date is before current check-in, swap them
  if (checkIn && clickedVal < inVal) {
    return { checkIn: dayStr, checkOut: checkIn, nextActive: active };
  }
  return { checkIn, checkOut: dayStr, nextActive: active };
}

export function resolveBothDatesProximity(
  dayStr: string, checkIn: string, checkOut: string,
  clickedVal: number, inVal: number, outVal: number,
): DatePickState {
  // When no explicit focus, replace whichever date is closer to the clicked day
  const distToIn = Math.abs(clickedVal - inVal);
  const distToOut = Math.abs(clickedVal - outVal);
  if (distToIn <= distToOut) {
    // Clicked closer to check-in: replace check-in (swap if after current check-out)
    if (clickedVal > outVal) return { checkIn: checkOut, checkOut: dayStr, nextActive: SEARCH_SECTIONS.CHECK_OUT };
    return { checkIn: dayStr, checkOut, nextActive: SEARCH_SECTIONS.CHECK_IN };
  }
  // Clicked closer to check-out: replace check-out (swap if before current check-in)
  if (clickedVal < inVal) return { checkIn: dayStr, checkOut: checkIn, nextActive: SEARCH_SECTIONS.CHECK_IN };
  return { checkIn, checkOut: dayStr, nextActive: SEARCH_SECTIONS.CHECK_OUT };
}

export function resolveOneDateExplicit(
  active: ActiveSection, dayStr: string, checkIn: string, checkOut: string,
  clickedVal: number, inVal: number, outVal: number,
): DatePickState | null {
  // Explicit CHECK_IN with existing check-out: enforce order, swapping if needed
  if (active === SEARCH_SECTIONS.CHECK_IN && checkOut) {
    const newIn = clickedVal > outVal ? checkOut : dayStr;
    const newOut = clickedVal > outVal ? dayStr : checkOut;
    return { checkIn: newIn, checkOut: newOut, nextActive: SEARCH_SECTIONS.CHECK_OUT };
  }
  // Explicit CHECK_OUT with existing check-in: enforce order, swapping if needed
  if (active === SEARCH_SECTIONS.CHECK_OUT && checkIn) {
    const newIn = clickedVal < inVal ? dayStr : checkIn;
    const newOut = clickedVal < inVal ? checkIn : dayStr;
    return {
      checkIn: newIn, checkOut: newOut,
      nextActive: !checkIn ? SEARCH_SECTIONS.CHECK_IN : SEARCH_SECTIONS.CHECK_OUT,
    };
  }
  return null;
}

export function resolveAutoAdvance(
  dayStr: string, checkIn: string, clickedVal: number, inVal: number,
): DatePickState {
  // Auto-advance mode: after setting check-in, the next click becomes check-out.
  // If the user clicks a date BEFORE the already-selected check-in, swap them.
  if (clickedVal < inVal) {
    return {
      checkIn: dayStr, checkOut: checkIn,
      nextActive: !checkIn ? SEARCH_SECTIONS.CHECK_IN : SEARCH_SECTIONS.CHECK_OUT,
    };
  }
  return {
    checkIn, checkOut: dayStr,
    nextActive: !checkIn ? SEARCH_SECTIONS.CHECK_IN : SEARCH_SECTIONS.CHECK_OUT,
  };
}

export function resolveBasicSelection(
  active: ActiveSection, dayStr: string, checkIn: string, checkOut: string,
  clickedVal: number, inVal: number, outVal: number,
): DatePickState {
  // Fallback logic when no special mode applies — respects the currently active section.
  if (active === SEARCH_SECTIONS.CHECK_IN && checkOut) {
    if (clickedVal > outVal) return { checkIn: checkOut, checkOut: dayStr, nextActive: SEARCH_SECTIONS.CHECK_OUT };
    return { checkIn: dayStr, checkOut, nextActive: SEARCH_SECTIONS.CHECK_OUT };
  }
  if (active === SEARCH_SECTIONS.CHECK_OUT && checkIn) {
    const next = !checkIn ? SEARCH_SECTIONS.CHECK_IN : SEARCH_SECTIONS.CHECK_OUT;
    if (clickedVal < inVal) return { checkIn: dayStr, checkOut: checkIn, nextActive: next };
    return { checkIn, checkOut: dayStr, nextActive: next };
  }
  // Only check-in is set (or nothing) and active is CHECK_IN → set check-in and advance focus to CHECK_OUT
  if (active === SEARCH_SECTIONS.CHECK_IN) {
    return { checkIn: dayStr, checkOut, nextActive: SEARCH_SECTIONS.CHECK_OUT };
  }
  // Only check-out is set (or nothing) and active is CHECK_OUT → set check-out
  if (active === SEARCH_SECTIONS.CHECK_OUT) {
    return {
      checkIn, checkOut: dayStr,
      nextActive: !checkIn ? SEARCH_SECTIONS.CHECK_IN : SEARCH_SECTIONS.CHECK_OUT,
    };
  }
  return { checkIn, checkOut, nextActive: active };
}
