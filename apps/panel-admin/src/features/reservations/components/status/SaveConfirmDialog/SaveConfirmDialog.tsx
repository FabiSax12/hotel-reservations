"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  AlertDialogBackdrop,
  AlertDialogContainer,
  AlertDialogDialog,
  AlertDialogHeader,
  AlertDialogHeading,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@heroui/react";
import { useI18n } from "@/locales";
import { SAVE_CONFIRM_DIALOG_STYLES as S } from "./SaveConfirmDialog.styles";
import type { SaveConfirmDialogProps } from "./SaveConfirmDialog.interface";

export const SaveConfirmDialog = ({ isOpen, onConfirm, onCancel }: SaveConfirmDialogProps) => {
  const { t } = useI18n();
  const texts = t.RESERVATIONS.SAVE_DIALOG;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!open) onCancel();
  };

  const dialogContent = (
    <AlertDialogBackdrop isOpen={isOpen} onOpenChange={handleOpenChange} isDismissable={false} isKeyboardDismissDisabled>
      <AlertDialogContainer>
        <AlertDialogDialog>
          <AlertDialogHeader>
            <AlertDialogHeading>{texts.TITLE}</AlertDialogHeading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <p className={S.description}>{texts.DESCRIPTION}</p>
          </AlertDialogBody>
          <AlertDialogFooter className={S.footer}>
            <Button className={S.cancelButton} onPress={onCancel}>
              {texts.BTN_CANCEL}
            </Button>
            <Button className={S.confirmButton} onPress={onConfirm}>
              {texts.BTN_CONFIRM}
            </Button>
          </AlertDialogFooter>
        </AlertDialogDialog>
      </AlertDialogContainer>
    </AlertDialogBackdrop>
  );

  if (!isMounted) return null;
  return createPortal(dialogContent, document.body);
};
