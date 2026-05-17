/**
 * @file RoomDetailsPopover.tsx — Fixed overlay popover for expanded room details.
 *
 * Locks body scroll, handles Escape key dismissal, and renders the full
 * image gallery + description inside a centered modal panel.
 */

"use client";

import { useEffect } from "react";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useI18n } from "@/locales";
import { ROOM_CARD_STYLES as S } from "../../../../theme/rooms.theme";
import type { RoomDetailsPopoverProps } from "../../domain/types";
import { RoomCardGallery } from "./RoomCardGallery";

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
      className={S.detailOverlay(isOpen)}
      aria-hidden={!isOpen}
      // Close when clicking the backdrop (outside the panel)
      onMouseDown={onClose}
    >
      <div
        className={S.detailPanel(isOpen)}
        role="dialog"
        aria-modal="true"
        aria-label={room.title}
        // Prevent clicks inside the panel from bubbling to the backdrop
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={S.detailCloseBtn}
          onClick={onClose}
          aria-label={t.ROOMS.CLOSE_DETAILS}
        >
          <svg
            className={S.detailCloseBtnIcon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.4}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className={S.detailHeader}>
          <h3 className={S.detailTitle}>{room.title}</h3>
          <p className={S.detailSubtitle}>{room.location}</p>
        </div>

        <div className={S.detailBody}>
          <RoomCardGallery room={room} />
        </div>
      </div>
    </div>
  );
}
