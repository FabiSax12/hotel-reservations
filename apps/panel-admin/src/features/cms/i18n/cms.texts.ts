import type { SupportedLocale } from "@hotel/i18n";
import type { CmsTexts } from "./cmsTexts.type";

export const CMS_TEXTS: Record<SupportedLocale, CmsTexts> = {
  es: {
    PAGE_TITLE: "Editor de Contenido",
    SECTION_HERO: "Hero",
    SECTION_ABOUT: "Sobre nosotros",
    LOCALE_ES: "Español",
    LOCALE_EN: "Inglés",
    HERO: {
      TITLE_LABEL: "Título",
      SUBTITLE_LABEL: "Subtítulo",
      CTA_LABEL: "Texto del botón",
      TITLE_PLACEHOLDER: "Ej: Donde la selva",
      SUBTITLE_PLACEHOLDER: "Ej: Lujo sin pretensiones en perfecta armonía...",
      CTA_PLACEHOLDER: "Ej: Reservar ahora",
    },
    ABOUT: {
      IMAGES_LABEL: "Imágenes de la sección",
      IMAGE_SLOT_LABEL: "Imagen",
      UPLOAD_HINT: "JPG, PNG o WebP · Máx 5 MB",
      CHANGE: "Cambiar",
      REMOVE: "Quitar",
    },
    ACTIONS: {
      SAVE: "Guardar cambios",
      SAVING: "Guardando...",
      SUCCESS: "¡Cambios guardados!",
      ERROR: "Error al guardar. Intentá de nuevo.",
      ERROR_SIZE: "El archivo supera los 5 MB",
      ERROR_TYPE: "Solo se permiten JPG, PNG y WebP",
    },
  },
  en: {
    PAGE_TITLE: "Content Editor",
    SECTION_HERO: "Hero",
    SECTION_ABOUT: "About Us",
    LOCALE_ES: "Spanish",
    LOCALE_EN: "English",
    HERO: {
      TITLE_LABEL: "Title",
      SUBTITLE_LABEL: "Subtitle",
      CTA_LABEL: "Button text",
      TITLE_PLACEHOLDER: "e.g., Where the forest",
      SUBTITLE_PLACEHOLDER: "e.g., Unpretentious luxury in perfect harmony...",
      CTA_PLACEHOLDER: "e.g., Book now",
    },
    ABOUT: {
      IMAGES_LABEL: "Section images",
      IMAGE_SLOT_LABEL: "Image",
      UPLOAD_HINT: "JPG, PNG or WebP · Max 5 MB",
      CHANGE: "Change",
      REMOVE: "Remove",
    },
    ACTIONS: {
      SAVE: "Save changes",
      SAVING: "Saving...",
      SUCCESS: "Changes saved!",
      ERROR: "Error saving. Please try again.",
      ERROR_SIZE: "File exceeds 5 MB",
      ERROR_TYPE: "Only JPG, PNG and WebP are allowed",
    },
  },
};
