/**
 * @file RoomCardHeader.tsx — Room name and amenity chips.
 *
 * Capacity and inventory badges are now on the image panel (top-right and
 * top-left respectively). This component shows:
 * - Location label (when showing all destinations)
 * - Room title
 * - Amenity chips (top 3 + "view more" button)
 */

import type { RoomCardHeaderProps } from "../../domain/types";
import { ROOM_CARD_STYLES as S } from "../../../../theme/rooms.theme";
import { useI18n } from "@/locales";
import { SEARCH_VALS } from "../../../search/components/search-bar/constants/search.constants";
import { getAmenityIcon } from "../../constants/amenity-icons.const";

interface RoomCardHeaderWithExpandProps extends RoomCardHeaderProps {
  onExpand?: () => void;
}

export function RoomCardHeader({ room, selectedDest, onExpand }: RoomCardHeaderWithExpandProps) {
  const { t } = useI18n();

  // Show top 3 amenities with icons, then "view more" button
  const topAmenities = room.amenities.slice(0, 3);
  const hasMore = room.amenities.length > 3;

  return (
    <div>
      {(!selectedDest || selectedDest === SEARCH_VALS.DESTINATION_ALL) && (
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
        {hasMore && onExpand && (
          <button
            type="button"
            className={S.amenityChipMore}
            onClick={(e) => {
              e.stopPropagation();
              onExpand();
            }}
          >
            +{room.amenities.length - 3} {t.ROOMS.MORE_AMENITIES}
          </button>
        )}
      </div>
    </div>
  );
}
