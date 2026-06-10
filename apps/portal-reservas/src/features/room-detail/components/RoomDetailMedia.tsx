/**
 * @file RoomDetailMedia.tsx — Carousel + thumbnail gallery for a single room.
 *
 * Owns the shared carousel index so the carousel and the gallery stay in sync.
 */

"use client";

import type { RoomDetailMediaProps } from "../domain/types";
import { useImageCarousel } from "../hooks/useImageCarousel";
import { ROOM_DETAIL_STYLES } from "../theme/room-detail.theme";
import { RoomDetailCarousel } from "./RoomDetailCarousel";
import { RoomDetailGallery } from "./RoomDetailGallery";

export function RoomDetailMedia({ images, title }: RoomDetailMediaProps) {
  const { index, goTo, next, prev } = useImageCarousel({ count: images.length });

  // No room_images yet (US-DM-07): show a gradient instead of an empty carousel.
  if (images.length === 0) {
    return (
      <div className={ROOM_DETAIL_STYLES.media}>
        <div className={ROOM_DETAIL_STYLES.mediaPlaceholder} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={ROOM_DETAIL_STYLES.media}>
      <RoomDetailCarousel images={images} index={index} title={title} onPrev={prev} onNext={next} onSelect={goTo} />
      {images.length > 1 && (
        <RoomDetailGallery images={images} index={index} title={title} onSelect={goTo} />
      )}
    </div>
  );
}
