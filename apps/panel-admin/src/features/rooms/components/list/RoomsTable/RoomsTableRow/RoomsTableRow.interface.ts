import type { Room } from "@/features/rooms/domain/room.interface";

export interface RoomsTableRowProps {
  room: Room;
  isAvailable: boolean;
  capacityText: string;
  statusAvailable: string;
  statusUnavailable: string;
}
