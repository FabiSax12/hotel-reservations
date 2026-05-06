"use client";

import React from "react";
import * as LucideIcons from "lucide-react";
import { Button, Spinner } from "@heroui/react";
import { AMENITIES_FORM_STYLES as s } from "./AmenitiesForm.styles";
import { AmenitiesFormProps } from "./AmenitiesForm.interface";
import { useAmenitiesForm } from "./hooks/useAmenitiesForm";
import { AmenityCard } from "./components/AmenityCard";
import { AmenityEditorCard } from "./components/AmenityEditorCard";
import { AmenitiesEmptyState } from "./components/AmenitiesEmptyState";
import { AMENITIES_CONFIG } from "@/features/rooms/constants/amenities.constants";

export const AmenitiesForm: React.FC<AmenitiesFormProps> = ({ roomId, onSuccess }) => {
  const {
    amenities,
    selectedIds,
    isLoading,
    isSubmitting,
    isAddingCustom,
    errors,
    texts,
    searchTerm,
    setSearchTerm,
    toggleAmenity,
    handleAddCustom,
    handleUpdateCustom,
    handleDeleteCustom,
    handleSubmit,
  } = useAmenitiesForm(roomId, onSuccess);

  const [isAdding, setIsAdding] = React.useState(false);
  const [customName, setCustomName] = React.useState("");
  const [customDesc, setCustomDesc] = React.useState("");
  const [selectedIcon, setSelectedIcon] = React.useState<string>(AMENITIES_CONFIG.DEFAULT_ICON);

  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editingName, setEditingName] = React.useState("");
  const [editingDesc, setEditingDesc] = React.useState("");
  const [editingIcon, setEditingIcon] = React.useState<string>(AMENITIES_CONFIG.DEFAULT_ICON);

  const [activeDescId, setActiveDescId] = React.useState<string | null>(null);

  const handleSaveCustom = async () => {
    if (!customName.trim()) return;
    await handleAddCustom(customName.trim(), selectedIcon, customDesc.trim());
    setCustomName("");
    setCustomDesc("");
    setSelectedIcon(AMENITIES_CONFIG.DEFAULT_ICON);
    setIsAdding(false);
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editingName.trim()) return;
    await handleUpdateCustom(editingId, editingName.trim(), editingIcon, editingDesc.trim());
    setEditingId(null);
  };

  if (isLoading) {
    return (
      <div className={s.loadingContainer}>
        <Spinner color="success" size="lg" />
        <p className={s.loadingText}>{texts.AMENITIES.LOADING}</p>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <header className={s.header}>
        <h1 className={s.title}>{texts.AMENITIES.TITLE}</h1>
      </header>

      <div className={s.formCard}>
        <div className={s.searchWrapper}>
          <LucideIcons.Search className={s.searchIcon} size={20} />
          <input
            type="text"
            className={s.searchInput}
            placeholder={texts.AMENITIES.SEARCH_PLACEHOLDER}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={s.grid}>
          {amenities.map((amenity) => {
            const isSelected = selectedIds.includes(amenity.id);
            const isCurrentEditing = editingId === amenity.id;

            if (isCurrentEditing) {
              return (
                <AmenityEditorCard
                  key={amenity.id}
                  name={editingName}
                  setName={setEditingName}
                  desc={editingDesc}
                  setDesc={setEditingDesc}
                  selectedIcon={editingIcon}
                  setSelectedIcon={setEditingIcon}
                  onSave={handleSaveEdit}
                  onCancel={() => setEditingId(null)}
                  isSubmitting={isAddingCustom}
                  placeholderName={texts.AMENITIES.ADD_CUSTOM_PLACEHOLDER}
                  placeholderDesc={texts.AMENITIES.ADD_DESC_PLACEHOLDER}
                  autoFocus
                />
              );
            }

            return (
              <AmenityCard
                key={amenity.id}
                amenity={amenity}
                isSelected={isSelected}
                isFlipped={activeDescId === amenity.id}
                onToggle={() => toggleAmenity(amenity.id)}
                onEdit={() => {
                  setEditingId(amenity.id);
                  setEditingName(amenity.name);
                  setEditingDesc(amenity.description || "");
                  setEditingIcon(amenity.icon || AMENITIES_CONFIG.DEFAULT_ICON);
                }}
                onDelete={() => handleDeleteCustom(amenity.id)}
                onFlipToggle={() => setActiveDescId(activeDescId === amenity.id ? null : amenity.id)}
                texts={texts}
              />
            );
          })}

          {/* Interactive Custom Amenity Creator Card */}
          {isAdding ? (
            <AmenityEditorCard
              name={customName}
              setName={setCustomName}
              desc={customDesc}
              setDesc={setCustomDesc}
              selectedIcon={selectedIcon}
              setSelectedIcon={setSelectedIcon}
              onSave={handleSaveCustom}
              onCancel={() => {
                setIsAdding(false);
                setCustomName("");
                setCustomDesc("");
                setSelectedIcon(AMENITIES_CONFIG.DEFAULT_ICON);
              }}
              isSubmitting={isAddingCustom}
              placeholderName={texts.AMENITIES.ADD_CUSTOM_PLACEHOLDER}
              placeholderDesc={texts.AMENITIES.ADD_DESC_PLACEHOLDER}
              autoFocus
            />
          ) : (
            <div className={s.customTriggerCard} onClick={() => setIsAdding(true)}>
              <div className={s.customTriggerIconWrapper}>
                <LucideIcons.Plus size={24} />
              </div>
              <span className={s.customTriggerText}>{texts.AMENITIES.ADD_CUSTOM}</span>
            </div>
          )}
        </div>

        {amenities.length === 0 && <AmenitiesEmptyState text={texts.AMENITIES.EMPTY_STATE} />}

        {errors.amenityIds && <p className={s.errorText}>{texts.AMENITIES.SELECT_AT_LEAST_ONE}</p>}
      </div>

      <div className={s.actions}>
        <Button className={s.cancelButton} onPress={() => window.history.back()}>
          {texts.FORM.CANCEL}
        </Button>
        <Button
          className={s.submitButton}
          onPress={() => handleSubmit()}
          isPending={isSubmitting}
          isDisabled={selectedIds.length === 0}
        >
          {texts.AMENITIES.SUBMIT}
        </Button>
      </div>
    </div>
  );
};
