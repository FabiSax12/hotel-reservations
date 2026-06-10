/**
 * @file useHomePageState.ts — Hook for root page state management.
 *
 * Manages the page lifecycle phases:
 *  - Phase 1 (no location): Hero only, scroll locked.
 *  - Phase 2 (location, no dates): Hero + rooms below (no prices).
 *  - Phase 3 (searched, has dates): Sticky compact bar + rooms with CTAs.
 */

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ROUTES } from "../config/routes";
import { filterRoomsByDestination } from "../features/rooms/domain/filters";
import type { Room } from "../features/rooms/domain/types";
import { REGIONS_CONFIG } from "../features/search/components/search-bar/constants/regionsConfig";
import {
  SEARCH_VALS,
  TIMEOUTS,
} from "../features/search/components/search-bar/constants/search.constants";
import type { SearchParams } from "../features/search/domain/types";
import { useScrollLock } from "./useScrollLock";

// If the hotel only operates in a single region, auto-select it so the user
// skips the destination picker and sees rooms immediately (US-DM-02 AC #1).
const AUTO_SELECTED_LOCATION = REGIONS_CONFIG.length === 1 ? REGIONS_CONFIG[0].name : null;

export function useHomePageState(initialRooms: Room[]) {
  const router = useRouter();
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(AUTO_SELECTED_LOCATION);
  const [heroCalendarActive, setHeroCalendarActive] = useState(false);
  const [searchKey, setSearchKey] = useState(0);
  const [isSearchingData, setIsSearchingData] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    destination: SEARCH_VALS.DESTINATION_ALL,
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    pets: 0,
  });
  const [prioritizedRoomId, setPrioritizedRoomId] = useState<string | null>(null);

  const hasDates = !!(searchParams.checkIn && searchParams.checkOut);

  // Lock body scroll until a destination is chosen (US-DM-02 AC #1).
  // If there is only one region, AUTO_SELECTED_LOCATION triggers immediately
  // and the lock releases on first render.
  useScrollLock(!selectedLocation);

  const handleDestinationChange = (dest: string) => {
    if (dest && dest !== SEARCH_VALS.DESTINATION_ALL) {
      setSelectedLocation(dest);
    }
  };

  const handleSearchTrigger = (params: SearchParams) => {
    setSearchParams(params);
    if (params.destination && params.destination !== SEARCH_VALS.DESTINATION_ALL) {
      setSelectedLocation(params.destination);
    }
    // When the search originates from a room calendar, prioritize that room.
    // When it originates from the search bar (no prioritizedRoomId), clear any previous priority.
    setPrioritizedRoomId(params.prioritizedRoomId ?? null);
    setHasSearched(true);
    setHeroCalendarActive(false);
    // Simulate async data fetching so skeleton loaders and transitions feel realistic
    setIsSearchingData(true);
    setTimeout(() => {
      // Incrementing searchKey forces RoomList to remount, replaying the entrance cascade
      setSearchKey((prev) => prev + 1);
      setIsSearchingData(false);
    }, TIMEOUTS.SEARCH_TRIGGER_DELAY);
  };

  const handleReset = () => {
    router.push(ROUTES.HOME);
  };

  const filteredRooms = filterRoomsByDestination(
    initialRooms,
    selectedLocation ?? SEARCH_VALS.DESTINATION_ALL,
  );

  return {
    hasSearched,
    selectedLocation,
    heroCalendarActive,
    setHeroCalendarActive,
    searchParams,
    searchKey,
    hasDates,
    isSearchingData,
    filteredRooms,
    prioritizedRoomId,
    handleSearchTrigger,
    handleDestinationChange,
    handleReset,
  };
}
