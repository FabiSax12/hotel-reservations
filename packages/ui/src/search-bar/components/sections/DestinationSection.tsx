/**
 * @file DestinationSection.tsx — "Sede" field within the search bar.
 *
 * Renders the destination label and current value (or placeholder).
 * When clicked, it activates the "where" section in the parent,
 * which causes the DestinationPopover to appear.
 *
 * The value text styling dynamically switches between a muted placeholder
 * appearance and a bold selected appearance via `S.fieldValue(!!destination)`.
 */

"use client";

import { SEARCH_BAR_STYLES as S } from "../../theme/search-bar.theme";
import { SEARCH_BAR_UI_CONSTANTS } from "../../constants/ui";
import type { ActiveSection } from "../../domain/types";

const C = SEARCH_BAR_UI_CONSTANTS.DESTINATION;

interface DestinationSectionProps {
  /** Whether this section is currently the active/expanded one. */
  isActive: boolean;
  /** Currently selected destination name, or "" if none. */
  destination: string;
  /** Sizing tokens from the search bar's current variant (compact/hero). */
  sizing: { label: string; value: string };
  /** Pre-computed CSS class string (includes active/inactive state styling). */
  sectionClass: string;
  /** Callback to activate this section (open the destination popover). */
  onActivate: () => void;
}

export function DestinationSection({ isActive, destination, sizing, sectionClass, onActivate }: DestinationSectionProps) {
  return (
    <div onClick={onActivate} className={sectionClass}>
      <div className={`${sizing.label} ${S.fieldLabel}`}>{C.LABEL}</div>
      <div className={S.fieldValueWrapper}>
        <div className={`${S.fieldValue(!!destination)} ${sizing.value}`}>
          {destination || C.PLACEHOLDER}
        </div>
      </div>
    </div>
  );
}
