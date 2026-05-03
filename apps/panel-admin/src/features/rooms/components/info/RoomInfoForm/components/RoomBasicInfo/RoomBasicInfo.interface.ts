import type { RoomsTexts } from "../../../../../i18n/roomsTexts.type";

export interface RoomBasicInfoProps {
  texts: RoomsTexts;
  getErrorMessage: (message?: string) => string | undefined;
}
