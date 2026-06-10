"use client";

import { useCallback, useState } from "react";
import { GALLERY_MAX_ITEMS } from "@/features/gallery/config/gallery.constants";
import type {
  GalleryItemWithContent,
  GalleryLocale,
  UploadGalleryImageResult,
} from "@/features/gallery/domain/gallery.interface";
import {
  createGalleryItemAction,
  deleteGalleryItemAction,
  updateGalleryItemContentAction,
  uploadGalleryImageAction,
} from "@/features/gallery/services/galleryActions";
import { galleryService } from "@/features/gallery/services/galleryService";
import { useI18n } from "@/locales";

interface UseGalleryState {
  items: GalleryItemWithContent[];
  isLoading: boolean;
  error: string | null;
}

export const useGallery = (initialLocale: GalleryLocale) => {
  const [state, setState] = useState<UseGalleryState>({
    items: [],
    isLoading: true,
    error: null,
  });
  const [currentLocale, setCurrentLocale] = useState<GalleryLocale>(initialLocale);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const { t } = useI18n();
  const TEXTS = t.CMS?.GALLERY_ADMIN;

  const loadGallery = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const items = await galleryService.getGalleryItems(currentLocale);
      setState({ items, isLoading: false, error: null });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Unknown error",
      }));
    }
  }, [currentLocale]);

  const uploadImage = useCallback(async (file: File): Promise<UploadGalleryImageResult> => {
    const formData = new FormData();
    formData.append("file", file);
    return uploadGalleryImageAction(formData);
  }, []);

  const createItem = useCallback(
    async (imageUrl: string, title: string, description: string) => {
      setIsSaving(true);
      setSaveError(null);
      try {
        const result = await createGalleryItemAction(imageUrl, title, description, currentLocale);
        if (!result.success) {
          setSaveError(result.error || "Unknown error");
          return result;
        }
        await loadGallery();
        return result;
      } finally {
        setIsSaving(false);
      }
    },
    [currentLocale, loadGallery],
  );

  const updateItemContent = useCallback(
    async (itemId: string, title: string, description: string) => {
      setIsSaving(true);
      setSaveError(null);
      try {
        const result = await updateGalleryItemContentAction(
          itemId,
          title,
          description,
          currentLocale,
        );
        if (!result.success) {
          setSaveError(result.error || "Unknown error");
          return result;
        }
        await loadGallery();
        return result;
      } finally {
        setIsSaving(false);
      }
    },
    [currentLocale, loadGallery],
  );

  const deleteItem = useCallback(
    async (itemId: string) => {
      setIsSaving(true);
      setSaveError(null);
      try {
        const result = await deleteGalleryItemAction(itemId);
        if (!result.success) {
          setSaveError(result.error || "Unknown error");
          return result;
        }
        await loadGallery();
        return result;
      } finally {
        setIsSaving(false);
      }
    },
    [loadGallery],
  );

  const changeLocale = useCallback((locale: GalleryLocale) => {
    setCurrentLocale(locale);
  }, []);

  const canAddMore = state.items.length < GALLERY_MAX_ITEMS;

  return {
    items: state.items,
    isLoading: state.isLoading,
    error: state.error,
    currentLocale,
    isSaving,
    saveError,
    canAddMore,
    maxItems: GALLERY_MAX_ITEMS,
    TEXTS,
    loadGallery,
    uploadImage,
    createItem,
    updateItemContent,
    deleteItem,
    changeLocale,
  };
};
