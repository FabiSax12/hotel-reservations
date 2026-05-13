/**
 * @file PackageCardCTA.tsx — CTA section for the PackageCard.
 *
 * Renders one of four states based on date selection and availability:
 * 1. No dates → "Ver disponibilidad" ghost button (opens calendar)
 * 2. Dates + loading → "Verificando..." spinner
 * 3. Dates + available → "Reservar paquete" filled button
 * 4. Dates + unavailable → "No disponible" + "Ver fechas libres"
 */

"use client";

import type { PackageCardCTAProps } from "../../domain/types";
import { PACKAGE_CARD_STYLES as PS } from "../../../../theme/rooms.theme";
import { useI18n } from "@/locales";
import { CTASpinner } from "./CTASpinner";

export function PackageCardCTA({
  primaryRoom,
  hasDates,
  isAvailable,
  isLoading,
  isReserving,
  isCalendarOpen,
  onToggleCalendar,
  onReserve,
}: PackageCardCTAProps) {
  const { t } = useI18n();

  return (
    <>
      {/* STATE 1 — No dates selected */}
      {!hasDates && (
        <button
          type="button"
          className={PS.checkDatesBtn}
          onClick={onToggleCalendar}
          aria-expanded={isCalendarOpen}
          aria-label={t.ROOMS.CHECK_DATES_ACTION}
        >
          <svg className={PS.ctaBtnCalendarIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {t.ROOMS.CHECK_DATES_ACTION}
        </button>
      )}

      {/* STATE 2 — Dates selected, loading */}
      {hasDates && isLoading && (
        <button type="button" className={PS.reserveBtn} disabled aria-busy="true">
          <CTASpinner /> {t.ROOMS.VERIFYING}
        </button>
      )}

      {/* STATE 3a — Dates selected, available */}
      {hasDates && !isLoading && isAvailable && (
        <button
          type="button"
          className={PS.reserveBtn}
          onClick={onReserve}
          disabled={isReserving}
          aria-busy={isReserving}
        >
          {isReserving ? (
            <><CTASpinner /> {t.ROOMS.LOADING_RESERVE}</>
          ) : (
            <>
              <svg className={PS.ctaBtnArrowIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              {t.ROOMS.PACKAGE_RESERVE}
            </>
          )}
        </button>
      )}

      {/* STATE 3b — Dates selected, unavailable */}
      {hasDates && !isLoading && !isAvailable && (
        <>
          <p className={PS.unavailableLabel}>{t.ROOMS.UNAVAILABLE_LABEL}</p>
          <button
            type="button"
            className={PS.seeFreeDatesBtn}
            onClick={onToggleCalendar}
            aria-expanded={isCalendarOpen}
          >
            {t.ROOMS.SEE_FREE_DATES}
          </button>
        </>
      )}
    </>
  );
}
