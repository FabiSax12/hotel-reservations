/**
 * @file RoomCard.tsx — Individual room result card orchestrator.
 *
 * Shows:
 * - Image panel with last room badge and capacity badge
 * - Room title and amenity chips
 * - Admin tip quote and description
 * - Price tier with conditional CTA
 */

"use client";

import type { RoomCardProps } from "../domain/types";
import { ROOM_CARD_STYLES as S } from "../../../theme/rooms.theme";
import { useRoomsContext } from "../context/RoomsContext";
import { useRoomAvailability } from "../hooks/useRoomAvailability";
import { RoomImagePanel } from "./RoomImagePanel";
import { RoomCardHeader } from "./sub-components/RoomCardHeader";
import { RoomCardMeta } from "./sub-components/RoomCardMeta";
import { RoomPriceTier } from "./RoomPriceTier";
import { ROOM_ANIMATION } from "../constants/rooms.constants";

export function RoomCard({ room, index, selectedDest }: RoomCardProps) {
  const { hasDates, searchDates } = useRoomsContext();
  const { isAvailable, isLoading } = useRoomAvailability(
    room.id,
    searchDates?.checkIn,
    searchDates?.checkOut,
    room.availableDates,
  );

  const isUnavailable = hasDates && !isLoading && !isAvailable;

  return (
    <article
      className={S.card(isUnavailable)}
      style={{
        animationDelay: `${index * ROOM_ANIMATION.CASCADE_DELAY_MS}ms`,
        animationDuration: `${ROOM_ANIMATION.ENTRANCE_DURATION_MS}ms`,
      }}
      aria-label={room.title}
    >
      {/* Hover glow overlay */}
      <div className={S.cardHoverGlow} aria-hidden="true" />

      {/* Left: image panel with badges */}
      <RoomImagePanel room={room} />

      {/* Right: card body */}
      <div className={S.body}>
        <div className={S.bodyHeader}>
          <RoomCardHeader room={room} selectedDest={selectedDest} />
        </div>

        <RoomCardMeta room={room} />

        {/* Price tier + conditional CTA */}
        <RoomPriceTier room={room} />
      </div>
    </article>
  );
}
