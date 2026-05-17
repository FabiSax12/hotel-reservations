import { Button, Modal } from "@heroui/react";
import { createAdminAccountAction } from "@/features/invitations/services/createAdminAccountAction";
import { useI18n } from "@/locales";
import { CreateAdminForm } from "../CreateAdminForm/CreateAdminForm";

export const CreateInvitationModal = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { t } = useI18n();

  return (
    <Modal>
      <Button size="sm">{t.ADMINS.INVITATIONS.INVITE}</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Body>
              <CreateAdminForm action={createAdminAccountAction} onSuccess={onSuccess} />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
