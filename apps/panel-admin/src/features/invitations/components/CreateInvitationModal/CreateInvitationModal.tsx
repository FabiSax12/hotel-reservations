import { Modal } from "@heroui/react";
import { createAdminAccountAction } from "@/features/invitations/services/createAdminAccountAction";
import { CreateAdminForm } from "../CreateAdminForm/CreateAdminForm";

export const CreateInvitationModal = () => {
    return (
        <Modal>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog>
                        <Modal.Body>
                            <CreateAdminForm action={createAdminAccountAction} />

                        </Modal.Body>

                    </Modal.Dialog>

                </Modal.Container>

            </Modal.Backdrop>
        </Modal>
    )
}