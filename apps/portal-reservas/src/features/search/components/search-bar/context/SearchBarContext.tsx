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
