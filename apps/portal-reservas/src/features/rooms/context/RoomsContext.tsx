/**
 * @file RoomsContext.tsx — Shared state provider for the rooms feature.
 *
 * Distributes the following state to all room sub-components without prop drilling:
 *  - `selectedLocation`: The currently selected destination (null = none selected).
 *  - `hasDates`: Whether both checkIn and checkOut dates are set.
 *  - `searchDates`: The actual date strings from the search bar.
 *  - `expandedRoomId`: Which room card is currently expanded (only one at a time).
 *  - `onSearch`: The page-level search callback for QuickSearchDialog.
 *
 * Usage:
 *  - Wrap the rooms section in `<RoomsProvider value={...}>`.
 *  - Consume state in any sub-component via `useRoomsContext()`.
 */

"use client";

import { createContext, useContext } from "react";
import type { SearchParams } from "../../search/domain/types";

export interface SearchDates {
  checkIn: string;
  checkOut: string;
}

export interface RoomsContextValue {
  /** Currently selected destination name, or null if none selected. */
  selectedLocation: string | null;
  /** Whether both checkIn and checkOut are set. Prices + availability only shown when true. */
  hasDates: boolean;
  /** The actual date strings; null when no search has been triggered yet. */
  searchDates: SearchDates | null;
  /** Room ID of the currently expanded card; null if all are collapsed. */
  expandedRoomId: string | null;
  /** Sets which room is expanded (null to collapse all). */
  setExpandedRoomId: (id: string | null) => void;
  /**
   * Page-level search callback. Passed to QuickSearchDialog so it can trigger
   * a full search from within a room card without prop drilling.
   */
  onSearch: (params: SearchParams) => void;
}

const RoomsContext = createContext<RoomsContextValue | null>(null);

export function RoomsProvider({
  value,
  children,
}: {
  value: RoomsContextValue;
  children: React.ReactNode;
}) {
  return <RoomsContext.Provider value={value}>{children}</RoomsContext.Provider>;
}

/**
 * Consumes the RoomsContext. Must be called inside a `<RoomsProvider>`.
 * Throws a descriptive error if used outside the provider tree.
 */
export function useRoomsContext(): RoomsContextValue {
  const ctx = useContext(RoomsContext);
  if (!ctx) {
    throw new Error(
      "useRoomsContext must be used inside a <RoomsProvider>. " +
        "Check that RoomsProvider wraps the rooms section in page.tsx.",
    );
  }
  return ctx;
}
