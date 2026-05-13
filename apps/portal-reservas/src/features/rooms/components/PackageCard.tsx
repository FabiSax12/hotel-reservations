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
import { PackageCardHeader } from "./sub-components/PackageCardHeader";
import { PackageCardSummary } from "./sub-components/PackageCardSummary";
import { PackageCardCTA } from "./sub-components/PackageCardCTA";

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

            <PackageCardCTA
              primaryRoom={primaryRoom}
              hasDates={hasDates}
              isAvailable={isAvailable}
              isLoading={isLoading}
              isReserving={isReserving}
              isCalendarOpen={isCalendarOpen}
              onToggleCalendar={toggleCalendar}
              onReserve={handleReserve}
            />
          </div>
        </PackageCardSummary>
      </article>
    </div>
  );
}
