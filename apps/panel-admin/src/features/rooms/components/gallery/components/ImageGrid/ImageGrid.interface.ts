import type { LocalImage } from "@/features/rooms/domain/roomImage.interface";

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
