import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useI18n } from "@/locales";
import { roomInfoSchema, type RoomInfoFormData } from "../RoomInfoForm/RoomInfoForm.interface";
import { ROOM_FORM_FIELDS } from "../../../constants/roomFormFields";
import { DEFAULT_ADULTS, DEFAULT_KIDS, DEFAULT_ROOM_STATE } from "../../../constants/info.constants";
import type { Room } from "../../../domain/room.interface";

export const useRoomInfoForm = (initialData?: Room) => {
  const { t } = useI18n();
  const texts = t.ROOMS;

  const methods = useForm<RoomInfoFormData>({
    resolver: zodResolver(roomInfoSchema),
    defaultValues: initialData || {
      [ROOM_FORM_FIELDS.NAME]: "",
      [ROOM_FORM_FIELDS.CATEGORY]: "",
      [ROOM_FORM_FIELDS.CAPACITY_ADULTS]: DEFAULT_ADULTS,
      [ROOM_FORM_FIELDS.CAPACITY_KIDS]: DEFAULT_KIDS,
      [ROOM_FORM_FIELDS.DESCRIPTION]: "",
      [ROOM_FORM_FIELDS.REGULAR_FEE]: 0,
      [ROOM_FORM_FIELDS.HIGH_SEASON_FEE]: 0,
      [ROOM_FORM_FIELDS.IS_ACTIVE]: DEFAULT_ROOM_STATE,
      [ROOM_FORM_FIELDS.IS_PET_FRIENDLY]: false,
    },
  });

  const getErrorMessage = (errorKey?: string) => {
    if (!errorKey) return undefined;
    const parts = errorKey.split(".");
    if (parts[0] === "VALIDATION" && parts[1]) {
      return (texts.VALIDATION as any)[parts[1]];
    }
    return errorKey;
  };

  return {
    methods,
    getErrorMessage,
    texts,
  };
};
