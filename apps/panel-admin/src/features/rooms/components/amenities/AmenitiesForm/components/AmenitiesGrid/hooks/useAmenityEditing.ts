import { useState } from "react";
import { AMENITIES_CONFIG } from "@/features/rooms/constants/amenities.constants";
import type { Amenity } from "@/features/rooms/domain/amenity.interface";

export const useAmenityEditing = (
  handleUpdateCustom: (
    id: string,
    name: string,
    icon: string,
    description?: string,
  ) => Promise<void>,
) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingDesc, setEditingDesc] = useState("");
  const [editingIcon, setEditingIcon] = useState<string>(AMENITIES_CONFIG.DEFAULT_ICON);

  const handleSaveEdit = async () => {
    if (!editingId || !editingName.trim()) return;
    await handleUpdateCustom(editingId, editingName.trim(), editingIcon, editingDesc.trim());
    setEditingId(null);
  };

  const startEditing = (amenity: Amenity) => {
    setEditingId(amenity.id);
    setEditingName(amenity.name);
    setEditingDesc(amenity.description || "");
    setEditingIcon(amenity.icon || AMENITIES_CONFIG.DEFAULT_ICON);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  return {
    editingId,
    editingName,
    setEditingName,
    editingDesc,
    setEditingDesc,
    editingIcon,
    setEditingIcon,
    handleSaveEdit,
    startEditing,
    cancelEditing,
  };
};
