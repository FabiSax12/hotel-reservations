/**
 * @file useSearchBarContextValue.ts — Assembles the SearchBarContextValue.
 *
 * Combines the return values of all search-bar hooks into a single
 * context value object that the SearchBarProvider distributes to
 * sub-components. This keeps the orchestrator lean.
 */

import { useMemo } from "react";
import type { RefObject, Dispatch, SetStateAction } from "react";
import type { SearchBarContextValue } from "../context/types";
import type { SearchBarVariant, ActiveSection, ValidationError } from "../domain/types";

interface UseSearchBarContextValueDeps {
  size: SearchBarVariant;
  barState: {
    active: ActiveSection;
    setActive: (s: ActiveSection) => void;
    hasHeroCalendarOpened: boolean;
    setHasHeroCalendarOpened: (v: boolean) => void;
    isSearching: boolean;
    setIsSearching: (v: boolean) => void;
    lastUserActivatedSection: RefObject<ActiveSection | null>;
    isHero: boolean;
  };
  validation: {
    validationError: ValidationError | null;
    isShaking: boolean;
    clearError: () => void;
    validateSearch: (dest: string, inDate: string, outDate: string, onlyOneSede: string | null) => boolean;
    fieldHasError: (k: string) => boolean;
  };
  destState: {
    destination: string;
    setDestination: (dest: string) => void;
    onlyOneSede: string | null;
  };
  dateState: {
    checkIn: string;
    checkOut: string;
    invalidState: { dayStrs: string[]; isFading: boolean; animationKey?: number } | null;
    handlePickDate: (dayStr: string) => void;
  };
  guestState: {
    adults: number;
    setAdults: Dispatch<SetStateAction<number>>;
    children: number;
    setChildren: Dispatch<SetStateAction<number>>;
    pets: number;
    setPets: Dispatch<SetStateAction<number>>;
  };
  activateSection: (sec: ActiveSection, clearErrFn?: () => void) => void;
  onHeroCalendarOpen?: () => void;
  handleSearchTrigger: () => void;
}

export function useSearchBarContextValue({
  size,
  barState,
  validation,
  destState,
  dateState,
  guestState,
  activateSection,
  onHeroCalendarOpen,
  handleSearchTrigger,
}: UseSearchBarContextValueDeps): SearchBarContextValue {
  return useMemo(
    () => ({
      size,
      isHero: barState.isHero,
      active: barState.active,
      setActive: barState.setActive,
      hasHeroCalendarOpened: barState.hasHeroCalendarOpened,
      setHasHeroCalendarOpened: barState.setHasHeroCalendarOpened,
      isSearching: barState.isSearching,
      setIsSearching: barState.setIsSearching,
      lastUserActivatedSection: barState.lastUserActivatedSection,
      activateSection,
      onHeroCalendarOpen,
      validationError: validation.validationError,
      isShaking: validation.isShaking,
      clearError: validation.clearError,
      validateSearch: validation.validateSearch,
      fieldHasError: validation.fieldHasError,
      destination: destState.destination,
      setDestination: destState.setDestination,
      onlyOneSede: destState.onlyOneSede,
      checkIn: dateState.checkIn,
      checkOut: dateState.checkOut,
      invalidState: dateState.invalidState,
      handlePickDate: dateState.handlePickDate,
      adults: guestState.adults,
      setAdults: guestState.setAdults,
      children: guestState.children,
      setChildren: guestState.setChildren,
      pets: guestState.pets,
      setPets: guestState.setPets,
      handleSearchTrigger,
    }),
    [
      size, barState, validation, destState, dateState,
      guestState, activateSection, onHeroCalendarOpen, handleSearchTrigger,
    ],
  );
}
