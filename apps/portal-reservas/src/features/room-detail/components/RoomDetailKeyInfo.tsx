/**
 * @file RoomDetailKeyInfo.tsx — Key facts for a room inside the detail panel.
 *
 * Capacity / area / type chips, a scarcity chip, the bed configuration, the
 * editorial admin-tip pull quote, and the full room description.
 */

"use client";

import { formatBedConfig } from "@/features/rooms";
import { useI18n } from "@/locales";
import { ICON_PATHS, ICON_VIEW_BOX, QUOTE_VIEW_BOX } from "../constants/room-detail-icons.const";
import type { RoomDetailKeyInfoProps } from "../domain/types";
import { ROOM_DETAIL_STYLES } from "../theme/room-detail.theme";

export function RoomDetailKeyInfo({ room }: RoomDetailKeyInfoProps) {
  const { t } = useI18n();
  const isLastRoom = room.inventory === 1;

  return (
    <div className={ROOM_DETAIL_STYLES.keyInfo}>
      <div className={ROOM_DETAIL_STYLES.chipGrid}>
        <span className={ROOM_DETAIL_STYLES.chip}>
          <svg className={ROOM_DETAIL_STYLES.chipIcon} fill="none" viewBox={ICON_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS.capacity} />
          </svg>
          {t.ROOM_DETAIL.CAPACITY_VALUE.replace("{count}", String(room.capacity))}
        </span>
        <span className={ROOM_DETAIL_STYLES.chip}>
          <svg className={ROOM_DETAIL_STYLES.chipIcon} fill="none" viewBox={ICON_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS.type} />
          </svg>
          {room.type}
        </span>
        {isLastRoom && (
          <span className={ROOM_DETAIL_STYLES.chipScarce}>
            <svg className={ROOM_DETAIL_STYLES.chipScarceIcon} fill="none" viewBox={ICON_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS.clock} />
            </svg>
            {t.ROOMS.LAST_ROOM}
          </span>
        )}
      </div>

      <div className={ROOM_DETAIL_STYLES.bedsRow}>
        <svg className={ROOM_DETAIL_STYLES.bedsIcon} fill="none" viewBox={ICON_VIEW_BOX} stroke="currentColor" strokeWidth={1.6}>
          <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS.bed} />
        </svg>
        {formatBedConfig(room.beds)}
      </div>

      {room.adminTip && (
        <figure className={ROOM_DETAIL_STYLES.adminTip}>
          <svg className={ROOM_DETAIL_STYLES.adminTipIcon} viewBox={QUOTE_VIEW_BOX} fill="currentColor" aria-hidden="true">
            <path d={ICON_PATHS.quote} />
          </svg>
          <blockquote className={ROOM_DETAIL_STYLES.adminTipText}>{room.adminTip}</blockquote>
        </figure>
      )}

      <div>
        <p className={ROOM_DETAIL_STYLES.sectionLabel}>{t.ROOM_DETAIL.ABOUT_TITLE}</p>
        <p className={ROOM_DETAIL_STYLES.description}>{room.description}</p>
      </div>
    </div>
  );
}
