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
  | { error: "NOT_FOUND" | "ALREADY_REVOKED" | "UNKNOWN_ERROR" };

export type ResendInvitationResult =
  | { success: true }
  | { error: "NOT_FOUND" | "EXPIRED" | "UNKNOWN_ERROR" };

export type CreateInvitationActionState =
  | null
  | { success: true; email: string }
  | { error: string };
