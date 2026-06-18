/**
 * @file roomsService.ts — DB-backed room reads for the portal (US-DM-07).
 *
 * Replaces the former mock dataset. Public room data (rooms + amenities) is read
 * with the anon server client since those tables are world-readable via RLS.
 * Images are read from room_images in a separate query (avoids relying on a
 * PostgREST embed relationship) and reservations — needed to derive availability
 * — are RLS-protected, so they are read with the service-role client. That
 * client never reaches the browser (this module is only imported by Server
 * Components / server files) and no reservation row is returned to the client:
 * only the computed available-date list leaves here.
 */

import { DB_COLUMNS, DB_TABLES } from "@hotel/db";
import { createSupabaseServerActionClient, createSupabaseServiceClient } from "@hotel/db/client";
import {
  RESERVATION_STATUS,
  ROOM_AVAILABILITY,
  ROOM_SERVICE_ERROR,
} from "../constants/rooms.constants";
import { computeAvailableDates, type ReservedRange } from "../domain/availability";
import type { Room } from "../domain/types";
import { mapRoom, type RoomRow } from "./room.mapper";

/** Shape of the embedded rooms query result (rooms + amenities relation). */
interface RoomQueryRow extends RoomRow {
  room_amenities: { amenities: { name: string } | null }[];
}

/** Rooms + amenities select, built from typed column/table constants. */
const ROOMS_SELECT = [
  DB_COLUMNS.rooms.id,
  DB_COLUMNS.rooms.name,
  DB_COLUMNS.rooms.category,
  DB_COLUMNS.rooms.capacity_adults,
  DB_COLUMNS.rooms.capacity_kids,
  DB_COLUMNS.rooms.description,
  DB_COLUMNS.rooms.regular_fee,
  `${DB_TABLES.ROOM_AMENITIES}(${DB_TABLES.AMENITIES}(${DB_COLUMNS.amenities.name}))`,
].join(",");

const IMAGES_SELECT = [
  DB_COLUMNS.room_images.room_id,
  DB_COLUMNS.room_images.url,
  DB_COLUMNS.room_images.position,
].join(",");

const RESERVATIONS_SELECT = [
  DB_COLUMNS.reservations.room_id,
  DB_COLUMNS.reservations.check_in,
  DB_COLUMNS.reservations.check_out,
].join(",");

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function toAmenityNames(row: RoomQueryRow): string[] {
  return row.room_amenities
    .map((link) => link.amenities?.name)
    .filter((name): name is string => Boolean(name));
}

/**
 * Reads each room's images (ordered by position), grouped by room id.
 *
 * Images are an optional enhancement — `room_images` stays empty until an admin
 * uploads via US-KA-06 — so a read failure here is deliberately NON-fatal: the
 * listing keeps rendering with gradient placeholders rather than failing the
 * whole page over a secondary, currently-empty table.
 */
async function loadImagesByRoom(roomIds: string[]): Promise<Map<string, string[]>> {
  const byRoom = new Map<string, string[]>();
  try {
    const supabase = createSupabaseServerActionClient();
    const { data, error } = await supabase
      .from(DB_TABLES.ROOM_IMAGES)
      .select(IMAGES_SELECT)
      .in(DB_COLUMNS.room_images.room_id, roomIds)
      .order(DB_COLUMNS.room_images.position)
      .returns<{ room_id: string; url: string; position: number }[]>();

    if (error) throw new Error(error.message);

    for (const row of data ?? []) {
      const urls = byRoom.get(row.room_id) ?? [];
      urls.push(row.url);
      byRoom.set(row.room_id, urls);
    }
  } catch (cause) {
    console.error(`${ROOM_SERVICE_ERROR.FETCH_ROOMS} (images, non-fatal):`, cause);
  }
  return byRoom;
}

/** Reads each room's non-cancelled reservations, grouped by room id. */
async function loadReservedRanges(roomIds: string[]): Promise<Map<string, ReservedRange[]>> {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from(DB_TABLES.RESERVATIONS)
    .select(RESERVATIONS_SELECT)
    .in(DB_COLUMNS.reservations.room_id, roomIds)
    .neq(DB_COLUMNS.reservations.status, RESERVATION_STATUS.CANCELLED)
    .returns<{ room_id: string; check_in: string; check_out: string }[]>();

  if (error) throw new Error(`${ROOM_SERVICE_ERROR.FETCH_AVAILABILITY}: ${error.message}`);

  const byRoom = new Map<string, ReservedRange[]>();
  for (const row of data ?? []) {
    const ranges = byRoom.get(row.room_id) ?? [];
    ranges.push({ checkIn: row.check_in, checkOut: row.check_out });
    byRoom.set(row.room_id, ranges);
  }
  return byRoom;
}

/** Shared loader: fetch rooms (optionally by id), enrich, and map to domain. */
async function loadRooms(ids?: string[]): Promise<Room[]> {
  const supabase = createSupabaseServerActionClient();
  const base = supabase.from(DB_TABLES.ROOMS).select(ROOMS_SELECT);
  const scoped = ids
    ? base.in(DB_COLUMNS.rooms.id, ids)
    : base.eq(DB_COLUMNS.rooms.is_active, true);

  const { data, error } = await scoped.returns<RoomQueryRow[]>();
  if (error) throw new Error(`${ROOM_SERVICE_ERROR.FETCH_ROOMS}: ${error.message}`);

  const rows = data ?? [];
  if (rows.length === 0) return [];

  const roomIds = rows.map((row) => row.id);
  const [imagesByRoom, reservedByRoom] = await Promise.all([
    loadImagesByRoom(roomIds),
    loadReservedRanges(roomIds),
  ]);
  const start = todayIso();

  return rows.map((row) =>
    mapRoom({
      row,
      amenities: toAmenityNames(row),
      images: imagesByRoom.get(row.id) ?? [],
      availableDates: computeAvailableDates(
        reservedByRoom.get(row.id) ?? [],
        start,
        ROOM_AVAILABILITY.WINDOW_DAYS,
      ),
    }),
  );
}

/** Returns every active room, enriched and ready for the listing. */
export async function getRooms(): Promise<Room[]> {
  return loadRooms();
}

/**
 * Resolves a list of room IDs to rooms, preserving input order and dropping any
 * ID that does not match a known room. Used by the checkout flow to rebuild a
 * reservation from the IDs carried in the URL.
 */
export async function getRoomsByIds(ids: string[]): Promise<Room[]> {
  if (ids.length === 0) return [];
  const rooms = await loadRooms(ids);
  const byId = new Map(rooms.map((room) => [room.id, room]));
  return ids.map((id) => byId.get(id)).filter((room): room is Room => room !== undefined);
}
