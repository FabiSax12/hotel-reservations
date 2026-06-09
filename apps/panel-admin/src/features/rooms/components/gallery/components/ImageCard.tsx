import Image from "next/image";
import { GALLERY_CONFIG } from "@/features/rooms/constants/gallery.constants";
import type { ImageCardProps } from "../GalleryStage.interface";
import { CARD_STYLES as S } from "../GalleryStage.styles";

export const ImageCard = ({
  image,
  index,
  isDragging,
  removeLabel,
  principalLabel,
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
      sizes={GALLERY_CONFIG.IMAGE_SIZES}
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
        aria-label={removeLabel}
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
      >
        ✕
      </button>
    )}

    {index === 0 && <span className={S.principalBadge}>{principalLabel}</span>}
  </div>
);
