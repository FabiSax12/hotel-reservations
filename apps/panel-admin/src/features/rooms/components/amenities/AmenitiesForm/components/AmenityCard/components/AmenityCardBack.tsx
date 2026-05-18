import { Button } from "@heroui/react";
import * as LucideIcons from "lucide-react";
import React from "react";
import type { RoomsTexts } from "@/features/rooms/i18n/roomsTexts.type";
import {
  AMENITY_CARD_CONSTANTS as CONSTANTS,
  AMENITY_CARD_STYLES as STYLES,
} from "../AmenityCard.styles";

interface AmenityCardBackProps {
  isSelected: boolean;
  description: string;
  onToggle: () => void;
  onFlipToggle: () => void;
  texts: RoomsTexts;
}

export const AmenityCardBack = ({
  isSelected,
  description,
  onToggle,
  onFlipToggle,
  texts,
}: AmenityCardBackProps) => {
  return (
    <div className={STYLES.flipBack(isSelected)} onClick={onToggle}>
      <div className={STYLES.rightBtnWrapper} onClick={(e) => e.stopPropagation()}>
        <Button
          type={CONSTANTS.TYPE_BUTTON}
          className={STYLES.cardTriggerBtn(isSelected, CONSTANTS.POS_RIGHT)}
          onPress={onFlipToggle}
          aria-label={texts.AMENITIES?.DETAILS || CONSTANTS.FALLBACK_LESS}
        >
          <LucideIcons.Info size={CONSTANTS.TRIGGER_ICON_SIZE} />
        </Button>
      </div>

      {isSelected && (
        <LucideIcons.CheckCircle2 className={STYLES.checkIcon} size={CONSTANTS.CHECK_ICON_SIZE} />
      )}

      <p className={STYLES.descText}>{description}</p>
    </div>
  );
};
