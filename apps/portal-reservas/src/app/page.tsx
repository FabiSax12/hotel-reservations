/**
 * @file page.tsx — Root page of the Portal de Reservas application.
 *
 * Updated in US-DM-02 to support two additional capabilities:
 *
 *  1. **Location-activated rooms section**: The rooms section renders as soon as
 *     the user selects a destination — no full search required. When only one
 *     location exists in REGIONS_CONFIG, it is auto-selected on mount.
 *
 *  2. **Scroll lock**: While no location is selected, the page body overflow is
 *     set to `hidden` so users cannot scroll past the hero. Cleared when a
 *     location is resolved.
 *
 *  3. **RoomsProvider**: Wraps the rooms section with shared context for
 *     expansion state, hasDates, and the page-level onSearch callback.
 *
 * Page lifecycle:
 *  - Phase 1 (no location): Hero only, scroll locked.
 *  - Phase 2 (location, no dates): Hero + rooms below (no prices).
 *  - Phase 3 (searched, has dates): Sticky compact bar + rooms with CTAs.
 */

"use client";

import { useState, useEffect } from "react";
import type { SearchParams } from "../features/search/domain/types";
import { mockRooms } from "../features/rooms/mock-data/rooms";
import { Background } from "../features/layout/components/Background";
import { Header } from "../features/layout/components/Header";
import { HeroSearch } from "../features/search/components/HeroSearch";
import { RoomList } from "../features/rooms/components/RoomList";
import { RoomsProvider } from "../features/rooms/context/RoomsContext";
import { filterRoomsByDestination } from "../features/rooms/domain/filters";
import { SEARCH_VALS } from "../features/search/components/search-bar/constants/search.constants";
import { REGIONS_CONFIG } from "../features/search/components/search-bar/constants/regionsConfig";
import { PAGE_STYLES as S } from "../theme/layout.theme";

// Auto-select the only location if there is exactly one
const AUTO_SELECTED_LOCATION =
  REGIONS_CONFIG.length === 1 ? REGIONS_CONFIG[0].name : null;

export default function HomePage() {
  /** Whether the user has submitted a full search (switches to State B). */
  const [hasSearched, setHasSearched] = useState(false);

  /** The currently selected destination. Auto-populated if only one exists. */
  const [selectedLocation, setSelectedLocation] = useState<string | null>(AUTO_SELECTED_LOCATION);

  /** Controls the hero calendar expansion animation. */
  const [heroCalendarActive, setHeroCalendarActive] = useState(false);

  /**
   * Monotonically-increasing counter used as a React `key` on the results list.
   * Incrementing forces a remount, which replays the staggered card animations.
   */
  const [searchKey, setSearchKey] = useState(0);

  /** The current search parameters, shared between hero and compact bars. */
  const [searchParams, setSearchParams] = useState<SearchParams>({
    destination: SEARCH_VALS.DESTINATION_ALL,
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    pets: 0,
  });

  /** Derived: whether valid date range is present. */
  const hasDates = !!(searchParams.checkIn && searchParams.checkOut);

  /**
   * Scroll lock: body overflow is hidden until a location is selected.
   * Cleanup ensures overflow is always restored if the component unmounts.
   */
  useEffect(() => {
    if (!selectedLocation) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedLocation]);

  /**
   * Fires when the hero search bar's destination changes (before search submission).
   * Activates the rooms section early.
   */
  const handleDestinationChange = (dest: string) => {
    if (dest && dest !== SEARCH_VALS.DESTINATION_ALL) {
      setSelectedLocation(dest);
    }
  };

  /**
   * Fires when the user submits a search from either the hero or compact bar.
   * Transitions to State B (sticky header + rooms with dates).
   */
  const handleSearchTrigger = (params: SearchParams) => {
    setSearchParams(params);
    if (params.destination && params.destination !== SEARCH_VALS.DESTINATION_ALL) {
      setSelectedLocation(params.destination);
    }
    setHasSearched(true);
    setSearchKey((prev) => prev + 1);
  };

  /** Resets the page back to State A (hero search). */
  const handleReset = () => {
    setHasSearched(false);
    setHeroCalendarActive(false);
    setSearchParams({
      destination: SEARCH_VALS.DESTINATION_ALL,
      checkIn: "",
      checkOut: "",
      adults: 2,
      children: 0,
      pets: 0,
    });
    setSelectedLocation(AUTO_SELECTED_LOCATION);
  };

  const filteredRooms = filterRoomsByDestination(
    mockRooms,
    selectedLocation ?? SEARCH_VALS.DESTINATION_ALL,
  );

  const roomsContextValue = {
    selectedLocation,
    hasDates,
    searchDates: hasDates
      ? { checkIn: searchParams.checkIn, checkOut: searchParams.checkOut }
      : null,
    expandedRoomId: null as string | null, // managed inside RoomsProvider via setState below
    setExpandedRoomId: (_id: string | null) => {}, // overridden by InnerPage below
    onSearch: handleSearchTrigger,
  };

  return (
    <RoomsInnerPage
      hasSearched={hasSearched}
      selectedLocation={selectedLocation}
      heroCalendarActive={heroCalendarActive}
      setHeroCalendarActive={setHeroCalendarActive}
      searchParams={searchParams}
      searchKey={searchKey}
      hasDates={hasDates}
      filteredRooms={filteredRooms}
      onSearchTrigger={handleSearchTrigger}
      onDestinationChange={handleDestinationChange}
      onReset={handleReset}
    />
  );
}

/**
 * Inner component that owns `expandedRoomId` state, allowing it to live
 * inside the RoomsProvider without prop-drilling through the parent.
 */
function RoomsInnerPage({
  hasSearched,
  selectedLocation,
  heroCalendarActive,
  setHeroCalendarActive,
  searchParams,
  searchKey,
  hasDates,
  filteredRooms,
  onSearchTrigger,
  onDestinationChange,
  onReset,
}: {
  hasSearched: boolean;
  selectedLocation: string | null;
  heroCalendarActive: boolean;
  setHeroCalendarActive: (v: boolean) => void;
  searchParams: SearchParams;
  searchKey: number;
  hasDates: boolean;
  filteredRooms: ReturnType<typeof filterRoomsByDestination>;
  onSearchTrigger: (params: SearchParams) => void;
  onDestinationChange: (dest: string) => void;
  onReset: () => void;
}) {
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);

  const roomsContextValue = {
    selectedLocation,
    hasDates,
    searchDates: hasDates
      ? { checkIn: searchParams.checkIn, checkOut: searchParams.checkOut }
      : null,
    expandedRoomId,
    setExpandedRoomId,
    onSearch: onSearchTrigger,
  };

  return (
    <RoomsProvider value={roomsContextValue}>
      <main className={S.main}>
        <Background />

        <Header
          hasSearched={hasSearched}
          searchParams={searchParams}
          onReset={onReset}
          onSearch={onSearchTrigger}
        />

        {/* State A: Full-screen hero with cinematic search */}
        {!hasSearched && (
          <HeroSearch
            onSearch={onSearchTrigger}
            onDestinationChange={onDestinationChange}
            heroCalendarActive={heroCalendarActive}
            setHeroCalendarActive={setHeroCalendarActive}
            hasLocation={!!selectedLocation}
          />
        )}

        {/* Rooms section — visible once a location is selected, regardless of State A/B */}
        {selectedLocation && (
          <RoomList
            rooms={filteredRooms}
            selectedDest={selectedLocation}
            searchKey={searchKey}
          />
        )}
      </main>
    </RoomsProvider>
  );
}
