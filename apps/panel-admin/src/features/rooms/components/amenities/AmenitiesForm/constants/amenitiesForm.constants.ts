export const AMENITIES_FORM_CONSTANTS = {
  FORM_FIELD: "amenityIds" as const,
  LOG_MESSAGES: {
    LOAD_ERROR: "Error loading amenities:",
    SAVE_ERROR: "Error saving amenities:",
  } as const,
  ERROR_MESSAGES: {
    ADD_CUSTOM: "Error adding custom amenity:",
    UPDATE_CUSTOM: "Error updating custom amenity:",
    DELETE_CUSTOM: "Error deleting custom amenity:",
  } as const,
} as const;
