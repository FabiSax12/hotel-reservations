import { useState } from "react";
import * as galleryService from "../services/galleryMockService";

export type LocalImage = {
  id: string;
  url: string;
  isUploading: boolean;
};

const ROOM_ID = "new-room-id";

export const useGalleryStage = () => {
  const [images, setImages] = useState<LocalImage[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesAdded = async (files: FileList) => {
    setError(null);
    const incoming = Array.from(files);

    if (images.length + incoming.length > 10) {
      setError("Solo podés subir hasta 10 imágenes.");
      return;
    }

    for (const file of incoming) {
      if (file.size > 5 * 1024 * 1024) {
        setError(`"${file.name}" supera el límite de 5 MB.`);
        return;
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setError(`"${file.name}" tiene un formato no permitido. Usá JPG, PNG o WebP.`);
        return;
      }
    }

    for (const file of incoming) {
      const tempId = crypto.randomUUID();
      const previewUrl = URL.createObjectURL(file);
      setImages((prev) => [...prev, { id: tempId, url: previewUrl, isUploading: true }]);

      const result = await galleryService.uploadImage(ROOM_ID, file);

      if (!result) {
        setImages((prev) => prev.filter((img) => img.id !== tempId));
        URL.revokeObjectURL(previewUrl);
        setError("No se pudo subir la imagen. Intentá de nuevo.");
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

  return {
    images,
    dragIndex,
    error,
    isMaxReached: images.length >= 10,
    handleFilesAdded,
    handleRemove,
    handleDragStart,
    handleDragEnd,
    handleDrop,
  };
};
