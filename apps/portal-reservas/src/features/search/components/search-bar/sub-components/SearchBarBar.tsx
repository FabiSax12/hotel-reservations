/**
 * @file SearchBarBar.tsx — The interactive bar containing all search sections.
 */

import React from "react";
import { SEARCH_BAR_STYLES as S } from "../theme/search-bar.theme";
import { SEARCH_BAR_UI_CONSTANTS } from "../constants/ui";
import { SEARCH_SECTIONS, SEARCH_VARIANTS } from "../constants/search.constants";

// Sub-components
import { HeroExpandTab } from "./HeroExpandTab";
import { SearchBarFields } from "./SearchBarFields";
import { DestinationPopover } from "./DestinationPopover";
import { CalendarPopover } from "@hotel/ui";
import { ErrorTooltip } from "./ErrorTooltip";

const C = SEARCH_BAR_UI_CONSTANTS;

interface SearchBarBarProps {
  isHero: boolean;
  size: "hero" | "compact";
  active: any;
  setActive: (s: any) => void;
  activateSection: (s: any, cb?: any) => void;
  hasHeroCalendarOpened: boolean;
  setHasHeroCalendarOpened: (v: boolean) => void;
  onHeroCalendarOpen?: () => void;
  destination: string;
  setDestination: (v: string) => void;
  checkIn: string;
  checkOut: string;
  adults: number;
  setAdults: (v: number) => void;
  children: number;
  setChildren: (v: number) => void;
  pets: number;
  setPets: (v: number) => void;
  isSearching: boolean;
  handleSearchTrigger: () => void;
  fieldHasError: (k: string) => boolean;
  isShaking: boolean;
  validationError: any;
  clearError: () => void;
  handlePickDate: (d: string) => void;
  invalidState: any;
}

export function SearchBarBar(props: SearchBarBarProps) {
  const {
    isHero,
    size,
    active,
    setActive,
    activateSection,
    hasHeroCalendarOpened,
    setHasHeroCalendarOpened,
    onHeroCalendarOpen,
    destination,
    setDestination,
    checkIn,
    checkOut,
    adults,
    setAdults,
    children,
    setChildren,
    pets,
    setPets,
    isSearching,
    handleSearchTrigger,
    fieldHasError,
    isShaking,
    validationError,
    clearError,
    handlePickDate,
    invalidState,
  } = props;

  return (
    <div className={S.bar(isHero)}>
      {isHero && (
        <HeroExpandTab
          hasHeroCalendarOpened={hasHeroCalendarOpened}
          active={active}
          onExpand={() => {
            setHasHeroCalendarOpened(true);
            if (onHeroCalendarOpen) onHeroCalendarOpen();
            if (active !== SEARCH_SECTIONS.CHECK_IN && active !== SEARCH_SECTIONS.CHECK_OUT) {
              setActive(SEARCH_SECTIONS.CHECK_IN);
            }
          }}
        />
      )}

      <SearchBarFields
        size={size}
        active={active}
        hasHeroCalendarOpened={hasHeroCalendarOpened}
        destination={destination}
        checkIn={checkIn}
        checkOut={checkOut}
        adults={adults}
        children={children}
        pets={pets}
        isSearching={isSearching}
        handleSearchTrigger={handleSearchTrigger}
        fieldHasError={fieldHasError}
        isShaking={isShaking}
        validationError={validationError}
        activateSection={activateSection}
        clearError={clearError}
        setAdults={setAdults}
        setChildren={setChildren}
        setPets={setPets}
      />

      {active === SEARCH_SECTIONS.WHERE && (
        <DestinationPopover
          variant={size}
          hasCalendarExpanded={hasHeroCalendarOpened}
          onSelect={(v) => {
            setDestination(v);
            activateSection(SEARCH_SECTIONS.CHECK_IN, clearError);
          }}
          currentSelection={destination}
        />
      )}

      {(active === SEARCH_SECTIONS.CHECK_IN || active === SEARCH_SECTIONS.CHECK_OUT) && !isHero && (
        <CalendarPopover
          variant={SEARCH_VARIANTS.COMPACT}
          checkIn={checkIn}
          checkOut={checkOut}
          invalidState={invalidState}
          onPickDate={handlePickDate}
          startLabel={C.DATES.CHECK_IN_LABEL}
          endLabel={C.DATES.CHECK_OUT_LABEL}
        />
      )}

      {validationError && <ErrorTooltip message={validationError.message} />}
    </div>
  );
}
