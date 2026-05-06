import { Amenity } from "@/features/rooms/domain/amenity.interface";
import { RoomsTexts } from "@/features/rooms/i18n/roomsTexts.type";

export interface AmenityCardProps {
  amenity: Amenity;
  isSelected: boolean;
  isFlipped: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onFlipToggle: () => void;
  texts: RoomsTexts;
}
