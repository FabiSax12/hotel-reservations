import { createSupabaseClient, DB_COLUMNS, DB_TABLES } from "@hotel/db";
import { ROOM_NOT_FOUND_ERROR } from "@/features/rooms/constants/info.constants";
import type { CreateRoomDTO, Room, UpdateRoomDTO } from "@/features/rooms/domain/room.interface";

export const roomService = {
  getAllRooms: async (supabase = createSupabaseClient()): Promise<Room[]> => {
    const { data, error } = await supabase
      .from(DB_TABLES.ROOMS)
      .select("*")
      .order(DB_COLUMNS.rooms.created_at, { ascending: false });

    if (error) throw new Error(error.message);
    return data as Room[];
  },

  getRoomById: async (id: string, supabase = createSupabaseClient()): Promise<Room | null> => {
    const { data, error } = await supabase
      .from(DB_TABLES.ROOMS)
      .select("*")
      .eq(DB_COLUMNS.rooms.id, id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(error.message);
    }
    return data as Room;
  },

  createRoom: async (data: CreateRoomDTO, supabase = createSupabaseClient()): Promise<Room> => {
    const { data: newRoom, error } = await supabase
      .from(DB_TABLES.ROOMS)
      .insert([data])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return newRoom as Room;
  },

  updateRoom: async (
    id: string,
    data: UpdateRoomDTO,
    supabase = createSupabaseClient(),
  ): Promise<Room> => {
    const { data: updatedRoom, error } = await supabase
      .from(DB_TABLES.ROOMS)
      .update(data)
      .eq(DB_COLUMNS.rooms.id, id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") throw new Error(ROOM_NOT_FOUND_ERROR);
      throw new Error(error.message);
    }
    return updatedRoom as Room;
  },

  toggleRoomState: async (id: string, supabase = createSupabaseClient()): Promise<Room> => {
    const room = await roomService.getRoomById(id, supabase);
    if (!room) throw new Error(ROOM_NOT_FOUND_ERROR);

    return roomService.updateRoom(id, { [DB_COLUMNS.rooms.is_active]: !room.is_active }, supabase);
  },
};
