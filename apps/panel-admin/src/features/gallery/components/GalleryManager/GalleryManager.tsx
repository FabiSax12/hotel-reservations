"use client";

import { Button, Pagination } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { GalleryItemCard } from "@/features/gallery/components/GalleryItemCard/GalleryItemCard";
import { GalleryItemForm } from "@/features/gallery/components/GalleryItemForm/GalleryItemForm";
import { GALLERY_LOCALES } from "@/features/gallery/config/gallery.constants";
import { useGallery } from "@/features/gallery/hooks/useGallery";
import type { GalleryManagerProps } from "./GalleryManager.interface";

function getPageNumbers(page: number, totalPages: number): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];
  const maxVisible = 7;

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  pages.push(1);
  if (page > 3) pages.push("ellipsis");

  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (page < totalPages - 2) pages.push("ellipsis");
  pages.push(totalPages);

  return pages;
}

export const GalleryManager = ({
  t,
  initialLocale = GALLERY_LOCALES.ES,
}: {
  t: GalleryManagerProps["t"];
  initialLocale?: "es" | "en";
}) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const {
    items,
    isLoading,
    error,
    currentLocale,
    isSaving,
    saveError,
    canAddMore,
    loadGallery,
    uploadImage,
    createItem,
    updateItemContent,
    deleteItem,
    changeLocale,
  } = useGallery(initialLocale);

  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  const handleLocaleChange = useCallback(
    (locale: "es" | "en") => {
      changeLocale(locale);
    },
    [changeLocale],
  );

  const handleUploadImage = useCallback(
    async (file: File) => {
      const result = await uploadImage(file);
      if (result.success && result.url) {
        return { success: true, url: result.url };
      }
      return { success: false, error: result.error };
    },
    [uploadImage],
  );

  const handleCreateItem = useCallback(
    async (imageUrl: string, title: string, description: string) => {
      return createItem(imageUrl, title, description);
    },
    [createItem],
  );

  const handleUpdateItem = useCallback(
    async (itemId: string, title: string, description: string) => {
      return updateItemContent(itemId, title, description);
    },
    [updateItemContent],
  );

  const handleDeleteItem = useCallback(
    async (itemId: string) => {
      return deleteItem(itemId);
    },
    [deleteItem],
  );

  const handleRefresh = useCallback(async () => {
    await loadGallery();
  }, [loadGallery]);

  const pages = Math.ceil(items.length / rowsPerPage);
  const paginatedItems = items.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t.PAGE_TITLE}</h1>
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={currentLocale === GALLERY_LOCALES.ES ? "primary" : "ghost"}
              onPress={() => handleLocaleChange(GALLERY_LOCALES.ES)}
            >
              ES
            </Button>
            <Button
              size="sm"
              variant={currentLocale === GALLERY_LOCALES.EN ? "primary" : "ghost"}
              onPress={() => handleLocaleChange(GALLERY_LOCALES.EN)}
            >
              EN
            </Button>
          </div>
          <Button variant="primary" onPress={() => setIsFormOpen(true)} isDisabled={!canAddMore}>
            {t.ADD_NEW}
          </Button>
        </div>
      </div>

      {!canAddMore && <p className="text-warning text-sm">{t.MAX_ITEMS_WARNING}</p>}

      {error && (
        <div className="text-danger p-4 rounded-lg bg-danger-50">
          <p role="alert">{error}</p>
          <Button size="sm" onPress={handleRefresh} className="mt-2">
            Retry
          </Button>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted">{t.EMPTY_STATE}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paginatedItems.map((item) => (
              <GalleryItemCard
                key={item.item.id}
                item={item}
                locale={currentLocale}
                t={t}
                isSaving={isSaving}
                onUpdate={handleUpdateItem}
                onDelete={handleDeleteItem}
              />
            ))}
          </div>

          {pages > 1 && (
            <Pagination className="justify-center">
              <Pagination.Content>
                <Pagination.Item>
                  <Pagination.Previous
                    isDisabled={page === 1}
                    onPress={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <Pagination.PreviousIcon />
                  </Pagination.Previous>
                </Pagination.Item>

                {getPageNumbers(page, pages).map((p, i) =>
                  p === "ellipsis" ? (
                    <Pagination.Item key={`ellipsis-${i}`}>
                      <Pagination.Ellipsis />
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item key={p}>
                      <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                        {p}
                      </Pagination.Link>
                    </Pagination.Item>
                  ),
                )}

                <Pagination.Item>
                  <Pagination.Next
                    isDisabled={page === pages}
                    onPress={() => setPage((p) => Math.min(pages, p + 1))}
                  >
                    <Pagination.NextIcon />
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          )}
        </>
      )}

      {saveError && <p className="text-danger text-sm">{saveError}</p>}

      <GalleryItemForm
        isOpen={isFormOpen}
        isSaving={isSaving}
        t={t}
        onClose={() => setIsFormOpen(false)}
        onUploadImage={handleUploadImage}
        onSubmit={handleCreateItem}
      />
    </div>
  );
};
