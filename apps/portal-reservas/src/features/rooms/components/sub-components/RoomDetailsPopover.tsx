"use client";

import { useEffect } from "react";
import type { Room } from "../../domain/types";
import { ROOM_CARD_STYLES as S } from "../../../../theme/rooms.theme";
import { RoomCardGallery } from "./RoomCardGallery";

interface RoomDetailsPopoverProps {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
}

export function RoomDetailsPopover({ room, isOpen, onClose }: RoomDetailsPopoverProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={S.detailOverlay(isOpen)}
      aria-hidden={!isOpen}
      onMouseDown={onClose}
    >
      <div
        className={S.detailPanel(isOpen)}
        role="dialog"
        aria-modal="true"
        aria-label={room.title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={S.detailCloseBtn}
          onClick={onClose}
          aria-label="Cerrar ventana de detalles"
        >
          <svg className={S.detailCloseBtnIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
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
