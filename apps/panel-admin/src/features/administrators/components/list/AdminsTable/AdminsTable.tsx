"use client";

import { Table } from "@heroui/react";
import { useI18n } from "@/locales";
import { AdminsTableRow } from "../AdminsTableRow/AdminsTableRow";
import { ADMINS_TABLE_STYLES as T } from "./AdminsTable.styles";
import type { AdminsTableProps } from "./AdminsTable.interfaces";

export const AdminsTable = ({ administrators, sessionUserId }: AdminsTableProps) => {
  const { t } = useI18n();

  const buildIsSessionUser = (id: string) => id === sessionUserId;

  return (
    <Table className={T.root}>
      <Table.ScrollContainer className={T.scroll}>
        <Table.Content
          aria-label={t.ADMINISTRATORS.TABLE.ARIA_LABEL}
          className={T.content}
        >
          <Table.Header className={T.thead}>
            <Table.Column className={T.th} isRowHeader>
              {t.ADMINISTRATORS.TABLE.COL_EMAIL}
            </Table.Column>
            <Table.Column className={T.th}>
              {t.ADMINISTRATORS.TABLE.COL_STATUS}
            </Table.Column>
            <Table.Column className={T.th}>
              {t.ADMINISTRATORS.TABLE.COL_CREATED_AT}
            </Table.Column>
          </Table.Header>
          <Table.Body>
            {administrators.map((admin) => (
              <AdminsTableRow
                key={admin.id}
                admin={admin}
                isSessionUser={buildIsSessionUser(admin.id)}
              />
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};
