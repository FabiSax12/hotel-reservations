import type { GalleryItemWithContent } from "@/features/gallery/domain/gallery.interface";

export interface GalleryManagerProps {
  items: GalleryItemWithContent[];
  isLoading: boolean;
  error: string | null;
  currentLocale: "es" | "en";
  isSaving: boolean;
  saveError: string | null;
  canAddMore: boolean;
  maxItems: number;
  t: {
    PAGE_TITLE: string;
    ADD_NEW: string;
    EMPTY_STATE: string;
    MAX_ITEMS_WARNING: string;
    TITLE: string;
    TITLE_PLACEHOLDER: string;
    DESCRIPTION: string;
    DESCRIPTION_PLACEHOLDER: string;
    DELETE_CONFIRM: string;
    DELETE: string;
    UPLOAD_IMAGE: string;
    CHANGE_IMAGE: string;
    IMAGE_PREVIEW: string;
    SAVING: string;
    SUCCESS: string;
    ERROR: string;
    ERROR_SIZE: string;
    ERROR_TYPE: string;
    ERROR_MAX_ITEMS: string;
    ERROR_UPLOAD: string;
    CONFIRM_DELETE_TITLE: string;
  };
  onLocaleChange: (locale: "es" | "en") => void;
  onUploadImage: (file: File) => Promise<{ success: boolean; url?: string; error?: string }>;
  onCreateItem: (
    imageUrl: string,
    title: string,
    description: string,
  ) => Promise<{ success: boolean; error?: string }>;
  onUpdateItem: (
    itemId: string,
    title: string,
    description: string,
  ) => Promise<{ success: boolean; error?: string }>;
  onDeleteItem: (itemId: string) => Promise<{ success: boolean; error?: string }>;
  onRefresh: () => Promise<void>;
}

export interface GalleryItemCardProps {
  item: GalleryItemWithContent;
  locale: "es" | "en";
  t: GalleryManagerProps["t"];
  isSaving: boolean;
  onUpdate: (
    itemId: string,
    title: string,
    description: string,
  ) => Promise<{ success: boolean; error?: string }>;
  onDelete: (itemId: string) => Promise<{ success: boolean; error?: string }>;
}

export interface GalleryItemFormProps {
  isOpen: boolean;
  isSaving: boolean;
  t: GalleryManagerProps["t"];
  onClose: () => void;
  onUploadImage: (file: File) => Promise<{ success: boolean; url?: string; error?: string }>;
  onSubmit: (
    imageUrl: string,
    title: string,
    description: string,
  ) => Promise<{ success: boolean; error?: string }>;
}
