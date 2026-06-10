"use client";

import {
  Button,
  Card,
  Input,
  Label,
  ModalBackdrop,
  ModalBody,
  ModalContainer,
  ModalDialog,
  ModalFooter,
  ModalHeader,
  ModalHeading,
  TextArea,
  TextField,
} from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import type { GalleryItemCardProps } from "../GalleryManager/GalleryManager.interface";

export const GalleryItemCard = ({
  item,
  locale,
  t,
  isSaving,
  onUpdate,
  onDelete,
}: GalleryItemCardProps) => {
  const content = item.content[locale];
  const [title, setTitle] = useState(content?.title || "");
  const [description, setDescription] = useState(content?.description || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSave = async () => {
    setLocalError(null);
    const result = await onUpdate(item.item.id, title, description);
    if (result.success) {
      setIsEditing(false);
    } else {
      setLocalError(result.error || t.ERROR);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await onDelete(item.item.id);
    if (result.success) {
      setIsDeleteOpen(false);
    } else {
      setLocalError(result.error || t.ERROR);
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setTitle(content?.title || "");
    setDescription(content?.description || "");
    setIsEditing(false);
    setLocalError(null);
  };

  return (
    <>
      <Card className="w-full">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-100 mb-3">
          <Image
            src={item.item.image_url}
            alt={content?.title || "Gallery image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>

        {isEditing ? (
          <div className="p-4 space-y-3">
            <TextField value={title} onChange={setTitle}>
              <Label className="text-xs">{t.TITLE}</Label>
              <Input placeholder={t.TITLE_PLACEHOLDER} />
            </TextField>
            <TextField value={description} onChange={setDescription}>
              <Label className="text-xs">{t.DESCRIPTION}</Label>
              <TextArea placeholder={t.DESCRIPTION_PLACEHOLDER} />
            </TextField>
            {localError && <p className="text-danger text-sm">{localError}</p>}
            <div className="flex gap-2">
              <Button size="sm" variant="primary" onPress={handleSave} isPending={isSaving}>
                {t.SAVING}
              </Button>
              <Button size="sm" variant="ghost" onPress={handleCancel} isDisabled={isSaving}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <h4 className="font-medium text-sm">{content?.title || "—"}</h4>
            <p className="text-xs text-muted mt-1 line-clamp-2">{content?.description || "—"}</p>
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="ghost" onPress={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button size="sm" variant="danger" onPress={() => setIsDeleteOpen(true)}>
                {t.DELETE}
              </Button>
            </div>
          </div>
        )}
      </Card>

      <ModalBackdrop isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <ModalContainer>
          <ModalDialog>
            <ModalHeader>
              <ModalHeading>{t.CONFIRM_DELETE_TITLE}</ModalHeading>
            </ModalHeader>
            <ModalBody>
              <p>{t.DELETE_CONFIRM}</p>
              {localError && <p className="text-danger text-sm">{localError}</p>}
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                onPress={() => setIsDeleteOpen(false)}
                isDisabled={isDeleting}
              >
                Cancel
              </Button>
              <Button variant="danger" onPress={handleDelete} isPending={isDeleting}>
                {t.DELETE}
              </Button>
            </ModalFooter>
          </ModalDialog>
        </ModalContainer>
      </ModalBackdrop>
    </>
  );
};
