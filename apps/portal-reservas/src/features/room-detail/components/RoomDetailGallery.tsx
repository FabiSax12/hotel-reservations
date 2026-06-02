/**
 * @file RoomDetailGallery.tsx — Thumbnail strip that drives the carousel.
 *
 * Each thumbnail selects the matching carousel slide; the active thumb is ringed.
 */

"use client";

import Image from "next/image";
import { useI18n } from "@/locales";
import type { RoomDetailGalleryProps } from "../domain/types";
import { ROOM_DETAIL_STYLES } from "../theme/room-detail.theme";

export function RoomDetailGallery({ images, index, title, onSelect }: RoomDetailGalleryProps) {
  const { t } = useI18n();

  return (
    <div className={ROOM_DETAIL_STYLES.gallery} role="group" aria-label={t.ROOM_DETAIL.GALLERY_LABEL}>
      {images.map((src, i) => (
        <button
          key={src}
          type="button"
          className={ROOM_DETAIL_STYLES.galleryThumb(i === index)}
          onClick={() => onSelect(i)}
          aria-current={i === index}
          aria-label={t.ROOM_DETAIL.IMAGE_POSITION.replace("{current}", String(i + 1)).replace("{total}", String(images.length))}
        >
          <Image src={src} alt={`${title} ${i + 1}`} fill sizes="6rem" className={ROOM_DETAIL_STYLES.galleryThumbImg} unoptimized />
        </button>
      ))}
    </div>
  );
}
