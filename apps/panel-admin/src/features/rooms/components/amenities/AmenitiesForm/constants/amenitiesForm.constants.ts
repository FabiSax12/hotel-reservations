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
  FALLBACK_ERRORS: {
    ADD_FAILED: "Failed to add amenity",
    UPDATE_FAILED: "Failed to update amenity",
    DELETE_FAILED: "Failed to delete amenity",
  } as const,
} as const;
