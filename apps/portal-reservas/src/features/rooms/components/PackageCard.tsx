/**
 * @file PackageCard.tsx — Room package orchestrator (US-DM-04).
 *
 * Renders a room package as a stacked card composition:
 * - Primary RoomCard (most expensive room, fully rendered).
 * - Decorative shadow cards peeking from behind.
 * - Package indicator badge below the stack.
 * - Total package price replacing individual room price.
 *
 * The shadow cards are purely decorative — zero data loaded.
 * Click behavior for exploring package details is deferred to US-DM-05.
 */

"use client";

import type { PackageCardProps, RoomPackage } from "../domain/types";
import { PACKAGE_CARD_STYLES as S } from "../../../theme/rooms.theme";
import { useI18n } from "@/locales";
import { RoomCard } from "./RoomCard";
import { PackageShadow } from "./sub-components/PackageShadow";
import { PackageBadge } from "./sub-components/PackageBadge";
import { groupSecondaryRooms } from "../domain/grouping";

export function PackageCard({ pkg, index, selectedDest }: PackageCardProps) {
  const { t } = useI18n();

  const indicatorLabel = resolveIndicatorLabel(pkg, t);
  const groupedSecondaries = groupSecondaryRooms(pkg.secondaryRooms);

  return (
    <div className={S.wrapper}>
      {/* Shadow cards — positioned behind the primary card via z-index */}
      <div className={S.shadowStack} aria-hidden="true">
        {groupedSecondaries.map((entry, i) =>
          Array.from({ length: entry.count }, (_, j) => (
            <PackageShadow
              key={`${entry.type}-${i}-${j}`}
              roomType={entry.type}
              peekIndex={i + j}
            />
          )),
        )}
      </div>

      {/* Primary card — the most expensive room, rendered as a full RoomCard */}
      <RoomCard
        room={pkg.primaryRoom}
        index={index}
        selectedDest={selectedDest}
      />

      {/* Package indicator badge */}
      <PackageBadge pkg={pkg} label={indicatorLabel} />
    </div>
  );
}

/**
 * Resolves the indicator label using i18n pluralization rules.
 * Homogeneous: "x2", "x3", etc. (no pluralization needed).
 * Mixed: "+1 habitacion" / "+2 habitaciones" (pluralization based on count).
 */
function resolveIndicatorLabel(
  pkg: RoomPackage,
  t: ReturnType<typeof useI18n>["t"],
): string {
  if (pkg.isHomogeneous) {
    return t.ROOMS.PACKAGE_INDICATOR_SAME.replace(
      "{count}",
      String(pkg.secondaryRooms.length + 1),
    );
  }

  const secondaryCount = pkg.secondaryRooms.length;
  const template =
    secondaryCount === 1
      ? t.ROOMS.PACKAGE_INDICATOR_MIXED_ONE
      : t.ROOMS.PACKAGE_INDICATOR_MIXED_OTHER;

  return template.replace("{count}", String(secondaryCount));
}
