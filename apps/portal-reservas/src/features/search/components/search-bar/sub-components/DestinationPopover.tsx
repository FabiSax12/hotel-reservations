/**
 * @file DestinationPopover.tsx — Region picker dropdown with hover preview.
 */

"use client";

import { REGIONS_CONFIG } from "../constants/regionsConfig";
import {
  DESTINATION_POPOVER_STYLES as S,
  getDestinationPositionClass,
} from "../theme/destination.theme";
import { useDestinationPreview } from "../hooks/useDestinationPreview";
import { SEARCH_VARIANTS, SEARCH_SECTIONS } from "../constants/search.constants";
import { useI18n } from "@/locales";
import { useSearchBarContext } from "../context/SearchBarContext";

export function DestinationPopover() {
  const {
    size,
    hasHeroCalendarOpened,
    destination,
    setDestination,
    activateSection,
    clearError,
  } = useSearchBarContext();

  const { hoveredRegion, hoveredData, handleMouseEnter, handleMouseLeave } =
    useDestinationPreview();

  const isHero = size === SEARCH_VARIANTS.HERO;
  const positionClasses = getDestinationPositionClass(isHero, !!hasHeroCalendarOpened);
  const { t } = useI18n();
  const C = t.SEARCH.SEARCH_BAR.DESTINATION;

  const handleSelect = (v: string) => {
    setDestination(v);
    activateSection(SEARCH_SECTIONS.CHECK_IN, clearError);
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
                <div className="flex-1">
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
        <div
          className={S.previewPanel(isHero, positionClasses)}
          onMouseLeave={handleMouseLeave}
          style={{ height: S.layout.previewHeight }}
        >
          <div className={S.previewImageCol}>
            <div
              className={S.previewImageBg}
              style={{ backgroundImage: `url('${hoveredData.image}')` }}
            />
            <div className={S.previewImageGrad} />
            <div className={S.previewPriceBlock}>
              <div className={S.previewFromLabel}>{C.FROM}</div>
              <div className={S.previewPrice}>
                ${hoveredData.priceFrom} <span className={S.previewPriceUnit}>{C.USD_NIGHT}</span>
              </div>
            </div>
          </div>
          <div className={S.previewInfoCol}>
            <h4 className={S.previewTitle}>{hoveredData.name}</h4>
            <ul className={S.previewHighlights}>
              {hoveredData.highlights.map((h, i) => (
                <li key={i} className={S.previewHighlightItem}>
                  <div className={S.previewHighlightDot}>
                    <svg
                      className={S.previewHighlightIcon}
                      fill="none"
                      viewBox={S.icons.check.viewBox}
                      stroke="currentColor"
                      strokeWidth={S.icons.check.strokeWidth}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={S.icons.check.path} />
                    </svg>
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
