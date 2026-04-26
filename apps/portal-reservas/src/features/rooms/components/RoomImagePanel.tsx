/**
 * @file RoomImagePanel.tsx — Room card image with urgency badge and expand button.
 *
 * US-DM-02 update: removed adminTip overlay from the image. The admin tip now
 * lives in the card body as an editorial pull-quote (RoomCardMeta).
 * The expand/collapse toggle button remains in the bottom-right corner.
 */

import type { Room } from "../domain/types";
import { ROOM_CARD_STYLES as S } from "../../../theme/rooms.theme";
import { useI18n } from "@/locales";
import { ROOM_THRESHOLDS } from "../constants/rooms.constants";

interface RoomImagePanelProps {
  room: Room;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function RoomImagePanel({ room, isExpanded, onToggleExpand }: RoomImagePanelProps) {
  const { t } = useI18n();
  const isScarce = room.inventory <= ROOM_THRESHOLDS.SCARCE;

  return (
    <div className={S.imageWrapper}>
      <div className={S.image} style={{ backgroundImage: `url('${room.image}')` }} />

      {/* Urgency badge — top-left, only for scarce inventory */}
      {isScarce && (
        <div className={S.urgencyBadge} role="status">
          <svg className={S.urgencyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {room.inventory === 1
            ? t.ROOMS.LAST_ROOM
            : `${t.ROOMS.ONLY_REMAINING} ${room.inventory} ${t.ROOMS.ROOMS_PLURAL}`}
        </div>
      )}

      {/* Expand/collapse button — bottom-right corner */}
      <button
        type="button"
        className={S.expandBtn}
        onClick={onToggleExpand}
        aria-label={isExpanded ? t.ROOMS.COLLAPSE_DETAILS : t.ROOMS.EXPAND_DETAILS}
        aria-expanded={isExpanded}
      >
        <svg
          className={S.expandBtnIcon(isExpanded)}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}
