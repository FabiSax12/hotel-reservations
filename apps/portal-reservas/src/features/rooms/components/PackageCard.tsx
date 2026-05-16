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

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/locales";
import { PACKAGE_CARD_STYLES as PS } from "../../../theme/rooms.theme";
import { ROOM_ANIMATION, ROOM_MOCK } from "../constants/rooms.constants";
import { useRoomsContext } from "../context/RoomsContext";
import type { PackageCardProps } from "../domain/types";
import { useDelayedUnmount } from "../hooks/useDelayedUnmount";
import { useRoomAvailability } from "../hooks/useRoomAvailability";
import { RoomCard } from "./RoomCard";
import { PackageCardCTA } from "./sub-components/PackageCardCTA";
import { PackageCardHeader } from "./sub-components/PackageCardHeader";
import { PackageCardSummary } from "./sub-components/PackageCardSummary";
import { RoomRangeCalendar } from "./sub-components/RoomRangeCalendar";

export function PackageCard({ pkg, index, selectedDest }: PackageCardProps) {
  const { t } = useI18n();
  const { hasDates, searchDates } = useRoomsContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReserving, setIsReserving] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const shouldRenderExpansion = useDelayedUnmount(isExpanded, 500);

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
    setTimeout(() => {
      setIsReserving(false);
    }, ROOM_MOCK.RESERVE_DELAY_MS);
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
                roomId={primaryRoom.id}
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

      {/* Expand toggle — below the card */}
      <button
        type="button"
        className={PS.expandBtn}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span>
          {isExpanded
            ? t.ROOMS.PACKAGE_COLLAPSE
            : t.ROOMS.PACKAGE_EXPAND.replace("{count}", String(pkg.rooms.length))}
        </span>
        <span className={PS.expandIcon(isExpanded)}>▼</span>
      </button>

      {/* Expanded component rooms — only mount when expanded (or during exit animation) */}
      {shouldRenderExpansion && (
        <div className={PS.expansionGrid(isExpanded)} aria-hidden={!isExpanded}>
          <div className={PS.expansionInner}>
            <div className={PS.expansionContent}>
              <p className={PS.expansionTitle}>{t.ROOMS.PACKAGE_ROOMS_TITLE}</p>
              <div className={PS.expansionGridInner}>
                {pkg.rooms.map((room, i) => (
                  <RoomCard
                    key={`${pkg.id}-${room.id}-${i}`}
                    room={room}
                    index={i}
                    selectedDest={selectedDest}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
