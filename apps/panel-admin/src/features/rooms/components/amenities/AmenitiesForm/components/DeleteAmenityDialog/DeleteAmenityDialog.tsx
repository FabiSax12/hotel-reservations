import { AlertDialog, Button } from "@heroui/react";
import type React from "react";
import type { DeleteAmenityDialogProps } from "./DeleteAmenityDialog.interface";
import { DELETE_AMENITY_DIALOG_STYLES as s } from "./DeleteAmenityDialog.styles";

export const DeleteAmenityDialog: React.FC<DeleteAmenityDialogProps> = ({
  amenity,
  onOpenChange,
  onConfirm,
  texts,
}) => {
  return (
    <AlertDialog.Backdrop isOpen={!!amenity} onOpenChange={onOpenChange}>
      <AlertDialog.Container>
        <AlertDialog.Dialog className={s.dialog}>
          <AlertDialog.CloseTrigger />
          <AlertDialog.Header>
            <AlertDialog.Icon status="danger" />
            <AlertDialog.Heading>{texts.AMENITIES.DELETE_WARNING_TITLE}</AlertDialog.Heading>
          </AlertDialog.Header>
          <AlertDialog.Body>
            <p>
              {texts.AMENITIES.DELETE_WARNING_DESCRIPTION.replace("{name}", amenity?.name || "")}
            </p>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button slot="close" variant="tertiary">
              {texts.AMENITIES.DELETE_WARNING_CANCEL}
            </Button>
            <Button slot="close" variant="danger" onPress={onConfirm}>
              {texts.AMENITIES.DELETE_WARNING_CONFIRM}
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  );
};
