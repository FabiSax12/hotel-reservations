"use client";

import { Button } from "@heroui/react";
import { Info, X } from "lucide-react";
import { ImageGrid } from "./components/ImageGrid";
import { UploadDropzone } from "./components/UploadDropzone";
import type { GalleryStageProps } from "./GalleryStage.interface";
import { GALLERY_STYLES as STYLES } from "./GalleryStage.styles";
import { useGalleryStage } from "./hooks/useGalleryStage";

export const GalleryStage = ({ roomId, onSuccess }: GalleryStageProps) => {
  const {
    images,
    dragIndex,
    error,
    texts,
    isMaxReached,
    isSubmitDisabled,
    handleFilesAdded,
    handleRemove,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleSubmit,
    handleCancel,
  } = useGalleryStage(roomId, onSuccess);

  return (
    <main className={STYLES.container}>
      <header className={STYLES.header}>
        <h1 className={STYLES.title}>{texts.TITLE}</h1>
        <p className={STYLES.subtitle}>{texts.SUBTITLE}</p>
      </header>

      <div className={STYLES.formCard}>
        <div className={STYLES.hintBox}>
          <Info className={STYLES.hintIcon} />
          <p>{texts.HINT}</p>
        </div>

        <UploadDropzone
          isDisabled={isMaxReached}
          label={texts.DROPZONE_LABEL}
          hint={texts.DROPZONE_HINT}
          onFilesAdded={handleFilesAdded}
        />

        <ImageGrid
          images={images}
          dragIndex={dragIndex}
          removeLabel={texts.REMOVE_IMAGE}
          principalLabel={texts.PRINCIPAL_BADGE}
          onRemove={handleRemove}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
        />

        {error && (
          <p className={STYLES.error} role="alert">
            {error}
          </p>
        )}

        <div className={STYLES.actions}>
          <Button
            className={STYLES.cancelBtn}
            onPress={handleCancel}
          >
            {texts.CANCEL}
          </Button>
          <Button
            className={STYLES.submitBtn}
            isDisabled={isSubmitDisabled}
            onPress={handleSubmit}
          >
            {texts.SUBMIT}
          </Button>
        </div>
      </div>
    </main>
  );
};
