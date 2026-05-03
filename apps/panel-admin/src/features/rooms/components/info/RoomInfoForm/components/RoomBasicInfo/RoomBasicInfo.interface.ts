import type { RoomsTexts } from "@/features/rooms/i18n/roomsTexts.type";

export interface RoomBasicInfoProps {
  texts: RoomsTexts;
  getErrorMessage: (message?: string) => string | undefined;
}
