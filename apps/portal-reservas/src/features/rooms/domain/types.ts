/**
 * @file types.ts — Room-feature domain types for Portal de Reservas.
 *
 * Defines the data shape for a single hotel room listing.
 * Currently consumed by mock data, the filter logic, and all room components.
 */

/** A single room listing as returned by the (future) reservation API. */
export interface Room {
  /** Unique identifier (e.g. "mv-1", "lf-2"). */
  id: string;
  /** Resort destination name (must match a value from REGIONS_CONFIG). */
  location: string;
  /** Human-readable room name. */
  title: string;
  /** Room category (e.g. "Standard", "Suite", "Family", "Villa"). */
  type: string;
  /** Average price per night in USD. */
  price: number;
  /** Number of rooms currently available for the user's dates. */
  inventory: number;
  /** Room area in square meters. */
  sqft: number;
  /** Marketing description of the room. */
  description: string;
  /** Unsplash URL for the hero image of this room. */
  image: string;
}
