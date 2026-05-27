import * as LucideIcons from "lucide-react";
import type { AmenitiesEmptyStateProps } from "./AmenitiesEmptyState.interface";
import { AMENITIES_EMPTY_STATE_STYLES as STYLES } from "./AmenitiesEmptyState.styles";

export const AmenitiesEmptyState = ({ text }: AmenitiesEmptyStateProps) => {
  return (
    <div className={STYLES.emptyContainer}>
      <LucideIcons.BoxSelect className={STYLES.emptyIcon} size={48} />
      <p className={STYLES.emptyText}>{text}</p>
    </div>
  );
};
