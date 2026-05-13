/**
 * @file RoomTreeItem.tsx — Individual room entry in the package room tree.
 *
 * Displays:
 * - Room title (with count prefix if multiple of same type)
 * - Bed configuration (e.g., "1 King · 2 Individual")
 * - Top 3 amenities with icon + text
 * - Price per room
 */

"use client";

import type { Room } from "../../domain/types";
import { PACKAGE_CARD_STYLES as S } from "../../../../theme/rooms.theme";
import { formatBedConfig, getAmenityIcon } from "../../constants/amenity-icons.const";

interface RoomTreeItemProps {
  room: Room;
  count: number;
  currency: string;
  showAmenities?: boolean;
}

export function RoomTreeItem({ room, count, currency, showAmenities = true }: RoomTreeItemProps) {
  const bedText = formatBedConfig(room.beds);

  // Show top 3 amenities (all amenities, not just those with icons)
  const topAmenities = showAmenities ? room.amenities.slice(0, 3) : [];

  return (
    <div className={S.roomTreeItem}>
      {/* Header: room title + price */}
      <div className={S.roomTreeHeader}>
        <span className={S.roomTreeTitle}>
          {count > 1 && (
            <span className={S.roomTreeCountPrefix}>{count}× </span>
          )}
          {room.title}
        </span>
        <span className={S.roomTreePrice}>
          ${room.price * count} {currency}
        </span>
      </div>

      {/* Bed configuration */}
      <div className={S.roomTreeBedRow}>
        <svg className={S.roomTreeBedIcon} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 11h14M5 11V7a2 2 0 012-2h6a2 2 0 012 2v4M3 11v4M17 11v4M3 15h14" />
        </svg>
        <span>{bedText}</span>
      </div>

      {/* Top amenities with icon + text */}
      {topAmenities.length > 0 && (
        <div className={S.roomTreeAmenityRow}>
          {topAmenities.map((amenity) => {
            const icon = getAmenityIcon(amenity);
            return (
              <span key={amenity} className={S.roomTreeAmenityTag}>
                {icon && (
                  <svg
                    className={S.roomTreeAmenityIcon}
                    viewBox="0 0 20 20"
                    fill={icon.isStroke ? "none" : "currentColor"}
                    stroke={icon.isStroke ? "currentColor" : "none"}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={icon.path} />
                  </svg>
                )}
                <span className={S.roomTreeAmenityText}>{amenity}</span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
