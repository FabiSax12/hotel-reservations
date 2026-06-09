import { useRef } from "react";
import { GALLERY_CONFIG, GALLERY_KEYBOARD } from "@/features/rooms/constants/gallery.constants";
import type { UploadDropzoneProps } from "../GalleryStage.interface";
import { DROPZONE_STYLES as S } from "../GalleryStage.styles";

export const UploadDropzone = ({ isDisabled, label, hint, onFilesAdded }: UploadDropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const trigger = () => !isDisabled && inputRef.current?.click();

  return (
    <>
      <div
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        aria-disabled={isDisabled}
        aria-label={label}
        className={S.zone(isDisabled)}
        onClick={trigger}
        onKeyDown={(e) => (e.key === GALLERY_KEYBOARD.ENTER || e.key === GALLERY_KEYBOARD.SPACE) && trigger()}
        onDragOver={(e) => { if (!isDisabled) e.preventDefault(); }}
        onDrop={(e) => {
          if (isDisabled) return;
          e.preventDefault();
          if (e.dataTransfer.files.length > 0) onFilesAdded(e.dataTransfer.files);
        }}
      >
        <span className={S.icon}>⬆</span>
        <span className={S.label}>{label}</span>
        <span className={S.hint}>{hint}</span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={GALLERY_CONFIG.ACCEPTED_TYPES.join(",")}
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
