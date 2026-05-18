import { useState } from "react";
import { AMENITIES_CONFIG } from "@/features/rooms/constants/amenities.constants";

export const useAmenityAdding = (
  handleAddCustom: (name: string, icon?: string, description?: string) => Promise<void>,
) => {
  const [isAdding, setIsAdding] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customDesc, setCustomDesc] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string>(AMENITIES_CONFIG.DEFAULT_ICON);

  const handleSaveCustom = async () => {
    if (!customName.trim()) return;
    await handleAddCustom(customName.trim(), selectedIcon, customDesc.trim());
    setCustomName("");
    setCustomDesc("");
    setSelectedIcon(AMENITIES_CONFIG.DEFAULT_ICON);
    setIsAdding(false);
  };

  const cancelAdding = () => {
    setIsAdding(false);
    setCustomName("");
    setCustomDesc("");
    setSelectedIcon(AMENITIES_CONFIG.DEFAULT_ICON);
  };

  return {
    isAdding,
    setIsAdding,
    customName,
    setCustomName,
    customDesc,
    setCustomDesc,
    selectedIcon,
    setSelectedIcon,
    handleSaveCustom,
    cancelAdding,
  };
};
