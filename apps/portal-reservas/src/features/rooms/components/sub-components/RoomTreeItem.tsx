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
import { PACKAGE_CARD_STYLES } from "../../../../theme/rooms.theme";
import { formatBedConfig, getAmenityIcon } from "../../constants/amenity-icons.const";

const MAX_TREE_AMENITIES = 3;
const BED_ICON_VIEW_BOX = "0 0 20 20";
const BED_ICON_PATH = "M3 11h14M5 11V7a2 2 0 012-2h6a2 2 0 012 2v4M3 11v4M17 11v4M3 15h14";
const AMENITY_ICON_VIEW_BOX = "0 0 20 20";

interface RoomTreeItemProps {
  room: Room;
  count: number;
  currency: string;
  showAmenities?: boolean;
}

export function RoomTreeItem({ room, count, currency, showAmenities = true }: RoomTreeItemProps) {
  // Bed text hidden until a beds column/table exists (US-DM-07).
  const bedText = room.beds ? formatBedConfig(room.beds) : null;

  // Show top 3 amenities (all amenities, not just those with icons)
  const topAmenities = showAmenities ? room.amenities.slice(0, MAX_TREE_AMENITIES) : [];

  return (
    <div className={PACKAGE_CARD_STYLES.roomTreeItem}>
      {/* Header: room title + price */}
      <div className={PACKAGE_CARD_STYLES.roomTreeHeader}>
        <span className={PACKAGE_CARD_STYLES.roomTreeTitle}>
          {count > 1 && (
            <span className={PACKAGE_CARD_STYLES.roomTreeCountPrefix}>{count}× </span>
          )}
          {room.title}
        </span>
        <span className={PACKAGE_CARD_STYLES.roomTreePrice}>
          ${room.price * count} {currency}
        </span>
      </div>

      {/* Bed configuration */}
      {bedText && (
        <div className={PACKAGE_CARD_STYLES.roomTreeBedRow}>
          <svg className={PACKAGE_CARD_STYLES.roomTreeBedIcon} viewBox={BED_ICON_VIEW_BOX} fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d={BED_ICON_PATH} />
          </svg>
          <span>{bedText}</span>
        </div>
      )}

      {/* Top amenities with icon + text */}
      {topAmenities.length > 0 && (
        <div className={PACKAGE_CARD_STYLES.roomTreeAmenityRow}>
          {topAmenities.map((amenity) => {
            const icon = getAmenityIcon(amenity);
            return (
              <span key={amenity} className={PACKAGE_CARD_STYLES.roomTreeAmenityTag}>
                {icon && (
                  <svg
                    className={PACKAGE_CARD_STYLES.roomTreeAmenityIcon}
                    viewBox={AMENITY_ICON_VIEW_BOX}
                    fill={icon.isStroke ? "none" : "currentColor"}
                    stroke={icon.isStroke ? "currentColor" : "none"}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={icon.path} />
                  </svg>
                )}
                <span className={PACKAGE_CARD_STYLES.roomTreeAmenityText}>{amenity}</span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
