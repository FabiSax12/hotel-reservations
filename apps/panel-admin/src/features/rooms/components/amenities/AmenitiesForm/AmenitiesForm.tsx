"use client";

import { Button, Spinner } from "@heroui/react";
import * as LucideIcons from "lucide-react";
import type React from "react";
import type { AmenitiesFormProps } from "./AmenitiesForm.interface";
import { AMENITIES_FORM_STYLES as s } from "./AmenitiesForm.styles";
import { AmenitiesEmptyState } from "./components/AmenitiesEmptyState";
import { AmenitiesGrid } from "./components/AmenitiesGrid";
import { useAmenitiesForm } from "./hooks/useAmenitiesForm";

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

        <AmenitiesGrid
          amenities={amenities}
          selectedIds={selectedIds}
          isAddingCustom={isAddingCustom}
          texts={texts}
          toggleAmenity={toggleAmenity}
          handleAddCustom={handleAddCustom}
          handleUpdateCustom={handleUpdateCustom}
          handleDeleteCustom={handleDeleteCustom}
        />

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
