/**
 * @file RoomDetailKeyInfo.tsx — Key facts for a room inside the detail panel.
 *
 * Capacity / area / type chips, a scarcity chip, the bed configuration, the
 * editorial admin-tip pull quote, and the full room description.
 */

"use client";

import { ROOM_DETAIL_STYLES as S } from "@/theme/room-detail.theme";
import { useI18n } from "@/locales";
import { formatBedConfig } from "../../../constants/amenity-icons.const";
import type { RoomDetailKeyInfoProps } from "../../../domain/types";

const ICON_VIEW_BOX = "0 0 24 24";
const CAPACITY_PATH = "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z";
const AREA_PATH = "M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3";
const TYPE_PATH =
  "M15 7a2 2 0 012 2m4-2a6 6 0 01-7.743 5.743L11 14H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z";
const BED_PATH = "M3 11h14M5 11V7a2 2 0 012-2h6a2 2 0 012 2v4M3 11v4M17 11v4M3 15h14";
const CLOCK_PATH = "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z";
const QUOTE_VIEW_BOX = "0 0 32 24";
const QUOTE_PATH =
  "M0 24V14.4C0 6.48 4.32 1.44 12.96 0l1.44 2.64C9.6 3.84 7.2 6.72 6.48 11.28H12V24H0Zm18 0V14.4C18 6.48 22.32 1.44 30.96 0l1.44 2.64C27.6 3.84 25.2 6.72 24.48 11.28H30V24H18Z";

export function RoomDetailKeyInfo({ room }: RoomDetailKeyInfoProps) {
  const { t } = useI18n();
  const isLastRoom = room.inventory === 1;

  return (
    <div className={S.keyInfo}>
      <div className={S.chipGrid}>
        <span className={S.chip}>
          <svg className={S.chipIcon} fill="none" viewBox={ICON_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={CAPACITY_PATH} />
          </svg>
          {t.ROOMS.DETAIL_CAPACITY_VALUE.replace("{count}", String(room.capacity))}
        </span>
        <span className={S.chip}>
          <svg className={S.chipIcon} fill="none" viewBox={ICON_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={AREA_PATH} />
          </svg>
          {room.sqft} {t.ROOMS.SQFT_LABEL}
        </span>
        <span className={S.chip}>
          <svg className={S.chipIcon} fill="none" viewBox={ICON_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={TYPE_PATH} />
          </svg>
          {room.type}
        </span>
        {isLastRoom && (
          <span className={S.chipScarce}>
            <svg className={S.chipScarceIcon} fill="none" viewBox={ICON_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={CLOCK_PATH} />
            </svg>
            {t.ROOMS.LAST_ROOM}
          </span>
        )}
      </div>

      <div className={S.bedsRow}>
        <svg className={S.bedsIcon} fill="none" viewBox={ICON_VIEW_BOX} stroke="currentColor" strokeWidth={1.6}>
          <path strokeLinecap="round" strokeLinejoin="round" d={BED_PATH} />
        </svg>
        {formatBedConfig(room.beds)}
      </div>

      {room.adminTip && (
        <figure className={S.adminTip}>
          <svg className={S.adminTipIcon} viewBox={QUOTE_VIEW_BOX} fill="currentColor" aria-hidden="true">
            <path d={QUOTE_PATH} />
          </svg>
          <blockquote className={S.adminTipText}>{room.adminTip}</blockquote>
        </figure>
      )}

      <div>
        <p className={S.sectionLabel}>{t.ROOMS.DETAIL_ABOUT_TITLE}</p>
        <p className={S.description}>{room.description}</p>
      </div>
    </div>
  );
}
