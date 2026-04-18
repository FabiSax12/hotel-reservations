"use client";

import { Stepper } from "./Stepper";
import { SEARCH_BAR_UI_CONSTANTS } from "../constants/ui";

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
  const posClasses = (isHero && hasCalendarExpanded)
    ? "top-[100%] mt-6 origin-top slide-in-from-top-4"
    : "top-[100%] mt-4 origin-top slide-in-from-top-4";

  return (
    <div 
      className={`absolute left-1/2 -translate-x-1/2 w-[450px] bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-200 p-8 z-50 animate-in fade-in duration-300 cursor-default text-left ${posClasses}`}
      onClick={e => e.stopPropagation()}
    >
      <Stepper title={C.ADULTS_TITLE} subtitle={C.ADULTS_SUBTITLE} value={adults} setter={setAdults} min={1} />
      <Stepper title={C.CHILDREN_TITLE} subtitle={C.CHILDREN_SUBTITLE} value={children} setter={setChildren} />
      <Stepper title={C.PETS_TITLE} subtitle={C.PETS_SUBTITLE} value={pets} setter={setPets} />
    </div>
  );
}
