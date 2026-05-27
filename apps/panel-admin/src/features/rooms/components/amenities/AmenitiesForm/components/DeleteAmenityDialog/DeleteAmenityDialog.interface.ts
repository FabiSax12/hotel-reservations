import type { Amenity } from "@/features/rooms/domain/amenity.interface";

export interface DeleteAmenityDialogProps {
  amenity: Amenity | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  texts: any;
}
