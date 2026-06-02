/**
 * @file index.ts — Barrel export for the layout feature.
 *
 * Exports the global layout components used across the portal-reservas app:
 * - Background: Full-viewport blurred nature photo with overlays.
 * - Header: Top-level header with brand, nav, and optional sticky search bar.
 * - HeaderBrand: Logo component that resets to hero state on click.
 * - HeaderNav: Help and account navigation.
 * - StickySearchBar: Compact search bar pinned below the header after first search.
 */

export { Background } from "./components/Background";
export { Header } from "./components/Header";
export { HeaderBrand } from "./components/HeaderBrand";
export { HeaderNav } from "./components/HeaderNav";
export { StickySearchBar } from "./components/StickySearchBar";
