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

import type { PackageCardProps } from "../domain/types";
import { PACKAGE_CARD_STYLES } from "../../../theme/rooms.theme";
import { useI18n } from "@/locales";
import { ROOM_ANIMATION } from "../constants/rooms.constants";
import { usePackageCardState } from "../hooks/usePackageCardState";
import { RoomRangeCalendar } from "./sub-components/RoomRangeCalendar";
import { PackageCardHeader } from "./sub-components/PackageCardHeader";
import { PackageCardSummary } from "./sub-components/PackageCardSummary";
import { PackageCardCTA } from "./sub-components/PackageCardCTA";

export function PackageCard({ pkg, index }: PackageCardProps) {
  const { t } = useI18n();
  const primaryRoom = pkg.rooms[0];
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
    </div>
  );
}
