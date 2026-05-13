"use client";

import { Button, ButtonGroup, Chip, EmptyState, Table } from "@heroui/react";
import { Check, Inbox, X } from "lucide-react";
import type { AdminsTableProps } from "./AdminsTable.interface";
import { TABLE_STYLES } from "./AdminsTable.styles";

export const AdminsTable = ({ admins, onToggle, togglingId }: AdminsTableProps) => {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" className={TABLE_STYLES.content}>
          <Table.Header>
            <Table.Column isRowHeader>Name</Table.Column>
            <Table.Column isRowHeader>Email</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Role</Table.Column>
            {/* <Table.Column>Created At</Table.Column> */}
            <Table.Column>Actions</Table.Column>
          </Table.Header>
          <Table.Body
            renderEmptyState={() => (
              <EmptyState className={TABLE_STYLES.emptyState}>
                <Inbox className="size-6 text-muted" />
                <span className="text-sm text-muted">No results found</span>
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
                      Activo
                    </Chip>
                  ) : (
                    <Chip variant="primary" color="danger">
                      Inactivo
                    </Chip>
                  )}
                </Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                {/* <Table.Cell>{user.created_at}</Table.Cell> */}
                <Table.Cell>
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
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};
