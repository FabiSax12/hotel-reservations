/**
 * @file GuestsPopover.tsx — Dropdown panel for selecting guest counts.
 *
 * Renders three {@link Stepper} rows (Adults, Children, Pets) inside an
 * absolutely-positioned popover panel. The panel position shifts depending
 * on the search bar variant (hero vs compact) and whether the hero calendar
 * has already been expanded.
 *
 * Clicking inside the panel calls `e.stopPropagation()` to prevent
 * the parent section's click handler from toggling it closed.
 */

"use client";

import { Stepper } from "./Stepper";
import { SEARCH_BAR_UI_CONSTANTS } from "../constants/ui";
import { GUESTS_POPOVER_STYLES as S } from "../theme/guests.theme";

const C = SEARCH_BAR_UI_CONSTANTS.GUESTS;

interface GuestsPopoverProps {
  adults: number;
  setAdults: (v: number) => void;
  children: number;
  setChildren: (v: number) => void;
  pets: number;
  setPets: (v: number) => void;
  /** Visual variant governing the popover's vertical position. */
  variant?: "compact" | "hero";
  /** Whether the hero calendar is already open (shifts the popover down). */
  hasCalendarExpanded?: boolean;
}

export function GuestsPopover({ adults, setAdults, children, setChildren, pets, setPets, variant, hasCalendarExpanded }: GuestsPopoverProps) {
  const isHero = variant === "hero";

  return (
    <div 
      className={S.panel(isHero, !!hasCalendarExpanded)}
      onClick={e => e.stopPropagation()}
    >
      <Stepper title={C.ADULTS_TITLE} subtitle={C.ADULTS_SUBTITLE} value={adults} setter={setAdults} min={1} />
      <Stepper title={C.CHILDREN_TITLE} subtitle={C.CHILDREN_SUBTITLE} value={children} setter={setChildren} />
      <Stepper title={C.PETS_TITLE} subtitle={C.PETS_SUBTITLE} value={pets} setter={setPets} />
    </div>
  );
}
