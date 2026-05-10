import { Spinner } from "@heroui/react";
import * as LucideIcons from "lucide-react";
import type React from "react";
import {
  AMENITIES_CONFIG,
  AMENITIES_VALIDATION,
  KEYBOARD_KEYS,
} from "@/features/rooms/constants/amenities.constants";
import { IconRenderer } from "../IconRenderer";
import type { AmenityEditorCardProps } from "./AmenityEditorCard.interface";
import { AMENITY_EDITOR_CARD_STYLES as STYLES } from "./AmenityEditorCard.styles";

export const AmenityEditorCard = ({
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
}: AmenityEditorCardProps) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEYBOARD_KEYS.ENTER) {
      e.preventDefault();
      onSave();
    } else if (e.key === KEYBOARD_KEYS.ESCAPE) {
      onCancel();
    }
  };

  const handleIconSelect = (iconName: string) => {
    setSelectedIcon(iconName);
  };

  return (
    <div className={STYLES.customInputCard}>
      <input
        type="text"
        className={STYLES.customInput}
        placeholder={placeholderName}
        maxLength={AMENITIES_VALIDATION.MAX_NAME_LENGTH}
        value={name}
        onChange={handleNameChange}
        onKeyDown={handleKeyDown}
        disabled={isSubmitting}
        autoFocus={autoFocus}
      />
      <input
        type="text"
        className={STYLES.customInput}
        placeholder={placeholderDesc}
        maxLength={AMENITIES_VALIDATION.MAX_DESC_LENGTH}
        value={desc}
        onChange={handleDescChange}
        onKeyDown={handleKeyDown}
        disabled={isSubmitting}
      />

      <div className={STYLES.iconPickerGrid}>
        {AMENITIES_CONFIG.CUSTOM_ICON_OPTIONS.map((iconName) => (
          <button
            key={iconName}
            type="button"
            className={STYLES.iconPickerBtn(selectedIcon === iconName)}
            onClick={() => handleIconSelect(iconName)}
            disabled={isSubmitting}
            title={iconName}
          >
            <IconRenderer name={iconName} size={16} />
          </button>
        ))}
      </div>

      <div className={STYLES.customActionWrapper}>
        <button
          type="button"
          className={STYLES.customSaveBtn}
          onClick={onSave}
          disabled={isSubmitting || !name.trim()}
        >
          {isSubmitting ? <Spinner size="sm" color="current" /> : <LucideIcons.Check size={14} />}
        </button>
        <button
          type="button"
          className={STYLES.customCancelBtn}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          <LucideIcons.X size={14} />
        </button>
      </div>
    </div>
  );
};
