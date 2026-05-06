"use client";

import {
  Modal,
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  ModalHeader,
  ModalHeading,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useI18n } from "@/locales";
import { UNSAVED_CHANGES_MODAL_STYLES as S } from "./UnsavedChangesModal.styles";
import type { UnsavedChangesModalProps } from "./UnsavedChangesModal.interface";

export const UnsavedChangesModal = ({ isOpen, onStay }: UnsavedChangesModalProps) => {
  const { t } = useI18n();
  const texts = t.RESERVATIONS.UNSAVED_CHANGES_MODAL;

  const handleOpenChange = (_open: boolean) => {
    onStay();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
      <ModalBackdrop isDismissable={false} isKeyboardDismissDisabled>
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
    </Modal>
  );
};
