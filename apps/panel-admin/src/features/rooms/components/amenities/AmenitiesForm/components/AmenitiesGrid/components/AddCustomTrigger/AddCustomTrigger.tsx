import * as LucideIcons from "lucide-react";
import React from "react";
import { AMENITIES_FORM_STYLES as STYLES } from "../../../../AmenitiesForm.styles";
import { AmenityEditorCard } from "../../../AmenityEditorCard";
import { useAmenitiesGridContext } from "../../context";

export const AddCustomTrigger = () => {
  const {
    isAdding,
    setIsAdding,
    customName,
    setCustomName,
    customDesc,
    setCustomDesc,
    selectedIcon,
    setSelectedIcon,
    handleSaveCustom,
    cancelAdding,
    isAddingCustom,
    texts,
  } = useAmenitiesGridContext();

  if (isAdding) {
    return (
      <AmenityEditorCard
        name={customName}
        setName={setCustomName}
        desc={customDesc}
        setDesc={setCustomDesc}
        selectedIcon={selectedIcon}
        setSelectedIcon={setSelectedIcon}
        onSave={handleSaveCustom}
        onCancel={cancelAdding}
        isSubmitting={isAddingCustom}
        placeholderName={texts.AMENITIES.ADD_CUSTOM_PLACEHOLDER}
        placeholderDesc={texts.AMENITIES.ADD_DESC_PLACEHOLDER}
        autoFocus
      />
    );
  }

  return (
    <div className={STYLES.customTriggerCard} onClick={() => setIsAdding(true)}>
      <div className={STYLES.customTriggerIconWrapper}>
        <LucideIcons.Plus size={24} />
      </div>
      <span className={STYLES.customTriggerText}>{texts.AMENITIES.ADD_CUSTOM}</span>
    </div>
  );
};
