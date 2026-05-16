import { useState, useEffect } from "react";

/**
 * Delays unmounting by `delayMs` after `isVisible` becomes false.
 * Allows exit animations to complete before removing DOM nodes.
 */
export function useDelayedUnmount(isVisible: boolean, delayMs: number) {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), delayMs);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delayMs]);

  return shouldRender;
}
