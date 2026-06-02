/**
 * @file useImageCarousel.ts — Index state for the detail panel image carousel.
 *
 * Clamps the active slide to `[0, count - 1]` and exposes next/prev/goTo.
 * Pure state orchestration — no JSX.
 */

"use client";

import { useCallback, useState } from "react";
import type { UseImageCarouselOptions } from "../domain/types";

export interface ImageCarouselControls {
  /** Active slide index (0-based). */
  index: number;
  /** Jumps to a specific slide (clamped). */
  goTo: (next: number) => void;
  /** Advances one slide (stops at the last). */
  next: () => void;
  /** Goes back one slide (stops at the first). */
  prev: () => void;
}

export function useImageCarousel({ count }: UseImageCarouselOptions): ImageCarouselControls {
  const [index, setIndex] = useState(0);
  const last = Math.max(0, count - 1);

  const goTo = useCallback((target: number) => setIndex(Math.min(Math.max(target, 0), last)), [last]);
  const next = useCallback(() => setIndex((i) => Math.min(i + 1, last)), [last]);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  return { index, goTo, next, prev };
}
