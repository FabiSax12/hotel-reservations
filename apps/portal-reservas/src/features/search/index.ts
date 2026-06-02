/**
 * @file index.ts — Barrel export for the search feature.
 *
 * This is the single public API surface of the search feature.
 * Consumers import from "features/search" — never from internal paths.
 *
 * Exports:
 * - ModernSearchBar: The orchestrator component (hero and compact variants)
 * - SearchState, SearchBarProps, ValidationError: Public types
 * - SearchParams: Domain type for the search output payload
 */

export type { SearchBarProps, SearchState, ValidationError } from "./components/search-bar";
// Search Bar — the orchestrator and its public types.
export { ModernSearchBar } from "./components/search-bar";

// Domain types — the external contract of the search feature.
export type { SearchParams } from "./domain/types";
