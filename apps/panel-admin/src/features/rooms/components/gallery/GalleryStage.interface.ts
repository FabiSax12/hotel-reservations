export interface GalleryStageProps {
  roomId: string;
  onSuccess?: () => void;
}

export type LocalImage = {
  id: string;
  url: string;
  isUploading: boolean;
};

export interface UploadDropzoneProps {
  isDisabled: boolean;
  label: string;
  hint: string;
  onFilesAdded: (files: FileList) => void;
}

export interface ImageGridProps {
  images: LocalImage[];
  dragIndex: number | null;
  removeLabel: string;
  principalLabel: string;
  onRemove: (id: string) => void;
  onDragStart: (index: number) => void;
  onDragEnd: () => void;
  onDrop: (index: number) => void;
}

export interface ImageCardProps {
  image: LocalImage;
  index: number;
  isDragging: boolean;
  removeLabel: string;
  principalLabel: string;
  onRemove: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDrop: () => void;
}
