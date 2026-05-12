/**
 * @file search-bar.utils.ts — Utility functions for the ModernSearchBar.
 */

import { LOCALES } from "../constants/search.constants";
import type { SearchTexts } from "../../../i18n/searchTexts.type";

/**
 * Formats an ISO date string (YYYY-MM-DD) into a human-readable format for the UI.
 * Example: "2024-05-20" -> "20 may"
 */
export const formatUIText = (isoStr: string, locale: string) => {
  if (!isoStr) return "";
  const [y, m, d] = isoStr.split("-");
  const dt = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" })
    .format(dt)
    .replace(".", "");
};

/**
 * Formats the guests count into a localized string.
 * Handles different combinations of adults, children, and pets.
 */
export const formatGuests = (
  adults: number,
  children: number,
  pets: number,
  tGuests: SearchTexts["SEARCH_BAR"]["GUESTS"]
) => {
  let text = `${adults} ${adults === 1 ? tGuests.SINGLE_ADULT : tGuests.PLURAL_ADULTS}`;

  if (children > 0 && pets > 0) {
    text = `${adults} ${tGuests.SHORT_ADULT_1} • ${children} ${tGuests.SHORT_CHILDREN_1} • ${pets} ${tGuests.SHORT_PET_1}`;
  } else if (children > 0) {
    text = `${adults} ${tGuests.SHORT_ADULT_2} • ${children} ${children === 1 ? tGuests.SHORT_CHILD : tGuests.SHORT_CHILDREN}`;
  } else if (pets > 0) {
    text = `${adults} ${tGuests.SHORT_ADULT_2} • ${pets} ${tGuests.SHORT_PET}`;
  }

  return text;
};
