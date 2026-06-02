/**
 * @file RoomCardCTA.tsx — Conditional call-to-action orchestrator.
 *
 * Renders one of three CTA states based on `(hasDates, isAvailable, isLoading)`:
 *  1. No dates → "Ver disponibilidad" ghost button → opens RoomRangeCalendar.
 *  2. Dates + available → "Reservar" button → routes to the confirmation flow.
 *  3. Dates + unavailable → label + "Ver fechas libres" button.
 */

"use client";

import { useI18n } from "@/locales";
import { ROOM_CARD_STYLES } from "../../../../theme/rooms.theme";
import { CTA_ICON_PATHS } from "../../constants/cta-icons.const";
import type { RoomCardCTAProps } from "../../domain/types";
import { usePackageCardState } from "../../hooks/usePackageCardState";
import { useReserveAction } from "../../hooks/useReserveAction";
import { CTASpinner } from "./CTASpinner";
import { CtaIcon } from "./CtaIcon";
import { RoomRangeCalendar } from "./RoomRangeCalendar";

export function RoomCardCTA({ room }: RoomCardCTAProps) {
  const { t } = useI18n();
  const {
    wrapperRef,
    calendarRef,
    hasDates,
    isAvailable,
    isLoading,
    isCalendarOpen,
    toggleCalendar,
    closeCalendar,
  } = usePackageCardState(room);
  const { reserve, isReserving } = useReserveAction();

  return (
    <div ref={wrapperRef} className={ROOM_CARD_STYLES.ctaWrapperRelative}>
      {/* Inline calendar popover — rendered for both "no dates" and "unavailable" states */}
      {isCalendarOpen && (
        <RoomRangeCalendar
          availableDates={room.availableDates}
          location={room.location}
          roomId={room.id}
          onClose={closeCalendar}
          anchorRef={wrapperRef}
          onPortalRef={(el) => {
            calendarRef.current = el;
          }}
        />
      )}

      {/* STATE 1 — No dates selected: prompt the user to pick dates inside a calendar */}
      {!hasDates && (
        <button
          type="button"
          className={ROOM_CARD_STYLES.checkDatesBtn}
          onClick={toggleCalendar}
          aria-expanded={isCalendarOpen}
          aria-label={t.ROOMS.CHECK_DATES_ACTION}
        >
          <CtaIcon
            path={CTA_ICON_PATHS.calendar}
            className={ROOM_CARD_STYLES.ctaBtnCalendarIcon}
            strokeWidth={2}
          />
          {t.ROOMS.CHECK_DATES_ACTION}
        </button>
      )}

      {/* STATE 2 — Dates selected, availability still loading: disabled verifying button */}
      {hasDates && isLoading && (
        <button type="button" className={ROOM_CARD_STYLES.reserveBtn} disabled aria-busy="true">
          <CTASpinner /> {t.ROOMS.VERIFYING}
        </button>
      )}

      {/* STATE 3a — Dates selected, room available: primary reserve action */}
      {hasDates && !isLoading && isAvailable && (
        <button
          type="button"
          className={ROOM_CARD_STYLES.reserveBtn}
          onClick={() => reserve([room])}
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
                className={ROOM_CARD_STYLES.ctaBtnArrowIcon}
                strokeWidth={2.5}
              />
              {t.ROOMS.RESERVE_ACTION}
            </>
          )}
        </button>
      )}

      {/* STATE 3b — Dates selected, room unavailable: opaque label + free-dates trigger */}
      {hasDates && !isLoading && !isAvailable && (
        <>
          <p className={ROOM_CARD_STYLES.unavailableLabel}>{t.ROOMS.UNAVAILABLE_LABEL}</p>
          <button
            type="button"
            className={ROOM_CARD_STYLES.seeFreeDatesBtn}
            onClick={toggleCalendar}
            aria-expanded={isCalendarOpen}
          >
            {t.ROOMS.SEE_FREE_DATES}
          </button>
        </>
      )}
    </div>
  );
}
