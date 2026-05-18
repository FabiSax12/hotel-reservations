import { useState } from "react";
import type { Amenity } from "@/features/rooms/domain/amenity.interface";

export const useDeleteAmenityDialog = (handleDeleteCustom: (id: string) => Promise<void>) => {
  const [amenityToDelete, setAmenityToDelete] = useState<Amenity | null>(null);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setAmenityToDelete(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (amenityToDelete) {
      await handleDeleteCustom(amenityToDelete.id);
      setAmenityToDelete(null);
    }
  };

  return {
    amenityToDelete,
    setAmenityToDelete,
    handleOpenChange,
    handleDeleteConfirm,
  };
};
