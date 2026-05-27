import { createSupabaseClient } from "@hotel/db/client";
import type { RoomSchedule } from "@/features/rooms/domain/schedule.interface";

export const scheduleService = {
  getRoomSchedules: async (roomId: string): Promise<RoomSchedule[]> => {
    const supabase = createSupabaseClient() as any;
    const { data, error } = await supabase
      .from("room_schedules")
      .select("*")
      .eq("room_id", roomId);

    if (error) throw new Error(error.message);
    return data as RoomSchedule[];
  },

  saveRoomSchedules: async (
    roomId: string,
    schedules: { checkIn: string[]; checkOut: string[] },
  ): Promise<void> => {
    const supabase = createSupabaseClient() as any;

    // 1. Delete existing schedules for this room to avoid duplicates
    const { error: deleteError } = await supabase
      .from("room_schedules")
      .delete()
      .eq("room_id", roomId);

    if (deleteError) throw new Error(deleteError.message);

    // 2. Insert the new schedules
    const checkInRecords = schedules.checkIn.map((time) => ({
      room_id: roomId,
      schedule_type: "check_in",
      // the DB expects "time without time zone", which accepts "HH:MM" or "HH:MM:SS"
      time_slot: time.length === 5 ? `${time}:00` : time,
    }));

    const checkOutRecords = schedules.checkOut.map((time) => ({
      room_id: roomId,
      schedule_type: "check_out",
      time_slot: time.length === 5 ? `${time}:00` : time,
    }));

    const allRecords = [...checkInRecords, ...checkOutRecords];

    if (allRecords.length > 0) {
      const { error: insertError } = await supabase.from("room_schedules").insert(allRecords);

      if (insertError) throw new Error(insertError.message);
    }
  },
};
