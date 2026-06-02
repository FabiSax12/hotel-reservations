/**
 * @file RoomCardCTA.tsx — Conditional call-to-action orchestrator.
 *
 * Renders one of three CTA states based on `(hasDates, isAvailable, isLoading)`:
 *  1. No dates → "Ver disponibilidad" ghost button → opens RoomRangeCalendar.
 *  2. Dates + available → "Reservar" button with spinner.
 *  3. Dates + unavailable → label + "Ver fechas libres" button.
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { ROOM_CARD_STYLES } from "../../../../theme/rooms.theme";
import { useRoomsContext } from "../../context/RoomsContext";
import { useRoomAvailability } from "../../hooks/useRoomAvailability";
import { useI18n } from "@/locales";
import { ROOM_MOCK } from "../../constants/rooms.constants";
import { RoomRangeCalendar } from "./RoomRangeCalendar";
import { CTASpinner } from "./CTASpinner";
import type { RoomCardCTAProps } from "../../domain/types";

const SVG_VIEW_BOX = "0 0 24 24";
const CALENDAR_ICON_PATH =
  "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z";
const CHEVRON_RIGHT_ICON_PATH = "M9 5l7 7-7 7";

export function RoomCardCTA({ room }: RoomCardCTAProps) {
  const { t } = useI18n();
  const { hasDates, searchDates } = useRoomsContext();
  const { isAvailable, isLoading } = useRoomAvailability(
    room.id, searchDates?.checkIn, searchDates?.checkOut, room.availableDates,
  );

  const [isReserving, setIsReserving] = useState(false);
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
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isCalendarOpen]);

  const handleReserve = () => {
    setIsReserving(true);
    setTimeout(() => { setIsReserving(false); }, ROOM_MOCK.RESERVE_DELAY_MS);
  };

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
          onPortalRef={(el) => { calendarRef.current = el; }}
        />
      )}

      {/* STATE 1 — No dates selected: prompt the user to pick dates inside a calendar */}
      {!hasDates && (
        <button type="button" className={ROOM_CARD_STYLES.checkDatesBtn} onClick={toggleCalendar}
          aria-expanded={isCalendarOpen} aria-label={t.ROOMS.CHECK_DATES_ACTION}>
          <svg className={ROOM_CARD_STYLES.ctaBtnCalendarIcon} fill="none" viewBox={SVG_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={CALENDAR_ICON_PATH} />
          </svg>
          {t.ROOMS.CHECK_DATES_ACTION}
        </button>
      )}

      {/* STATE 2 — Dates selected, availability still loading: show disabled verifying button */}
      {hasDates && isLoading && (
        <button type="button" className={ROOM_CARD_STYLES.reserveBtn} disabled aria-busy="true">
          <CTASpinner /> {t.ROOMS.VERIFYING}
        </button>
      )}

      {/* STATE 3a — Dates selected, room available: primary reserve action */}
      {hasDates && !isLoading && isAvailable && (
        <button type="button" className={ROOM_CARD_STYLES.reserveBtn} onClick={handleReserve}
          disabled={isReserving} aria-busy={isReserving}>
          {isReserving ? (
            <><CTASpinner /> {t.ROOMS.LOADING_RESERVE}</>
          ) : (
            <>
              <svg className={ROOM_CARD_STYLES.ctaBtnArrowIcon} fill="none" viewBox={SVG_VIEW_BOX} stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={CHEVRON_RIGHT_ICON_PATH} />
              </svg>
              {t.ROOMS.RESERVE_ACTION}
            </>
          )}
        </button>
      )}

      {/* STATE 3b — Dates selected, room unavailable: show opaque label + free-dates trigger */}
      {hasDates && !isLoading && !isAvailable && (
        <>
          <p className={ROOM_CARD_STYLES.unavailableLabel}>{t.ROOMS.UNAVAILABLE_LABEL}</p>
          <button type="button" className={ROOM_CARD_STYLES.seeFreeDatesBtn} onClick={toggleCalendar}
            aria-expanded={isCalendarOpen}>
            {t.ROOMS.SEE_FREE_DATES}
          </button>
        </>
      )}
    </div>
  );
}
