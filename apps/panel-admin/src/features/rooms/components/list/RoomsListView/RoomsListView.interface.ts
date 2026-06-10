import type { Room } from "@/features/rooms/domain/room.interface";

export interface RoomsListViewProps {
  rooms: Promise<Room[]>;
}
