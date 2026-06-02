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
import { ROOM_DETAIL_STYLES as S } from "../theme/room-detail.theme";

export function RoomDetailKeyInfo({ room }: RoomDetailKeyInfoProps) {
  const { t } = useI18n();
  const isLastRoom = room.inventory === 1;

  return (
    <div className={S.keyInfo}>
      <div className={S.chipGrid}>
        <span className={S.chip}>
          <svg className={S.chipIcon} fill="none" viewBox={ICON_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS.capacity} />
          </svg>
          {t.ROOM_DETAIL.CAPACITY_VALUE.replace("{count}", String(room.capacity))}
        </span>
        <span className={S.chip}>
          <svg className={S.chipIcon} fill="none" viewBox={ICON_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS.area} />
          </svg>
          {room.sqft} {t.ROOMS.SQFT_LABEL}
        </span>
        <span className={S.chip}>
          <svg className={S.chipIcon} fill="none" viewBox={ICON_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS.type} />
          </svg>
          {room.type}
        </span>
        {isLastRoom && (
          <span className={S.chipScarce}>
            <svg className={S.chipScarceIcon} fill="none" viewBox={ICON_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS.clock} />
            </svg>
            {t.ROOMS.LAST_ROOM}
          </span>
        )}
      </div>

      <div className={S.bedsRow}>
        <svg className={S.bedsIcon} fill="none" viewBox={ICON_VIEW_BOX} stroke="currentColor" strokeWidth={1.6}>
          <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS.bed} />
        </svg>
        {formatBedConfig(room.beds)}
      </div>

      {room.adminTip && (
        <figure className={S.adminTip}>
          <svg className={S.adminTipIcon} viewBox={QUOTE_VIEW_BOX} fill="currentColor" aria-hidden="true">
            <path d={ICON_PATHS.quote} />
          </svg>
          <blockquote className={S.adminTipText}>{room.adminTip}</blockquote>
        </figure>
      )}

      <div>
        <p className={S.sectionLabel}>{t.ROOM_DETAIL.ABOUT_TITLE}</p>
        <p className={S.description}>{room.description}</p>
      </div>
    </div>
  );
}
