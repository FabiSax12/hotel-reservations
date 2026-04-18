/**
 * @file GuestsSection.tsx — "Huéspedes" field within the search bar.
 *
 * Displays a summary of the current guest counts (e.g. "2 Adultos")
 * and conditionally renders the {@link GuestsPopover} when this
 * section is active.
 *
 * The popover is rendered as a child of this section so it inherits
 * the correct DOM position for absolute placement.
 */

"use client";

import { SEARCH_BAR_STYLES as S } from "../../theme/search-bar.theme";
import { SEARCH_BAR_UI_CONSTANTS } from "../../constants/ui";
import { GuestsPopover } from "../GuestsPopover";

const C = SEARCH_BAR_UI_CONSTANTS.GUESTS;

interface GuestsSectionProps {
  /** Whether this section is the currently active/expanded one. */
  isActive: boolean;
  /** Pre-formatted guest summary string (e.g. "2 Adult. • 1 Niño"). */
  guestsText: string;
  /** Sizing tokens from the search bar's current variant. */
  sizing: { label: string; value: string };
  /** Pre-computed CSS class string (includes active/inactive state styling). */
  sectionClass: string;
  /** Visual variant of the search bar ("compact" or "hero"). */
  size: "compact" | "hero";
  /** Whether the hero calendar is already open (affects popover positioning). */
  hasCalendarExpanded: boolean;
  /** Current number of adult guests. */
  adults: number;
  /** Setter for the adult count. */
  setAdults: (v: number) => void;
  /** Current number of child guests. */
  children: number;
  /** Setter for the children count. */
  setChildren: (v: number) => void;
  /** Current number of pets. */
  pets: number;
  /** Setter for the pet count. */
  setPets: (v: number) => void;
  /** Callback to activate this section (open the guests popover). */
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
      {/* GuestsPopover renders inline when this section is active */}
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
