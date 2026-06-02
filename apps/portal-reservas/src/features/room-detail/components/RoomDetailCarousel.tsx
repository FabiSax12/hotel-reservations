/**
 * @file RoomDetailCarousel.tsx — Swipeable image carousel for a room.
 *
 * Transform-based track (no layout animation). Supports arrow buttons, dot
 * indicators, ArrowLeft/ArrowRight keyboard navigation, and pointer swipe.
 */

"use client";

import { useRef } from "react";
import Image from "next/image";
import { KEYBOARD_KEYS } from "@/constants/dom-events.constants";
import { useI18n } from "@/locales";
import { ROOM_DETAIL } from "../constants/room-detail.constants";
import { ICON_PATHS, ICON_VIEW_BOX } from "../constants/room-detail-icons.const";
import type { RoomDetailCarouselProps } from "../domain/types";
import { ROOM_DETAIL_STYLES as S } from "../theme/room-detail.theme";

export function RoomDetailCarousel({ images, index, title, onPrev, onNext, onSelect }: RoomDetailCarouselProps) {
  const { t } = useI18n();
  const count = images.length;
  const startX = useRef<number | null>(null);

  const positionLabel = (i: number) =>
    t.ROOM_DETAIL.IMAGE_POSITION.replace("{current}", String(i + 1)).replace("{total}", String(count));

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEYBOARD_KEYS.ARROW_LEFT) {
      event.preventDefault();
      onPrev();
    } else if (event.key === KEYBOARD_KEYS.ARROW_RIGHT) {
      event.preventDefault();
      onNext();
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const delta = event.clientX - startX.current;
    if (delta > ROOM_DETAIL.SWIPE_THRESHOLD_PX) onPrev();
    else if (delta < -ROOM_DETAIL.SWIPE_THRESHOLD_PX) onNext();
    startX.current = null;
  };

  return (
    <div
      className={S.carouselViewport}
      role="group"
      aria-roledescription={t.ROOM_DETAIL.CAROUSEL_ROLE}
      aria-label={t.ROOM_DETAIL.CAROUSEL_LABEL}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={(event) => { startX.current = event.clientX; }}
      onPointerUp={handlePointerUp}
    >
      <div className={S.carouselTrack} style={{ transform: `translateX(-${index * 100}%)` }}>
        {images.map((src, i) => (
          <div key={src} className={S.carouselSlide} aria-hidden={i !== index}>
            <Image
              src={src}
              alt={`${title}, ${positionLabel(i)}`}
              fill
              sizes="(max-width: 1024px) 100vw, 32rem"
              className={S.carouselImg}
              priority={i === 0}
              unoptimized
            />
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button type="button" className={S.carouselArrow("left")} onClick={onPrev} disabled={index === 0} aria-label={t.ROOM_DETAIL.PREV_IMAGE}>
            <svg className={S.carouselArrowIcon} fill="none" viewBox={ICON_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS.chevronLeft} />
            </svg>
          </button>
          <button type="button" className={S.carouselArrow("right")} onClick={onNext} disabled={index === count - 1} aria-label={t.ROOM_DETAIL.NEXT_IMAGE}>
            <svg className={S.carouselArrowIcon} fill="none" viewBox={ICON_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS.chevronRight} />
            </svg>
          </button>
          <span className={S.carouselCounter} aria-hidden="true">{index + 1}/{count}</span>
          <div className={S.carouselDots} role="tablist" aria-label={t.ROOM_DETAIL.CAROUSEL_LABEL}>
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                role="tab"
                className={S.carouselDot(i === index)}
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
