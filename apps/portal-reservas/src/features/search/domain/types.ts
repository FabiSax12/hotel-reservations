/**
 * @file types.ts — Search-feature domain types for Portal de Reservas.
 *
 * Defines the shape of the search parameters that flow between the
 * page orchestrator, the hero search, and the compact search bar.
 */

/** Parameters captured from the search bar when a user submits a query. */
export interface SearchParams {
  /** Selected resort destination (e.g. "Monteverde", "Arenal & La Fortuna", or SEARCH_VALS.DESTINATION_ALL). */
  destination: string;
  /** Check-in date, formatted as a short locale string (e.g. "15 Oct"). */
  checkIn: string;
  /** Check-out date, formatted as a short locale string (e.g. "21 Oct"). */
  checkOut: string;
  /** Number of adult guests (age 13+). */
  adults: number;
  /** Number of child guests (ages 2-12). */
  children: number;
  /** Number of pets. */
  pets: number;
  /** Optional room ID to prioritize in results (set when user checks availability from a specific room card). */
  prioritizedRoomId?: string;
}

// ─── Component Props ────────────────────────────────────────────────────────

export interface HeroSearchProps {
  onDestinationChange?: (dest: string) => void;
  onSearch: (params: SearchParams) => void;
  heroCalendarActive: boolean;
  setHeroCalendarActive: (active: boolean) => void;
  hasLocation: boolean;
}

export interface ScrollIndicatorProps {
  heroCalendarActive: boolean;
}
