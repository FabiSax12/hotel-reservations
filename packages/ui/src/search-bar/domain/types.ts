/**
 * @file types.ts — Domain types for the ModernSearchBar component.
 */

/**
 * Identifies which section of the search bar is currently expanded/focused.
 * `null` means no section is active (all popovers are closed).
 */
export type ActiveSection = "where" | "checkIn" | "checkOut" | "who" | null;

/**
 * The data payload emitted by the search bar when the user triggers a search.
 * Mirrors the portal's `SearchParams` but lives in the UI package so the
 * component can define its own contract independently.
 */
export interface SearchState {
  /** Selected destination name, or "Todos" for all. */
  destination: string;
  /** ISO date string for check-in (e.g. "2026-10-15"). */
  checkIn: string;
  /** ISO date string for check-out (e.g. "2026-10-21"). */
  checkOut: string;
  /** Number of adult guests. */
  adults: number;
  /** Number of child guests. */
  children: number;
  /** Number of pets. */
  pets: number;
}

/**
 * Props accepted by the `<ModernSearchBar>` component.
 */
export interface SearchBarProps {
  /** Callback fired when the user clicks "Buscar". Receives the full search state. */
  onSearch?: (state: SearchState) => void;
  /** Additional CSS class(es) for the outermost container. */
  className?: string; 
  /**
   * Visual variant:
   *  - `"hero"` — Large size for the full-viewport landing page.
   *  - `"compact"` — Smaller size for the sticky header bar.
   */
  size?: 'compact' | 'hero';
  /** Optional initial field values (used to restore state in the compact bar). */
  initialState?: Partial<SearchState>;
  /**
   * Callback fired the first time the hero-mode calendar expands.
   * The parent (HeroSearch) uses this to trigger the title fade-out animation.
   */
  onHeroCalendarOpen?: () => void;
}
