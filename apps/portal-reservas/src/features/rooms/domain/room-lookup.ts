/**
 * @file room-lookup.ts — Resolve rooms from their stable IDs.
 *
 * Pure lookups over the mock room dataset, used by the checkout flow to
 * reconstruct a reservation from the IDs carried in the URL. Replaceable by an
 * API fetch when the backend lands.
 */

import { mockRooms } from "../mock-data/rooms";
import type { Room } from "./types";

/** Returns the room with the given ID, or undefined when not found. */
export function findRoomById(id: string): Room | undefined {
  return mockRooms.find((room) => room.id === id);
}

/**
 * Resolves a list of room IDs to rooms, preserving input order and dropping any
 * ID that does not match a known room.
 */
export function findRoomsByIds(ids: string[]): Room[] {
  return ids.map(findRoomById).filter((room): room is Room => room !== undefined);
}
