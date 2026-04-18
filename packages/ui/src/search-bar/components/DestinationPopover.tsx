/**
 * @file DestinationPopover.tsx — Region picker dropdown with hover preview.
 *
 * Two-panel layout:
 *  1. **Region list** (always visible) — Buttons for each region in
 *     {@link REGIONS_CONFIG}. Clicking a button selects the region and
 *     advances focus to the check-in field.
 *  2. **Preview card** (appears on hover after a 400ms debounce) — Shows
 *     the region's photo, starting price, and key highlights. Flies in
 *     to the right of the list.
 *
 * Hover timers use `setTimeout` with debounced enter (400ms) and
 * leave (200ms) to prevent flicker when the cursor moves between
 * the list and the preview panel.
 */

"use client";

import { useState } from "react";
import { REGIONS_CONFIG } from "../constants/regionsConfig";
import { SEARCH_BAR_UI_CONSTANTS } from "../constants/ui";
import { 
  DESTINATION_POPOVER_STYLES as S,
  getDestinationPositionClass
} from "../theme/destination.theme";

const C = SEARCH_BAR_UI_CONSTANTS.DESTINATION;

interface DestinationPopoverProps {
  /** Callback when a region is selected. Receives the region name string. */
  onSelect: (v: string) => void;
  /** Currently selected region name (used for visual highlight). */
  currentSelection: string;
  /** Visual variant governing vertical offset. */
  variant?: "compact" | "hero";
  /** Whether the hero calendar is already open (shifts the popover down). */
  hasCalendarExpanded?: boolean;
}

export function DestinationPopover({ onSelect, currentSelection, variant, hasCalendarExpanded }: DestinationPopoverProps) {
  /** Name of the region currently being hovered (after the 400ms debounce). */
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  /** Active timeout ID for the hover debounce, so it can be cleared on rapid movement. */
  const [hoverTimer, setHoverTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const isHero = variant === "hero";
  const positionClasses = getDestinationPositionClass(isHero, !!hasCalendarExpanded);

  /**
   * Debounced hover-enter: waits 400ms before setting the hovered region.
   * This prevents the preview from flickering when the cursor merely
   * passes over a region on the way to another.
   */
  const handleMouseEnter = (name: string) => {
    if (hoverTimer) clearTimeout(hoverTimer);
    const timer = setTimeout(() => setHoveredRegion(name), 400);
    setHoverTimer(timer);
  };

  /**
   * Debounced hover-leave: waits 200ms before clearing. The shorter
   * delay allows the user to move from the list into the preview panel
   * without the preview disappearing.
   */
  const handleMouseLeave = () => {
    if (hoverTimer) clearTimeout(hoverTimer);
    const timer = setTimeout(() => setHoveredRegion(null), 200);
    setHoverTimer(timer);
  };

  /** Full region record for the currently hovered entry (used for the preview). */
  const hoveredData = REGIONS_CONFIG.find(r => r.name === hoveredRegion);

  return (
    <>
      {/* Panel 1: Region list */}
      <div
        className={S.panel(positionClasses)}
        onMouseLeave={handleMouseLeave}
        onClick={e => e.stopPropagation()}
      >
        <h3 className={S.panelTitle}>{C.POPOVER_TITLE}</h3>
        <div className={S.list}>
          {REGIONS_CONFIG.map((region) => {
            const isSelected = currentSelection === region.name;
            const isHovered = hoveredRegion === region.name;
            return (
              <button
                key={region.name}
                onClick={() => onSelect(region.name)}
                onMouseEnter={() => handleMouseEnter(region.name)}
                className={S.regionBtn(isSelected, isHovered && !isSelected)}
              >
                <div className={S.regionIcon(isSelected, isHovered && !isSelected)}>
                  {region.icon}
                </div>
                <div className="flex-1">
                  <div className={S.regionName(isSelected)}>{region.name}</div>
                  <div className={S.regionDesc}>{region.desc}</div>
                </div>
                <svg className={S.regionArrow(isHovered || isSelected)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel 2: Hover preview card (conditionally rendered) */}
      {hoveredData && (
        <div
          className={S.previewPanel(isHero, positionClasses)}
          onMouseEnter={() => { if (hoverTimer) clearTimeout(hoverTimer); }}
          onMouseLeave={handleMouseLeave}
          style={{ height: '260px' }}
        >
          {/* Left column: full-bleed photo with "From $X" overlay */}
          <div className={S.previewImageCol}>
             <div className={S.previewImageBg} style={{ backgroundImage: `url('${hoveredData.image}')` }} />
             <div className={S.previewImageGrad} />
             <div className={S.previewPriceBlock}>
                <div className={S.previewFromLabel}>{C.FROM}</div>
                <div className={S.previewPrice}>${hoveredData.priceFrom} <span className={S.previewPriceUnit}>{C.USD_NIGHT}</span></div>
             </div>
          </div>
          {/* Right column: name + bullet-point highlights */}
          <div className={S.previewInfoCol}>
            <h4 className={S.previewTitle}>{hoveredData.name}</h4>
            <ul className={S.previewHighlights}>
              {hoveredData.highlights.map((h, i) => (
                <li key={i} className={S.previewHighlightItem}>
                  <div className={S.previewHighlightDot}>
                    <svg className={S.previewHighlightIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span className="leading-snug">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
