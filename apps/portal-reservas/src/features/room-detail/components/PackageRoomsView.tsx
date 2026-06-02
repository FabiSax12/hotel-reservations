/**
 * @file PackageRoomsView.tsx — Stacked rooms for a package inside the panel.
 *
 * A banner shows the room count; every room renders as its own section with a
 * "Room X of N" heading so the user always knows where they are.
 */

"use client";

import { useI18n } from "@/locales";
import { ICON_PATHS, ICON_VIEW_BOX } from "../constants/room-detail-icons.const";
import type { PackageRoomsViewProps } from "../domain/types";
import { ROOM_DETAIL_STYLES as S } from "../theme/room-detail.theme";
import { RoomDetailRoomSection } from "./RoomDetailRoomSection";

export function PackageRoomsView({ pkg }: PackageRoomsViewProps) {
  const { t } = useI18n();
  const total = pkg.rooms.length;

  return (
    <div className={S.bodyStack}>
      <div className={S.packageBanner}>
        <svg className={S.packageBannerIcon} fill="none" viewBox={ICON_VIEW_BOX} stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS.package} />
        </svg>
        <p className={S.packageBannerText}>
          {t.ROOM_DETAIL.PACKAGE_COUNT.replace("{count}", String(total))}
        </p>
      </div>

      {pkg.rooms.map((room, i) => (
        <RoomDetailRoomSection
          key={`${pkg.id}-${room.id}-${i}`}
          room={room}
          position={{ current: i + 1, total }}
        />
      ))}
    </div>
  );
}
