import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AmenitiesFormValues } from "../AmenitiesForm.interface";
import { mockAmenitiesService } from "@/features/rooms/services/mockAmenitiesService";
import { Amenity } from "@/features/rooms/domain/amenity.interface";
import { ROOMS_TEXTS } from "@/features/rooms/i18n/rooms.texts";
import { useI18n } from "@/locales";

export const useAmenitiesForm = (roomId: string, onSuccess?: () => void) => {
  const { locale } = useI18n();
  const texts = ROOMS_TEXTS[locale as keyof typeof ROOMS_TEXTS] || ROOMS_TEXTS.en;
  
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<AmenitiesFormValues>({
    defaultValues: {
      amenityIds: [],
    },
  });

  const selectedIds = watch("amenityIds");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [predefined, roomSelected] = await Promise.all([
          mockAmenitiesService.getPredefinedAmenities(),
          mockAmenitiesService.getRoomAmenities(roomId),
        ]);
        setAmenities(predefined);
        setValue("amenityIds", roomSelected);
      } catch (error) {
        console.error("Error loading amenities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [roomId, setValue]);

  const toggleAmenity = (id: string) => {
    const current = selectedIds;
    if (current.includes(id)) {
      setValue("amenityIds", current.filter((i) => i !== id), { shouldValidate: true });
    } else {
      setValue("amenityIds", [...current, id], { shouldValidate: true });
    }
  };

  const onSubmit = async (data: AmenitiesFormValues) => {
    setIsSubmitting(true);
    try {
      await mockAmenitiesService.saveRoomAmenities(roomId, data.amenityIds);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error saving amenities:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const localizedAmenities = amenities.map((amenity) => {
    const translation = texts.AMENITIES.ITEMS[amenity.id];
    return {
      ...amenity,
      name: translation ? translation.name : amenity.name,
      description: translation ? translation.description : amenity.description,
    };
  });

  const filteredAmenities = localizedAmenities.filter((a) =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    amenities: filteredAmenities,
    selectedIds,
    isLoading,
    isSubmitting,
    errors,
    texts,
    searchTerm,
    setSearchTerm,
    toggleAmenity,
    handleSubmit: handleSubmit(onSubmit),
  };
};
