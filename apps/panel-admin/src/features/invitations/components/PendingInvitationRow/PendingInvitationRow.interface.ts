import type { InvitationListItem } from "../../domain/invitation.types";

export interface PendingInvitationRowProps {
  invitation: InvitationListItem;
  onResend: (id: string) => void;
  onRevoke: (id: string) => void;
  isResending: string | null;
  isRevoking: string | null;
  getStatusInfo: (opts: {
    invitation: InvitationListItem;
    labels: {
      STATUS_EXPIRED: string | undefined;
      STATUS_PENDING: string | undefined;
    };
  }) => { color: "warning" | "danger"; label: string };
}
