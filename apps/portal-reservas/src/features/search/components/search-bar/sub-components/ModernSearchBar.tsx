/**
 * @file ModernSearchBar.tsx — Top-level search bar orchestrator.
 *
 * This component acts as the high-level manager, connecting data-fetching
 * (initial state), custom hooks (logic blocks), and the presentation layer.
 *
 * FIX (US-DM-02): `onDestinationChange` is now fired via `useEffect` watching
 * the `destination` state, avoiding the "setState during render" error that
 * occurred when `onDestinationChange` was called inside the state setter.
 */

"use client";

import React, { useMemo } from "react";
import type { SearchBarProps } from "../domain/types";
import { SEARCH_BAR_STYLES as S } from "../theme/search-bar.theme";
import { REGIONS_CONFIG } from "../constants/regionsMock";
import { SEARCH_VARIANTS, SEARCH_VALS, TIMEOUTS, SEARCH_SECTIONS } from "../constants/search.constants";

// Custom Hooks
import { useSearchBarState } from "../hooks/useSearchBarState";
import { useSearchValidation } from "../hooks/useSearchValidation";
import { useDateSelection } from "../hooks/useDateSelection";
import { useGuestsSelection } from "../hooks/useGuestsSelection";
import { useI18n } from "@/locales";

// Sub-components
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
  // 1. Logic Hooks
  const {
    active,
    setActive,
    hasHeroCalendarOpened,
    setHasHeroCalendarOpened,
    isSearching,
    setIsSearching,
    lastUserActivatedSection,
    containerRef,
    activateSection,
    isHero,
  } = useSearchBarState(size, onHeroCalendarOpen);

  const { validationError, isShaking, clearError, showError, validateSearch, fieldHasError } =
    useSearchValidation();

  const onlyOneSede = useMemo(
    () => (REGIONS_CONFIG.length === 1 ? REGIONS_CONFIG[0].name : null),
    [],
  );

  const { t } = useI18n();
  const C = t.SEARCH.SEARCH_BAR.VALIDATION;

  const [destination, setDestination] = React.useState(() => {
    if (initialState?.destination && initialState?.destination !== SEARCH_VALS.DESTINATION_ALL)
      return initialState.destination;
    return onlyOneSede || "";
  });

  /**
   * Notify the parent when destination changes.
   * Uses useEffect (post-render) to avoid the React "setState during render"
   * violation that occurs when calling parent setters inside a child's state setter.
   * Skip the first render to avoid double-firing during initialization.
   */
  const isFirstRenderRef = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      // Notify parent of the initial (auto-selected) destination on mount
      if (destination) onDestinationChange?.(destination);
      return;
    }
    if (destination) onDestinationChange?.(destination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination]);

  const { checkIn, checkOut, invalidState, handlePickDate } = useDateSelection(
    initialState?.checkIn || "",
    initialState?.checkOut || "",
    active,
    setActive,
    lastUserActivatedSection,
  );

  const { adults, setAdults, children: childrenCount, setChildren, pets, setPets } = useGuestsSelection(
    initialState?.adults,
    initialState?.children,
    initialState?.pets,
  );

  const handleSearchTrigger = () => {
    if (!validateSearch(destination, checkIn, checkOut, onlyOneSede)) return;
    clearError();
    setActive(null);
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      if (onSearch)
        onSearch({
          destination: destination || SEARCH_VALS.DESTINATION_ALL,
          checkIn,
          checkOut,
          adults,
          children: childrenCount,
          pets,
        });
    }, TIMEOUTS.SEARCH_TRIGGER_DELAY);
  };

  const activateSectionIntercepted = React.useCallback(
    (section: any, onClearError?: () => void) => {
      if (
        (section === SEARCH_SECTIONS.CHECK_IN || section === SEARCH_SECTIONS.CHECK_OUT) &&
        (!destination || destination === SEARCH_VALS.DESTINATION_ALL)
      ) {
        showError({
          message: C.MISSING_SEDE,
          fields: ["where"],
        });
        return;
      }
      activateSection(section, onClearError);
    },
    [destination, activateSection, showError, C.MISSING_SEDE]
  );

  // 3. Construct Context Value
  const contextValue = {
    size,
    isHero,
    active,
    setActive,
    hasHeroCalendarOpened,
    setHasHeroCalendarOpened,
    isSearching,
    setIsSearching,
    lastUserActivatedSection,
    activateSection: activateSectionIntercepted,
    onHeroCalendarOpen,
    validationError,
    isShaking,
    clearError,
    validateSearch,
    fieldHasError,
    destination,
    setDestination,
    onlyOneSede,
    checkIn,
    checkOut,
    invalidState,
    handlePickDate,
    adults,
    setAdults,
    children: childrenCount,
    setChildren,
    pets,
    setPets,
    handleSearchTrigger,
  };

  return (
    <SearchBarProvider value={contextValue}>
      <div ref={containerRef} className={`${S.container} ${className}`}>
        {isHero && <HeroCalendarFloat />}
        <SearchBarFrame />
      </div>
    </SearchBarProvider>
  );
}
