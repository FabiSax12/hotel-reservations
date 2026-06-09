"use client";

import { Button } from "@heroui/react";
import { Info, X } from "lucide-react";
import { ImageGrid } from "./components/ImageGrid";
import { UploadDropzone } from "./components/UploadDropzone";
import type { GalleryStageProps } from "./GalleryStage.interface";
import { GALLERY_STYLES as S } from "./GalleryStage.styles";
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
    <main className={S.container}>
      <header className={S.header}>
        <h1 className={S.title}>{texts.TITLE}</h1>
        <p className={S.subtitle}>{texts.SUBTITLE}</p>
      </header>

      <div className={S.formCard}>
        <div className={S.hintBox}>
          <Info className={S.hintIcon} />
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
          <p className={S.error} role="alert">
            {error}
          </p>
        )}

        <div className={S.actions}>
          <Button
            className={S.cancelBtn}
            onPress={handleCancel}
          >
            {texts.CANCEL}
          </Button>
          <Button
            className={S.submitBtn}
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
