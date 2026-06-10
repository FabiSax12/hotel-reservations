"use client";

import {
  Button,
  Input,
  Label,
  ModalBackdrop,
  ModalBody,
  ModalContainer,
  ModalDialog,
  ModalFooter,
  ModalHeader,
  ModalHeading,
  TextArea,
  TextField,
} from "@heroui/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { GALLERY_IMAGE_ACCEPT } from "@/features/gallery/config/gallery.constants";
import type { GalleryItemFormProps } from "../GalleryManager/GalleryManager.interface";

export const GalleryItemForm = ({
  isOpen,
  isSaving,
  t,
  onClose,
  onUploadImage,
  onSubmit,
}: GalleryItemFormProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setError(null);

      if (file.size > 5 * 1024 * 1024) {
        setError(t.ERROR_SIZE);
        return;
      }

      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setError(t.ERROR_TYPE);
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      setIsUploading(true);
      const result = await onUploadImage(file);
      setIsUploading(false);

      if (!result.success) {
        setError(result.error || t.ERROR_SIZE);
        URL.revokeObjectURL(objectUrl);
        setPreviewUrl(null);
      } else if (result.url) {
        setUploadedUrl(result.url);
      }
    },
    [onUploadImage, t.ERROR_SIZE, t.ERROR_TYPE],
  );

  const handleSubmit = async () => {
    if (!uploadedUrl) {
      setError("Please upload an image");
      return;
    }

    setError(null);
    const result = await onSubmit(uploadedUrl, title, description);
    if (!result.success) {
      setError(result.error || "Unknown error");
    } else {
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setUploadedUrl(null);
    setTitle("");
    setDescription("");
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <ModalBackdrop isOpen={isOpen} onOpenChange={handleClose}>
      <ModalContainer>
        <ModalDialog>
          <ModalHeader>
            <ModalHeading>{t.UPLOAD_IMAGE}</ModalHeading>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-default-200 rounded-lg p-6">
                {previewUrl ? (
                  <div className="relative aspect-[4/5] w-full max-w-[200px] overflow-hidden rounded-lg">
                    <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                    <Button
                      size="sm"
                      className="absolute top-2 right-2"
                      variant="danger"
                      onPress={() => {
                        URL.revokeObjectURL(previewUrl);
                        setPreviewUrl(null);
                        setUploadedUrl(null);
                      }}
                    >
                      ×
                    </Button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center gap-2 text-muted">
                    <div className="w-20 h-20 rounded-full bg-default-100 flex items-center justify-center">
                      <span className="text-3xl">+</span>
                    </div>
                    <span className="text-sm">{t.UPLOAD_IMAGE}</span>
                    <input
                      type="file"
                      accept={GALLERY_IMAGE_ACCEPT}
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={isUploading || isSaving}
                    />
                  </label>
                )}
              </div>

              {isUploading && <p className="text-sm text-muted">Uploading...</p>}

              <TextField value={title} onChange={setTitle} isDisabled={isSaving}>
                <Label>{t.TITLE}</Label>
                <Input placeholder={t.TITLE_PLACEHOLDER} />
              </TextField>

              <TextField value={description} onChange={setDescription} isDisabled={isSaving}>
                <Label>{t.DESCRIPTION}</Label>
                <TextArea placeholder={t.DESCRIPTION_PLACEHOLDER} />
              </TextField>

              {error && <p className="text-danger text-sm">{error}</p>}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onPress={handleClose} isDisabled={isSaving}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onPress={handleSubmit}
              isPending={isSaving || isUploading}
              isDisabled={!uploadedUrl}
            >
              {t.UPLOAD_IMAGE}
            </Button>
          </ModalFooter>
        </ModalDialog>
      </ModalContainer>
    </ModalBackdrop>
  );
};
