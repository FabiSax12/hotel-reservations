import type { ReactNode } from "react";
import type { Room } from "@/features/rooms/domain/room.interface";
import type { RoomsFilterState } from "@/features/rooms/reducers/roomsFilter/initial-state";

export interface RoomsFilterProviderProps {
  rooms: Room[];
  initialFilters?: Partial<RoomsFilterState>;
  children: ReactNode;
}
