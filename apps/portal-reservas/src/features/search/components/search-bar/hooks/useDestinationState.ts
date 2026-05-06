/**
 * @file useDestinationState.ts — Hook for managing destination selection state.
 *
 * Manages the selected destination string, auto-selects when only one sede
 * exists, and notifies the parent component on changes.
 */

import { useState, useCallback, useMemo, useEffect } from "react";
import { REGIONS_CONFIG } from "../constants/regionsConfig";
import { SEARCH_VALS } from "../constants/search.constants";

interface UseDestinationStateOptions {
  initialDestination?: string;
  onDestinationChange?: (dest: string) => void;
}

export function useDestinationState({
  initialDestination,
  onDestinationChange,
}: UseDestinationStateOptions) {
  const onlyOneSede = useMemo(
    () => (REGIONS_CONFIG.length === 1 ? REGIONS_CONFIG[0].name : null),
    [],
  );

  const [destination, setDestinationRaw] = useState(() => {
    if (initialDestination && initialDestination !== SEARCH_VALS.DESTINATION_ALL)
      return initialDestination;
    return onlyOneSede || "";
  });

  const setDestination = useCallback(
    (newDestination: string) => {
      setDestinationRaw(newDestination);
      onDestinationChange?.(newDestination);
    },
    [onDestinationChange],
  );

  // Notify parent of the auto-selected destination on mount
  useEffect(() => {
    if (destination) {
      onDestinationChange?.(destination);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { destination, setDestination, onlyOneSede };
}
