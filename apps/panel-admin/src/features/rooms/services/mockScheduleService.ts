import { MOCK_SCHEDULES_STORAGE_KEY } from "@/features/rooms/constants/check-in-check-out.constants";
import { MOCK_SERVICE_DELAYS } from "@/features/rooms/constants/info.constants";
import type { RoomSchedule } from "@/features/rooms/domain/schedule.interface";

const STORAGE_KEY = MOCK_SCHEDULES_STORAGE_KEY;

const simulateNetworkDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getStoredRoomSchedules = (): RoomSchedule[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveRoomSchedulesToStorage = (schedules: RoomSchedule[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
};

export const mockScheduleService = {
  getRoomSchedules: async (roomId: string): Promise<RoomSchedule[]> => {
    await simulateNetworkDelay(MOCK_SERVICE_DELAYS.GET_BY_ID);
    const allSchedules = getStoredRoomSchedules();
    return allSchedules.filter((s) => s.room_id === roomId);
  },

  saveRoomSchedules: async (
    roomId: string,
    schedules: { checkIn: string[]; checkOut: string[] },
  ): Promise<void> => {
    await simulateNetworkDelay(MOCK_SERVICE_DELAYS.UPDATE);
    const allSchedules = getStoredRoomSchedules();

    // Filter out existing schedules for this room
    const otherRoomsSchedules = allSchedules.filter((s) => s.room_id !== roomId);

    // Build check-in schedules
    const newCheckInSchedules: RoomSchedule[] = schedules.checkIn.map((time) => ({
      id: `sch-${Date.now()}-in-${Math.random().toString(36).substr(2, 9)}`,
      room_id: roomId,
      schedule_type: "check_in",
      time_slot: time,
      created_at: new Date().toISOString(),
    }));

    // Build check-out schedules
    const newCheckOutSchedules: RoomSchedule[] = schedules.checkOut.map((time) => ({
      id: `sch-${Date.now()}-out-${Math.random().toString(36).substr(2, 9)}`,
      room_id: roomId,
      schedule_type: "check_out",
      time_slot: time,
      created_at: new Date().toISOString(),
    }));

    saveRoomSchedulesToStorage([
      ...otherRoomsSchedules,
      ...newCheckInSchedules,
      ...newCheckOutSchedules,
    ]);
  },
};
