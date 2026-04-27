/**
 * @file RoomCardCTA.tsx — Conditional call-to-action orchestrator.
 *
 * Renders one of three CTA states based on `(hasDates, isAvailable, isLoading)`:
 *
 *  1. No dates selected → "Ver disponibilidad" ghost button → opens
 *     RoomAvailabilityCalendar (room-specific calendar popover showing
 *     available dates with emerald highlights, unavailable dates faded).
 *
 *  2. Dates set + available → filled "Reservar" button with spinner while `isReserving`.
 *
 *  3. Dates set + unavailable → unavailable label + "Ver fechas libres" button
 *     also opens the RoomAvailabilityCalendar.
 *
 * NO guest panel / QuickSearchDialog — that feature has been removed in favor
 * of the room-specific availability calendar as the primary pre-search CTA.
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { ROOM_CARD_STYLES as S } from "../../../../theme/rooms.theme";
import { useRoomsContext } from "../../context/RoomsContext";
import { useRoomAvailability } from "../../hooks/useRoomAvailability";
import { useI18n } from "@/locales";
import { ROOM_MOCK } from "../../constants/rooms.constants";
import { RoomRangeCalendar } from "./RoomRangeCalendar";
import type { Room } from "../../domain/types";

interface RoomCardCTAProps {
  room: Room;
}

export function RoomCardCTA({ room }: RoomCardCTAProps) {
  const { t } = useI18n();
  const { hasDates, searchDates } = useRoomsContext();

  const { isAvailable, isLoading } = useRoomAvailability(
    room.id,
    searchDates?.checkIn,
    searchDates?.checkOut,
    room.availableDates,
  );

  const [isReserving, setIsReserving] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Close calendar when clicking outside
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isCalendarOpen) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isCalendarOpen]);

  const handleReserve = () => {
    setIsReserving(true);
    setTimeout(() => {
      setIsReserving(false);
      // TODO: navigate to booking flow when route is defined
    }, ROOM_MOCK.RESERVE_DELAY_MS);
  };

  return (
    <div ref={wrapperRef} className={`${S.ctaWrapper} relative`}>
      {/* ── Room availability calendar (shared by both no-dates and unavailable states) */}
      {isCalendarOpen && (
        <RoomRangeCalendar
          availableDates={room.availableDates}
          location={room.location}
          onClose={() => setIsCalendarOpen(false)}
        />
      )}

      {/* ── No dates selected ────────────────────────────── */}
      {!hasDates && (
        <button
          type="button"
          className={S.checkDatesBtn}
          onClick={() => setIsCalendarOpen((v) => !v)}
          aria-expanded={isCalendarOpen}
          aria-label={t.ROOMS.CHECK_DATES_ACTION}
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {t.ROOMS.CHECK_DATES_ACTION}
        </button>
      )}

      {/* ── Dates selected + loading ──────────────────────── */}
      {hasDates && isLoading && (
        <button type="button" className={S.reserveBtn} disabled aria-busy="true">
          <svg className={S.reserveBtnLoader} viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Verificando...
        </button>
      )}

      {/* ── Dates + available ─────────────────────────────── */}
      {hasDates && !isLoading && isAvailable && (
        <button
          type="button"
          className={S.reserveBtn}
          onClick={handleReserve}
          disabled={isReserving}
          aria-busy={isReserving}
        >
          {isReserving ? (
            <>
              <svg className={S.reserveBtnLoader} viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {t.ROOMS.LOADING_RESERVE}
            </>
          ) : (
            <>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              {t.ROOMS.RESERVE_ACTION}
            </>
          )}
        </button>
      )}

      {/* ── Dates + unavailable ──────────────────────────── */}
      {hasDates && !isLoading && !isAvailable && (
        <>
          <p className={S.unavailableLabel}>{t.ROOMS.UNAVAILABLE_LABEL}</p>
          <button
            type="button"
            className={S.seeFreeDatesBtn}
            onClick={() => setIsCalendarOpen((v) => !v)}
            aria-expanded={isCalendarOpen}
          >
            {t.ROOMS.SEE_FREE_DATES}
          </button>
        </>
      )}
    </div>
  );
}
