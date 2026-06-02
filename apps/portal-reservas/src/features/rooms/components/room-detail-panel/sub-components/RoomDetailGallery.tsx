/**
 * @file RoomDetailGallery.tsx — Thumbnail strip that drives the carousel.
 *
 * Each thumbnail selects the matching carousel slide; the active thumb is ringed.
 */

"use client";

import Image from "next/image";
import { ROOM_DETAIL_STYLES as S } from "@/theme/room-detail.theme";
import { useI18n } from "@/locales";
import type { RoomDetailGalleryProps } from "../../../domain/types";

export function RoomDetailGallery({ images, index, title, onSelect }: RoomDetailGalleryProps) {
  const { t } = useI18n();

  return (
    <div className={S.gallery} role="list" aria-label={t.ROOMS.GALLERY_IMAGES_LABEL}>
      {images.map((src, i) => (
        <button
          key={src}
          type="button"
          role="listitem"
          className={S.galleryThumb(i === index)}
          onClick={() => onSelect(i)}
          aria-current={i === index}
          aria-label={t.ROOMS.DETAIL_IMAGE_POSITION.replace("{current}", String(i + 1)).replace("{total}", String(images.length))}
        >
          <Image src={src} alt={`${title} ${i + 1}`} fill sizes="6rem" className={S.galleryThumbImg} unoptimized />
        </button>
      ))}
    </div>
  );
}
