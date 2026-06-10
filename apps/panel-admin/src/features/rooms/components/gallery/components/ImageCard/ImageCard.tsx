import Image from "next/image";
import { Button, Spinner } from "@heroui/react";
import { X } from "lucide-react";
import { GALLERY_CONFIG } from "@/features/rooms/constants/gallery.constants";
import type { ImageCardProps } from "./ImageCard.interface";
import { IMAGE_CARD_STYLES as STYLES } from "./ImageCard.styles";

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
    className={STYLES.wrapper(image.isUploading, isDragging)}
    onDragStart={onDragStart}
    onDragOver={(e) => e.preventDefault()}
    onDrop={onDrop}
    onDragEnd={onDragEnd}
  >
    <Image
      src={image.url}
      alt=""
      fill
      className={STYLES.image}
      sizes={GALLERY_CONFIG.IMAGE_SIZES}
      unoptimized
    />

    {image.isUploading && (
      <div className={STYLES.spinner}>
        <Spinner color="current" size="lg" />
      </div>
    )}

    {!image.isUploading && (
      <Button
        isIconOnly
        className={STYLES.removeBtn}
        aria-label={removeLabel}
        onPress={() => onRemove()}
      >
        <X className={STYLES.isUploading} />
      </Button>
    )}

    {index === 0 && <span className={STYLES.principalBadge}>{principalLabel}</span>}
  </div>
);
