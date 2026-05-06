import React from "react";
import * as LucideIcons from "lucide-react";
import { Dropdown, Button, Label } from "@heroui/react";
import { IconRenderer } from "../IconRenderer";
import { AMENITY_CARD_STYLES as s, AMENITY_CARD_CONSTANTS as c } from "./AmenityCard.styles";
import { AmenityCardProps } from "./AmenityCard.interface";
import { AMENITIES_CONFIG } from "@/features/rooms/constants/amenities.constants";

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
        {/* Front Side of Card */}
        <div className={s.flipFront(isSelected)} onClick={onToggle}>
          {isSelected && <LucideIcons.CheckCircle2 className={s.checkIcon} size={c.CHECK_ICON_SIZE} />}

          {/* Universal Edit and Delete Dropdown */}
          <div className={s.leftBtnWrapper} onClick={(e) => e.stopPropagation()}>
            <Dropdown>
              <Button
                type={c.TYPE_BUTTON}
                className={s.cardTriggerBtn(isSelected, "left")}
                aria-label={texts.FORM?.EDIT || "Editar"}
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
                  <Dropdown.Item id={c.ACTION_EDIT} textValue={texts.FORM?.EDIT || "Editar"}>
                    <div className={s.dropdownItemContent("edit")}>
                      <LucideIcons.Pencil size={c.TRIGGER_ICON_SIZE} />
                      <Label className={s.dropdownItemLabel}>{texts.FORM?.EDIT || "Editar"}</Label>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item id={c.ACTION_DELETE} textValue={texts.FORM?.DELETE || "Eliminar"} variant={c.VARIANT_DANGER}>
                    <div className={s.dropdownItemContent("delete")}>
                      <LucideIcons.Trash2 size={c.TRIGGER_ICON_SIZE} />
                      <Label className={s.dropdownItemLabel}>{texts.FORM?.DELETE || "Eliminar"}</Label>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>

          {/* Info switch trigger button */}
          {amenity.description && (
            <div className={s.rightBtnWrapper} onClick={(e) => e.stopPropagation()}>
              <Button
                type={c.TYPE_BUTTON}
                className={s.cardTriggerBtn(isSelected, "right")}
                onPress={onFlipToggle}
                aria-label={texts.AMENITIES?.DETAILS || "Ver descripción"}
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

        {/* Back Side of Card */}
        {amenity.description && (
          <div className={s.flipBack(isSelected)} onClick={onToggle}>
            {/* Info switch close trigger */}
            <div className={s.rightBtnWrapper} onClick={(e) => e.stopPropagation()}>
              <Button
                type={c.TYPE_BUTTON}
                className={s.cardTriggerBtn(isSelected, "right")}
                onPress={onFlipToggle}
                aria-label={texts.AMENITIES?.DETAILS || "Ver menos"}
              >
                <LucideIcons.Info size={c.TRIGGER_ICON_SIZE} />
              </Button>
            </div>

            {isSelected && <LucideIcons.CheckCircle2 className={s.checkIcon} size={c.CHECK_ICON_SIZE} />}

            <p className={s.descText}>{amenity.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};
