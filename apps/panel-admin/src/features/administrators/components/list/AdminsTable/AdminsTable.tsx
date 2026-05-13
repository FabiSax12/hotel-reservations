"use client";

import { Table } from "@heroui/react";
import { useI18n } from "@/locales";
import { AdminsTableRow } from "../AdminsTableRow/AdminsTableRow";
import { ADMINS_TABLE_STYLES as STYLE } from "./AdminsTable.styles";
import type { AdminsTableProps } from "./AdminsTable.interfaces";

export const AdminsTable = ({ administrators, sessionUserId }: AdminsTableProps) => {
  const { t } = useI18n();

  const buildIsSessionUser = (id: string) => id === sessionUserId;

  return (
    <Table className={STYLE.root}>
      <Table.ScrollContainer className={STYLE.scroll}>
        <Table.Content
          aria-label={t.ADMINISTRATORS.TABLE.ARIA_LABEL}
          className={STYLE.content}
        >
          <Table.Header className={STYLE.thead}>
            <Table.Column className={STYLE.th} isRowHeader>
              {t.ADMINISTRATORS.TABLE.COL_EMAIL}
            </Table.Column>
            <Table.Column className={STYLE.th}>
              {t.ADMINISTRATORS.TABLE.COL_STATUS}
            </Table.Column>
            <Table.Column className={STYLE.th}>
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
