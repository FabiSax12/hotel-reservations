/**
 * @file RoomDetailsPopover.tsx — Fixed overlay popover for expanded room details.
 *
 * Locks body scroll, handles Escape key dismissal, and renders the full
 * image gallery + description inside a centered modal panel.
 */

"use client";

import { useEffect } from "react";
import type { RoomDetailsPopoverProps } from "../../domain/types";
import { ROOM_CARD_STYLES } from "../../../../theme/rooms.theme";
import { RoomCardGallery } from "./RoomCardGallery";
import { useI18n } from "@/locales";
import { useScrollLock } from "@/hooks/useScrollLock";

const SVG_VIEW_BOX = "0 0 24 24";
const CLOSE_ICON_PATH = "M6 18L18 6M6 6l12 12";

export function RoomDetailsPopover({ room, isOpen, onClose }: RoomDetailsPopoverProps) {
  const { t } = useI18n();

  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={ROOM_CARD_STYLES.detailOverlay(isOpen)}
      aria-hidden={!isOpen}
      // Close when clicking the backdrop (outside the panel)
      onMouseDown={onClose}
    >
      <div
        className={ROOM_CARD_STYLES.detailPanel(isOpen)}
        role="dialog"
        aria-modal="true"
        aria-label={room.title}
        // Prevent clicks inside the panel from bubbling to the backdrop
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={ROOM_CARD_STYLES.detailCloseBtn}
          onClick={onClose}
          aria-label={t.ROOMS.CLOSE_DETAILS}
        >
          <svg className={ROOM_CARD_STYLES.detailCloseBtnIcon} fill="none" viewBox={SVG_VIEW_BOX} stroke="currentColor" strokeWidth={2.4}>
            <path strokeLinecap="round" strokeLinejoin="round" d={CLOSE_ICON_PATH} />
          </svg>
        </button>

        <div className={ROOM_CARD_STYLES.detailHeader}>
          <h3 className={ROOM_CARD_STYLES.detailTitle}>{room.title}</h3>
          <p className={ROOM_CARD_STYLES.detailSubtitle}>{room.location}</p>
        </div>

        <div className={ROOM_CARD_STYLES.detailBody}>
          <RoomCardGallery room={room} />
        </div>
      </div>
    </div>
  );
}
