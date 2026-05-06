/**
 * @file DestinationPreview.tsx — Hover preview panel for a destination region.
 */

import {
  DESTINATION_POPOVER_STYLES as S,
} from "../theme/destination.theme";

interface DestinationPreviewProps {
  data: {
    name: string;
    image: string;
    priceFrom: number;
    highlights: readonly string[];
  };
  isHero: boolean;
  positionClasses: string;
  fromLabel: string;
  usdNightLabel: string;
  onMouseLeave: () => void;
}

export function DestinationPreview({
  data,
  isHero,
  positionClasses,
  fromLabel,
  usdNightLabel,
  onMouseLeave,
}: DestinationPreviewProps) {
  return (
    <div
      className={S.previewPanel(isHero, positionClasses)}
      onMouseLeave={onMouseLeave}
      style={{ height: S.layout.previewHeight }}
    >
      <div className={S.previewImageCol}>
        <div className={S.previewImageBg} style={{ backgroundImage: `url('${data.image}')` }} />
        <div className={S.previewImageGrad} />
        <div className={S.previewPriceBlock}>
          <div className={S.previewFromLabel}>{fromLabel}</div>
          <div className={S.previewPrice}>
            ${data.priceFrom} <span className={S.previewPriceUnit}>{usdNightLabel}</span>
          </div>
        </div>
      </div>
      <div className={S.previewInfoCol}>
        <h4 className={S.previewTitle}>{data.name}</h4>
        <ul className={S.previewHighlights}>
          {data.highlights.map((h, i) => (
            <li key={i} className={S.previewHighlightItem}>
              <div className={S.previewHighlightDot}>
                <svg className={S.previewHighlightIcon} fill="none"
                  viewBox={S.icons.check.viewBox} stroke="currentColor"
                  strokeWidth={S.icons.check.strokeWidth}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={S.icons.check.path} />
                </svg>
              </div>
              <span className={S.highlightText}>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
