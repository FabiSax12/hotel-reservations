import { NEW_ROOM_VIEW_STYLES } from "@/features/rooms/components/create/NewRoomView/NewRoomView.styles";

export const AMENITIES_VIEW_STYLES = {
  main: NEW_ROOM_VIEW_STYLES.main,
  background: NEW_ROOM_VIEW_STYLES.background,
  bgImage: NEW_ROOM_VIEW_STYLES.bgImage,
  overlay: NEW_ROOM_VIEW_STYLES.overlay,
  blob: NEW_ROOM_VIEW_STYLES.blob,
  content: `${NEW_ROOM_VIEW_STYLES.content} max-w-3xl mx-auto`,
  cardContainer: "bg-white/50 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden",
};
