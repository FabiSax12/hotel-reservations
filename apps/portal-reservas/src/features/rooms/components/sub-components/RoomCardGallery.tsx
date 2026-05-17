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

import Image from "next/image";
import { useI18n } from "@/locales";
import { ROOM_CARD_STYLES as S } from "../../../../theme/rooms.theme";
import { formatBedConfig } from "../../constants/amenity-icons.const";
import type { RoomCardGalleryProps } from "../../domain/types";

export function RoomCardGallery({ room }: RoomCardGalleryProps) {
  const { t } = useI18n();
  const bedText = formatBedConfig(room.beds);

  return (
    <div className={S.expansionContent}>
      {/* Bed configuration */}
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-4 h-4 text-gold-500"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 11h14M5 11V7a2 2 0 012-2h6a2 2 0 012 2v4M3 11v4M17 11v4M3 15h14"
          />
        </svg>
        <span className="text-sm font-medium text-stone-300">{bedText}</span>
      </div>

      {/* Additional image strip */}
      {room.images.length > 0 && (
        <div className={S.galleryStrip} role="list" aria-label={t.ROOMS.GALLERY_IMAGES_LABEL}>
          {room.images.map((src, i) => (
            <div key={src} className={S.galleryImage} role="listitem">
              <Image
                src={src}
                alt={`${room.title} — imagen ${i + 1}`}
                className={S.galleryImg}
                loading="lazy"
                width={144}
                height={96}
                unoptimized
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
