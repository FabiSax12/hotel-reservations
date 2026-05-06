import React from "react";
import { Spinner } from "@heroui/react";
import * as LucideIcons from "lucide-react";
import { IconRenderer } from "../IconRenderer";
import { AMENITY_EDITOR_CARD_STYLES as s } from "./AmenityEditorCard.styles";
import { AmenityEditorCardProps } from "./AmenityEditorCard.interface";
import { AMENITIES_CONFIG, AMENITIES_VALIDATION, KEYBOARD_KEYS } from "@/features/rooms/constants/amenities.constants";

export const AmenityEditorCard: React.FC<AmenityEditorCardProps> = ({
  name,
  setName,
  desc,
  setDesc,
  selectedIcon,
  setSelectedIcon,
  onSave,
  onCancel,
  isSubmitting,
  placeholderName,
  placeholderDesc,
  autoFocus = false,
}) => {
  return (
    <div className={s.customInputCard}>
      <input
        type="text"
        className={s.customInput}
        placeholder={placeholderName}
        maxLength={AMENITIES_VALIDATION.MAX_NAME_LENGTH}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === KEYBOARD_KEYS.ENTER) {
            e.preventDefault();
            onSave();
          } else if (e.key === KEYBOARD_KEYS.ESCAPE) {
            onCancel();
          }
        }}
        disabled={isSubmitting}
        autoFocus={autoFocus}
      />
      <input
        type="text"
        className={s.customInput}
        placeholder={placeholderDesc}
        maxLength={AMENITIES_VALIDATION.MAX_DESC_LENGTH}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === KEYBOARD_KEYS.ENTER) {
            e.preventDefault();
            onSave();
          } else if (e.key === KEYBOARD_KEYS.ESCAPE) {
            onCancel();
          }
        }}
        disabled={isSubmitting}
      />

      {/* Icon Picker Grid */}
      <div className={s.iconPickerGrid}>
        {AMENITIES_CONFIG.CUSTOM_ICON_OPTIONS.map((iconName) => (
          <button
            key={iconName}
            type="button"
            className={s.iconPickerBtn(selectedIcon === iconName)}
            onClick={() => setSelectedIcon(iconName)}
            disabled={isSubmitting}
            title={iconName}
          >
            <IconRenderer name={iconName} size={16} />
          </button>
        ))}
      </div>

      <div className={s.customActionWrapper}>
        <button
          type="button"
          className={s.customSaveBtn}
          onClick={onSave}
          disabled={isSubmitting || !name.trim()}
        >
          {isSubmitting ? <Spinner size="sm" color="current" /> : <LucideIcons.Check size={14} />}
        </button>
        <button
          type="button"
          className={s.customCancelBtn}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          <LucideIcons.X size={14} />
        </button>
      </div>
    </div>
  );
};
