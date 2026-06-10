export interface GalleryItemFormProps {
  isOpen: boolean;
  isSaving: boolean;
  t: {
    TITLE: string;
    TITLE_PLACEHOLDER: string;
    DESCRIPTION: string;
    DESCRIPTION_PLACEHOLDER: string;
    UPLOAD_IMAGE: string;
    ERROR_SIZE: string;
    ERROR_TYPE: string;
  };
  onClose: () => void;
  onUploadImage: (file: File) => Promise<{ success: boolean; url?: string; error?: string }>;
  onSubmit: (
    imageUrl: string,
    title: string,
    description: string,
  ) => Promise<{ success: boolean; error?: string }>;
}
