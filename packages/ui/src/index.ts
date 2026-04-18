/**
 * @file index.ts — Public API barrel for the @hotel/ui package.
 *
 * Re-exports everything from the search-bar feature module.
 * Consumers import from "@hotel/ui" and get `ModernSearchBar`,
 * `SearchState`, and `SearchBarProps`.
 */

export * from "./search-bar";
