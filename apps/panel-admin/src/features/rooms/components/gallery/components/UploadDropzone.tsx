import { useRef } from "react";
import type { UploadDropzoneProps } from "../GalleryStage.interface";
import { DROPZONE_STYLES as S } from "../GalleryStage.styles";

export const UploadDropzone = ({ isDisabled, onFilesAdded }: UploadDropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const trigger = () => !isDisabled && inputRef.current?.click();

  return (
    <>
      <div
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        aria-disabled={isDisabled}
        aria-label="Subir imágenes"
        className={S.zone(isDisabled)}
        onClick={trigger}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && trigger()}
        onDragOver={(e) => { if (!isDisabled) e.preventDefault(); }}
        onDrop={(e) => {
          if (isDisabled) return;
          e.preventDefault();
          if (e.dataTransfer.files.length > 0) onFilesAdded(e.dataTransfer.files);
        }}
      >
        <span className={S.icon}>⬆</span>
        <span className={S.label}>Subir imágenes</span>
        <span className={S.hint}>Hacé clic o arrastrá imágenes aquí</span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className={S.input}
        aria-hidden="true"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            onFilesAdded(e.target.files);
            e.target.value = "";
          }
        }}
      />
    </>
  );
};
