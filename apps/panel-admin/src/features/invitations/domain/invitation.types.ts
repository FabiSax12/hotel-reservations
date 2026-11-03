export type InvitationStatus = "pending" | "accepted" | "revoked" | "expired";

export interface InvitationListItem {
  id: string;
  email: string;
  status: InvitationStatus;
  createdAt: string;
  expiresAt: string;
}

export type RevokeInvitationResult =
  | { success: true }
  | {
      error:
        | "NOT_FOUND"
        | "ALREADY_REVOKED"
        // J3.3 (J2-POC-7): invitation is not in a revocable state (e.g. already
        // accepted — revoking an accepted invitation used to delete a live admin
        // account instead of invalidating a pending invite).
        | "NOT_PENDING"
        | "UNKNOWN_ERROR";
    };

export type ResendInvitationResult =
  | { success: true }
  | {
      error:
        | "NOT_FOUND"
        | "EXPIRED"
        // J3.3 (J2-POC-7): invitation is not pending (revoked/accepted), so it
        // should not be reactivated by resending a new activation email.
        | "NOT_PENDING"
        | "UNKNOWN_ERROR";
    };

export type CreateInvitationActionState =
  | null
  | { success: true; email: string }
  | { error: string };
