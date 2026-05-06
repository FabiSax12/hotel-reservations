import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { Amenity } from "@/features/rooms/domain/amenity.interface";
import { mockAmenitiesService } from "@/features/rooms/services/mockAmenitiesService";
import { AmenitiesFormValues } from "../AmenitiesForm.interface";
import { AMENITIES_CONFIG, AMENITIES_VALIDATION } from "@/features/rooms/constants/amenities.constants";
import { AMENITIES_FORM_CONSTANTS } from "../constants/amenitiesForm.constants";

const { FORM_FIELD: FORM_FIELD_NAME, ERROR_MESSAGES } = AMENITIES_FORM_CONSTANTS;

export const useCustomAmenities = (
  amenities: Amenity[],
  setAmenities: React.Dispatch<React.SetStateAction<Amenity[]>>,
  selectedIds: string[],
  setValue: UseFormSetValue<AmenitiesFormValues>
) => {
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  const handleAddCustom = async (
    name: string,
    icon: string = AMENITIES_CONFIG.DEFAULT_ICON,
    description = ""
  ) => {
    const trimmed = name.trim();
    if (!trimmed || trimmed.length > AMENITIES_VALIDATION.MAX_NAME_LENGTH) return;

    // Check if it already exists (case insensitive)
    const exists = amenities.some(
      (a) => a.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) return;

    setIsAddingCustom(true);
    try {
      const newAmenity = await mockAmenitiesService.addCustomAmenity(trimmed, icon, description);
      setAmenities((prev) => [...prev, newAmenity]);
      setValue(FORM_FIELD_NAME, [...selectedIds, newAmenity.id], { shouldValidate: true });
    } catch (error) {
      console.error(ERROR_MESSAGES.ADD_CUSTOM, error);
    } finally {
      setIsAddingCustom(false);
    }
  };

  const handleUpdateCustom = async (id: string, name: string, icon: string, description = "") => {
    const trimmed = name.trim();
    if (!trimmed || trimmed.length > AMENITIES_VALIDATION.MAX_NAME_LENGTH) return;

    setIsAddingCustom(true);
    try {
      const updated = await mockAmenitiesService.updateCustomAmenity(id, trimmed, icon, description);
      setAmenities((prev) => prev.map((a) => (a.id === id ? updated : a)));
    } catch (error) {
      console.error(ERROR_MESSAGES.UPDATE_CUSTOM, error);
    } finally {
      setIsAddingCustom(false);
    }
  };

  const handleDeleteCustom = async (id: string) => {
    setIsAddingCustom(true);
    try {
      await mockAmenitiesService.deleteCustomAmenity(id);
      setAmenities((prev) => prev.filter((a) => a.id !== id));
      setValue(FORM_FIELD_NAME, selectedIds.filter((i) => i !== id), { shouldValidate: true });
    } catch (error) {
      console.error(ERROR_MESSAGES.DELETE_CUSTOM, error);
    } finally {
      setIsAddingCustom(false);
    }
  };

  return {
    isAddingCustom,
    handleAddCustom,
    handleUpdateCustom,
    handleDeleteCustom,
  };
};
