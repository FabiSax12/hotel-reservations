import type { RoomsTexts } from "../../../../../i18n/roomsTexts.type";

export interface RoomCapacityProps {
  texts: RoomsTexts;
  getErrorMessage: (message?: string) => string | undefined;
}
