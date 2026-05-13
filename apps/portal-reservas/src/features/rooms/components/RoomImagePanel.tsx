/**
 * @file RoomImagePanel.tsx — Room card image with badges and expand button.
 *
 * Shows:
 * - Inventory badge: top-left (urgency style when scarce, plain count otherwise)
 * - Capacity badge: top-right (person icon + count)
 * - Expand/collapse button: bottom-right corner
 */

import type { RoomImagePanelProps } from "../domain/types";
import { ROOM_CARD_STYLES as S } from "../../../theme/rooms.theme";
import { useI18n } from "@/locales";

export function RoomImagePanel({ room, isExpanded, onToggleExpand }: RoomImagePanelProps) {
  const { t } = useI18n();

  return (
    <div className={S.imageWrapper}>
      <div className={S.image} style={{ backgroundImage: `url('${room.image}')` }} />

      {/* Last room badge — top-left, only when inventory is 1 */}
      {room.inventory === 1 && (
        <div className={S.urgencyBadge} role="status">
          <svg className={S.urgencyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {t.ROOMS.LAST_ROOM}
        </div>
      )}

      {/* Capacity badge — top-right */}
      <div className={S.capacityBadge}>
        <svg className={S.capacityBadgeIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        {room.capacity}
      </div>

      {/* Expand/collapse button — bottom-right corner */}
      <button
        type="button"
        className={S.expandBtn}
        onClick={(event) => {
          event.stopPropagation();
          onToggleExpand();
        }}
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 4H4v4m0-4l6 6m6-6h4v4m0-4l-6 6M8 20H4v-4m0 4l6-6m6 6h4v-4m0 4l-6-6" />
        </svg>
      </button>
    </div>
  );
}
