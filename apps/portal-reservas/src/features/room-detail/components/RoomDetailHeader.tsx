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
import { ROOM_DETAIL_STYLES as S } from "../theme/room-detail.theme";

export function RoomDetailHeader({ eyebrow, title, subtitle, onClose }: RoomDetailHeaderProps) {
  const { t } = useI18n();

  return (
    <header className={S.header}>
      <div className={S.headerText}>
        <p className={S.eyebrow}>
          <span className={S.eyebrowDot} aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 className={S.title}>{title}</h2>
        {subtitle && <p className={S.subtitle}>{subtitle}</p>}
      </div>

      <button type="button" className={S.closeBtn} onClick={onClose} aria-label={t.ROOM_DETAIL.CLOSE}>
        <svg className={S.closeIcon} fill="none" viewBox={ICON_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS.close} />
        </svg>
      </button>
    </header>
  );
}
