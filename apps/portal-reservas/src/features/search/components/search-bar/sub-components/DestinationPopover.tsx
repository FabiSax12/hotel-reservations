/**
 * @file DestinationPopover.tsx — Region picker dropdown with hover preview.
 */

"use client";

import { useI18n } from "@/locales";
import { REGIONS_CONFIG } from "../constants/regionsConfig";
import { SEARCH_SECTIONS, SEARCH_VARIANTS } from "../constants/search.constants";
import { useDestinationPreview } from "../hooks/useDestinationPreview";
import { useSearchBarContext } from "../hooks/useSearchBarContext";
import {
  getDestinationPositionClass,
  DESTINATION_POPOVER_STYLES as S,
} from "../theme/destination.theme";
import { DestinationPreview } from "./DestinationPreview";

export function DestinationPopover() {
  const { size, hasHeroCalendarOpened, destination, setDestination, setActive, clearError } =
    useSearchBarContext();
  const { hoveredRegion, hoveredData, handleMouseEnter, handleMouseLeave } =
    useDestinationPreview();

  const isHero = size === SEARCH_VARIANTS.HERO;
  const positionClasses = getDestinationPositionClass(isHero, !!hasHeroCalendarOpened);
  const { t } = useI18n();
  const C = t.SEARCH.SEARCH_BAR.DESTINATION;

  const handleSelect = (v: string) => {
    setDestination(v);
    clearError();
    setActive(null);
  };

  return (
    <>
      <div
        className={S.panel(positionClasses)}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={S.panelTitle}>{C.POPOVER_TITLE}</h3>
        <div className={S.list}>
          {REGIONS_CONFIG.map((region) => {
            const isSelected = destination === region.name;
            const isHovered = hoveredRegion === region.name;
            return (
              <button
                key={region.name}
                onClick={() => handleSelect(region.name)}
                onMouseEnter={() => handleMouseEnter(region.name)}
                className={S.regionBtn(isSelected, isHovered && !isSelected)}
              >
                <div className={S.regionIcon(isSelected, isHovered && !isSelected)}>
                  {region.icon}
                </div>
                <div className={S.regionTextWrapper}>
                  <div className={S.regionName(isSelected)}>{region.name}</div>
                  <div className={S.regionDesc}>{region.desc}</div>
                </div>
                <svg
                  className={S.regionArrow(isHovered || isSelected)}
                  fill="none"
                  viewBox={S.icons.arrow.viewBox}
                  stroke="currentColor"
                  strokeWidth={S.icons.arrow.strokeWidth}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={S.icons.arrow.path} />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      {hoveredData && (
        <DestinationPreview
          data={hoveredData}
          isHero={isHero}
          positionClasses={positionClasses}
          fromLabel={C.FROM}
          usdNightLabel={C.USD_NIGHT}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </>
  );
}
