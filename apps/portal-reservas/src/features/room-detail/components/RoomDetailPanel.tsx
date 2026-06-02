/**
 * @file RoomDetailPanel.tsx — Right-docked detail panel orchestrator (US-DM-05).
 *
 * Three zones: header, scrollable body (room or stacked package rooms), pinned
 * price + CTA footer. Slides in on the right (full-screen sheet + scrim on
 * mobile). Closes on the X button, Escape, and (mobile) scrim tap; scroll is
 * locked on mobile only, where the panel is modal.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useI18n } from "@/locales";
import { ROOM_DETAIL_MOBILE_QUERY } from "../constants/room-detail.constants";
import type { RoomDetailPanelProps } from "../domain/types";
import { ROOM_DETAIL_STYLES as S } from "../theme/room-detail.theme";
import { PackageRoomsView } from "./PackageRoomsView";
import { RoomDetailFooter } from "./RoomDetailFooter";
import { RoomDetailHeader } from "./RoomDetailHeader";
import { RoomDetailRoomSection } from "./RoomDetailRoomSection";

export function RoomDetailPanel({ selection, isOpen, onClose }: RoomDetailPanelProps) {
  const { t } = useI18n();
  const [entered, setEntered] = useState(false);
  const asideRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery(ROOM_DETAIL_MOBILE_QUERY);

  // Lock body scroll only on mobile, where the panel is a modal sheet.
  useScrollLock(isOpen && isMobile);

  // Trigger the slide-in on the frame after mount.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Move focus into the panel once it has entered.
  useEffect(() => {
    if (entered) asideRef.current?.focus();
  }, [entered]);

  // Close on Escape.
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const isShown = entered && isOpen;
  const isPackage = selection.kind === "package";
  const primaryRoom = isPackage ? selection.pkg.rooms[0] : selection.room;
  const price = isPackage ? selection.pkg.totalPricePerNight : selection.room.price;
  const eyebrow = primaryRoom.location;
  const title = isPackage
    ? t.ROOMS.PACKAGE_LABEL.replace("{count}", String(selection.pkg.rooms.length))
    : selection.room.title;

  return (
    <>
      <div className={S.scrim(isShown)} aria-hidden="true" onClick={onClose} />
      <aside
        ref={asideRef}
        className={S.panel(isShown)}
        role="dialog"
        aria-modal={isMobile || undefined}
        aria-label={title}
        tabIndex={-1}
      >
        <RoomDetailHeader eyebrow={eyebrow} title={title} onClose={onClose} />

        <div className={S.body}>
          {isPackage ? (
            <PackageRoomsView pkg={selection.pkg} />
          ) : (
            <div className={S.bodyStack}>
              <RoomDetailRoomSection room={selection.room} />
            </div>
          )}
        </div>

        <RoomDetailFooter room={primaryRoom} price={price} isPackage={isPackage} />
      </aside>
    </>
  );
}
