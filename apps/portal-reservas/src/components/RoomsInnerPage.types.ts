/**
 * @file RoomsInnerPage.types.ts — Props interface for the RoomsInnerPage component.
 *
 * All props flow from useHomePageState() through page.tsx into this component.
 * This separation keeps the root page as a pure composition layer.
 */

import type { Room } from "../features/rooms/domain/types";
import type { SearchParams } from "../features/search/domain/types";

export interface RoomsInnerPageProps {
  /** Whether the user has triggered at least one search (switches from hero to sticky bar). */
  hasSearched: boolean;
  /** The selected destination name (e.g., "Monteverde") or null if none chosen yet. */
  selectedLocation: string | null;
  /** Whether the hero calendar overlay is currently visible. */
  heroCalendarActive: boolean;
  /** Toggles the hero calendar overlay. */
  setHeroCalendarActive: (v: boolean) => void;
  /** Current search parameters (destination, dates, guest counts). */
  searchParams: SearchParams;
  /** Incremented on each new search to force RoomList remount (replays entrance animation). */
  searchKey: number;
  /** Whether both check-in and check-out dates are set. */
  hasDates: boolean;
  /** Whether a search is currently being processed (shows skeleton loaders). */
  isSearchingData: boolean;
  /** Rooms filtered by the selected destination. */
  filteredRooms: Room[];
  /** Room ID to show first in the list (set when user checks availability from a specific room card). */
  prioritizedRoomId: string | null;
  /** Callback to trigger a search with the given parameters. */
  onSearchTrigger: (params: SearchParams) => void;
  /** Callback when the destination changes in the search bar. */
  onDestinationChange: (dest: string) => void;
  /** Callback to reset the page to the hero state (navigates to /). */
  onReset: () => void;
}
