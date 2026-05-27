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

import type { RoomCardGalleryProps } from "../../domain/types";
import { ROOM_CARD_STYLES } from "../../../../theme/rooms.theme";
import { useI18n } from "@/locales";
import { formatBedConfig } from "../../constants/amenity-icons.const";
import Image from "next/image";

const BED_ICON_VIEW_BOX = "0 0 20 20";
const BED_ICON_PATH = "M3 11h14M5 11V7a2 2 0 012-2h6a2 2 0 012 2v4M3 11v4M17 11v4M3 15h14";
const GALLERY_THUMB_WIDTH = 144;
const GALLERY_THUMB_HEIGHT = 96;

const BED_CONFIG_ROW_CLASS = "flex items-center gap-2 mb-4";
const BED_CONFIG_ICON_CLASS = "w-4 h-4 text-gold-500";
const BED_CONFIG_TEXT_CLASS = "text-sm font-medium text-stone-300";

export function RoomCardGallery({ room }: RoomCardGalleryProps) {
  const { t } = useI18n();
  const bedText = formatBedConfig(room.beds);

  return (
    <div className={ROOM_CARD_STYLES.expansionContent}>
      {/* Bed configuration */}
      <div className={BED_CONFIG_ROW_CLASS}>
        <svg className={BED_CONFIG_ICON_CLASS} viewBox={BED_ICON_VIEW_BOX} fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={BED_ICON_PATH} />
        </svg>
        <span className={BED_CONFIG_TEXT_CLASS}>{bedText}</span>
      </div>

      {/* Additional image strip */}
      {room.images.length > 0 && (
        <div className={ROOM_CARD_STYLES.galleryStrip} role="list" aria-label={t.ROOMS.GALLERY_IMAGES_LABEL}>
          {room.images.map((src, i) => (
            <div key={src} className={ROOM_CARD_STYLES.galleryImage} role="listitem">
              <Image
                src={src}
                alt={`${room.title} — imagen ${i + 1}`}
                className={ROOM_CARD_STYLES.galleryImg}
                loading="lazy"
                width={GALLERY_THUMB_WIDTH}
                height={GALLERY_THUMB_HEIGHT}
                unoptimized
              />
            </div>
          ))}
        </div>
      )}

      {/* Full description (unclamped) */}
      <p className={ROOM_CARD_STYLES.fullDescription}>{room.description}</p>

      {/* Amenities */}
      {room.amenities.length > 0 && (
        <>
          <p className={ROOM_CARD_STYLES.amenitiesTitle}>{t.ROOMS.AMENITIES_TITLE}</p>
          <ul className={ROOM_CARD_STYLES.amenityList} aria-label={t.ROOMS.AMENITIES_TITLE}>
            {room.amenities.map((amenity) => (
              <li key={amenity} className={ROOM_CARD_STYLES.amenityTag}>
                {amenity}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
