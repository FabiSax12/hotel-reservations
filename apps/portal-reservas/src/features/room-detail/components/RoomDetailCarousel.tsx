/**
 * @file RoomDetailCarousel.tsx — Swipeable image carousel for a room.
 *
 * Transform-based track (no layout animation). Supports arrow buttons, dot
 * indicators, ArrowLeft/ArrowRight keyboard navigation, and pointer swipe.
 */

"use client";

import Image from "next/image";
import { useI18n } from "@/locales";
import { ICON_PATHS, ICON_VIEW_BOX } from "../constants/room-detail-icons.const";
import type { RoomDetailCarouselProps } from "../domain/types";
import { useCarouselGestures } from "../hooks/useCarouselGestures";
import { ROOM_DETAIL_STYLES } from "../theme/room-detail.theme";

export function RoomDetailCarousel({
  images,
  index,
  title,
  onPrev,
  onNext,
  onSelect,
}: RoomDetailCarouselProps) {
  const { t } = useI18n();
  const count = images.length;
  const { onKeyDown, onPointerDown, onPointerUp } = useCarouselGestures({ onPrev, onNext });

  const positionLabel = (i: number) =>
    t.ROOM_DETAIL.IMAGE_POSITION.replace("{current}", String(i + 1)).replace(
      "{total}",
      String(count),
    );

  return (
    <div
      className={ROOM_DETAIL_STYLES.carouselViewport}
      role="group"
      aria-roledescription={t.ROOM_DETAIL.CAROUSEL_ROLE}
      aria-label={t.ROOM_DETAIL.CAROUSEL_LABEL}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div
        className={ROOM_DETAIL_STYLES.carouselTrack}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={src} className={ROOM_DETAIL_STYLES.carouselSlide} aria-hidden={i !== index}>
            <Image
              src={src}
              alt={`${title}, ${positionLabel(i)}`}
              fill
              sizes="(max-width: 1024px) 100vw, 32rem"
              className={ROOM_DETAIL_STYLES.carouselImg}
              priority={i === 0}
              unoptimized
            />
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            className={ROOM_DETAIL_STYLES.carouselArrow("left")}
            onClick={onPrev}
            disabled={index === 0}
            aria-label={t.ROOM_DETAIL.PREV_IMAGE}
          >
            <svg
              className={ROOM_DETAIL_STYLES.carouselArrowIcon}
              fill="none"
              viewBox={ICON_VIEW_BOX}
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS.chevronLeft} />
            </svg>
          </button>
          <button
            type="button"
            className={ROOM_DETAIL_STYLES.carouselArrow("right")}
            onClick={onNext}
            disabled={index === count - 1}
            aria-label={t.ROOM_DETAIL.NEXT_IMAGE}
          >
            <svg
              className={ROOM_DETAIL_STYLES.carouselArrowIcon}
              fill="none"
              viewBox={ICON_VIEW_BOX}
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS.chevronRight} />
            </svg>
          </button>
          <span className={ROOM_DETAIL_STYLES.carouselCounter} aria-hidden="true">
            {index + 1}/{count}
          </span>
          <div
            className={ROOM_DETAIL_STYLES.carouselDots}
            role="tablist"
            aria-label={t.ROOM_DETAIL.CAROUSEL_LABEL}
          >
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                role="tab"
                className={ROOM_DETAIL_STYLES.carouselDot(i === index)}
                onClick={() => onSelect(i)}
                aria-selected={i === index}
                aria-label={positionLabel(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
