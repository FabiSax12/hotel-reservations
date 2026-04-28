import type { RoomCategory } from "../constants/info.constants";

export interface Room {
  id: string;
  name: string;
  category: RoomCategory;
  capacity_adults: number;
  capacity_kids: number;
  description: string;
  regular_fee: number;
  high_season_fee: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export type CreateRoomDTO = Omit<Room, "id" | "created_at" | "updated_at">;
export type UpdateRoomDTO = Partial<CreateRoomDTO>;
