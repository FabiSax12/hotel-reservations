import { Button, Dropdown, Label } from "@heroui/react";
import * as LucideIcons from "lucide-react";
import React from "react";
import { AMENITIES_CONFIG } from "@/features/rooms/constants/amenities.constants";
import type { RoomsTexts } from "@/features/rooms/i18n/roomsTexts.type";
import { IconRenderer } from "../../IconRenderer";
import {
  AMENITY_CARD_CONSTANTS as CONSTANTS,
  AMENITY_CARD_STYLES as STYLES,
} from "../AmenityCard.styles";

interface AmenityCardFrontProps {
  isSelected: boolean;
  name: string;
  icon?: string;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onFlipToggle?: () => void;
  hasDescription: boolean;
  texts: RoomsTexts;
}

export const AmenityCardFront = ({
  isSelected,
  name,
  icon,
  onToggle,
  onEdit,
  onDelete,
  onFlipToggle,
  hasDescription,
  texts,
}: AmenityCardFrontProps) => {
  return (
    <div className={STYLES.flipFront(isSelected)} onClick={onToggle}>
      {isSelected && (
        <LucideIcons.CheckCircle2 className={STYLES.checkIcon} size={CONSTANTS.CHECK_ICON_SIZE} />
      )}

      <div className={STYLES.leftBtnWrapper} onClick={(e) => e.stopPropagation()}>
        <Dropdown>
          <Button
            type={CONSTANTS.TYPE_BUTTON}
            className={STYLES.cardTriggerBtn(isSelected, CONSTANTS.POS_LEFT)}
            aria-label={texts.FORM?.EDIT || CONSTANTS.FALLBACK_EDIT}
          >
            <LucideIcons.Pencil size={CONSTANTS.TRIGGER_ICON_SIZE} />
          </Button>
          <Dropdown.Popover>
            <Dropdown.Menu
              aria-label={CONSTANTS.MENU_ARIA_LABEL}
              onAction={(key) => {
                if (key === CONSTANTS.ACTION_EDIT) {
                  onEdit();
                } else if (key === CONSTANTS.ACTION_DELETE) {
                  onDelete();
                }
              }}
            >
              <Dropdown.Item
                id={CONSTANTS.ACTION_EDIT}
                textValue={texts.FORM?.EDIT || CONSTANTS.FALLBACK_EDIT}
              >
                <div className={STYLES.dropdownItemContent(CONSTANTS.ACTION_EDIT)}>
                  <LucideIcons.Pencil size={CONSTANTS.TRIGGER_ICON_SIZE} />
                  <Label className={STYLES.dropdownItemLabel}>
                    {texts.FORM?.EDIT || CONSTANTS.FALLBACK_EDIT}
                  </Label>
                </div>
              </Dropdown.Item>
              <Dropdown.Item
                id={CONSTANTS.ACTION_DELETE}
                textValue={texts.FORM?.DELETE || CONSTANTS.FALLBACK_DELETE}
                variant={CONSTANTS.VARIANT_DANGER}
              >
                <div className={STYLES.dropdownItemContent(CONSTANTS.ACTION_DELETE)}>
                  <LucideIcons.Trash2 size={CONSTANTS.TRIGGER_ICON_SIZE} />
                  <Label className={STYLES.dropdownItemLabel}>
                    {texts.FORM?.DELETE || CONSTANTS.FALLBACK_DELETE}
                  </Label>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>

      {hasDescription && onFlipToggle && (
        <div className={STYLES.rightBtnWrapper} onClick={(e) => e.stopPropagation()}>
          <Button
            type={CONSTANTS.TYPE_BUTTON}
            className={STYLES.cardTriggerBtn(isSelected, CONSTANTS.POS_RIGHT)}
            onPress={onFlipToggle}
            aria-label={texts.AMENITIES?.DETAILS || CONSTANTS.FALLBACK_DETAILS}
          >
            <LucideIcons.Info size={CONSTANTS.TRIGGER_ICON_SIZE} />
          </Button>
        </div>
      )}

      <div className={STYLES.iconWrapper(isSelected)}>
        <IconRenderer name={icon || AMENITIES_CONFIG.FALLBACK_ICON} />
      </div>
      <span className={STYLES.amenityName(isSelected)}>{name}</span>
    </div>
  );
};
