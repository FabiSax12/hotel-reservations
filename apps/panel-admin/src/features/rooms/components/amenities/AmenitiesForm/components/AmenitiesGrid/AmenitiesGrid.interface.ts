import { Amenity } from "@/features/rooms/domain/amenity.interface";

export interface AmenitiesGridProps {
  amenities: Amenity[];
  selectedIds: string[];
  isAddingCustom: boolean;
  texts: any;
  toggleAmenity: (id: string) => void;
  handleAddCustom: (name: string, icon?: string, description?: string) => Promise<void>;
  handleUpdateCustom: (id: string, name: string, icon: string, description?: string) => Promise<void>;
  handleDeleteCustom: (id: string) => Promise<void>;
}
