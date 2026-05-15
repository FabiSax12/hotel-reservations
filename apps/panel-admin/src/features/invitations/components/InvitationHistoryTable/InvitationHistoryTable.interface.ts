import type { PendingInvitation } from "@hotel/db";

export interface InvitationHistoryTableProps {
  invitations: PendingInvitation[];
  onResend: (id: string) => void;
  isResending: string | null;
}
