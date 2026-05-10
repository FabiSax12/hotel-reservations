"use client";

import { Button, Spinner } from "@heroui/react";
import * as LucideIcons from "lucide-react";
import type { AmenitiesFormProps } from "./AmenitiesForm.interface";
import { AMENITIES_FORM_STYLES as STYLES } from "./AmenitiesForm.styles";
import { AmenitiesEmptyState } from "./components/AmenitiesEmptyState";
import { AmenitiesGrid } from "./components/AmenitiesGrid";
import { useAmenitiesForm } from "./hooks/useAmenitiesForm";

export const AmenitiesForm = ({ roomId, onSuccess }: AmenitiesFormProps) => {
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
      <div className={STYLES.loadingContainer}>
        <Spinner color="success" size="lg" />
        <p className={STYLES.loadingText}>{texts.AMENITIES.LOADING}</p>
      </div>
    );
  }

  return (
    <div className={STYLES.container}>
      <header className={STYLES.header}>
        <h1 className={STYLES.title}>{texts.AMENITIES.TITLE}</h1>
      </header>

      <div className={STYLES.formCard}>
        <div className={STYLES.searchWrapper}>
          <LucideIcons.Search className={STYLES.searchIcon} size={20} />
          <input
            type="text"
            className={STYLES.searchInput}
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

        {errors.amenityIds && (
          <p className={STYLES.errorText}>{texts.AMENITIES.SELECT_AT_LEAST_ONE}</p>
        )}
      </div>

      <div className={STYLES.actions}>
        <Button className={STYLES.cancelButton} onPress={() => window.history.back()}>
          {texts.FORM.CANCEL}
        </Button>
        <Button
          className={STYLES.submitButton}
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
