/**
 * @file DestinationPopover.tsx — Region picker dropdown with hover preview.
 */

"use client";

import { REGIONS_CONFIG } from "../constants/regionsConfig";
import {
  DESTINATION_POPOVER_STYLES,
  getDestinationPositionClass,
} from "../theme/destination.theme";
import { useDestinationPreview } from "../hooks/useDestinationPreview";
import { SEARCH_VARIANTS, SEARCH_SECTIONS } from "../constants/search.constants";
import { useI18n } from "@/locales";
import { useSearchBarContext } from "../hooks/useSearchBarContext";
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
      <div className={DESTINATION_POPOVER_STYLES.panel(positionClasses)} onMouseLeave={handleMouseLeave}
        onClick={(e) => e.stopPropagation()}>
        <h3 className={DESTINATION_POPOVER_STYLES.panelTitle}>{C.POPOVER_TITLE}</h3>
        <div className={DESTINATION_POPOVER_STYLES.list}>
          {REGIONS_CONFIG.map((region) => {
            const isSelected = destination === region.name;
            const isHovered = hoveredRegion === region.name;
            return (
              <button key={region.name} onClick={() => handleSelect(region.name)}
                onMouseEnter={() => handleMouseEnter(region.name)}
                className={DESTINATION_POPOVER_STYLES.regionBtn(isSelected, isHovered && !isSelected)}>
                <div className={DESTINATION_POPOVER_STYLES.regionIcon(isSelected, isHovered && !isSelected)}>
                  {region.icon}
                </div>
                <div className={DESTINATION_POPOVER_STYLES.regionTextWrapper}>
                  <div className={DESTINATION_POPOVER_STYLES.regionName(isSelected)}>{region.name}</div>
                  <div className={DESTINATION_POPOVER_STYLES.regionDesc}>{region.desc}</div>
                </div>
                <svg className={DESTINATION_POPOVER_STYLES.regionArrow(isHovered || isSelected)} fill="none"
                  viewBox={DESTINATION_POPOVER_STYLES.icons.arrow.viewBox} stroke="currentColor"
                  strokeWidth={DESTINATION_POPOVER_STYLES.icons.arrow.strokeWidth}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={DESTINATION_POPOVER_STYLES.icons.arrow.path} />
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
