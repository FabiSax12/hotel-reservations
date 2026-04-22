/**
 * @file GuestsSection.tsx — "Huéspedes" field within the search bar.
 */

"use client";

import { SEARCH_BAR_STYLES as S } from "../../theme/search-bar.theme";
import { SEARCH_BAR_UI_CONSTANTS } from "../../constants/ui";
import { GuestsPopover } from "../GuestsPopover";

const C = SEARCH_BAR_UI_CONSTANTS.GUESTS;

interface GuestsSectionProps {
  isActive: boolean;
  guestsText: string;
  sizing: { label: string; value: string };
  sectionClass: string;
  size: "compact" | "hero";
  hasCalendarExpanded: boolean;
  adults: number;
  setAdults: (v: number) => void;
  children: number;
  setChildren: (v: number) => void;
  pets: number;
  setPets: (v: number) => void;
  onActivate: () => void;
}

export function GuestsSection({
  isActive, guestsText, sizing, sectionClass, size,
  hasCalendarExpanded, adults, setAdults, children, setChildren, pets, setPets, onActivate
}: GuestsSectionProps) {
  return (
    <div onClick={onActivate} className={sectionClass}>
      <div className={`${sizing.label} ${S.fieldLabel}`}>{C.LABEL}</div>
      <div className={`${S.fieldValueGuests} ${sizing.value}`}>
        {guestsText}
      </div>
      {isActive && (
        <GuestsPopover
          variant={size}
          hasCalendarExpanded={hasCalendarExpanded}
          adults={adults} setAdults={setAdults}
          children={children} setChildren={setChildren}
          pets={pets} setPets={setPets}
        />
      )}
    </div>
  );
}
