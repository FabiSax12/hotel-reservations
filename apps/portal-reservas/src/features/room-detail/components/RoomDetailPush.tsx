/**
 * @file RoomDetailPush.tsx — Reflows the room list when the panel opens.
 *
 * On desktop the results column gains right padding so it shifts left and the
 * docked panel occupies the freed space; on mobile the panel overlays instead.
 */

"use client";

import type { RoomDetailPushProps } from "../domain/types";
import { useRoomDetail } from "../context/RoomDetailContext";
import { ROOM_DETAIL_STYLES } from "../theme/room-detail.theme";

export function RoomDetailPush({ children }: RoomDetailPushProps) {
  const { isOpen } = useRoomDetail();

  return <div className={ROOM_DETAIL_STYLES.pushWrapper(isOpen)}>{children}</div>;
}
