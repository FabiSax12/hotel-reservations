/**
 * @file types.ts — SearchBar context types.
 */

import type { Dispatch, RefObject, SetStateAction } from "react";
import type { ActiveSection, SearchBarVariant } from "../domain/types";

export interface SearchBarContextValue {
  // Config
  size: SearchBarVariant;
  isHero: boolean;

  // SearchBarState
  active: ActiveSection;
  setActive: Dispatch<SetStateAction<ActiveSection>>;
  hasHeroCalendarOpened: boolean;
  setHasHeroCalendarOpened: Dispatch<SetStateAction<boolean>>;
  isSearching: boolean;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
  lastUserActivatedSection: RefObject<ActiveSection | null>;
  activateSection: (sec: ActiveSection, clearErrFn?: () => void) => void;
  onHeroCalendarOpen?: () => void;

  // SearchValidation
  validationError: any;
  isShaking: boolean;
  clearError: () => void;
  validateSearch: (
    dest: string,
    inDate: string,
    outDate: string,
    onlyOneSede: string | null,
  ) => boolean;
  fieldHasError: (k: string) => boolean;

  // Location / Destination (Managed mostly in ModernSearchBar)
  destination: string;
  setDestination: Dispatch<SetStateAction<string>>;
  onlyOneSede: string | null;

  // DateSelection
  checkIn: string;
  checkOut: string;
  invalidState: { dayStr: string; isFading: boolean } | null;
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
