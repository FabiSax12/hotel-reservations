import { useState } from "react";
import type { UseFormSetValue } from "react-hook-form";
import {
  AMENITIES_CONFIG,
  AMENITIES_VALIDATION,
} from "@/features/rooms/constants/amenities.constants";
import type { Amenity } from "@/features/rooms/domain/amenity.interface";
import {
  addCustomAmenityAction,
  deleteCustomAmenityAction,
  updateCustomAmenityAction,
} from "@/features/rooms/services/amenityActions";
import { useI18n } from "@/locales";
import type { AmenitiesFormValues } from "../AmenitiesForm.interface";
import { AMENITIES_FORM_CONSTANTS } from "../constants/amenitiesForm.constants";

const { FORM_FIELD: FORM_FIELD_NAME, ERROR_MESSAGES, FALLBACK_ERRORS } = AMENITIES_FORM_CONSTANTS;

export const useCustomAmenities = (
  amenities: Amenity[],
  setAmenities: React.Dispatch<React.SetStateAction<Amenity[]>>,
  selectedIds: string[],
  setValue: UseFormSetValue<AmenitiesFormValues>,
) => {
  const { t } = useI18n();
  const texts = t.ROOMS;
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  const handleAddCustom = async (
    name: string,
    icon: string = AMENITIES_CONFIG.DEFAULT_ICON,
    description = "",
  ) => {
    const trimmed = name.trim();
    if (!trimmed || trimmed.length > AMENITIES_VALIDATION.MAX_NAME_LENGTH) return;

    const exists = amenities.some((a) => a.name.toLowerCase() === trimmed.toLowerCase());
    if (exists) return;

    setIsAddingCustom(true);
    try {
      const { data: newAmenity, error } = await addCustomAmenityAction(trimmed, icon, description);
      if (error || !newAmenity) {
        throw new Error(error || texts.AMENITIES.ERROR_ADD || FALLBACK_ERRORS.ADD_FAILED);
      }

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
      const { data: updated, error } = await updateCustomAmenityAction(
        id,
        trimmed,
        icon,
        description,
      );
      if (error || !updated) {
        throw new Error(error || texts.AMENITIES.ERROR_UPDATE || FALLBACK_ERRORS.UPDATE_FAILED);
      }

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
      const { error } = await deleteCustomAmenityAction(id);
      if (error) {
        throw new Error(error || texts.AMENITIES.ERROR_DELETE || FALLBACK_ERRORS.DELETE_FAILED);
      }

      setAmenities((prev) => prev.filter((a) => a.id !== id));
      setValue(
        FORM_FIELD_NAME,
        selectedIds.filter((i) => i !== id),
        { shouldValidate: true },
      );
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
