/**
 * @file PackageCard.tsx — Room package card orchestrator (US-DM-04).
 *
 * Mirrors RoomCard's horizontal layout:
 * - Image collage panel on left (same dimensions as RoomCard image panel)
 * - Body on right with package label, room summary, price, and CTA
 *
 * CTA behavior matches RoomCard:
 * - No dates → "Ver disponibilidad" ghost button
 * - Dates + available → "Reservar paquete" filled button
 * - Dates + unavailable → "No disponible" + "Ver fechas libres"
 * - Loading → "Verificando..." spinner
 */

"use client";

import { useState, useRef, useEffect } from "react";
import type { PackageCardProps } from "../domain/types";
import { PACKAGE_CARD_STYLES as PS } from "../../../theme/rooms.theme";
import { useI18n } from "@/locales";
import { useRoomsContext } from "../context/RoomsContext";
import { useRoomAvailability } from "../hooks/useRoomAvailability";
import { ROOM_ANIMATION, ROOM_MOCK } from "../constants/rooms.constants";
import { RoomRangeCalendar } from "./sub-components/RoomRangeCalendar";
import { CTASpinner } from "./sub-components/CTASpinner";
import { PackageCardHeader } from "./sub-components/PackageCardHeader";
import { PackageCardSummary } from "./sub-components/PackageCardSummary";

export function PackageCard({ pkg, index }: PackageCardProps) {
  const { t } = useI18n();
  const { hasDates, searchDates } = useRoomsContext();
  const [isReserving, setIsReserving] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Check availability using primary room (most expensive).
  const primaryRoom = pkg.rooms[0];
  const { isAvailable, isLoading } = useRoomAvailability(
    primaryRoom.id,
    searchDates?.checkIn,
    searchDates?.checkOut,
    primaryRoom.availableDates,
  );

  const isUnavailable = hasDates && !isLoading && !isAvailable;

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
    setTimeout(() => { setIsReserving(false); }, ROOM_MOCK.RESERVE_DELAY_MS);
  };

  const toggleCalendar = () => setIsCalendarOpen((v) => !v);

  return (
    <div ref={wrapperRef}>
      <article
        className={PS.card(isUnavailable)}
        style={{
          animationDelay: `${index * ROOM_ANIMATION.CASCADE_DELAY_MS}ms`,
          animationDuration: `${ROOM_ANIMATION.ENTRANCE_DURATION_MS}ms`,
        }}
        aria-label={t.ROOMS.PACKAGE_LABEL.replace("{count}", String(pkg.rooms.length))}
      >
        {/* Hover glow overlay */}
        <div className={PS.cardHoverGlow} aria-hidden="true" />

        {/* Left: image collage panel */}
        <PackageCardHeader rooms={pkg.rooms} isHomogeneous={pkg.isHomogeneous} />

        {/* Right: body with package label, room list, price, and CTA */}
        <PackageCardSummary
          rooms={pkg.rooms}
          totalCapacity={pkg.totalCapacity}
          totalPricePerNight={pkg.totalPricePerNight}
        >
          {/* CTA slot — inline with price */}
          <div className={PS.ctaWrapperRelative}>
            {/* Inline calendar popover */}
            {isCalendarOpen && (
              <RoomRangeCalendar
                availableDates={primaryRoom.availableDates}
                location={primaryRoom.location}
                onClose={() => setIsCalendarOpen(false)}
              />
            )}

            {/* STATE 1 — No dates selected */}
            {!hasDates && (
              <button
                type="button"
                className={PS.checkDatesBtn}
                onClick={toggleCalendar}
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
                onClick={handleReserve}
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
                  onClick={toggleCalendar}
                  aria-expanded={isCalendarOpen}
                >
                  {t.ROOMS.SEE_FREE_DATES}
                </button>
              </>
            )}
          </div>
        </PackageCardSummary>
      </article>
    </div>
  );
}
