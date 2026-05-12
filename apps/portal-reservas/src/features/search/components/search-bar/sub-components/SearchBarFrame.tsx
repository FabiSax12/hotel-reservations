/**
 * @file SearchBarFrame.tsx — The interactive bar containing all search sections.
 *
 * US-DM-02: Removed HeroExpandTab. The calendar now only opens when the user
 * explicitly clicks Check In or Check Out. The rooms section appears below the
 * hero once a destination is selected.
 */

"use client";

import React from "react";
import { SEARCH_BAR_STYLES as S } from "../theme/search-bar.theme";
import { SEARCH_SECTIONS, SEARCH_VARIANTS } from "../constants/search.constants";
import { useI18n } from "@/locales";
import { useSearchBarContext } from "../hooks/useSearchBarContext";

// Sub-components
import { SearchBarFields } from "./SearchBarFields";
import { DestinationPopover } from "./DestinationPopover";
import { CalendarPopover } from "@hotel/ui";
import { ErrorTooltip } from "./ErrorTooltip";

export function SearchBarFrame() {
  const {
    isHero,
    active,
    checkIn,
    checkOut,
    validationError,
    invalidState,
    handlePickDate,
  } = useSearchBarContext();

  const { t } = useI18n();
  const C = t.SEARCH.SEARCH_BAR;

  return (
    <div className={S.bar(isHero)}>
      <SearchBarFields />

      {active === SEARCH_SECTIONS.WHERE && (
        <DestinationPopover />
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
