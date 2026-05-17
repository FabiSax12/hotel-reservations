/**
 * @file page.tsx — Root page of the Portal de Reservas application.
 *
 * This is the top-level orchestrator component. It manages the two-phase
 * UI lifecycle of the portal:
 *
 *  1. **State A – Hero Search**: A full-viewport landing page with a cinematic
 *     search bar and the hotel's value proposition headline.
 *  2. **State B – Results**: Once the user triggers a search, the hero collapses
 *     into a sticky compact search bar pinned to the header, and a scrollable
 *     list of room cards is rendered below.
 *
 * All visual sub-trees are delegated to feature-sliced components. This file
 * owns only the shared page-level state and the conditional rendering logic
 * that switches between the two phases.
 */

"use client";

import { useState } from "react";
import { Background } from "../features/layout/components/Background";
import { Header } from "../features/layout/components/Header";
import { RoomList } from "../features/rooms/components/RoomList";
import { filterRoomsByDestination } from "../features/rooms/domain/filters";
import { mockRooms } from "../features/rooms/mock-data/rooms";
import { HeroSearch } from "../features/search/components/HeroSearch";
import { SEARCH_VALS } from "../features/search/components/search-bar/constants/search.constants";
import type { SearchParams } from "../features/search/domain/types";
import { PAGE_STYLES as S } from "../theme/layout.theme";

export default function HomePage() {
  /** Whether the user has triggered at least one search (switches to State B). */
  const [hasSearched, setHasSearched] = useState(false);

  /** Controls the hero calendar expansion animation in State A. */
  const [heroCalendarActive, setHeroCalendarActive] = useState(false);

  /**
   * A monotonically-increasing counter used as a React `key` on the results
   * list. Incrementing it forces React to remount the list, which re-triggers
   * the staggered card entrance animations on every new search.
   */
  const [searchKey, setSearchKey] = useState(0);

  /** The current search parameters, shared between the hero and compact bars. */
  const [searchParams, setSearchParams] = useState<SearchParams>({
    destination: SEARCH_VALS.DESTINATION_ALL,
    checkIn: "15 Oct",
    checkOut: "21 Oct",
    adults: 2,
    children: 0,
    pets: 0,
  });

  /**
   * Handles a search submission from either the hero or compact search bar.
   * Updates the shared params, transitions to State B, and bumps the animation key.
   */
  const handleSearchTrigger = (params: any) => {
    setSearchParams(params);
    setHasSearched(true);
    setSearchKey((prev) => prev + 1);
  };

  /** Resets the page back to State A (hero search). */
  const handleReset = () => {
    setHasSearched(false);
    setHeroCalendarActive(false);
  };

  const selectedDest = searchParams.destination;
  const filteredRooms = filterRoomsByDestination(mockRooms, selectedDest);

  return (
    <main className={S.main}>
      <Background />

      <Header
        hasSearched={hasSearched}
        searchParams={searchParams}
        onReset={handleReset}
        onSearch={handleSearchTrigger}
      />

      {/* State A: Full-screen hero with cinematic search */}
      {!hasSearched && (
        <HeroSearch
          onSearch={handleSearchTrigger}
          heroCalendarActive={heroCalendarActive}
          setHeroCalendarActive={setHeroCalendarActive}
        />
      )}

      {/* State B: Scrollable room results */}
      {hasSearched && (
        <RoomList rooms={filteredRooms} selectedDest={selectedDest} searchKey={searchKey} />
      )}
    </main>
  );
}
