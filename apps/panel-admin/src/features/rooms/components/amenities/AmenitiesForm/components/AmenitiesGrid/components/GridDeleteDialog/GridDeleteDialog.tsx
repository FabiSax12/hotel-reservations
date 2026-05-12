import React from "react";
import { DeleteAmenityDialog } from "../../../DeleteAmenityDialog";
import { useAmenitiesGridContext } from "../../context";

export const GridDeleteDialog = () => {
  const { amenityToDelete, handleOpenChange, handleDeleteConfirm, texts } =
    useAmenitiesGridContext();

  return (
    <DeleteAmenityDialog
      amenity={amenityToDelete}
      onOpenChange={handleOpenChange}
      onConfirm={handleDeleteConfirm}
      texts={texts}
    />
  );
};
