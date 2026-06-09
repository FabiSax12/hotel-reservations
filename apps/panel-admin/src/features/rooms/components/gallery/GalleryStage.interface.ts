export type LocalImage = {
  id: string;
  url: string;
  isUploading: boolean;
};

export interface UploadDropzoneProps {
  isDisabled: boolean;
  onFilesAdded: (files: FileList) => void;
}

export interface ImageGridProps {
  images: LocalImage[];
  dragIndex: number | null;
  onRemove: (id: string) => void;
  onDragStart: (index: number) => void;
  onDragEnd: () => void;
  onDrop: (index: number) => void;
}

export interface ImageCardProps {
  image: LocalImage;
  index: number;
  isDragging: boolean;
  onRemove: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDrop: () => void;
}
