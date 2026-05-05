/**
 * @file useHomePageState.ts — Hook for root page state management.
 *
 * Manages the page lifecycle phases:
 *  - Phase 1 (no location): Hero only, scroll locked.
 *  - Phase 2 (location, no dates): Hero + rooms below (no prices).
 *  - Phase 3 (searched, has dates): Sticky compact bar + rooms with CTAs.
 */

"use client";

import { useState, useEffect } from "react";
import type { SearchParams } from "../features/search/domain/types";
import { mockRooms } from "../features/rooms/mock-data/rooms";
import { filterRoomsByDestination } from "../features/rooms/domain/filters";
import { SEARCH_VALS } from "../features/search/components/search-bar/constants/search.constants";
import { REGIONS_CONFIG } from "../features/search/components/search-bar/constants/regionsConfig";

const AUTO_SELECTED_LOCATION =
  REGIONS_CONFIG.length === 1 ? REGIONS_CONFIG[0].name : null;

const SEARCH_DELAY_MS = 800;

export function useHomePageState() {
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

  const hasDates = !!(searchParams.checkIn && searchParams.checkOut);

  // Scroll lock until a location is selected
  useEffect(() => {
    if (!selectedLocation) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedLocation]);

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
    setHasSearched(true);
    setHeroCalendarActive(false);
    setIsSearchingData(true);
    setTimeout(() => {
      setSearchKey((prev) => prev + 1);
      setIsSearchingData(false);
    }, SEARCH_DELAY_MS);
  };

  const handleReset = () => { window.location.href = "/"; };

  const filteredRooms = filterRoomsByDestination(
    mockRooms,
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
    handleSearchTrigger,
    handleDestinationChange,
    handleReset,
  };
}
