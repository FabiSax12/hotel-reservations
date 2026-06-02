/**
 * @file RoomCardCTA.tsx — Conditional call-to-action orchestrator.
 *
 * Renders one of three CTA states based on `(hasDates, isAvailable, isLoading)`:
 *  1. No dates → "Ver disponibilidad" ghost button → opens RoomRangeCalendar.
 *  2. Dates + available → "Reservar" button → routes to the confirmation flow.
 *  3. Dates + unavailable → label + "Ver fechas libres" button.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { DOM_EVENTS } from "@/constants/dom-events.constants";
import { useI18n } from "@/locales";
import { ROOM_CARD_STYLES } from "../../../../theme/rooms.theme";
import { CTA_ICON_PATHS, CTA_ICON_VIEW_BOX } from "../../constants/cta-icons.const";
import { useRoomsContext } from "../../context/RoomsContext";
import type { RoomCardCTAProps } from "../../domain/types";
import { useReserveAction } from "../../hooks/useReserveAction";
import { useRoomAvailability } from "../../hooks/useRoomAvailability";
import { CTASpinner } from "./CTASpinner";
import { RoomRangeCalendar } from "./RoomRangeCalendar";

export function RoomCardCTA({ room }: RoomCardCTAProps) {
  const { t } = useI18n();
  const { hasDates, searchDates } = useRoomsContext();
  const { isAvailable, isLoading } = useRoomAvailability(
    room.id,
    searchDates?.checkIn,
    searchDates?.checkOut,
    room.availableDates,
  );
  const { reserve, isReserving } = useReserveAction();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isCalendarOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (wrapperRef.current?.contains(target) || calendarRef.current?.contains(target)) return;
      setIsCalendarOpen(false);
    };
    document.addEventListener(DOM_EVENTS.MOUSEDOWN, handler);
    return () => document.removeEventListener(DOM_EVENTS.MOUSEDOWN, handler);
  }, [isCalendarOpen]);

  const toggleCalendar = () => setIsCalendarOpen((v) => !v);

  return (
    <div ref={wrapperRef} className={ROOM_CARD_STYLES.ctaWrapperRelative}>
      {/* Inline calendar popover — rendered for both "no dates" and "unavailable" states */}
      {isCalendarOpen && (
        <RoomRangeCalendar
          availableDates={room.availableDates}
          location={room.location}
          roomId={room.id}
          onClose={() => setIsCalendarOpen(false)}
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
          <svg
            className={ROOM_CARD_STYLES.ctaBtnCalendarIcon}
            fill="none"
            aria-hidden="true"
            viewBox={CTA_ICON_VIEW_BOX}
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={CTA_ICON_PATHS.calendar} />
          </svg>
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
              <svg
                className={ROOM_CARD_STYLES.ctaBtnArrowIcon}
                fill="none"
                aria-hidden="true"
                viewBox={CTA_ICON_VIEW_BOX}
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={CTA_ICON_PATHS.chevronRight}
                />
              </svg>
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
