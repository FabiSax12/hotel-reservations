import type { AdminWithPermissions } from "../../services/permissions";

export interface PermissionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  admin: AdminWithPermissions | null;
  onSuccess?: () => void;
}
