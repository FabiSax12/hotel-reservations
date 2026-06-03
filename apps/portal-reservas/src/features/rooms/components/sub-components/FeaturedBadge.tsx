/**
 * @file FeaturedBadge.tsx — Visual marker for admin-featured rooms (US-DM-03).
 *
 * Rendered inside `RoomCardHeader` when `room.isFeatured` is true so the
 * "Destacados" sort option has a corresponding UI affordance.
 */

"use client";

import { useI18n } from "@/locales";
import { ROOM_CARD_FEATURED_BADGE_STYLES as S } from "../../../../theme/rooms.theme";

export function FeaturedBadge() {
  const { t } = useI18n();
  return (
    <span className={S.badge}>
      <span className={S.dot} aria-hidden="true" />
      {t.ROOMS.FEATURED_BADGE}
    </span>
  );
}
