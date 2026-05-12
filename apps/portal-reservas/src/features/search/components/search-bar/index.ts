/**
 * @file index.ts — Barrel export for the local search-bar feature.
 *
 * Re-exports the `ModernSearchBar` and its public types for local consumption
 * inside the portal-reservas app.
 */

export type { SearchBarProps, SearchState, ValidationError } from "./domain/types";
export { ModernSearchBar } from "./sub-components/ModernSearchBar";
