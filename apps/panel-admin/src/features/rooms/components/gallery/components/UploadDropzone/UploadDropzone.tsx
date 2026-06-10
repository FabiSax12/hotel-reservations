import { useRef } from "react";
import { CloudUpload } from "lucide-react";
import { GALLERY_CONFIG, GALLERY_KEYBOARD } from "@/features/rooms/constants/gallery.constants";
import type { UploadDropzoneProps } from "./UploadDropzone.interface";
import { UPLOAD_DROPZONE_STYLES as STYLES } from "./UploadDropzone.styles";

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
        className={STYLES.zone(isDisabled)}
        onClick={trigger}
        onKeyDown={(e) =>
          (e.key === GALLERY_KEYBOARD.ENTER || e.key === GALLERY_KEYBOARD.SPACE) && trigger()
        }
        onDragOver={(e) => { if (!isDisabled) e.preventDefault(); }}
        onDrop={(e) => {
          if (isDisabled) return;
          e.preventDefault();
          if (e.dataTransfer.files.length > 0) onFilesAdded(e.dataTransfer.files);
        }}
      >
        <CloudUpload className={STYLES.icon} />
        <span className={STYLES.label}>{label}</span>
        <span className={STYLES.hint}>{hint}</span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={GALLERY_CONFIG.ACCEPTED_TYPESTYLES.join(",")}
        multiple
        className={STYLES.input}
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
