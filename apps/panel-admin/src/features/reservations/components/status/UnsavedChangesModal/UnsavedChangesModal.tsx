"use client";

import {
  Button,
  ModalBackdrop,
  ModalBody,
  ModalContainer,
  ModalDialog,
  ModalFooter,
  ModalHeader,
  ModalHeading,
} from "@heroui/react";
import { useI18n } from "@/locales";
import type { UnsavedChangesModalProps } from "./UnsavedChangesModal.interface";
import { UNSAVED_CHANGES_MODAL_STYLES as S } from "./UnsavedChangesModal.styles";

export const UnsavedChangesModal = ({ isOpen, onStay }: UnsavedChangesModalProps) => {
  const { t } = useI18n();
  const texts = t.RESERVATIONS.UNSAVED_CHANGES_MODAL;

  const handleOpenChange = (_open: boolean) => {
    onStay();
  };

  return (
    <ModalBackdrop isOpen={isOpen} onOpenChange={handleOpenChange}>
      <ModalContainer>
        <ModalDialog>
          <ModalHeader>
            <ModalHeading>{texts.TITLE}</ModalHeading>
          </ModalHeader>
          <ModalBody>
            <p className={S.description}>{texts.DESCRIPTION}</p>
          </ModalBody>
          <ModalFooter className={S.footer}>
            <Button className={S.stayButton} onPress={onStay}>
              {texts.BTN_STAY}
            </Button>
          </ModalFooter>
        </ModalDialog>
      </ModalContainer>
    </ModalBackdrop>
  );
};
