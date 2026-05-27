/**
 * @file index.ts — Barrel export for the search feature.
 */

export type { SearchBarProps, SearchState, ValidationError } from "./components/search-bar";
// Search Bar
export { ModernSearchBar } from "./components/search-bar";

// Domain
export type { SearchParams } from "./domain/types";
