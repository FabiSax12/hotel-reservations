import type { Room } from "@/features/rooms/domain/room.interface";
import type {
  RoomsFilterAction,
  RoomsFilterState,
} from "@/features/rooms/reducers/roomsFilter/actions";

export interface RoomsFilterContextValue {
  state: RoomsFilterState;
  dispatch: React.Dispatch<RoomsFilterAction>;
  filteredRooms: Room[];
  isFiltered: boolean;
  resultCount: number;
  totalCount: number;
  clearFilters: () => void;
}
