import type { RoomsTexts } from "@/features/rooms/i18n/roomsTexts.type";

export interface RoomFeesProps {
  texts: RoomsTexts;
  getErrorMessage: (message?: string) => string | undefined;
}
