import { Amenity, RoomAmenity } from "@/features/rooms/domain/amenity.interface";
import { MOCK_AMENITIES, MOCK_AMENITIES_STORAGE_KEY } from "@/features/rooms/constants/amenities.constants";
import { MOCK_SERVICE_DELAYS } from "@/features/rooms/constants/info.constants";

const STORAGE_KEY = MOCK_AMENITIES_STORAGE_KEY;
const AMENITIES_LIST_KEY = "hotel_amenities_list_mock";

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

const getStoredAmenities = (): Amenity[] => {
  if (typeof window === "undefined") return MOCK_AMENITIES;
  const stored = localStorage.getItem(AMENITIES_LIST_KEY);
  if (!stored) {
    localStorage.setItem(AMENITIES_LIST_KEY, JSON.stringify(MOCK_AMENITIES));
    return MOCK_AMENITIES;
  }
  return JSON.parse(stored);
};

const saveAmenities = (amenities: Amenity[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(AMENITIES_LIST_KEY, JSON.stringify(amenities));
};

export const mockAmenitiesService = {
  getPredefinedAmenities: async (): Promise<Amenity[]> => {
    await simulateNetworkDelay(MOCK_SERVICE_DELAYS.GET_ALL);
    return getStoredAmenities();
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

  addCustomAmenity: async (name: string, icon: string = "Sparkles", description: string = ""): Promise<Amenity> => {
    await simulateNetworkDelay(MOCK_SERVICE_DELAYS.UPDATE);
    const list = getStoredAmenities();
    const newId = `custom-${Date.now()}`;
    const newAmenity: Amenity = {
      id: newId,
      name,
      icon,
      description,
    };
    saveAmenities([...list, newAmenity]);
    return newAmenity;
  },

  updateCustomAmenity: async (id: string, name: string, icon: string, description: string = ""): Promise<Amenity> => {
    await simulateNetworkDelay(MOCK_SERVICE_DELAYS.UPDATE);
    const list = getStoredAmenities();
    let updatedAmenity: Amenity | null = null;
    const updatedList = list.map((a) => {
      if (a.id === id) {
        updatedAmenity = { ...a, name, icon, description };
        return updatedAmenity;
      }
      return a;
    });
    saveAmenities(updatedList);
    return updatedAmenity || { id, name, icon, description };
  },

  deleteCustomAmenity: async (id: string): Promise<void> => {
    await simulateNetworkDelay(MOCK_SERVICE_DELAYS.UPDATE);
    const list = getStoredAmenities();
    saveAmenities(list.filter((a) => a.id !== id));

    // Clean up room associations
    const roomAmenities = getStoredRoomAmenities();
    saveRoomAmenities(roomAmenities.filter((ra) => ra.amenity_id !== id));
  },
};
