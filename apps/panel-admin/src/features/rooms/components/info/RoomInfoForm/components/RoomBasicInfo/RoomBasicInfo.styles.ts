import { SHARED_FORM_STYLES } from "@/features/rooms/components/info/RoomInfoForm/components/shared/shared.styles";

export const ROOM_BASIC_INFO_STYLES = {
  ...SHARED_FORM_STYLES,
  formContainer: "flex flex-col gap-6",
  selectContent: "flex items-center gap-3 text-black",
  selectValue: "text-foreground",
} as const;
