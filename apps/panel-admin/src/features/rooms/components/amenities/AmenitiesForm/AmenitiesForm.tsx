"use client";

import React from "react";
import * as LucideIcons from "lucide-react";
import { Button, Spinner } from "@heroui/react";
import { AMENITIES_FORM_STYLES as s } from "./AmenitiesForm.styles";
import { AmenitiesFormProps } from "./AmenitiesForm.interface";
import { useAmenitiesForm } from "./hooks/useAmenitiesForm";

const IconRenderer = ({ name, size = 24 }: { name: string; size?: number }) => {
  const Icon = (LucideIcons as any)[name];
  if (!Icon) return <LucideIcons.HelpCircle size={size} />;
  return <Icon size={size} />;
};

export const AmenitiesForm: React.FC<AmenitiesFormProps> = ({ roomId, onSuccess }) => {
  const {
    amenities,
    selectedIds,
    isLoading,
    isSubmitting,
    errors,
    texts,
    searchTerm,
    setSearchTerm,
    toggleAmenity,
    handleSubmit,
  } = useAmenitiesForm(roomId, onSuccess);

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
          return (
            <div
              key={amenity.id}
              className={s.card(isSelected)}
              onClick={() => toggleAmenity(amenity.id)}
            >
              {isSelected && <LucideIcons.CheckCircle2 className={s.checkIcon} size={20} />}
              <div className={s.iconWrapper(isSelected)}>
                <IconRenderer name={amenity.icon || "HelpCircle"} />
              </div>
              <span className={s.amenityName(isSelected)}>{amenity.name}</span>
            </div>
          );
        })}
      </div>

      {amenities.length === 0 && (
        <div className={s.emptyContainer}>
          <LucideIcons.BoxSelect className={s.emptyIcon} size={48} />
          <p className={s.emptyText}>{texts.AMENITIES.EMPTY_STATE}</p>
        </div>
      )}

      {errors.amenityIds && (
        <p className={s.errorText}>{texts.AMENITIES.SELECT_AT_LEAST_ONE}</p>
      )}

      <div className={s.actions}>
        <Button className={s.cancelButton} variant="ghost">
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
