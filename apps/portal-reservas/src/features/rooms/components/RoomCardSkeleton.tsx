/**
 * @file RoomCardSkeleton.tsx — Loading skeleton for room cards.
 *
 * Displays a pulse-animated mockup of the RoomCard structure to simulate
 * network/database delays when computing dynamic pricing or fetching availability.
 */

import { ROOM_CARD_STYLES as S } from "../../../theme/rooms.theme";
import { ROOM_ANIMATION } from "../constants/rooms.constants";

export function RoomCardSkeleton() {
  return (
    <article
      className={S.skeletonCard}
      aria-hidden="true"
    >
      {/* Left: Image panel skeleton */}
      <div className={`${S.imageWrapper} bg-forest-800/80 animate-pulse`} />

      {/* Right: Card body skeleton */}
      <div className={S.body}>
        {/* Header Block */}
        <div className={S.bodyHeader}>
          <div>
            <div className="w-24 h-3 bg-forest-800/80 animate-pulse rounded-md mb-2" />
            <div className="w-56 h-8 bg-forest-800/80 animate-pulse rounded-lg mt-1" />
          </div>
          <div className="flex gap-2">
            <div className="w-16 h-6 bg-forest-800/80 animate-pulse rounded-lg" />
            <div className="w-16 h-6 bg-forest-800/80 animate-pulse rounded-lg" />
          </div>
        </div>

        {/* Description Block */}
        <div className="my-6">
          <div className="w-full h-4 bg-forest-800/50 animate-pulse rounded-md mb-2" />
          <div className="w-[90%] h-4 bg-forest-800/50 animate-pulse rounded-md mb-2" />
          <div className="w-[70%] h-4 bg-forest-800/50 animate-pulse rounded-md" />
        </div>

        {/* Price Tier Block */}
        <div className={S.priceTier}>
          <div className={S.priceBlock}>
            <div className="w-32 h-3 bg-forest-800/80 animate-pulse rounded-md mb-1.5" />
            <div className="w-40 h-10 bg-forest-800/80 animate-pulse rounded-lg mt-1" />
          </div>
          <div className={S.ctaWrapper}>
            <div className="w-44 h-14 bg-forest-800/80 animate-pulse rounded-xl" />
          </div>
        </div>
      </div>
    </article>
  );
}
