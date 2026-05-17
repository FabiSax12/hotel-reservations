import type { InvitationListItem } from "../../domain/invitation.types";

const STATUS_COLORS: Record<string, "warning" | "danger"> = {
  pending: "warning",
  expired: "danger",
};

interface GetStatusInfoOptions {
  invitation: InvitationListItem;
  labels: {
    STATUS_EXPIRED: string | undefined;
    STATUS_PENDING: string | undefined;
  };
}

export function getStatusInfo({ invitation, labels }: GetStatusInfoOptions): {
  color: "warning" | "danger";
  label: string;
} {
  const isExpired = new Date(invitation.expiresAt) < new Date();
  const status = isExpired ? "expired" : invitation.status;
  const color = STATUS_COLORS[status] ?? "warning";
  const label =
    status === "expired"
      ? (labels.STATUS_EXPIRED ?? "Expirada")
      : (labels.STATUS_PENDING ?? "Pendiente");
  return { color, label };
}
