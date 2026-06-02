/**
 * @file SearchBarFields.tsx — The individual input fields of the search bar.
 */

"use client";

import React from "react";
import { SEARCH_BAR_STYLES } from "../theme/search-bar.theme";
import { SEARCH_SECTIONS } from "../constants/search.constants";
import { formatUIText, formatGuests } from "../utils/search-bar.utils";
import { useI18n } from "@/locales";
import { useSearchBarContext } from "../hooks/useSearchBarContext";
import type { ActiveSection } from "../domain/types";

import { DestinationSection } from "./sections/DestinationSection";
import { DateSection } from "./sections/DateSection";
import { GuestsSection } from "./sections/GuestsSection";
import { SearchButton } from "./sections/SearchButton";

export function SearchBarFields() {
  const {
    size,
    active,
    hasHeroCalendarOpened,
    destination,
    checkIn,
    checkOut,
    adults,
    children,
    pets,
    isSearching,
    handleSearchTrigger,
    fieldHasError,
    isShaking,
    validationError,
    activateSection,
    clearError,
  } = useSearchBarContext();

  const sizing = SEARCH_BAR_STYLES.sizing[size];
  const { t, locale } = useI18n();
  const C = t.SEARCH.SEARCH_BAR;

  const sectionClass = (key: ActiveSection, extra: string) =>
    [
      SEARCH_BAR_STYLES.sectionBase,
      sizing.padding,
      extra,
      active === key ? SEARCH_BAR_STYLES.sectionActive : SEARCH_BAR_STYLES.sectionInactive,
      (active === SEARCH_SECTIONS.WHERE || active === SEARCH_SECTIONS.WHO) &&
      hasHeroCalendarOpened &&
      (key === SEARCH_SECTIONS.CHECK_IN || key === SEARCH_SECTIONS.CHECK_OUT)
        ? SEARCH_BAR_STYLES.sectionFaded
        : "",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <>
      <DestinationSection
        isActive={active === SEARCH_SECTIONS.WHERE}
        destination={destination}
        sizing={sizing}
        sectionClass={sectionClass(SEARCH_SECTIONS.WHERE, SEARCH_BAR_STYLES.sectionDestination)}
        onActivate={() => activateSection(SEARCH_SECTIONS.WHERE, clearError)}
        hasError={fieldHasError(SEARCH_SECTIONS.WHERE)}
        isShaking={isShaking && fieldHasError(SEARCH_SECTIONS.WHERE)}
      />

      <div className={SEARCH_BAR_STYLES.divider} />

      <DateSection
        label={C.DATES.CHECK_IN_LABEL}
        placeholder={C.DATES.PLACEHOLDER}
        displayValue={formatUIText(checkIn, locale)}
        sizing={sizing}
        sectionClass={sectionClass(SEARCH_SECTIONS.CHECK_IN, SEARCH_BAR_STYLES.sectionDate)}
        onActivate={() => activateSection(SEARCH_SECTIONS.CHECK_IN, clearError)}
        hasError={fieldHasError(SEARCH_SECTIONS.CHECK_IN)}
        isShaking={isShaking && fieldHasError(SEARCH_SECTIONS.CHECK_IN)}
      />

      <div className={SEARCH_BAR_STYLES.dividerRelative} />

      <DateSection
        label={C.DATES.CHECK_OUT_LABEL}
        placeholder={C.DATES.PLACEHOLDER}
        displayValue={formatUIText(checkOut, locale)}
        sizing={sizing}
        sectionClass={sectionClass(SEARCH_SECTIONS.CHECK_OUT, SEARCH_BAR_STYLES.sectionDate)}
        onActivate={() => activateSection(SEARCH_SECTIONS.CHECK_OUT, clearError)}
        hasError={fieldHasError(SEARCH_SECTIONS.CHECK_OUT)}
        isShaking={isShaking && fieldHasError(SEARCH_SECTIONS.CHECK_OUT)}
      />

      <div className={SEARCH_BAR_STYLES.divider} />

      <GuestsSection
        isActive={active === SEARCH_SECTIONS.WHO}
        guestsText={formatGuests(adults, children, pets, C.GUESTS)}
        sizing={sizing}
        sectionClass={sectionClass(SEARCH_SECTIONS.WHO, SEARCH_BAR_STYLES.sectionGuests)}
        onActivate={() => activateSection(SEARCH_SECTIONS.WHO, clearError)}
      />

      <SearchButton
        isSearching={isSearching}
        iconClass={sizing.searchBtnIcon}
        paddingClass={sizing.searchBtnPad}
        onTrigger={handleSearchTrigger}
        isShaking={isShaking && validationError !== null}
      />
    </>
  );
}
