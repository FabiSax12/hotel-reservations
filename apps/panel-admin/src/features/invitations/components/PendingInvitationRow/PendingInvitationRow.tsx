import { Button, ButtonGroup, Chip, Table } from "@heroui/react";
import { DB_ENUMS } from "@hotel/db";
import { RotateCcw, X } from "lucide-react";
import { useI18n } from "@/locales";
import { PermissionGuard } from "@/shared/components/PermissionGuard/PermissionGuard";
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
          <PermissionGuard permissions={[DB_ENUMS.user_permission.admins_invite]}>
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
          </PermissionGuard>
          <PermissionGuard permissions={[DB_ENUMS.user_permission.admins_revoke]}>
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
          </PermissionGuard>
        </ButtonGroup>
      </Table.Cell>
    </Table.Row>
  );
}
