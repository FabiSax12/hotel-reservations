/**
 * @file useSearchBarContextValue.ts — Assembles the SearchBarContextValue.
 *
 * Combines the return values of all search-bar hooks into a single
 * context value object that the SearchBarProvider distributes to
 * sub-components. This keeps the orchestrator lean.
 */

import { useMemo } from "react";
import type { SearchBarContextValue } from "../context/types";
import type { UseSearchBarContextValueDeps } from "../domain/types";

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
      size,
      barState,
      validation,
      destState,
      dateState,
      guestState,
      activateSection,
      onHeroCalendarOpen,
      handleSearchTrigger,
    ],
  );
}
