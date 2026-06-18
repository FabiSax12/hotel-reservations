/**
 * @file RoomDetailHeader.tsx — Header for the detail panel.
 *
 * Shows a gold location eyebrow, the serif title, an optional subtitle, and the
 * close button that dismisses the panel.
 */

"use client";

import { useI18n } from "@/locales";
import { ICON_PATHS, ICON_VIEW_BOX } from "../constants/room-detail-icons.const";
import type { RoomDetailHeaderProps } from "../domain/types";
import { ROOM_DETAIL_STYLES } from "../theme/room-detail.theme";

export function RoomDetailHeader({ eyebrow, title, subtitle, onClose }: RoomDetailHeaderProps) {
  const { t } = useI18n();

  return (
    <header className={ROOM_DETAIL_STYLES.header}>
      <div className={ROOM_DETAIL_STYLES.headerText}>
        {/* Location eyebrow hidden until the rooms table gains a location column (US-DM-07). */}
        {eyebrow && (
          <p className={ROOM_DETAIL_STYLES.eyebrow}>
            <span className={ROOM_DETAIL_STYLES.eyebrowDot} aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h2 className={ROOM_DETAIL_STYLES.title}>{title}</h2>
        {subtitle && <p className={ROOM_DETAIL_STYLES.subtitle}>{subtitle}</p>}
      </div>

      <button type="button" className={ROOM_DETAIL_STYLES.closeBtn} onClick={onClose} aria-label={t.ROOM_DETAIL.CLOSE}>
        <svg className={ROOM_DETAIL_STYLES.closeIcon} fill="none" viewBox={ICON_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS.close} />
        </svg>
      </button>
    </header>
  );
}
