/**
 * @file useSearchTrigger.ts — Hook for search submission and section interception.
 *
 * Handles the search trigger delay, validation gating, and the section
 * activation interceptor that blocks date-section access until a destination
 * is selected.
 */

import { useCallback } from "react";
import { SEARCH_VALS, TIMEOUTS, SEARCH_SECTIONS } from "../constants/search.constants";
import type { UseSearchTriggerDeps } from "../domain/types";

export function useSearchTrigger({
  destination,
  checkIn,
  checkOut,
  adults,
  childrenCount,
  pets,
  onlyOneSede,
  validateSearch,
  clearError,
  showError,
  setActive,
  setIsSearching,
  activateSection,
  onSearch,
  missingSedeMessage,
}: UseSearchTriggerDeps) {
  const handleSearchTrigger = useCallback(() => {
    if (!validateSearch(destination, checkIn, checkOut, onlyOneSede)) return;
    clearError();
    setActive(null);
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      if (onSearch)
        onSearch({
          destination: destination || SEARCH_VALS.DESTINATION_ALL,
          checkIn,
          checkOut,
          adults,
          children: childrenCount,
          pets,
        });
    }, TIMEOUTS.SEARCH_TRIGGER_DELAY);
  }, [destination, checkIn, checkOut, adults, childrenCount, pets, onlyOneSede, validateSearch, clearError, setActive, setIsSearching, onSearch]);

  const activateSectionIntercepted = useCallback(
    (section: ActiveSection, onClearError?: () => void) => {
      if (
        (section === SEARCH_SECTIONS.CHECK_IN || section === SEARCH_SECTIONS.CHECK_OUT) &&
        (!destination || destination === SEARCH_VALS.DESTINATION_ALL)
      ) {
        showError({
          message: missingSedeMessage,
          fields: ["where"],
        });
        return;
      }
      activateSection(section, onClearError);
    },
    [destination, activateSection, showError, missingSedeMessage],
  );

  return { handleSearchTrigger, activateSectionIntercepted };
}
