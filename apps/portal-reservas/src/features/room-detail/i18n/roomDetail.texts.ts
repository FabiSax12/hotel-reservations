import type { SupportedLocale } from "@hotel/i18n";
import type { RoomDetailTexts } from "./roomDetailTexts.type";

export const ROOM_DETAIL_TEXTS: Record<SupportedLocale, RoomDetailTexts> = {
  es: {
    OPEN_LABEL: "Ver detalles de {title}",
    CLOSE: "Cerrar panel de detalles",
    PACKAGE_COUNT: "{count} habitaciones en este paquete",
    ROOM_POSITION: "Habitación {current} de {total}",
    CAROUSEL_LABEL: "Galería en carrusel",
    CAROUSEL_ROLE: "carrusel",
    PREV_IMAGE: "Imagen anterior",
    NEXT_IMAGE: "Imagen siguiente",
    IMAGE_POSITION: "Imagen {current} de {total}",
    GALLERY_LABEL: "Galería de imágenes",
    CAPACITY_VALUE: "Hasta {count} huéspedes",
    ABOUT_TITLE: "Sobre el hospedaje",
    PRICE_PLACEHOLDER: "Selecciona fechas para ver el precio",
  },
  en: {
    OPEN_LABEL: "View details for {title}",
    CLOSE: "Close details panel",
    PACKAGE_COUNT: "{count} rooms in this package",
    ROOM_POSITION: "Room {current} of {total}",
    CAROUSEL_LABEL: "Image carousel",
    CAROUSEL_ROLE: "carousel",
    PREV_IMAGE: "Previous image",
    NEXT_IMAGE: "Next image",
    IMAGE_POSITION: "Image {current} of {total}",
    GALLERY_LABEL: "Image gallery",
    CAPACITY_VALUE: "Up to {count} guests",
    ABOUT_TITLE: "About this stay",
    PRICE_PLACEHOLDER: "Select dates to see the price",
  },
} as const;
