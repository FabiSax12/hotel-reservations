import { Amenity } from "@/features/rooms/domain/amenity.interface";

export interface AmenitiesFormProps {
  roomId: string;
  onSuccess?: () => void;
}

export interface AmenitiesFormValues {
  amenityIds: string[];
}

export interface AmenityCardProps {
  amenity: Amenity;
  isSelected: boolean;
  onToggle: (id: string) => void;
}
