import type { Room, CreateRoomDTO, UpdateRoomDTO } from "@/features/rooms/domain/room.interface";
import { MOCK_SERVICE_DELAYS } from "@/features/rooms/constants/info.constants";

const STORAGE_KEY = "hotel_rooms_mock";

const simulateNetworkDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getStoredRooms = (): Room[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveRooms = (rooms: Room[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
};

export const mockRoomService = {
  getAllRooms: async (): Promise<Room[]> => {
    await simulateNetworkDelay(MOCK_SERVICE_DELAYS.GET_ALL);
    return getStoredRooms();
  },

  getRoomById: async (id: string): Promise<Room | null> => {
    await simulateNetworkDelay(MOCK_SERVICE_DELAYS.GET_BY_ID);
    const rooms = getStoredRooms();
    return rooms.find((room) => room.id === id) || null;
  },

  createRoom: async (data: CreateRoomDTO): Promise<Room> => {
    await simulateNetworkDelay(MOCK_SERVICE_DELAYS.CREATE);
    const rooms = getStoredRooms();
    const newRoom: Room = {
      ...data,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    saveRooms([...rooms, newRoom]);
    return newRoom;
  },

  updateRoom: async (id: string, data: UpdateRoomDTO): Promise<Room> => {
    await simulateNetworkDelay(MOCK_SERVICE_DELAYS.UPDATE);
    const rooms = getStoredRooms();
    const roomIndex = rooms.findIndex((room) => room.id === id);
    if (roomIndex === -1) throw new Error("ROOM_NOT_FOUND");

    const updatedRoom: Room = {
      ...rooms[roomIndex],
      ...data,
      updated_at: new Date().toISOString(),
    };

    const updatedRooms = [...rooms];
    updatedRooms[roomIndex] = updatedRoom;
    saveRooms(updatedRooms);
    return updatedRoom;
  },

  toggleRoomState: async (id: string): Promise<Room> => {
    await simulateNetworkDelay(MOCK_SERVICE_DELAYS.TOGGLE);
    const rooms = getStoredRooms();
    const room = rooms.find((room) => room.id === id);
    if (!room) throw new Error("ROOM_NOT_FOUND");

    return mockRoomService.updateRoom(id, { is_active: !room.is_active });
  },
};
