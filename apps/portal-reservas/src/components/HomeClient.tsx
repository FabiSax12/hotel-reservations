/**
 * @file HomeClient.tsx — Client island for the root page (US-DM-07).
 *
 * The page is a Server Component that fetches rooms from the DB and hands them
 * here. This island owns the interactive page lifecycle (search, scroll lock,
 * phase transitions) via useHomePageState and renders the rooms providers.
 */

"use client";

import { useHomePageState } from "../hooks/useHomePageState";
import type { HomeClientProps } from "./HomeClient.types";
import { RoomsInnerPage } from "./RoomsInnerPage";

export function HomeClient({ initialRooms }: HomeClientProps) {
  const state = useHomePageState(initialRooms);

  return (
    <RoomsInnerPage
      hasSearched={state.hasSearched}
      selectedLocation={state.selectedLocation}
      heroCalendarActive={state.heroCalendarActive}
      setHeroCalendarActive={state.setHeroCalendarActive}
      searchParams={state.searchParams}
      searchKey={state.searchKey}
      hasDates={state.hasDates}
      isSearchingData={state.isSearchingData}
      filteredRooms={state.filteredRooms}
      prioritizedRoomId={state.prioritizedRoomId}
      onSearchTrigger={state.handleSearchTrigger}
      onDestinationChange={state.handleDestinationChange}
      onReset={state.handleReset}
    />
  );
}
