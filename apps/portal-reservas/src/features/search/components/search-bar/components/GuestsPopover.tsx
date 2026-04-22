/**
 * @file GuestsPopover.tsx — Dropdown panel for selecting guest counts.
 */

"use client";

import { Stepper } from "@hotel/ui";
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
  variant?: "compact" | "hero";
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
