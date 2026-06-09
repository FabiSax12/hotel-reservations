import type { ImageGridProps } from "../GalleryStage.interface";
import { GALLERY_STYLES as S } from "../GalleryStage.styles";
import { ImageCard } from "./ImageCard";

export const ImageGrid = ({
  images,
  dragIndex,
  onRemove,
  onDragStart,
  onDragEnd,
  onDrop,
}: ImageGridProps) => {
  if (images.length === 0) return null;

  return (
    <div className={S.grid}>
      {images.map((image, index) => (
        <ImageCard
          key={image.id}
          image={image}
          index={index}
          isDragging={dragIndex === index}
          onRemove={() => onRemove(image.id)}
          onDragStart={() => onDragStart(index)}
          onDragEnd={onDragEnd}
          onDrop={() => onDrop(index)}
        />
      ))}
    </div>
  );
};
