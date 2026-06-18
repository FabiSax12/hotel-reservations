/**
 * @file RoomDetailAmenities.tsx — Full amenity list with descriptions.
 *
 * Renders EVERY amenity of the room (not just the card's top 3) as a row with
 * its icon, name, and the description mirrored from `public.amenities.description`.
 */

"use client";

import { getAmenityIcon } from "@/features/rooms";
import { useI18n } from "@/locales";
import { AMENITY_VIEW_BOX } from "../constants/room-detail-icons.const";
import type { RoomDetailAmenitiesProps } from "../domain/types";
import { ROOM_DETAIL_STYLES } from "../theme/room-detail.theme";

export function RoomDetailAmenities({ amenities }: RoomDetailAmenitiesProps) {
  const { t } = useI18n();

  if (amenities.length === 0) return null;

  return (
    <div>
      <p className={ROOM_DETAIL_STYLES.sectionLabel}>{t.ROOMS.AMENITIES_TITLE}</p>
      <ul className={ROOM_DETAIL_STYLES.amenityList} aria-label={t.ROOMS.AMENITIES_TITLE}>
        {amenities.map((name) => {
          const icon = getAmenityIcon(name);
          return (
            <li key={name} className={ROOM_DETAIL_STYLES.amenityRow}>
              <span className={ROOM_DETAIL_STYLES.amenityIconWrap}>
                {icon ? (
                  <svg
                    className={ROOM_DETAIL_STYLES.amenityIconSvg}
                    viewBox={AMENITY_VIEW_BOX}
                    fill={icon.isStroke ? "none" : "currentColor"}
                    stroke={icon.isStroke ? "currentColor" : "none"}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={icon.path} />
                  </svg>
                ) : (
                  <span className={ROOM_DETAIL_STYLES.amenityDot} aria-hidden="true" />
                )}
              </span>
              <div className={ROOM_DETAIL_STYLES.amenityBody}>
                {/* DB amenity descriptions (amenities.description) not yet plumbed (US-DM-07). */}
                <p className={ROOM_DETAIL_STYLES.amenityName}>{name}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
