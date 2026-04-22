/**
 * @file ModernSearchBar.tsx — Top-level search bar orchestrator.
 * 
 * This component acts as the high-level manager, connecting data-fetching
 * (initial state), custom hooks (logic blocks), and the presentation layer.
 */

"use client";

import React, { useMemo } from "react";
import type { SearchBarProps } from "../domain/types";
import { SEARCH_BAR_STYLES as S } from "../theme/search-bar.theme";
import { REGIONS_CONFIG } from "../constants/regionsConfig";
import { SEARCH_VARIANTS, SEARCH_VALS, TIMEOUTS } from "../constants/search.constants";

// Custom Hooks
import { useSearchBarState } from "../hooks/useSearchBarState";
import { useSearchValidation } from "../hooks/useSearchValidation";
import { useDateSelection } from "../hooks/useDateSelection";
import { useGuestsSelection } from "../hooks/useGuestsSelection";

// Sub-components
import { HeroCalendarFloat } from "./HeroCalendarFloat";
import { SearchBarBar } from "./SearchBarBar";

export function ModernSearchBar({ onSearch, className = "", size = SEARCH_VARIANTS.COMPACT, initialState, onHeroCalendarOpen }: SearchBarProps) {
  // 1. Logic Hooks
  const {
    active, setActive, hasHeroCalendarOpened, setHasHeroCalendarOpened,
    isSearching, setIsSearching, lastUserActivatedSection, containerRef,
    activateSection, isHero
  } = useSearchBarState(size, onHeroCalendarOpen);

  const {
    validationError, isShaking, clearError, validateSearch, fieldHasError
  } = useSearchValidation();

  const onlyOneSede = useMemo(() => 
    REGIONS_CONFIG.length === 1 ? REGIONS_CONFIG[0].name : null
  , []);

  const [destination, setDestination] = React.useState(() => {
    if (initialState?.destination && initialState?.destination !== SEARCH_VALS.DESTINATION_ALL) return initialState.destination;
    return onlyOneSede || "";
  });

  const {
    checkIn, checkOut, invalidState, handlePickDate
  } = useDateSelection(initialState?.checkIn || "", initialState?.checkOut || "", active, setActive, lastUserActivatedSection);

  const { adults, setAdults, children, setChildren, pets, setPets } = useGuestsSelection(initialState?.adults, initialState?.children, initialState?.pets);

  // 2. Event Handlers
  const handleSearchTrigger = () => {
    if (!validateSearch(destination, checkIn, checkOut, onlyOneSede)) return;
    clearError();
    setActive(null);
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      if (onSearch) onSearch({ destination: destination || SEARCH_VALS.DESTINATION_ALL, checkIn, checkOut, adults, children, pets });
    }, TIMEOUTS.SEARCH_TRIGGER_DELAY);
  };

  return (
    <div ref={containerRef} className={`${S.container} ${className}`}>
      {isHero && (
        <HeroCalendarFloat
          active={active} hasHeroCalendarOpened={hasHeroCalendarOpened}
          checkIn={checkIn} checkOut={checkOut} invalidState={invalidState} onPickDate={handlePickDate}
        />
      )}

      <SearchBarBar
        isHero={isHero} size={size} active={active} setActive={setActive}
        activateSection={activateSection} hasHeroCalendarOpened={hasHeroCalendarOpened}
        setHasHeroCalendarOpened={setHasHeroCalendarOpened} onHeroCalendarOpen={onHeroCalendarOpen}
        destination={destination} setDestination={setDestination}
        checkIn={checkIn} checkOut={checkOut}
        adults={adults} setAdults={setAdults}
        children={children} setChildren={setChildren}
        pets={pets} setPets={setPets}
        isSearching={isSearching} handleSearchTrigger={handleSearchTrigger}
        fieldHasError={fieldHasError} isShaking={isShaking}
        validationError={validationError} clearError={clearError}
        handlePickDate={handlePickDate} invalidState={invalidState}
      />
    </div>
  );
}
