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
  if (active === SEARCH_SECTIONS.CHECK_IN) {
    if (checkOut && clickedVal > outVal) {
      return { checkIn: checkOut, checkOut: dayStr, nextActive: active };
    }
    return { checkIn: dayStr, checkOut, nextActive: active };
  }
  if (checkIn && clickedVal < inVal) {
    return { checkIn: dayStr, checkOut: checkIn, nextActive: active };
  }
  return { checkIn, checkOut: dayStr, nextActive: active };
}

export function resolveBothDatesProximity(
  dayStr: string, checkIn: string, checkOut: string,
  clickedVal: number, inVal: number, outVal: number,
): DatePickState {
  const distToIn = Math.abs(clickedVal - inVal);
  const distToOut = Math.abs(clickedVal - outVal);
  if (distToIn <= distToOut) {
    if (clickedVal > outVal) return { checkIn: checkOut, checkOut: dayStr, nextActive: null };
    return { checkIn: dayStr, checkOut, nextActive: null };
  }
  if (clickedVal < inVal) return { checkIn: dayStr, checkOut: checkIn, nextActive: null };
  return { checkIn, checkOut: dayStr, nextActive: null };
}

export function resolveOneDateExplicit(
  active: ActiveSection, dayStr: string, checkIn: string, checkOut: string,
  clickedVal: number, inVal: number, outVal: number,
): DatePickState | null {
  if (active === SEARCH_SECTIONS.CHECK_IN && checkOut) {
    const newIn = clickedVal > outVal ? checkOut : dayStr;
    const newOut = clickedVal > outVal ? dayStr : checkOut;
    return { checkIn: newIn, checkOut: newOut, nextActive: SEARCH_SECTIONS.CHECK_OUT };
  }
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
  if (active === SEARCH_SECTIONS.CHECK_IN && checkOut) {
    if (clickedVal > outVal) return { checkIn: checkOut, checkOut: dayStr, nextActive: SEARCH_SECTIONS.CHECK_OUT };
    return { checkIn: dayStr, checkOut, nextActive: SEARCH_SECTIONS.CHECK_OUT };
  }
  if (active === SEARCH_SECTIONS.CHECK_OUT && checkIn) {
    const next = !checkIn ? SEARCH_SECTIONS.CHECK_IN : SEARCH_SECTIONS.CHECK_OUT;
    if (clickedVal < inVal) return { checkIn: dayStr, checkOut: checkIn, nextActive: next };
    return { checkIn, checkOut: dayStr, nextActive: next };
  }
  if (active === SEARCH_SECTIONS.CHECK_IN) {
    return { checkIn: dayStr, checkOut, nextActive: SEARCH_SECTIONS.CHECK_OUT };
  }
  if (active === SEARCH_SECTIONS.CHECK_OUT) {
    return {
      checkIn, checkOut: dayStr,
      nextActive: !checkIn ? SEARCH_SECTIONS.CHECK_IN : SEARCH_SECTIONS.CHECK_OUT,
    };
  }
  return { checkIn, checkOut, nextActive: active };
}
