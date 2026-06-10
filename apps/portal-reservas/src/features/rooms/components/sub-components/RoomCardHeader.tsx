/**
 * @file RoomCardHeader.tsx — Room name and amenity chips.
 *
 * Shows:
 * - Location label (when showing all destinations)
 * - Room title
 * - Top 3 amenity chips
 */

import { ROOM_CARD_STYLES as S } from "../../../../theme/rooms.theme";
import { SEARCH_VALS } from "../../../search/components/search-bar/constants/search.constants";
import { getAmenityIcon } from "../../constants/amenity-icons.const";
import type { RoomCardHeaderProps } from "../../domain/types";

export function RoomCardHeader({ room, selectedDest }: RoomCardHeaderProps) {
  // Show top 3 amenities
  const topAmenities = room.amenities.slice(0, 3);

  return (
    <div>
      {/* Location label hidden until the rooms table gains a location column (US-DM-07). */}
      {room.location && (!selectedDest || selectedDest === SEARCH_VALS.DESTINATION_ALL) && (
        <p className={S.locationLabel}>{room.location}</p>
      )}
      <h3 className={S.title}>{room.title}</h3>

      {/* Amenity chips */}
      <div className={S.amenityChipRow}>
        {topAmenities.map((amenity) => {
          const icon = getAmenityIcon(amenity);
          return (
            <span key={amenity} className={S.amenityChip}>
              {icon && (
                <svg
                  className={S.amenityChipIcon}
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
              {amenity}
            </span>
          );
        })}
      </div>
    </div>
  );
}
