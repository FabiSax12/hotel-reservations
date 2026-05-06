/**
 * @file types.ts — SearchBar context types.
 */

import type { Dispatch, SetStateAction, RefObject } from "react";
import type { ActiveSection, SearchBarVariant, ValidationError } from "../domain/types";

export interface SearchBarContextValue {
  // Config
  size: SearchBarVariant;
  isHero: boolean;

  // SearchBarState
  active: ActiveSection;
  setActive: (section: ActiveSection) => void;
  hasHeroCalendarOpened: boolean;
  setHasHeroCalendarOpened: (opened: boolean) => void;
  isSearching: boolean;
  setIsSearching: (searching: boolean) => void;
  lastUserActivatedSection: RefObject<ActiveSection | null>;
  activateSection: (sec: ActiveSection, clearErrFn?: () => void) => void;
  onHeroCalendarOpen?: () => void;

  // SearchValidation
  validationError: ValidationError | null;
  isShaking: boolean;
  clearError: () => void;
  validateSearch: (
    dest: string,
    inDate: string,
    outDate: string,
    onlyOneSede: string | null,
  ) => boolean;
  fieldHasError: (k: string) => boolean;

  // Location / Destination
  destination: string;
  setDestination: (destination: string) => void;
  onlyOneSede: string | null;

  // DateSelection
  checkIn: string;
  checkOut: string;
  invalidState: { dayStrs: string[]; isFading: boolean; animationKey?: number } | null;
  handlePickDate: (dayStr: string) => void;

  // GuestsSelection
  adults: number;
  setAdults: Dispatch<SetStateAction<number>>;
  children: number;
  setChildren: Dispatch<SetStateAction<number>>;
  pets: number;
  setPets: Dispatch<SetStateAction<number>>;

  // Submission
  handleSearchTrigger: () => void;
}
