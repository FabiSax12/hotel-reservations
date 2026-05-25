import React from "react";
import type { AmenityCardProps } from "./AmenityCard.interface";
import { AMENITY_CARD_STYLES as STYLES } from "./AmenityCard.styles";
import { AmenityCardBack } from "./components/AmenityCardBack";
import { AmenityCardFront } from "./components/AmenityCardFront";

const AmenityCardRoot = ({
  amenity,
  isSelected,
  isFlipped,
  onToggle,
  onEdit,
  onDelete,
  onFlipToggle,
  texts,
}: AmenityCardProps) => {
  const hasDescription = Boolean(amenity.description);

  return (
    <div className={STYLES.flipWrapper}>
      <div className={STYLES.flipInner(isFlipped)}>
        <AmenityCardFront
          isSelected={isSelected}
          name={amenity.name}
          icon={amenity.icon}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          onFlipToggle={onFlipToggle}
          hasDescription={hasDescription}
          texts={texts}
        />

        {hasDescription && (
          <AmenityCardBack
            isSelected={isSelected}
            description={amenity.description || ""}
            onToggle={onToggle}
            onFlipToggle={onFlipToggle}
            texts={texts}
          />
        )}
      </div>
    </div>
  );
};

export const AmenityCard = Object.assign(AmenityCardRoot, {
  Front: AmenityCardFront,
  Back: AmenityCardBack,
});
