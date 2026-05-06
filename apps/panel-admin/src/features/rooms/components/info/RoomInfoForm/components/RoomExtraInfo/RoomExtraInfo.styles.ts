import { SHARED_FORM_STYLES } from "@/features/rooms/components/info/RoomInfoForm/components/shared/shared.styles";

export const ROOM_EXTRA_INFO_STYLES = {
  ...SHARED_FORM_STYLES,
  gridContainer: "grid grid-cols-2 gap-4 mt-4",
  padding: "py-4",
} as const;

