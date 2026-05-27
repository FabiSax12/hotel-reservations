import { useEffect, useState } from "react";

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
