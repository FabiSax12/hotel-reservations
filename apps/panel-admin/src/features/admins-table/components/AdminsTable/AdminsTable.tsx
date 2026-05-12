"use client"

import { Chip, EmptyState, Table } from "@heroui/react";
import { Inbox } from "lucide-react"
import type { AdminsTableProps } from "./AdminsTable.interface";

export const AdminsTable = ({ admins }: AdminsTableProps) => {
    return (

        <Table>
            <Table.ScrollContainer>
                <Table.Content aria-label="Team members" className="min-w-150">
                    <Table.Header>
                        <Table.Column isRowHeader>Name</Table.Column>
                        <Table.Column isRowHeader>Email</Table.Column>
                        <Table.Column>Status</Table.Column>
                        <Table.Column>Role</Table.Column>
                        {/* <Table.Column>Created At</Table.Column> */}
                    </Table.Header>
                    <Table.Body
                        renderEmptyState={() => (
                            <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                                <Inbox className="size-6 text-muted" />
                                <span className="text-sm text-muted">No results found</span>
                            </EmptyState>
                        )}
                    >
                        {admins?.map((user) => (
                            <Table.Row key={user.id}>
                                <Table.Cell>{user.full_name}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.is_active ? <Chip variant="primary" color="success">Activo</Chip> : <Chip variant="primary" color="danger">Inactivo</Chip>}</Table.Cell>
                                <Table.Cell>{user.role}</Table.Cell>
                                {/* <Table.Cell>{user.created_at}</Table.Cell> */}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>

    );
};
