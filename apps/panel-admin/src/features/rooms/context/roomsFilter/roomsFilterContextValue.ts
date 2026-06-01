import type { Room } from "@/features/rooms/domain/room.interface";
import type { RoomsFilterAction } from "@/features/rooms/reducers/roomsFilter/actions";
import type { RoomsFilterState } from "../../reducers/roomsFilter/initial-state";

export interface RoomsFilterContextValue {
  state: RoomsFilterState;
  dispatch: React.Dispatch<RoomsFilterAction>;
  filteredRooms: Room[];
  isFiltered: boolean;
  resultCount: number;
  totalCount: number;
  clearFilters: () => void;
}
