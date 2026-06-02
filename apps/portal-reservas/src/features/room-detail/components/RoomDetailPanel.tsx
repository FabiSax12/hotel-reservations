/**
 * @file RoomDetailPanel.tsx — Right-docked detail panel orchestrator (US-DM-05).
 *
 * Three zones: header, scrollable body (room or stacked package rooms), pinned
 * price + CTA footer. Slides in on the right (full-screen sheet + scrim on
 * mobile). Closes on the X button, Escape, and (mobile) scrim tap; scroll is
 * locked on mobile only, where the panel is modal.
 */

"use client";

import { useI18n } from "@/locales";
import { SELECTION_KIND } from "../constants/room-detail.constants";
import type { RoomDetailPanelProps } from "../domain/types";
import { useRoomDetailPanel } from "../hooks/useRoomDetailPanel";
import { ROOM_DETAIL_STYLES } from "../theme/room-detail.theme";
import { PackageRoomsView } from "./PackageRoomsView";
import { RoomDetailFooter } from "./RoomDetailFooter";
import { RoomDetailHeader } from "./RoomDetailHeader";
import { RoomDetailRoomSection } from "./RoomDetailRoomSection";

export function RoomDetailPanel({ selection, isOpen, onClose }: RoomDetailPanelProps) {
  const { t } = useI18n();
  const { entered, asideRef, isMobile } = useRoomDetailPanel({ isOpen, onClose });

  const isShown = entered && isOpen;
  const isPackage = selection.kind === SELECTION_KIND.PACKAGE;
  const primaryRoom = isPackage ? selection.pkg.rooms[0] : selection.room;
  const price = isPackage ? selection.pkg.totalPricePerNight : selection.room.price;
  const eyebrow = primaryRoom.location;
  const title = isPackage
    ? t.ROOMS.PACKAGE_LABEL.replace("{count}", String(selection.pkg.rooms.length))
    : selection.room.title;

  return (
    <>
      <div className={ROOM_DETAIL_STYLES.scrim(isShown)} aria-hidden="true" onClick={onClose} />
      <aside
        ref={asideRef}
        className={ROOM_DETAIL_STYLES.panel(isShown)}
        role="dialog"
        aria-modal={isMobile || undefined}
        aria-label={title}
        tabIndex={-1}
      >
        <RoomDetailHeader eyebrow={eyebrow} title={title} onClose={onClose} />

        <div className={ROOM_DETAIL_STYLES.body}>
          {isPackage ? (
            <PackageRoomsView pkg={selection.pkg} />
          ) : (
            <div className={ROOM_DETAIL_STYLES.bodyStack}>
              <RoomDetailRoomSection room={selection.room} />
            </div>
          )}
        </div>

        <RoomDetailFooter room={primaryRoom} price={price} isPackage={isPackage} />
      </aside>
    </>
  );
}
