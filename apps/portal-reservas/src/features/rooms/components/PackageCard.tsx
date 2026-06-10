/**
 * @file PackageCard.tsx — Room package card orchestrator (US-DM-04).
 *
 * Mirrors RoomCard's horizontal layout (image collage + body with package
 * label, room summary, price and conditional CTA) and opens the detail panel
 * when clicked. The expand toggle and the package's individual room cards live
 * in PackageCardExpansion.
 */

"use client";

import { useRef } from "react";
import { SELECTION_KIND } from "@/features/room-detail";
import { useI18n } from "@/locales";
import { PACKAGE_CARD_STYLES, ROOM_CARD_STYLES } from "../../../theme/rooms.theme";
import { ROOM_ANIMATION } from "../constants/rooms.constants";
import type { PackageCardProps } from "../domain/types";
import { usePackageCardState } from "../hooks/usePackageCardState";
import { useReserveAction } from "../hooks/useReserveAction";
import { useRoomDetailToggle } from "../hooks/useRoomDetailToggle";
import { PackageCardCTA } from "./sub-components/PackageCardCTA";
import { PackageCardExpansion } from "./sub-components/PackageCardExpansion";
import { PackageCardHeader } from "./sub-components/PackageCardHeader";
import { PackageCardSummary } from "./sub-components/PackageCardSummary";
import { RoomRangeCalendar } from "./sub-components/RoomRangeCalendar";

export function PackageCard({ pkg, index, selectedDest }: PackageCardProps) {
  const { t } = useI18n();
  const primaryRoom = pkg.rooms[0];
  const { isActive, handleOpenDetail } = useRoomDetailToggle({
    kind: SELECTION_KIND.PACKAGE,
    pkg,
  });
  const ctaRef = useRef<HTMLDivElement>(null);
  const {
    wrapperRef,
    calendarRef,
    hasDates,
    isAvailable,
    isLoading,
    isUnavailable,
    isCalendarOpen,
    toggleCalendar,
    closeCalendar,
  } = usePackageCardState(primaryRoom.availableDates);
  const { reserve, isReserving } = useReserveAction();

  return (
    <div ref={wrapperRef}>
      <article
        className={`${PACKAGE_CARD_STYLES.card(isUnavailable)} ${isActive ? PACKAGE_CARD_STYLES.cardActive : ""}`}
        style={{
          animationDelay: `${index * ROOM_ANIMATION.CASCADE_DELAY_MS}ms`,
          animationDuration: `${ROOM_ANIMATION.ENTRANCE_DURATION_MS}ms`,
        }}
        aria-label={t.ROOMS.PACKAGE_LABEL.replace("{count}", String(pkg.rooms.length))}
      >
        {/* Whole-card trigger — opens the package detail panel */}
        <button
          type="button"
          className={ROOM_CARD_STYLES.triggerOverlay}
          onClick={handleOpenDetail}
          aria-expanded={isActive}
          aria-label={t.ROOM_DETAIL.OPEN_LABEL.replace(
            "{title}",
            t.ROOMS.PACKAGE_LABEL.replace("{count}", String(pkg.rooms.length)),
          )}
        />

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
          <div
            ref={ctaRef}
            className={`${PACKAGE_CARD_STYLES.ctaWrapperRelative} ${ROOM_CARD_STYLES.triggerRaised}`}
          >
            {/* Calendar portal — rendered at document.body to escape overflow-hidden */}
            {isCalendarOpen && (
              <RoomRangeCalendar
                availableDates={primaryRoom.availableDates}
                location={primaryRoom.location}
                roomId={primaryRoom.id}
                onClose={closeCalendar}
                anchorRef={ctaRef}
                onPortalRef={(el) => {
                  calendarRef.current = el;
                }}
              />
            )}

            <PackageCardCTA
              hasDates={hasDates}
              isAvailable={isAvailable}
              isLoading={isLoading}
              isReserving={isReserving}
              isCalendarOpen={isCalendarOpen}
              onToggleCalendar={toggleCalendar}
              onReserve={() => reserve(pkg.rooms)}
            />
          </div>
        </PackageCardSummary>
      </article>

      {/* Expand toggle + the package's individual room cards */}
      <PackageCardExpansion pkg={pkg} selectedDest={selectedDest} />
    </div>
  );
}
