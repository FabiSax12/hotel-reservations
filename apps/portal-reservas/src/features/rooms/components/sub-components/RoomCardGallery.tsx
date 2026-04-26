/**
 * @file RoomCardGallery.tsx — Expanded gallery panel with additional images and amenities.
 *
 * Rendered inside a `grid-template-rows: 0fr → 1fr` expansion container managed by
 * the parent RoomCard. Contains:
 *  - Horizontal-scrolling image strip (up to 3 additional photos).
 *  - Full (unclamped) room description.
 *  - Amenities as styled tag chips.
 *
 * Visibility is controlled by the parent; this component always renders its
 * markup, relying on the grid animation to show/hide it without layout shifts.
 */

import type { Room } from "../../domain/types";
import { ROOM_CARD_STYLES as S } from "../../../../theme/rooms.theme";
import { useI18n } from "@/locales";

interface RoomCardGalleryProps {
  room: Room;
}

export function RoomCardGallery({ room }: RoomCardGalleryProps) {
  const { t } = useI18n();

  return (
    <div className={S.expansionContent}>
      {/* Additional image strip */}
      {room.images.length > 0 && (
        <div className={S.galleryStrip} role="list" aria-label="Imágenes adicionales">
          {room.images.map((src, i) => (
            <div key={src} className={S.galleryImage} role="listitem">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${room.title} — imagen ${i + 1}`}
                className={S.galleryImg}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      {/* Full description (unclamped) */}
      <p className={S.fullDescription}>{room.description}</p>

      {/* Amenities */}
      {room.amenities.length > 0 && (
        <>
          <p className={S.amenitiesTitle}>{t.ROOMS.AMENITIES_TITLE}</p>
          <ul className={S.amenityList} aria-label={t.ROOMS.AMENITIES_TITLE}>
            {room.amenities.map((amenity) => (
              <li key={amenity} className={S.amenityTag}>
                {amenity}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
