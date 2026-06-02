/**
 * @file RoomDetailPush.tsx — Reflows the room list when the panel opens.
 *
 * On desktop the results column gains right padding so it shifts left and the
 * docked panel occupies the freed space; on mobile the panel overlays instead.
 */

"use client";

import { ROOM_DETAIL_STYLES as S } from "@/theme/room-detail.theme";
import type { RoomDetailPushProps } from "../../domain/types";
import { useRoomDetail } from "./context/RoomDetailContext";

export function RoomDetailPush({ children }: RoomDetailPushProps) {
  const { isOpen } = useRoomDetail();

  return <div className={S.pushWrapper(isOpen)}>{children}</div>;
}
