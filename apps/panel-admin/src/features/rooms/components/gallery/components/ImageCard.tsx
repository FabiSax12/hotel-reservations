import Image from "next/image";
import type { ImageCardProps } from "../GalleryStage.interface";
import { CARD_STYLES as S } from "../GalleryStage.styles";

export const ImageCard = ({
  image,
  index,
  isDragging,
  onRemove,
  onDragStart,
  onDragEnd,
  onDrop,
}: ImageCardProps) => (
  <div
    draggable={!image.isUploading}
    className={S.wrapper(image.isUploading, isDragging)}
    onDragStart={onDragStart}
    onDragOver={(e) => e.preventDefault()}
    onDrop={onDrop}
    onDragEnd={onDragEnd}
  >
    <Image
      src={image.url}
      alt=""
      fill
      className={S.image}
      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
      unoptimized
    />

    {image.isUploading && (
      <div className={S.spinner}>
        <div className={S.spinnerInner} />
      </div>
    )}

    {!image.isUploading && (
      <button
        type="button"
        className={S.removeBtn}
        aria-label="Eliminar imagen"
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
      >
        ✕
      </button>
    )}

    {index === 0 && <span className={S.principalBadge}>Principal</span>}
  </div>
);
