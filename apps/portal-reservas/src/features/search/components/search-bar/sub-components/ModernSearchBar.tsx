/**
 * @file ModernSearchBar.tsx — Top-level search bar orchestrator.
 *
 * This component acts as the high-level manager, connecting custom hooks
 * (logic blocks) and the presentation layer via a Context Provider.
 * It contains zero business logic — all logic is delegated to hooks.
 */

"use client";

import { useI18n } from "@/locales";
import { SEARCH_VARIANTS } from "../constants/search.constants";
import { SearchBarProvider } from "../context/SearchBarContext";
import type { SearchBarProps } from "../domain/types";
import { useDateSelection } from "../hooks/useDateSelection";
import { useDestinationState } from "../hooks/useDestinationState";
import { useGuestsSelection } from "../hooks/useGuestsSelection";
import { useSearchBarContextValue } from "../hooks/useSearchBarContextValue";
import { useSearchBarState } from "../hooks/useSearchBarState";
import { useSearchTrigger } from "../hooks/useSearchTrigger";
import { useSearchValidation } from "../hooks/useSearchValidation";
import { SEARCH_BAR_STYLES as S } from "../theme/search-bar.theme";
import { HeroCalendarFloat } from "./HeroCalendarFloat";
import { SearchBarFrame } from "./SearchBarFrame";

export function ModernSearchBar({
  onSearch,
  className = "",
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

  return (
    <SearchBarProvider value={contextValue}>
      <div ref={barState.containerRef} className={`${S.container} ${className}`}>
        {barState.isHero && <HeroCalendarFloat />}
        <SearchBarFrame />
      </div>
    </SearchBarProvider>
  );
}
