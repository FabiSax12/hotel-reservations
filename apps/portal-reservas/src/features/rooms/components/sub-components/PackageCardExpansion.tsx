/**
 * @file PackageCardExpansion.tsx — Expand toggle + the package's room cards.
 *
 * Rendered below the package card. Owns its own open/closed state and reveals
 * each room in the package as an individual RoomCard via the grid-rows animation.
 */

"use client";

import { useState } from "react";
import { useI18n } from "@/locales";
import { PACKAGE_CARD_STYLES } from "../../../../theme/rooms.theme";
import type { PackageCardExpansionProps } from "../../domain/types";
import { RoomCard } from "../RoomCard";

export function PackageCardExpansion({ pkg, selectedDest }: PackageCardExpansionProps) {
  const { t } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <button
        type="button"
        className={PACKAGE_CARD_STYLES.expandBtn}
        onClick={() => setIsExpanded((v) => !v)}
        aria-expanded={isExpanded}
      >
        <span>
          {isExpanded
            ? t.ROOMS.PACKAGE_COLLAPSE
            : t.ROOMS.PACKAGE_EXPAND.replace("{count}", String(pkg.rooms.length))}
        </span>
        <span className={PACKAGE_CARD_STYLES.expandIcon(isExpanded)}>▼</span>
      </button>

      <div className={PACKAGE_CARD_STYLES.expansionGrid(isExpanded)} aria-hidden={!isExpanded}>
        <div className={PACKAGE_CARD_STYLES.expansionInner}>
          <div className={PACKAGE_CARD_STYLES.expansionContent}>
            <p className={PACKAGE_CARD_STYLES.expansionTitle}>{t.ROOMS.PACKAGE_ROOMS_TITLE}</p>
            <div className={PACKAGE_CARD_STYLES.expansionGridInner}>
              {pkg.rooms.map((room, i) => (
                <RoomCard key={`${pkg.id}-${room.id}-${i}`} room={room} index={i} selectedDest={selectedDest} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
