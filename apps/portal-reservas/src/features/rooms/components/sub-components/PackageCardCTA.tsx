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

import { useI18n } from "@/locales";
import { PACKAGE_CARD_STYLES } from "../../../../theme/rooms.theme";
import { CTA_ICON_PATHS } from "../../constants/cta-icons.const";
import type { PackageCardCTAProps } from "../../domain/types";
import { CTASpinner } from "./CTASpinner";
import { CtaIcon } from "./CtaIcon";

export function PackageCardCTA({
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
          className={PACKAGE_CARD_STYLES.checkDatesBtn}
          onClick={onToggleCalendar}
          aria-expanded={isCalendarOpen}
          aria-label={t.ROOMS.CHECK_DATES_ACTION}
        >
          <CtaIcon
            path={CTA_ICON_PATHS.calendar}
            className={PACKAGE_CARD_STYLES.ctaBtnCalendarIcon}
            strokeWidth={2}
          />
          {t.ROOMS.CHECK_DATES_ACTION}
        </button>
      )}

      {/* STATE 2 — Dates selected, loading */}
      {hasDates && isLoading && (
        <button type="button" className={PACKAGE_CARD_STYLES.reserveBtn} disabled aria-busy="true">
          <CTASpinner /> {t.ROOMS.VERIFYING}
        </button>
      )}

      {/* STATE 3a — Dates selected, available */}
      {hasDates && !isLoading && isAvailable && (
        <button
          type="button"
          className={PACKAGE_CARD_STYLES.reserveBtn}
          onClick={onReserve}
          disabled={isReserving}
          aria-busy={isReserving}
        >
          {isReserving ? (
            <>
              <CTASpinner /> {t.ROOMS.LOADING_RESERVE}
            </>
          ) : (
            <>
              <CtaIcon
                path={CTA_ICON_PATHS.chevronRight}
                className={PACKAGE_CARD_STYLES.ctaBtnArrowIcon}
                strokeWidth={2.5}
              />
              {t.ROOMS.PACKAGE_RESERVE}
            </>
          )}
        </button>
      )}

      {/* STATE 3b — Dates selected, unavailable */}
      {hasDates && !isLoading && !isAvailable && (
        <>
          <p className={PACKAGE_CARD_STYLES.unavailableLabel}>{t.ROOMS.UNAVAILABLE_LABEL}</p>
          <button
            type="button"
            className={PACKAGE_CARD_STYLES.seeFreeDatesBtn}
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
