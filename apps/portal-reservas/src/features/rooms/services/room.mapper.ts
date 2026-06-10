/**
 * @file room.mapper.ts — Pure mapper from a `rooms` row to the domain Room.
 *
 * Decoupled from the Supabase client so it stays trivially unit-testable. The
 * service shapes the raw query result into MapRoomInput, this function turns it
 * into the Room the UI consumes. DB-pending fields (location, beds, adminTip,
 * check-in/out times) are intentionally left undefined here — see Room (US-DM-07).
 */

import { ROOM_DEFAULTS } from "../constants/rooms.constants";
import type { Room } from "../domain/types";

/** The subset of `rooms` columns the mapper reads. */
export interface RoomRow {
  id: string;
  name: string;
  category: string;
  capacity_adults: number;
  capacity_kids: number;
  description: string | null;
  regular_fee: number | string;
}

/** Raw room row plus its already-resolved relations. */
export interface MapRoomInput {
  row: RoomRow;
  /** Amenity names from `room_amenities` → `amenities`. */
  amenities: string[];
  /** Image URLs ordered by `room_images.position` (hero first). */
  images: string[];
  /** Available check-in days computed from this room's reservations. */
  availableDates: string[];
}

export function mapRoom({ row, amenities, images, availableDates }: MapRoomInput): Room {
  return {
    id: row.id,
    title: row.name,
    type: row.category,
    // `numeric` columns arrive as strings from PostgREST — coerce once here.
    price: Number(row.regular_fee),
    capacity: row.capacity_adults + row.capacity_kids,
    description: row.description ?? "",
    amenities,
    availableDates,
    inventory: ROOM_DEFAULTS.INVENTORY,
    image: images[0],
    images: images.slice(1),
    // location, beds, adminTip, checkInTime, checkOutTime: no DB source yet (US-DM-07).
  };
}
