export type ScheduleType = "check_in" | "check_out";

export interface RoomSchedule {
  id?: string;
  room_id: string;
  schedule_type: ScheduleType;
  time_slot: string; // "HH:MM"
  created_at?: string;
  updated_at?: string;
}
