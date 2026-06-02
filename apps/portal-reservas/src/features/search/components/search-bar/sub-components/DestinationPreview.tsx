/**
 * @file DestinationPreview.tsx — Hover preview panel for a destination region.
 */

import {
  DESTINATION_POPOVER_STYLES,
} from "../theme/destination.theme";
import type { DestinationPreviewProps } from "../domain/types";

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
      className={DESTINATION_POPOVER_STYLES.previewPanel(isHero, positionClasses)}
      onMouseLeave={onMouseLeave}
      style={{ height: DESTINATION_POPOVER_STYLES.layout.previewHeight }}
    >
      <div className={DESTINATION_POPOVER_STYLES.previewImageCol}>
        <div className={DESTINATION_POPOVER_STYLES.previewImageBg} style={{ backgroundImage: `url('${data.image}')` }} />
        <div className={DESTINATION_POPOVER_STYLES.previewImageGrad} />
        <div className={DESTINATION_POPOVER_STYLES.previewPriceBlock}>
          <div className={DESTINATION_POPOVER_STYLES.previewFromLabel}>{fromLabel}</div>
          <div className={DESTINATION_POPOVER_STYLES.previewPrice}>
            ${data.priceFrom} <span className={DESTINATION_POPOVER_STYLES.previewPriceUnit}>{usdNightLabel}</span>
          </div>
        </div>
      </div>
      <div className={DESTINATION_POPOVER_STYLES.previewInfoCol}>
        <h4 className={DESTINATION_POPOVER_STYLES.previewTitle}>{data.name}</h4>
        <ul className={DESTINATION_POPOVER_STYLES.previewHighlights}>
          {data.highlights.map((h, i) => (
            <li key={i} className={DESTINATION_POPOVER_STYLES.previewHighlightItem}>
              <div className={DESTINATION_POPOVER_STYLES.previewHighlightDot}>
                <svg className={DESTINATION_POPOVER_STYLES.previewHighlightIcon} fill="none"
                  viewBox={DESTINATION_POPOVER_STYLES.icons.check.viewBox} stroke="currentColor"
                  strokeWidth={DESTINATION_POPOVER_STYLES.icons.check.strokeWidth}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={DESTINATION_POPOVER_STYLES.icons.check.path} />
                </svg>
              </div>
              <span className={DESTINATION_POPOVER_STYLES.highlightText}>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
