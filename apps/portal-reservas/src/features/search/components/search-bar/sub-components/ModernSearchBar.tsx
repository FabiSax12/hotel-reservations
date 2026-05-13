/**
 * @file ModernSearchBar.tsx — Top-level search bar orchestrator.
 *
 * This is the architectural centerpiece of the search feature. It contains
 * ZERO business logic — purely a wiring layer that:
 *
 * 1. Instantiates 7 custom hooks, each owning a distinct concern:
 *    - useSearchBarState: UI state (active section, hero flags, refs)
 *    - useSearchValidation: validation errors, shake animation
 *    - useDestinationState: destination string, auto-selection
 *    - useDateSelection: check-in/check-out state
 *    - useGuestsSelection: adults/children/pets counts
 *    - useSearchTrigger: submission + section activation interception
 *    - useSearchBarContextValue: assembles all above into a single context value
 *
 * 2. Wraps everything in a SearchBarProvider (React Context) so sub-components
 *    can consume state without prop drilling.
 *
 * 3. Renders conditionally: HeroCalendarFloat (hero mode only), then SearchBarFrame.
 *
 * The orchestrator pattern: hooks own logic, context distributes it, sub-components render it.
 */

"use client";

import type { SearchBarProps } from "../domain/types";
import { SEARCH_BAR_STYLES as S } from "../theme/search-bar.theme";
import { SEARCH_VARIANTS } from "../constants/search.constants";

import { useSearchBarState } from "../hooks/useSearchBarState";
import { useSearchValidation } from "../hooks/useSearchValidation";
import { useDateSelection } from "../hooks/useDateSelection";
import { useGuestsSelection } from "../hooks/useGuestsSelection";
import { useDestinationState } from "../hooks/useDestinationState";
import { useSearchBarContextValue } from "../hooks/useSearchBarContextValue";
import { useSearchTrigger } from "../hooks/useSearchTrigger";
import { useI18n } from "@/locales";

import { HeroCalendarFloat } from "./HeroCalendarFloat";
import { SearchBarFrame } from "./SearchBarFrame";
import { SearchBarProvider } from "../context/SearchBarContext";

export function ModernSearchBar({
  onSearch,
  className = "",
  size = SEARCH_VARIANTS.COMPACT,
  initialState,
  onHeroCalendarOpen,
  onDestinationChange,
}: SearchBarProps) {
  const { t } = useI18n();

  // ── Hook instantiation (each owns a distinct concern) ──

  // UI state: which section is active, hero animation flags, container ref.
  const barState = useSearchBarState(size, onHeroCalendarOpen);

  // Validation: error messages, shake animation, field-level error detection.
  const validation = useSearchValidation();

  // Destination: the selected region name, auto-select if only one region exists.
  const destState = useDestinationState({
    initialDestination: initialState?.destination,
    onDestinationChange,
  });

  // Dates: check-in/check-out state, delegates resolution to pure domain function.
  const dateState = useDateSelection(
    initialState?.checkIn || "",
    initialState?.checkOut || "",
    barState.active,
    barState.setActive,
    barState.lastUserActivatedSection,
  );

  // Guests: adult/children/pets counts via useState.
  const guestState = useGuestsSelection(
    initialState?.adults,
    initialState?.children,
    initialState?.pets,
  );

  // Search trigger: validates, delays, fires onSearch. Also intercepts section
  // activation to block date access when no destination is selected.
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

  // Assembly: combines all hook outputs into a single memoized context value.
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
        {/* Hero-only: full-screen calendar overlay behind the search bar. */}
        {barState.isHero && <HeroCalendarFloat />}
        {/* The visual frame: sections, fields, search button. */}
        <SearchBarFrame />
      </div>
    </SearchBarProvider>
  );
}
