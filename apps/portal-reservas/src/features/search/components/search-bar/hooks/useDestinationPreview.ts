/**
 * @file useDestinationPreview.ts — Hook for managing destination hover previews.
 */

import { useCallback, useState } from "react";
import { REGIONS_CONFIG } from "../constants/regionsMock";
import { TIMEOUTS } from "../constants/search.constants";

export function useDestinationPreview() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [hoverTimer, setHoverTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(
    (name: string) => {
      if (hoverTimer) clearTimeout(hoverTimer);
      const timer = setTimeout(() => setHoveredRegion(name), TIMEOUTS.DESTINATION_HOVER_IN);
      setHoverTimer(timer);
    },
    [hoverTimer],
  );

  const handleMouseLeave = useCallback(() => {
    if (hoverTimer) clearTimeout(hoverTimer);
    const timer = setTimeout(() => setHoveredRegion(null), TIMEOUTS.DESTINATION_HOVER_OUT);
    setHoverTimer(timer);
  }, [hoverTimer]);

  const hoveredData = REGIONS_CONFIG.find((r) => r.name === hoveredRegion);

  return {
    hoveredRegion,
    hoveredData,
    handleMouseEnter,
    handleMouseLeave,
    clearHoverTimer: () => {
      if (hoverTimer) clearTimeout(hoverTimer);
    },
  };
}
