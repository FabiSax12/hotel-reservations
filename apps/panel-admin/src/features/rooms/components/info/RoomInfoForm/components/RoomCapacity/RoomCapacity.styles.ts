import { SHARED_FORM_STYLES } from "@/features/rooms/components/info/RoomInfoForm/components/shared/shared.styles";

export const ROOM_CAPACITY_STYLES = {
  ...SHARED_FORM_STYLES,
  formContainer: "flex flex-col gap-6",
} as const;
