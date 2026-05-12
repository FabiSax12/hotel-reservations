/**
 * @file RoomCard.tsx — Individual room result card.
 *
 * Orchestrates two sub-components:
 *  - {@link RoomImagePanel} — The left-side photo with optional urgency badge.
 *  - {@link RoomPriceTier}  — The bottom price block with availability and CTA.
 *
 * Uses staggered animation delays (`index * 150ms`) so cards cascade in
 * from the bottom when the results list mounts. A room is considered
 * "scarce" when inventory ≤ 2, which triggers a red urgency badge.
 */

import { useI18n } from "@/locales";
import { ROOM_CARD_STYLES as S } from "../../../theme/rooms.theme";
import { SEARCH_VALS } from "../../search/components/search-bar/constants/search.constants";
import type { Room } from "../domain/types";
import { RoomImagePanel } from "./RoomImagePanel";
import { RoomPriceTier } from "./RoomPriceTier";

interface RoomCardProps {
  /** Room data to render. */
  room: Room;
  /** Zero-based position in the list, used for staggered animation delay. */
  index: number;
  /** Active destination filter. When "Todos" or null, the location label shows. */
  selectedDest?: string | null;
}

export function RoomCard({ room, index, selectedDest }: RoomCardProps) {
  const { t } = useI18n();

  /** Rooms with ≤ 2 available show an urgency badge on the image. */
  const isScarce = room.inventory <= 2;

  return (
    <div
      className={S.card}
      style={{ animationDelay: `${index * 150}ms`, animationDuration: "600ms" }}
    >
      <RoomImagePanel image={room.image} inventory={room.inventory} isScarce={isScarce} />

      <div className={S.body}>
        <div className={S.bodyHeader}>
          <div>
            {/* Show the location label when browsing "all destinations" */}
            {(!selectedDest || selectedDest === SEARCH_VALS.DESTINATION_ALL) && (
              <p className={S.locationLabel}>{room.location}</p>
            )}
            <h3 className={S.title}>{room.title}</h3>
          </div>
        </div>

        {/* Room type chip + square-meter measurement */}
        <div className={S.metaRow}>
          <span className={S.typeChip}>
            {room.type} {t.ROOMS.TYPE_LABEL}
          </span>
          <span className={S.sqftLabel}>
            <svg className={S.sqftIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
            {room.sqft} {t.ROOMS.SQFT_LABEL}
          </span>
        </div>

        <p className={S.description}>{room.description}</p>

        <RoomPriceTier price={room.price} inventory={room.inventory} isScarce={isScarce} />
      </div>
    </div>
  );
}
