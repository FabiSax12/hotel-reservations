/**
 * @file types.ts — Room-feature domain types for Portal de Reservas.
 *
 * Defines the data shape for a single hotel room listing.
 * Updated in US-DM-02 to include capacity, amenities, adminTip, additional
 * images, and dynamically-computed available dates for mock availability logic.
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
  /** Average price per night in USD. Only shown when dates are selected. */
  price: number;
  /** Maximum guest capacity (adults + children combined). */
  capacity: number;
  /** Number of rooms currently available for the user's dates. */
  inventory: number;
  /** Room area in square meters. */
  sqft: number;
  /** Full marketing description of the room. */
  description: string;
  /** Short administrator recommendation shown as a badge on the card. */
  adminTip: string;
  /** Unsplash URL for the hero image of this room. */
  image: string;
  /** Up to 3 additional image URLs shown in the expanded gallery panel. */
  images: string[];
  /** List of included amenity tags (e.g. "WiFi", "Jacuzzi", "Terraza"). */
  amenities: string[];
  /**
   * ISO date strings (YYYY-MM-DD) representing available check-in days.
   * Generated dynamically at import time from today + offsets.
   * Used by the mock availability resolver and AvailabilityCalendarDialog.
   */
  availableDates: string[];
}
