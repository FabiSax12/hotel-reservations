/**
 * @file index.ts — Barrel export for the search-bar feature module.
 *
 * Exposes the public component and types that downstream apps consume.
 * Internal sub-components (DestinationPopover, CalendarPopover, etc.)
 * are NOT exported here — they are implementation details of ModernSearchBar.
 */

export { ModernSearchBar } from "./components/ModernSearchBar";
export type { SearchState, SearchBarProps, ValidationError } from "./domain/types";
