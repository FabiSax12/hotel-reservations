import { useState } from "react";
import { GALLERY_CONFIG } from "@/features/rooms/constants/gallery.constants";
import { useI18n } from "@/locales";
import type { LocalImage } from "../GalleryStage.interface";
import * as galleryService from "../../../services/galleryActions";

export const useGalleryStage = (roomId: string, onSuccess?: () => void) => {
  const { t } = useI18n();
  const texts = t.ROOMS.GALLERY;

  const [images, setImages] = useState<LocalImage[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesAdded = async (files: FileList) => {
    setError(null);
    const incoming = Array.from(files);

    if (images.length + incoming.length > GALLERY_CONFIG.MAX_IMAGES) {
      setError(texts.ERROR_MAX_IMAGES);
      return;
    }

    for (const file of incoming) {
      if (file.size > GALLERY_CONFIG.MAX_SIZE_BYTES) {
        setError(`"${file.name}" ${texts.ERROR_FILE_SIZE}`);
        return;
      }
      if (!(GALLERY_CONFIG.ACCEPTED_TYPES as readonly string[]).includes(file.type)) {
        setError(`"${file.name}" ${texts.ERROR_FILE_TYPE}`);
        return;
      }
    }

    for (const file of incoming) {
      const tempId = crypto.randomUUID();
      const previewUrl = URL.createObjectURL(file);
      setImages((prev) => [...prev, { id: tempId, url: previewUrl, isUploading: true }]);

      const result = await galleryService.uploadImage(roomId, file);

      if (!result) {
        setImages((prev) => prev.filter((img) => img.id !== tempId));
        URL.revokeObjectURL(previewUrl);
        setError(texts.ERROR_UPLOAD);
        continue;
      }

      URL.revokeObjectURL(previewUrl);
      setImages((prev) =>
        prev.map((img) =>
          img.id === tempId ? { id: result.id, url: result.url, isUploading: false } : img,
        ),
      );
    }
  };

  const handleRemove = async (id: string) => {
    setError(null);
    setImages((prev) => prev.filter((img) => img.id !== id));
    await galleryService.deleteImage(id);
  };

  const handleDragStart = (index: number) => setDragIndex(index);

  const handleDragEnd = () => setDragIndex(null);

  const handleDrop = async (toIndex: number) => {
    if (dragIndex === null || dragIndex === toIndex) return;
    const reordered = [...images];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(toIndex, 0, moved);
    setImages(reordered);
    setDragIndex(null);
    await galleryService.reorderImages(reordered.map((img) => img.id));
  };

  const handleSubmit = () => onSuccess?.();

  const handleCancel = () => window.history.back();

  return {
    images,
    dragIndex,
    error,
    texts,
    isMaxReached: images.length >= GALLERY_CONFIG.MAX_IMAGES,
    isSubmitDisabled: images.length === 0 || images.some((img) => img.isUploading),
    handleFilesAdded,
    handleRemove,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleSubmit,
    handleCancel,
  };
};
