import type { Room } from "./room.interface";

export interface RoomStatusCounts {
  available: number;
  unavailable: number;
  total: number;
}

export const countRoomsByStatus = (rooms: Room[]): RoomStatusCounts => {
  let available = 0;
  let unavailable = 0;

  for (const room of rooms) {
    if (room.is_active) available++;
    else unavailable++;
  }

  return { available, unavailable, total: rooms.length };
};
