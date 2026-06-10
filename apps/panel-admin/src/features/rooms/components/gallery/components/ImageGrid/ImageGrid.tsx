import { ImageCard } from "../ImageCard";
import type { ImageGridProps } from "./ImageGrid.interface";
import { IMAGE_GRID_STYLES as STYLES } from "./ImageGrid.styles";

export const ImageGrid = ({
  images,
  dragIndex,
  removeLabel,
  principalLabel,
  onRemove,
  onDragStart,
  onDragEnd,
  onDrop,
}: ImageGridProps) => {
  if (images.length === 0) return null;

  return (
    <div className={STYLES.grid}>
      {images.map((image, index) => (
        <ImageCard
          key={image.id}
          image={image}
          index={index}
          isDragging={dragIndex === index}
          removeLabel={removeLabel}
          principalLabel={principalLabel}
          onRemove={() => onRemove(image.id)}
          onDragStart={() => onDragStart(index)}
          onDragEnd={onDragEnd}
          onDrop={() => onDrop(index)}
        />
      ))}
    </div>
  );
};
