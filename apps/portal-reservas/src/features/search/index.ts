/**
 * @file index.ts — Barrel export for the search feature.
 */

// Search Bar
export { ModernSearchBar } from "./components/search-bar";
export type { SearchState, SearchBarProps, ValidationError } from "./components/search-bar";

// Domain
export type { SearchParams } from "./domain/types";
