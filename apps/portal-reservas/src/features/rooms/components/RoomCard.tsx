/**
 * @file RoomCard.tsx — Individual room result card orchestrator.
 *
 * Shows:
 * - Image panel with last room badge and capacity badge
 * - Room title and amenity chips
 * - Admin tip quote and description
 * - Price tier with conditional CTA
 *
 * The whole card is a trigger that opens the room detail panel (US-DM-05);
 * the CTA region is raised above the trigger so it stays independently clickable.
 */

"use client";

import { ROOM_CARD_STYLES as S } from "../../../theme/rooms.theme";
import { useI18n } from "@/locales";
import { ROOM_ANIMATION } from "../constants/rooms.constants";
import { useRoomsContext } from "../context/RoomsContext";
import type { RoomCardProps } from "../domain/types";
import { useRoomAvailability } from "../hooks/useRoomAvailability";
import { RoomImagePanel } from "./RoomImagePanel";
import { RoomPriceTier } from "./RoomPriceTier";
import { useRoomDetail } from "./room-detail-panel";
import { RoomCardHeader } from "./sub-components/RoomCardHeader";
import { RoomCardMeta } from "./sub-components/RoomCardMeta";

export function RoomCard({ room, index, selectedDest }: RoomCardProps) {
  const { t } = useI18n();
  const { hasDates, searchDates } = useRoomsContext();
  const { selection, isOpen, openRoom, close } = useRoomDetail();
  const { isAvailable, isLoading } = useRoomAvailability(
    room.id,
    searchDates?.checkIn,
    searchDates?.checkOut,
    room.availableDates,
  );

  const isUnavailable = hasDates && !isLoading && !isAvailable;
  const isActive = isOpen && selection?.kind === "room" && selection.room.id === room.id;

  const handleOpenDetail = () => {
    if (isActive) close();
    else openRoom(room);
  };

  return (
    <article
      className={`${S.card(isUnavailable)} ${isActive ? S.cardActive : ""}`}
      style={{
        animationDelay: `${index * ROOM_ANIMATION.CASCADE_DELAY_MS}ms`,
        animationDuration: `${ROOM_ANIMATION.ENTRANCE_DURATION_MS}ms`,
      }}
      aria-label={room.title}
    >
      {/* Whole-card trigger — opens the detail panel (CTA is raised above it) */}
      <button
        type="button"
        className={S.triggerOverlay}
        onClick={handleOpenDetail}
        aria-expanded={isActive}
        aria-label={t.ROOMS.DETAIL_OPEN_LABEL.replace("{title}", room.title)}
      />

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
