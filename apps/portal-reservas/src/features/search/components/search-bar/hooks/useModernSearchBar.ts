"use client";

import { useI18n } from "@/locales";
import { SEARCH_VARIANTS } from "../constants/search.constants";
import type { SearchBarProps } from "../domain/types";
import { useDateSelection } from "./useDateSelection";
import { useDestinationState } from "./useDestinationState";
import { useGuestsSelection } from "./useGuestsSelection";
import { useSearchBarContextValue } from "./useSearchBarContextValue";
import { useSearchBarState } from "./useSearchBarState";
import { useSearchTrigger } from "./useSearchTrigger";
import { useSearchValidation } from "./useSearchValidation";

export function useModernSearchBar({
  onSearch,
  size = SEARCH_VARIANTS.COMPACT,
  initialState,
  onHeroCalendarOpen,
  onDestinationChange,
}: SearchBarProps) {
  const { t } = useI18n();

  const barState = useSearchBarState(size, onHeroCalendarOpen);
  const validation = useSearchValidation();
  const destState = useDestinationState({
    initialDestination: initialState?.destination,
    onDestinationChange,
  });

  const dateState = useDateSelection(
    initialState?.checkIn || "",
    initialState?.checkOut || "",
    barState.active,
    barState.setActive,
    barState.lastUserActivatedSection,
  );

  const guestState = useGuestsSelection(
    initialState?.adults,
    initialState?.children,
    initialState?.pets,
  );

  const { handleSearchTrigger, activateSectionIntercepted } = useSearchTrigger({
    destination: destState.destination,
    checkIn: dateState.checkIn,
    checkOut: dateState.checkOut,
    adults: guestState.adults,
    childrenCount: guestState.children,
    pets: guestState.pets,
    onlyOneSede: destState.onlyOneSede,
    validateSearch: validation.validateSearch,
    clearError: validation.clearError,
    showError: validation.showError,
    setActive: barState.setActive,
    setIsSearching: barState.setIsSearching,
    activateSection: barState.activateSection,
    onSearch,
    missingSedeMessage: t.SEARCH.SEARCH_BAR.VALIDATION.MISSING_SEDE,
  });

  const contextValue = useSearchBarContextValue({
    size,
    barState,
    validation,
    destState,
    dateState,
    guestState,
    activateSection: activateSectionIntercepted,
    onHeroCalendarOpen,
    handleSearchTrigger,
  });

  return {
    contextValue,
    containerRef: barState.containerRef,
    isHero: barState.isHero,
  };
}
