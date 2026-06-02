/**
 * @file PackageRoomsView.tsx — Stacked rooms for a package inside the panel.
 *
 * A sticky banner keeps the room count in view; every room renders as its own
 * section with a "Room X of N" heading so the user always knows where they are.
 */

"use client";

import { ROOM_DETAIL_STYLES as S } from "@/theme/room-detail.theme";
import { useI18n } from "@/locales";
import type { PackageRoomsViewProps } from "../../../domain/types";
import { RoomDetailRoomSection } from "./RoomDetailRoomSection";

const ICON_VIEW_BOX = "0 0 24 24";
const PACKAGE_PATH = "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5";

export function PackageRoomsView({ pkg }: PackageRoomsViewProps) {
  const { t } = useI18n();
  const total = pkg.rooms.length;

  return (
    <div className={S.bodyStack}>
      <div className={S.packageBanner}>
        <svg className={S.packageBannerIcon} fill="none" viewBox={ICON_VIEW_BOX} stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d={PACKAGE_PATH} />
        </svg>
        <p className={S.packageBannerText}>
          {t.ROOMS.DETAIL_PACKAGE_COUNT.replace("{count}", String(total))}
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
