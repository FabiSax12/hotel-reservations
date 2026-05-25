"use client";

import { Button, ButtonGroup, Chip, EmptyState, Table } from "@heroui/react";
import { Check, Inbox, X } from "lucide-react";
import { useI18n } from "@/locales";
import type { AdminsTableProps } from "./AdminsTable.interface";
import { TABLE_STYLES } from "./AdminsTable.styles";

export const AdminsTable = ({ admins, onToggle, togglingId }: AdminsTableProps) => {
  const { t } = useI18n();

  const TABLE_TEXTS = t.ADMINS.TABLE;

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label={TABLE_TEXTS.COL_NAME} className={TABLE_STYLES.content}>
          <Table.Header>
            <Table.Column isRowHeader>{TABLE_TEXTS.COL_NAME}</Table.Column>
            <Table.Column isRowHeader>{TABLE_TEXTS.COL_EMAIL}</Table.Column>
            <Table.Column>{TABLE_TEXTS.COL_STATUS}</Table.Column>
            <Table.Column>{TABLE_TEXTS.COL_ROLE}</Table.Column>
            {/* <Table.Column>Created At</Table.Column> */}
            <Table.Column>{TABLE_TEXTS.COL_ACTIONS}</Table.Column>
          </Table.Header>
          <Table.Body
            renderEmptyState={() => (
              <EmptyState className={TABLE_STYLES.emptyState}>
                <Inbox className={TABLE_STYLES.emptyStateIcon} />
                <span className={TABLE_STYLES.emptyStateText}>{TABLE_TEXTS.NO_RESULTS}</span>
              </EmptyState>
            )}
          >
            {admins?.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.full_name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  {user.is_active ? (
                    <Chip variant="primary" color="success">
                      {TABLE_TEXTS.STATUS_ACTIVE}
                    </Chip>
                  ) : (
                    <Chip variant="primary" color="danger">
                      {TABLE_TEXTS.STATUS_INACTIVE}
                    </Chip>
                  )}
                </Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                {/* <Table.Cell>{user.created_at}</Table.Cell> */}
                <Table.Cell>
                  {user.role !== "owner" && (
                    <ButtonGroup isDisabled={togglingId === user.id}>
                      <Button
                        variant="danger"
                        isIconOnly
                        isDisabled={!user.is_active}
                        onPress={() => onToggle(user.id, user.is_active)}
                      >
                        <X />
                      </Button>
                      <Button
                        variant="primary"
                        isIconOnly
                        isDisabled={user.is_active}
                        onPress={() => onToggle(user.id, user.is_active)}
                      >
                        <Check />
                      </Button>
                    </ButtonGroup>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};
