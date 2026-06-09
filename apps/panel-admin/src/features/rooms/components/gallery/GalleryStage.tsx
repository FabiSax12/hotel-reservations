"use client";

import { ImageGrid } from "./components/ImageGrid";
import { UploadDropzone } from "./components/UploadDropzone";
import { GALLERY_STYLES as S } from "./GalleryStage.styles";
import { useGalleryStage } from "./hooks/useGalleryStage";

export const GalleryStage = () => {
  const {
    images,
    dragIndex,
    error,
    isMaxReached,
    handleFilesAdded,
    handleRemove,
    handleDragStart,
    handleDragEnd,
    handleDrop,
  } = useGalleryStage();

  return (
    <div className={S.container}>
      <header className={S.header}>
        <h1 className={S.title}>Galería de Imágenes</h1>
        <p className={S.subtitle}>Subí entre 1 y 10 imágenes. Arrastrá para reordenar.</p>
      </header>

      <div className={S.hintBox}>
        <span className={S.hintIcon}>ℹ️</span>
        <p>
          La primera imagen se asigna como Principal. Formatos: JPG, PNG, WebP. Máximo 5 MB por
          imagen.
        </p>
      </div>

      <UploadDropzone isDisabled={isMaxReached} onFilesAdded={handleFilesAdded} />

      <ImageGrid
        images={images}
        dragIndex={dragIndex}
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
        <button
          type="button"
          className={S.cancelBtn}
          onClick={() => window.history.back()}
        >
          Cancelar
        </button>
        <button
          type="button"
          className={S.submitBtn}
          disabled={images.length === 0 || images.some((img) => img.isUploading)}
          onClick={() => alert("Galería guardada (mock)")}
        >
          Guardar Galería
        </button>
      </div>
    </div>
  );
};
