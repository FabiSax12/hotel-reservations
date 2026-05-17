/**
 * @file RoomCardSkeleton.tsx — Loading skeleton for room cards.
 *
 * Displays a pulse-animated mockup of the RoomCard structure.
 */

import { ROOM_CARD_STYLES as S } from "../../../theme/rooms.theme";

export function RoomCardSkeleton() {
  return (
    <article className={S.skeletonCard} aria-hidden="true">
      <div className={`${S.imageWrapper} ${S.skeletonImagePanel}`} />
      <div className={S.body}>
        <div className={S.bodyHeader}>
          <div>
            <div className={S.skeletonLabel} />
            <div className={S.skeletonTitle} />
          </div>
          <div className={S.skeletonChipsWrapper}>
            <div className={S.skeletonChip} />
            <div className={S.skeletonChip} />
          </div>
        </div>
        <div className={S.skeletonDescWrapper}>
          <div className={S.skeletonDescLine1} />
          <div className={S.skeletonDescLine2} />
          <div className={S.skeletonDescLine3} />
        </div>
        <div className={S.priceTier}>
          <div className={S.priceBlock}>
            <div className={S.skeletonPriceLabel} />
            <div className={S.skeletonPriceAmount} />
          </div>
          <div className={S.ctaWrapper}>
            <div className={S.skeletonCTABtn} />
          </div>
        </div>
      </div>
    </article>
  );
}
