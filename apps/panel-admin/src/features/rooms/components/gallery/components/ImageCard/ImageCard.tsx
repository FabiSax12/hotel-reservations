import Image from "next/image";
import { Button, Spinner } from "@heroui/react";
import { X } from "lucide-react";
import { GALLERY_CONFIG } from "@/features/rooms/constants/gallery.constants";
import type { ImageCardProps } from "./ImageCard.interface";
import { IMAGE_CARD_STYLES as S } from "./ImageCard.styles";

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
        <Spinner color="current" size="lg" />
      </div>
    )}

    {!image.isUploading && (
      <Button
        isIconOnly
        className={S.removeBtn}
        aria-label={removeLabel}
        onPress={() => onRemove()}
      >
        <X className="w-5 h-5" />
      </Button>
    )}

    {index === 0 && <span className={S.principalBadge}>{principalLabel}</span>}
  </div>
);
