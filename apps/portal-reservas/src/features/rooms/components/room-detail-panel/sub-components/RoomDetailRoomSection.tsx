/**
 * @file RoomDetailRoomSection.tsx — Full content block for a single room.
 *
 * Reused for a standalone room and for each room inside a package. When a
 * `position` is provided (package context) it shows a "Room X of N" heading.
 */

"use client";

import { ROOM_DETAIL_STYLES as S } from "@/theme/room-detail.theme";
import { useI18n } from "@/locales";
import type { RoomDetailRoomSectionProps } from "../../../domain/types";
import { RoomDetailMedia } from "./RoomDetailMedia";
import { RoomDetailKeyInfo } from "./RoomDetailKeyInfo";
import { RoomDetailAmenities } from "./RoomDetailAmenities";

export function RoomDetailRoomSection({ room, position }: RoomDetailRoomSectionProps) {
  const { t } = useI18n();
  const images = [room.image, ...room.images];

  return (
    <section className={position ? S.sectionDivided : S.section}>
      {position && (
        <div className={S.sectionHeading}>
          <p className={S.sectionIndex}>
            <span className={S.sectionIndexDot} aria-hidden="true" />
            {t.ROOMS.DETAIL_ROOM_POSITION
              .replace("{current}", String(position.current))
              .replace("{total}", String(position.total))}
          </p>
          <h3 className={S.sectionRoomTitle}>{room.title}</h3>
        </div>
      )}

      <RoomDetailMedia images={images} title={room.title} />
      <RoomDetailKeyInfo room={room} />
      <RoomDetailAmenities amenities={room.amenities} />
    </section>
  );
}
