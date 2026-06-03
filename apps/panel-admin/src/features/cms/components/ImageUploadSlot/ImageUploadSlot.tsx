"use client";

import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { CMS_IMAGE_ACCEPT, CMS_IMAGE_SIZES } from "@/features/cms/constants/cms-fields";
import { uploadCmsImageAction } from "@/features/cms/services/saveCmsContentAction";
import type { ImageUploadSlotProps } from "./ImageUploadSlot.interface";
import { IMAGE_UPLOAD_SLOT_STYLES as STYLES } from "./ImageUploadSlot.styles";

export function ImageUploadSlot({ slot, currentUrl, onUrlChange, texts }: ImageUploadSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("slot", String(slot + 1));
    const result = await uploadCmsImageAction(formData);
    setIsUploading(false);
    if (!result.success) {
      const key = result.error as keyof typeof texts.ACTIONS;
      setError(texts.ACTIONS[key] ?? texts.ACTIONS.ERROR);
      return;
    }
    onUrlChange(result.url);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUrlChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const hasImage = !!currentUrl;

  return (
    <div className={STYLES.wrapper}>
      <span className={STYLES.label}>
        {texts.ABOUT.IMAGE_SLOT_LABEL} {slot + 1}
      </span>

      <div
        role="button"
        tabIndex={0}
        className={`${STYLES.dropzone}${hasImage ? ` ${STYLES.dropzoneHasImage}` : ""}`}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) =>
          e.key === "Enter" || e.key === " " ? inputRef.current?.click() : undefined
        }
        aria-label={`${texts.ABOUT.IMAGE_SLOT_LABEL} ${slot + 1}`}
      >
        {hasImage && (
          <Image
            src={currentUrl}
            alt={`${texts.ABOUT.IMAGE_SLOT_LABEL} ${slot + 1}`}
            fill
            className={STYLES.image}
            sizes={CMS_IMAGE_SIZES}
          />
        )}

        {!hasImage && !isUploading && (
          <div className={STYLES.placeholder}>
            <UploadCloud className={STYLES.placeholderIcon} />
            <span className={STYLES.placeholderHint}>{texts.ABOUT.UPLOAD_HINT}</span>
          </div>
        )}

        {hasImage && !isUploading && (
          <div className={STYLES.overlay}>
            <span className={STYLES.overlayBtn}>{texts.ABOUT.CHANGE}</span>
            <button type="button" className={STYLES.overlayBtnRemove} onClick={handleRemove}>
              {texts.ABOUT.REMOVE}
            </button>
          </div>
        )}

        {isUploading && (
          <div className={STYLES.uploading}>
            <div className={STYLES.spinner} />
          </div>
        )}
      </div>

      {error && (
        <p className={STYLES.error} role="alert">
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={CMS_IMAGE_ACCEPT}
        className={STYLES.hiddenInput}
        onChange={handleFileChange}
        aria-hidden="true"
      />
    </div>
  );
}
