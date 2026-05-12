/**
 * @file PackageBadge.tsx — Package indicator badge (US-DM-04).
 *
 * Displays a centered badge below the package card stack indicating:
 * - Homogeneous packages: "x2", "x3", etc.
 * - Mixed packages: "+1 habitacion", "+2 habitaciones" (with pluralization).
 *
 * Non-interactive — purely informational.
 */

import { PACKAGE_CARD_STYLES as S } from "../../../../theme/rooms.theme";
import type { RoomPackage } from "../../domain/types";

interface PackageBadgeProps {
  pkg: RoomPackage;
  /** Resolved i18n label for the indicator. */
  label: string;
}

export function PackageBadge({ pkg, label }: PackageBadgeProps) {
  return (
    <div className={S.badgeWrapper}>
      <span className={S.badge} aria-label={label}>
        {label}
      </span>
    </div>
  );
}
