"use client";

import { useContext } from "react";
import { SearchBarContext } from "../context/SearchBarContext";

export function useSearchBarContext() {
  const context = useContext(SearchBarContext);
  if (!context) {
    throw new Error("useSearchBarContext must be used within a SearchBarProvider");
  }
  return context;
}
