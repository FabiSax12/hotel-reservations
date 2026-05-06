import { Amenity, RoomAmenity } from "@/features/rooms/domain/amenity.interface";
import { MOCK_AMENITIES, MOCK_AMENITIES_STORAGE_KEY } from "@/features/rooms/constants/amenities.constants";
import { MOCK_SERVICE_DELAYS } from "@/features/rooms/constants/info.constants";

const STORAGE_KEY = MOCK_AMENITIES_STORAGE_KEY;

const simulateNetworkDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getStoredRoomAmenities = (): RoomAmenity[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveRoomAmenities = (roomAmenities: RoomAmenity[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(roomAmenities));
};

export const mockAmenitiesService = {
  getPredefinedAmenities: async (): Promise<Amenity[]> => {
    await simulateNetworkDelay(MOCK_SERVICE_DELAYS.GET_ALL);
    return MOCK_AMENITIES;
  },

  getRoomAmenities: async (roomId: string): Promise<string[]> => {
    await simulateNetworkDelay(MOCK_SERVICE_DELAYS.GET_BY_ID);
    const allRoomAmenities = getStoredRoomAmenities();
    return allRoomAmenities
      .filter((ra) => ra.room_id === roomId)
      .map((ra) => ra.amenity_id);
  },

  saveRoomAmenities: async (roomId: string, amenityIds: string[]): Promise<void> => {
    await simulateNetworkDelay(MOCK_SERVICE_DELAYS.UPDATE);
    const allRoomAmenities = getStoredRoomAmenities();
    
    // Filter out existing amenities for this room
    const otherRoomsAmenities = allRoomAmenities.filter((ra) => ra.room_id !== roomId);
    
    // Add new ones
    const newRoomAmenities: RoomAmenity[] = amenityIds.map((id) => ({
      room_id: roomId,
      amenity_id: id,
      created_at: new Date().toISOString(),
    }));
    
    saveRoomAmenities([...otherRoomsAmenities, ...newRoomAmenities]);
  },
};
