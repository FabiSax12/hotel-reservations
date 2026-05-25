import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type RoomInfoFormData,
  roomInfoSchema,
} from "@/features/rooms/components/info/RoomInfoForm/RoomInfoForm.interface";
import {
  DEFAULT_ADULTS,
  DEFAULT_HIGH_SEASON_FEE,
  DEFAULT_KIDS,
  DEFAULT_PET_FRIENDLY,
  DEFAULT_REGULAR_FEE,
  DEFAULT_ROOM_STATE,
  VALIDATION_ERROR_PREFIX,
} from "@/features/rooms/constants/info.constants";
import { ROOM_FORM_FIELDS } from "@/features/rooms/constants/roomFormFields";
import type { Room } from "@/features/rooms/domain/room.interface";
import { useI18n } from "@/locales";

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
      [ROOM_FORM_FIELDS.REGULAR_FEE]: DEFAULT_REGULAR_FEE,
      [ROOM_FORM_FIELDS.HIGH_SEASON_FEE]: DEFAULT_HIGH_SEASON_FEE,
      [ROOM_FORM_FIELDS.IS_ACTIVE]: DEFAULT_ROOM_STATE,
      [ROOM_FORM_FIELDS.IS_PET_FRIENDLY]: DEFAULT_PET_FRIENDLY,
    },
  });

  const getErrorMessage = (errorKey?: string) => {
    if (!errorKey) return undefined;
    const parts = errorKey.split(".");
    if (parts[0] === VALIDATION_ERROR_PREFIX && parts[1]) {
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
