/**
 * @file search-bar.utils.ts — Utility functions for the ModernSearchBar.
 */

import { SEARCH_BAR_UI_CONSTANTS } from "../constants/ui";
import { LOCALES } from "../constants/search.constants";

const C = SEARCH_BAR_UI_CONSTANTS;

/**
 * Formats an ISO date string (YYYY-MM-DD) into a human-readable format for the UI.
 * Example: "2024-05-20" -> "20 may"
 */
export const formatUIText = (isoStr: string) => {
  if (!isoStr) return "";
  const [y, m, d] = isoStr.split('-');
  const dt = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
  return new Intl.DateTimeFormat(LOCALES.DEFAULT, { day: 'numeric', month: 'short' }).format(dt).replace('.', '');
};

/**
 * Formats the guests count into a localized string.
 * Handles different combinations of adults, children, and pets.
 */
export const formatGuests = (adults: number, children: number, pets: number) => {
  let text = `${adults} ${adults === 1 ? C.GUESTS.SINGLE_ADULT : C.GUESTS.PLURAL_ADULTS}`;
  
  if (children > 0 && pets > 0) {
    text = `${adults} ${C.GUESTS.SHORT_ADULT_1} • ${children} ${C.GUESTS.SHORT_CHILDREN_1} • ${pets} ${C.GUESTS.SHORT_PET_1}`;
  } else if (children > 0) {
    text = `${adults} ${C.GUESTS.SHORT_ADULT_2} • ${children} ${children === 1 ? C.GUESTS.SHORT_CHILD : C.GUESTS.SHORT_CHILDREN}`;
  } else if (pets > 0) {
    text = `${adults} ${C.GUESTS.SHORT_ADULT_2} • ${pets} ${C.GUESTS.SHORT_PET}`;
  }
  
  return text;
};
