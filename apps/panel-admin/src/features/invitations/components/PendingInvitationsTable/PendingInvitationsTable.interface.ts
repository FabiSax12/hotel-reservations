import type { InvitationListItem } from "../../domain/invitation.types";

export interface PendingInvitationsTableProps {
  invitations: InvitationListItem[];
  onRevoke: (id: string) => void;
  onResend: (id: string) => void;
  isRevoking: string | null;
  isResending: string | null;
  onCreateSuccess?: () => void;
}
