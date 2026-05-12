import React from "react";
import type { Amenity } from "@/features/rooms/domain/amenity.interface";
import { AmenityCard } from "../../../AmenityCard";
import { AmenityEditorCard } from "../../../AmenityEditorCard";
import { useAmenitiesGridContext } from "../../context";

interface GridItemProps {
  amenity: Amenity;
}

export const GridItem = ({ amenity }: GridItemProps) => {
  const {
    selectedIds,
    editingId,
    editingName,
    setEditingName,
    editingDesc,
    setEditingDesc,
    editingIcon,
    setEditingIcon,
    handleSaveEdit,
    cancelEditing,
    isAddingCustom,
    texts,
    activeDescId,
    toggleAmenity,
    startEditing,
    setAmenityToDelete,
    toggleFlip,
  } = useAmenitiesGridContext();

  const isSelected = selectedIds.includes(amenity.id);
  const isCurrentEditing = editingId === amenity.id;

  if (isCurrentEditing) {
    return (
      <AmenityEditorCard
        name={editingName}
        setName={setEditingName}
        desc={editingDesc}
        setDesc={setEditingDesc}
        selectedIcon={editingIcon}
        setSelectedIcon={setEditingIcon}
        onSave={handleSaveEdit}
        onCancel={cancelEditing}
        isSubmitting={isAddingCustom}
        placeholderName={texts.AMENITIES.ADD_CUSTOM_PLACEHOLDER}
        placeholderDesc={texts.AMENITIES.ADD_DESC_PLACEHOLDER}
        autoFocus
      />
    );
  }

  return (
    <AmenityCard
      amenity={amenity}
      isSelected={isSelected}
      isFlipped={activeDescId === amenity.id}
      onToggle={() => toggleAmenity(amenity.id)}
      onEdit={() => startEditing(amenity)}
      onDelete={() => setAmenityToDelete(amenity)}
      onFlipToggle={() => toggleFlip(amenity.id)}
      texts={texts}
    />
  );
};
