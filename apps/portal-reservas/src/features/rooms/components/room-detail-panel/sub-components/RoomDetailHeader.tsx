/**
 * @file RoomDetailHeader.tsx — Sticky header for the detail panel.
 *
 * Shows a gold location/package eyebrow, the serif title, an optional subtitle,
 * and the close button that dismisses the panel.
 */

"use client";

import { ROOM_DETAIL_STYLES as S } from "@/theme/room-detail.theme";
import { useI18n } from "@/locales";
import type { RoomDetailHeaderProps } from "../../../domain/types";

const SVG_VIEW_BOX = "0 0 24 24";
const CLOSE_ICON_PATH = "M6 18L18 6M6 6l12 12";

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

      <button type="button" className={S.closeBtn} onClick={onClose} aria-label={t.ROOMS.CLOSE_DETAILS}>
        <svg className={S.closeIcon} fill="none" viewBox={SVG_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d={CLOSE_ICON_PATH} />
        </svg>
      </button>
    </header>
  );
}
