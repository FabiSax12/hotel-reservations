/**
 * @file useCarouselGestures.ts — Keyboard + pointer-swipe navigation for the
 * room detail carousel.
 *
 * The parent owns the active index; this hook only translates ArrowLeft/Right
 * keys and horizontal pointer swipes into prev/next callbacks. Returns the
 * handlers to spread onto the carousel viewport element.
 */

"use client";

import { useRef } from "react";
import { KEYBOARD_KEYS } from "@/constants/dom-events.constants";
import { ROOM_DETAIL } from "../constants/room-detail.constants";
import type { UseCarouselGesturesOptions } from "../domain/types";

export function useCarouselGestures({ onPrev, onNext }: UseCarouselGesturesOptions) {
  const startX = useRef<number | null>(null);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEYBOARD_KEYS.ARROW_LEFT) {
      event.preventDefault();
      onPrev();
    } else if (event.key === KEYBOARD_KEYS.ARROW_RIGHT) {
      event.preventDefault();
      onNext();
    }
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    startX.current = event.clientX;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const delta = event.clientX - startX.current;
    if (delta > ROOM_DETAIL.SWIPE_THRESHOLD_PX) onPrev();
    else if (delta < -ROOM_DETAIL.SWIPE_THRESHOLD_PX) onNext();
    startX.current = null;
  };

  return { onKeyDown, onPointerDown, onPointerUp };
}
