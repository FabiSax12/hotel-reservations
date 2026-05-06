import React from "react";
import * as LucideIcons from "lucide-react";
import { AMENITIES_EMPTY_STATE_STYLES as s } from "./AmenitiesEmptyState.styles";
import { AmenitiesEmptyStateProps } from "./AmenitiesEmptyState.interface";

export const AmenitiesEmptyState: React.FC<AmenitiesEmptyStateProps> = ({ text }) => {
  return (
    <div className={s.emptyContainer}>
      <LucideIcons.BoxSelect className={s.emptyIcon} size={48} />
      <p className={s.emptyText}>{text}</p>
    </div>
  );
};
