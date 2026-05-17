/**
 * @file GuestsSection.tsx — "Huéspedes" field within the search bar.
 */

"use client";

import { useI18n } from "@/locales";
import type { GuestsSectionProps } from "../../domain/types";
import { SEARCH_BAR_STYLES as S } from "../../theme/search-bar.theme";
import { GuestsPopover } from "../GuestsPopover";

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
      <div className={`${sizing.label} ${S.fieldLabel}`}>{C.LABEL}</div>
      <div className={`${S.fieldValueGuests} ${sizing.value}`}>{guestsText}</div>
      {isActive && <GuestsPopover />}
    </div>
  );
}
