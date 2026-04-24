"use client";

import React, { createContext, useContext } from "react";
import type { ActiveSection } from "../domain/types";

interface SearchBarContextValue {
  // Config
  size: "hero" | "compact";
  isHero: boolean;

  // SearchBarState
  active: ActiveSection;
  setActive: React.Dispatch<React.SetStateAction<ActiveSection>>;
  hasHeroCalendarOpened: boolean;
  setHasHeroCalendarOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  lastUserActivatedSection: React.RefObject<ActiveSection | null>;
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
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  onlyOneSede: string | null;

  // DateSelection
  checkIn: string;
  checkOut: string;
  invalidState: { dayStr: string; isFading: boolean } | null;
  handlePickDate: (dayStr: string) => void;

  // GuestsSelection
  adults: number;
  setAdults: React.Dispatch<React.SetStateAction<number>>;
  children: number;
  setChildren: React.Dispatch<React.SetStateAction<number>>;
  pets: number;
  setPets: React.Dispatch<React.SetStateAction<number>>;

  // Submission
  handleSearchTrigger: () => void;
}

const SearchBarContext = createContext<SearchBarContextValue | null>(null);

export function SearchBarProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SearchBarContextValue;
}) {
  return <SearchBarContext.Provider value={value}>{children}</SearchBarContext.Provider>;
}

export function useSearchBarContext() {
  const context = useContext(SearchBarContext);
  if (!context) {
    throw new Error("useSearchBarContext must be used within a SearchBarProvider");
  }
  return context;
}
