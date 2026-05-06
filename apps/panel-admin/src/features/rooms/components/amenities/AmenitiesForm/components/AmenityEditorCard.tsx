import React from "react";
import { Spinner } from "@heroui/react";
import * as LucideIcons from "lucide-react";
import { IconRenderer } from "./IconRenderer";
import { AMENITIES_FORM_STYLES as s } from "../AmenitiesForm.styles";

const CUSTOM_ICON_OPTIONS = [
  "Wifi",
  "Tv",
  "Coffee",
  "Bed",
  "Bath",
  "Dumbbell",
  "Waves",
  "Sparkles",
] as const;

interface AmenityEditorCardProps {
  name: string;
  setName: (val: string) => void;
  desc: string;
  setDesc: (val: string) => void;
  selectedIcon: string;
  setSelectedIcon: (val: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
  placeholderName: string;
  placeholderDesc: string;
  autoFocus?: boolean;
}

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
        maxLength={25}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSave();
          } else if (e.key === "Escape") {
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
        maxLength={50}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSave();
          } else if (e.key === "Escape") {
            onCancel();
          }
        }}
        disabled={isSubmitting}
      />

      {/* Icon Picker Grid */}
      <div className={s.iconPickerGrid}>
        {CUSTOM_ICON_OPTIONS.map((iconName) => (
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
          {isSubmitting ? (
            <Spinner size="sm" color="current" />
          ) : (
            <LucideIcons.Check size={14} />
          )}
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
