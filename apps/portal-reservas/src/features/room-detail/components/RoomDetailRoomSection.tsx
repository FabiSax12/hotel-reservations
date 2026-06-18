/**
 * @file RoomDetailRoomSection.tsx — Full content block for a single room.
 *
 * Reused for a standalone room and for each room inside a package. When a
 * `position` is provided (package context) it shows a "Room X of N" heading.
 */

"use client";

import { useI18n } from "@/locales";
import type { RoomDetailRoomSectionProps } from "../domain/types";
import { ROOM_DETAIL_STYLES } from "../theme/room-detail.theme";
import { RoomDetailAmenities } from "./RoomDetailAmenities";
import { RoomDetailKeyInfo } from "./RoomDetailKeyInfo";
import { RoomDetailMedia } from "./RoomDetailMedia";

export function RoomDetailRoomSection({ room, position }: RoomDetailRoomSectionProps) {
  const { t } = useI18n();
  // Hero + gallery URLs; empty until the room has room_images (US-DM-07).
  const images = [room.image, ...(room.images ?? [])].filter(
    (url): url is string => Boolean(url),
  );

  return (
    <section className={position ? ROOM_DETAIL_STYLES.sectionDivided : ROOM_DETAIL_STYLES.section}>
      {position && (
        <div className={ROOM_DETAIL_STYLES.sectionHeading}>
          <p className={ROOM_DETAIL_STYLES.sectionIndex}>
            <span className={ROOM_DETAIL_STYLES.sectionIndexDot} aria-hidden="true" />
            {t.ROOM_DETAIL.ROOM_POSITION
              .replace("{current}", String(position.current))
              .replace("{total}", String(position.total))}
          </p>
          <h3 className={ROOM_DETAIL_STYLES.sectionRoomTitle}>{room.title}</h3>
        </div>
      )}

      <RoomDetailMedia images={images} title={room.title} />
      <RoomDetailKeyInfo room={room} />
      <RoomDetailAmenities amenities={room.amenities} />
    </section>
  );
}
