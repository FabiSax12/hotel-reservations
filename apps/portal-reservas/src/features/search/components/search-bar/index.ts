/**
 * @file index.ts — Barrel export for the local search-bar feature.
 *
 * Re-exports the `ModernSearchBar` and its public types for local consumption
 * inside the portal-reservas app.
 */

export { ModernSearchBar } from "./components/ModernSearchBar";
export type { SearchState, SearchBarProps, ValidationError } from "./domain/types";
