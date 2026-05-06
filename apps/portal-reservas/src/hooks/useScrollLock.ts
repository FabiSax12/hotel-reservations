/**
 * @file useScrollLock.ts — Hook for managing body scroll lock.
 *
 * Replaces direct `document.body.style.overflow` manipulation.
 * Automatically cleans up on unmount.
 */

"use client";

import { useEffect } from "react";

/**
 * Locks or unlocks body scroll based on the `isLocked` parameter.
 * Uses `useEffect` cleanup to guarantee restoration.
 */
export function useScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isLocked]);
}
