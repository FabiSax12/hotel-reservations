/**
 * @file useScrollLock.ts — Hook for managing body scroll lock.
 *
 * Compensates for scrollbar width to prevent layout shift when
 * the lock engages/disengages. Uses padding-right on the body.
 */

"use client";

import { useEffect } from "react";

function getScrollbarWidth(): number {
  return window.innerWidth - document.documentElement.clientWidth;
}

/**
 * Locks or unlocks body scroll based on the `isLocked` parameter.
 * Adds padding-right equal to the scrollbar width to prevent layout shift.
 */
export function useScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;

    const scrollbarWidth = getScrollbarWidth();
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
    };
  }, [isLocked]);
}
