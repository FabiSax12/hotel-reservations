/**
 * @file GuestsSection.tsx — "Huéspedes" field within the search bar.
 */

"use client";

import { SEARCH_BAR_STYLES } from "../../theme/search-bar.theme";
import { GuestsPopover } from "../GuestsPopover";
import { useI18n } from "@/locales";
import type { GuestsSectionProps } from "../../domain/types";

export function GuestsSection({
  isActive,
  guestsText,
  sizing,
  sectionClass,
  onActivate,
}: GuestsSectionProps) {
  const { t } = useI18n();
  const C = t.SEARCH.SEARCH_BAR.GUESTS;

  return (
    <div onClick={onActivate} className={sectionClass}>
      <div className={`${sizing.label} ${SEARCH_BAR_STYLES.fieldLabel}`}>{C.LABEL}</div>
      <div className={`${SEARCH_BAR_STYLES.fieldValueGuests} ${sizing.value}`}>{guestsText}</div>
      {isActive && (
        <GuestsPopover />
      )}
    </div>
  );
}
