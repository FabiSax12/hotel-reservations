/**
 * @file RoomDetailAmenities.tsx — Full amenity list with descriptions.
 *
 * Renders EVERY amenity of the room (not just the card's top 3) as a row with
 * its icon, name, and the description mirrored from `public.amenities.description`.
 */

"use client";

import { getAmenityDetail, getAmenityIcon } from "@/features/rooms";
import { useI18n } from "@/locales";
import { AMENITY_VIEW_BOX } from "../constants/room-detail-icons.const";
import type { RoomDetailAmenitiesProps } from "../domain/types";
import { ROOM_DETAIL_STYLES as S } from "../theme/room-detail.theme";

export function RoomDetailAmenities({ amenities }: RoomDetailAmenitiesProps) {
  const { t } = useI18n();

  if (amenities.length === 0) return null;

  return (
    <div>
      <p className={S.sectionLabel}>{t.ROOMS.AMENITIES_TITLE}</p>
      <ul className={S.amenityList} aria-label={t.ROOMS.AMENITIES_TITLE}>
        {amenities.map((name) => {
          const icon = getAmenityIcon(name);
          const detail = getAmenityDetail(name);
          return (
            <li key={name} className={S.amenityRow}>
              <span className={S.amenityIconWrap}>
                {icon ? (
                  <svg
                    className={S.amenityIconSvg}
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
                  <span className={S.amenityDot} aria-hidden="true" />
                )}
              </span>
              <div className={S.amenityBody}>
                <p className={S.amenityName}>{detail?.name ?? name}</p>
                {detail?.description && <p className={S.amenityDesc}>{detail.description}</p>}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
