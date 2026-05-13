import { Button, ButtonGroup, Chip, Table } from "@heroui/react";
import { RotateCcw, X } from "lucide-react";
import { useI18n } from "@/locales";
import { formatDate } from "../../utils/formatDate";
import type { PendingInvitationRowProps } from "./PendingInvitationRow.interface";

export function PendingInvitationRow({
  invitation,
  onResend,
  onRevoke,
  isResending,
  isRevoking,
  getStatusInfo,
}: PendingInvitationRowProps) {
  const { t } = useI18n();

  const { color, label } = getStatusInfo({
    invitation,
    labels: {
      STATUS_EXPIRED: t.ADMINS.INVITATIONS.STATUS_EXPIRED,
      STATUS_PENDING: t.ADMINS.INVITATIONS.STATUS_PENDING,
    },
  });

  return (
    <Table.Row key={invitation.id}>
      <Table.Cell>{invitation.email}</Table.Cell>
      <Table.Cell>{formatDate(invitation.createdAt)}</Table.Cell>
      <Table.Cell>{formatDate(invitation.expiresAt)}</Table.Cell>
      <Table.Cell>
        <Chip variant="soft" color={color}>
          {label}
        </Chip>
      </Table.Cell>
      <Table.Cell>
        <ButtonGroup>
          <Button
            isIconOnly
            size="sm"
            isDisabled={isResending === invitation.id}
            onPress={() => onResend(invitation.id)}
            aria-label={t.ADMINS.INVITATIONS.ACTION_RESEND}
            variant="primary"
          >
            <RotateCcw className="size-4" />
          </Button>
          <Button
            isIconOnly
            size="sm"
            isDisabled={isRevoking === invitation.id}
            onPress={() => onRevoke(invitation.id)}
            aria-label={t.ADMINS.INVITATIONS.ACTION_REVOKE}
            variant="danger"
          >
            <X className="size-4" />
          </Button>
        </ButtonGroup>
      </Table.Cell >
    </Table.Row >
  );
}
