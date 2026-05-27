/**
 * @file PackageCard.tsx — Room package card orchestrator (US-DM-04).
 *
 * Mirrors RoomCard's horizontal layout:
 * - Image collage panel on left (same dimensions as RoomCard image panel)
 * - Body on right with package label, room summary, price, and CTA
 * - Expand toggle below the card for component room cards
 *
 * CTA behavior matches RoomCard:
 * - No dates → "Ver disponibilidad" ghost button
 * - Dates + available → "Reservar paquete" filled button
 * - Dates + unavailable → "No disponible" + "Ver fechas libres"
 * - Loading → "Verificando..." spinner
 */

"use client";

import { useState } from "react";
import type { PackageCardProps } from "../domain/types";
import { PACKAGE_CARD_STYLES } from "../../../theme/rooms.theme";
import { useI18n } from "@/locales";
import { ROOM_ANIMATION } from "../constants/rooms.constants";
import { usePackageCardState } from "../hooks/usePackageCardState";
import { RoomCard } from "./RoomCard";
import { RoomRangeCalendar } from "./sub-components/RoomRangeCalendar";
import { PackageCardHeader } from "./sub-components/PackageCardHeader";
import { PackageCardSummary } from "./sub-components/PackageCardSummary";
import { PackageCardCTA } from "./sub-components/PackageCardCTA";

export function PackageCard({ pkg, index, selectedDest }: PackageCardProps) {
  const { t } = useI18n();
  const primaryRoom = pkg.rooms[0];
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    wrapperRef,
    hasDates,
    isAvailable,
    isLoading,
    isReserving,
    isUnavailable,
    isCalendarOpen,
    handleReserve,
    toggleCalendar,
    closeCalendar,
  } = usePackageCardState(primaryRoom);

  return (
    <div ref={wrapperRef}>
      <article
        className={PACKAGE_CARD_STYLES.card(isUnavailable)}
        style={{
          animationDelay: `${index * ROOM_ANIMATION.CASCADE_DELAY_MS}ms`,
          animationDuration: `${ROOM_ANIMATION.ENTRANCE_DURATION_MS}ms`,
        }}
        aria-label={t.ROOMS.PACKAGE_LABEL.replace("{count}", String(pkg.rooms.length))}
      >
        {/* Hover glow overlay */}
        <div className={PACKAGE_CARD_STYLES.cardHoverGlow} aria-hidden="true" />

        {/* Left: image collage panel */}
        <PackageCardHeader rooms={pkg.rooms} isHomogeneous={pkg.isHomogeneous} />

        {/* Right: body with package label, room list, price, and CTA */}
        <PackageCardSummary
          rooms={pkg.rooms}
          totalCapacity={pkg.totalCapacity}
          totalPricePerNight={pkg.totalPricePerNight}
        >
          {/* CTA slot — inline with price */}
          <div className={PACKAGE_CARD_STYLES.ctaWrapperRelative}>
            {/* Inline calendar popover */}
            {isCalendarOpen && (
              <RoomRangeCalendar
                availableDates={primaryRoom.availableDates}
                location={primaryRoom.location}
                roomId={primaryRoom.id}
                onClose={closeCalendar}
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
        className={PACKAGE_CARD_STYLES.expandBtn}
        onClick={() => setIsExpanded((v) => !v)}
        aria-expanded={isExpanded}
      >
        <span>
          {isExpanded
            ? t.ROOMS.PACKAGE_COLLAPSE
            : t.ROOMS.PACKAGE_EXPAND.replace("{count}", String(pkg.rooms.length))}
        </span>
        <span className={PACKAGE_CARD_STYLES.expandIcon(isExpanded)}>▼</span>
      </button>

      {/* Expanded component rooms */}
      <div className={PACKAGE_CARD_STYLES.expansionGrid(isExpanded)} aria-hidden={!isExpanded}>
        <div className={PACKAGE_CARD_STYLES.expansionInner}>
          <div className={PACKAGE_CARD_STYLES.expansionContent}>
            <p className={PACKAGE_CARD_STYLES.expansionTitle}>{t.ROOMS.PACKAGE_ROOMS_TITLE}</p>
            <div className={PACKAGE_CARD_STYLES.expansionGridInner}>
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
    </div>
  );
}
