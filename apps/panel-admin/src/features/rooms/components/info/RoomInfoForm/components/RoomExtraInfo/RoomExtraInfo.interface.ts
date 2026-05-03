import type { RoomsTexts } from "../../../../../i18n/roomsTexts.type";

export interface RoomExtraInfoProps {
  texts: RoomsTexts;
  getErrorMessage: (message?: string) => string | undefined;
}
