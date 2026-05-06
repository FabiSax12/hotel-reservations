/**
 * @file SearchBarContext.tsx — React Context for the search bar feature.
 *
 * Distributes aggregated search bar state (destination, dates, guests,
 * validation, UI state) to all sub-components without prop drilling.
 */

"use client";

import React from "react";
import type { SearchBarContextValue } from "./types";

export const SearchBarContext = React.createContext<SearchBarContextValue | null>(null);

export function SearchBarProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SearchBarContextValue;
}) {
  return <SearchBarContext.Provider value={value}>{children}</SearchBarContext.Provider>;
}
