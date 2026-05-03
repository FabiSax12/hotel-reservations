import type { RoomsTexts } from "../../../../../i18n/roomsTexts.type";

export interface RoomFeesProps {
  texts: RoomsTexts;
  getErrorMessage: (message?: string) => string | undefined;
}
