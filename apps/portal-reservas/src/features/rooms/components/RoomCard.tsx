/**
 * @file RoomCard.tsx — Individual room result card orchestrator.
 *
 * Refactored in US-DM-02 to:
 *  - Consume `RoomsContext` for expansion state and unavailability styling.
 *  - Delegate image panel to `RoomImagePanel` with a dedicated detail-view trigger.
 *  - Delegate header/meta to new sub-components `RoomCardHeader` and `RoomCardMeta`.
 *  - Render room details in a smooth fixed popover instead of inline card expansion.
 *  - Apply opacity reduction when dates are set but the room is unavailable.
 *
 * Expansion state is managed via `useRoomExpansion` which reads from the shared
 * `RoomsContext`, enforcing the "only one card open at a time" rule.
 */

"use client";

import type { RoomCardProps } from "../domain/types";
import { ROOM_CARD_STYLES as S } from "../../../theme/rooms.theme";
import { useRoomsContext } from "../context/RoomsContext";
import { useRoomExpansion } from "../hooks/useRoomExpansion";
import { useRoomAvailability } from "../hooks/useRoomAvailability";
import { RoomImagePanel } from "./RoomImagePanel";
import { RoomCardHeader } from "./sub-components/RoomCardHeader";
import { RoomCardMeta } from "./sub-components/RoomCardMeta";
import { RoomDetailsPopover } from "./sub-components/RoomDetailsPopover";
import { RoomPriceTier } from "./RoomPriceTier";
import { ROOM_ANIMATION } from "../constants/rooms.constants";

export function RoomCard({ room, index, selectedDest }: RoomCardProps) {
  const { hasDates, searchDates } = useRoomsContext();
  const { isExpanded, handleToggle, handleCollapse } = useRoomExpansion(room.id);
  const { isAvailable, isLoading } = useRoomAvailability(
    room.id,
    searchDates?.checkIn,
    searchDates?.checkOut,
    room.availableDates,
  );

  // A room is visually unavailable when dates are set, loading is done, and it's not free.
  // We keep it fully opaque while expanded so the user can still read the details panel.
  const isUnavailable = hasDates && !isLoading && !isAvailable && !isExpanded;

  return (
    <article
      className={S.card(isUnavailable)}
      style={{
        animationDelay: `${index * ROOM_ANIMATION.CASCADE_DELAY_MS}ms`,
        animationDuration: `${ROOM_ANIMATION.ENTRANCE_DURATION_MS}ms`,
      }}
      aria-label={room.title}
    >
      {/* Hover glow overlay — separate element so transitions never interfere with entry animation */}
      <div className={S.cardHoverGlow} aria-hidden="true" />

      {/* Left: image panel with urgency badge, admin tip, and expand toggle */}
      <RoomImagePanel room={room} isExpanded={isExpanded} onToggleExpand={handleToggle} />

        {/* Right: card body */}
        <div className={S.body}>
          <div className={S.bodyHeader}>
            <RoomCardHeader room={room} selectedDest={selectedDest} onExpand={handleToggle} />
          </div>

          <RoomCardMeta room={room} />

        {/* Price tier + conditional CTA */}
        <RoomPriceTier room={room} />
      </div>

      <RoomDetailsPopover room={room} isOpen={isExpanded} onClose={handleCollapse} />
    </article>
  );
}
