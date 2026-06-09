import type { LocalImage } from "@/features/rooms/domain/roomImage.interface";

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
