import { Button, Dropdown, Label } from "@heroui/react";
import * as LucideIcons from "lucide-react";
import type React from "react";
import { AMENITIES_CONFIG } from "@/features/rooms/constants/amenities.constants";
import { IconRenderer } from "../IconRenderer";
import type { AmenityCardProps } from "./AmenityCard.interface";
import { AMENITY_CARD_CONSTANTS as c, AMENITY_CARD_STYLES as s } from "./AmenityCard.styles";

export const AmenityCard: React.FC<AmenityCardProps> = ({
  amenity,
  isSelected,
  isFlipped,
  onToggle,
  onEdit,
  onDelete,
  onFlipToggle,
  texts,
}) => {
  return (
    <div className={s.flipWrapper}>
      <div className={s.flipInner(isFlipped)}>
        <div className={s.flipFront(isSelected)} onClick={onToggle}>
          {isSelected && (
            <LucideIcons.CheckCircle2 className={s.checkIcon} size={c.CHECK_ICON_SIZE} />
          )}

          <div className={s.leftBtnWrapper} onClick={(e) => e.stopPropagation()}>
            <Dropdown>
              <Button
                type={c.TYPE_BUTTON}
                className={s.cardTriggerBtn(isSelected, c.POS_LEFT)}
                aria-label={texts.FORM?.EDIT || c.FALLBACK_EDIT}
              >
                <LucideIcons.Pencil size={c.TRIGGER_ICON_SIZE} />
              </Button>
              <Dropdown.Popover>
                <Dropdown.Menu
                  aria-label={c.MENU_ARIA_LABEL}
                  onAction={(key) => {
                    if (key === c.ACTION_EDIT) {
                      onEdit();
                    } else if (key === c.ACTION_DELETE) {
                      onDelete();
                    }
                  }}
                >
                  <Dropdown.Item id={c.ACTION_EDIT} textValue={texts.FORM?.EDIT || c.FALLBACK_EDIT}>
                    <div className={s.dropdownItemContent(c.ACTION_EDIT)}>
                      <LucideIcons.Pencil size={c.TRIGGER_ICON_SIZE} />
                      <Label className={s.dropdownItemLabel}>
                        {texts.FORM?.EDIT || c.FALLBACK_EDIT}
                      </Label>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id={c.ACTION_DELETE}
                    textValue={texts.FORM?.DELETE || c.FALLBACK_DELETE}
                    variant={c.VARIANT_DANGER}
                  >
                    <div className={s.dropdownItemContent(c.ACTION_DELETE)}>
                      <LucideIcons.Trash2 size={c.TRIGGER_ICON_SIZE} />
                      <Label className={s.dropdownItemLabel}>
                        {texts.FORM?.DELETE || c.FALLBACK_DELETE}
                      </Label>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>

          {amenity.description && (
            <div className={s.rightBtnWrapper} onClick={(e) => e.stopPropagation()}>
              <Button
                type={c.TYPE_BUTTON}
                className={s.cardTriggerBtn(isSelected, c.POS_RIGHT)}
                onPress={onFlipToggle}
                aria-label={texts.AMENITIES?.DETAILS || c.FALLBACK_DETAILS}
              >
                <LucideIcons.Info size={c.TRIGGER_ICON_SIZE} />
              </Button>
            </div>
          )}

          <div className={s.iconWrapper(isSelected)}>
            <IconRenderer name={amenity.icon || AMENITIES_CONFIG.FALLBACK_ICON} />
          </div>
          <span className={s.amenityName(isSelected)}>{amenity.name}</span>
        </div>

        {amenity.description && (
          <div className={s.flipBack(isSelected)} onClick={onToggle}>
            <div className={s.rightBtnWrapper} onClick={(e) => e.stopPropagation()}>
              <Button
                type={c.TYPE_BUTTON}
                className={s.cardTriggerBtn(isSelected, c.POS_RIGHT)}
                onPress={onFlipToggle}
                aria-label={texts.AMENITIES?.DETAILS || c.FALLBACK_LESS}
              >
                <LucideIcons.Info size={c.TRIGGER_ICON_SIZE} />
              </Button>
            </div>

            {isSelected && (
              <LucideIcons.CheckCircle2 className={s.checkIcon} size={c.CHECK_ICON_SIZE} />
            )}

            <p className={s.descText}>{amenity.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};
