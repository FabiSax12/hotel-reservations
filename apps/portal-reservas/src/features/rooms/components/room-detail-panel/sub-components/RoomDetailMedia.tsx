/**
 * @file RoomDetailMedia.tsx — Carousel + thumbnail gallery for a single room.
 *
 * Owns the shared carousel index so the carousel and the gallery stay in sync.
 */

"use client";

import { ROOM_DETAIL_STYLES as S } from "@/theme/room-detail.theme";
import type { RoomDetailMediaProps } from "../../../domain/types";
import { useImageCarousel } from "../../../hooks/useImageCarousel";
import { RoomDetailCarousel } from "./RoomDetailCarousel";
import { RoomDetailGallery } from "./RoomDetailGallery";

export function RoomDetailMedia({ images, title }: RoomDetailMediaProps) {
  const { index, goTo, next, prev } = useImageCarousel({ count: images.length });

  return (
    <div className={S.media}>
      <RoomDetailCarousel images={images} index={index} title={title} onPrev={prev} onNext={next} onSelect={goTo} />
      {images.length > 1 && (
        <RoomDetailGallery images={images} index={index} title={title} onSelect={goTo} />
      )}
    </div>
  );
}
