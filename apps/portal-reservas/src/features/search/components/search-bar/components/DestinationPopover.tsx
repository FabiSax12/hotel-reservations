/**
 * @file DestinationPopover.tsx — Region picker dropdown with hover preview.
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
  onSelect: (v: string) => void;
  currentSelection: string;
  variant?: "compact" | "hero";
  hasCalendarExpanded?: boolean;
}

export function DestinationPopover({ onSelect, currentSelection, variant, hasCalendarExpanded }: DestinationPopoverProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [hoverTimer, setHoverTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const isHero = variant === "hero";
  const positionClasses = getDestinationPositionClass(isHero, !!hasCalendarExpanded);

  const handleMouseEnter = (name: string) => {
    if (hoverTimer) clearTimeout(hoverTimer);
    const timer = setTimeout(() => setHoveredRegion(name), 400);
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    if (hoverTimer) clearTimeout(hoverTimer);
    const timer = setTimeout(() => setHoveredRegion(null), 200);
    setHoverTimer(timer);
  };

  const hoveredData = REGIONS_CONFIG.find(r => r.name === hoveredRegion);

  return (
    <>
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

      {hoveredData && (
        <div
          className={S.previewPanel(isHero, positionClasses)}
          onMouseEnter={() => { if (hoverTimer) clearTimeout(hoverTimer); }}
          onMouseLeave={handleMouseLeave}
          style={{ height: '260px' }}
        >
          <div className={S.previewImageCol}>
             <div className={S.previewImageBg} style={{ backgroundImage: `url('${hoveredData.image}')` }} />
             <div className={S.previewImageGrad} />
             <div className={S.previewPriceBlock}>
                <div className={S.previewFromLabel}>{C.FROM}</div>
                <div className={S.previewPrice}>${hoveredData.priceFrom} <span className={S.previewPriceUnit}>{C.USD_NIGHT}</span></div>
             </div>
          </div>
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
