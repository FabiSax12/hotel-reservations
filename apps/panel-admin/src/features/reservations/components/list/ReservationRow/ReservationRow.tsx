"use client";

import Link from "next/link";
import { Avatar, Button } from "@heroui/react";
import { useI18n } from "@/locales";
import { formatTableDate } from "../../../utils/format-reservation-date";
import { formatAmount } from "../../../utils/format-currency";
import { StatusBadge } from "../../shared/StatusBadge/StatusBadge";
import { Copy, Check, Eye } from "lucide-react";
import { useCopyCode } from "./useCopyCode";
import { RESERVATION_ROW_STYLES as S } from "./ReservationRow.styles";
import type { ReservationRowProps } from "./ReservationRow.interface";

export const ReservationRow = ({ reservation: r }: ReservationRowProps) => {
  const { t } = useI18n();
  const { copied, handleCopyCode } = useCopyCode(r.code);

  return (
    <tr className={S.row}>
      <td className={S.cell}>
        <div className={S.codeChip}>
          <code className={S.codeText}>{r.code}</code>
          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            className={S.copyButton}
            aria-label={t.RESERVATIONS.ACTIONS.COPY_CODE}
            onPress={handleCopyCode}
          >
            {copied ? (
              <Check className={S.copyIcon} />
            ) : (
              <Copy className={S.copyIcon} />
            )}
          </Button>
        </div>
      </td>

      <td className={S.cell}>
        <div className={S.guestRow}>
          <Avatar size="sm">
            <Avatar.Fallback>{r.guest.initials}</Avatar.Fallback>
          </Avatar>
          <div className={S.guestTextBlock}>
            <p className={S.textPrimary}>{r.guest.name}</p>
            <p className={S.textSecondary}>{r.guest.email}</p>
          </div>
        </div>
      </td>

      <td className={S.cell}>
        <p className={S.textPrimary}>{r.room.name}</p>
        <p className={S.textSecondary}>{r.room.location}</p>
      </td>

      <td className={S.cell}>
        <span className={S.textDefault}>{formatTableDate(r.checkIn)}</span>
      </td>

      <td className={S.cell}>
        <span className={S.textDefault}>{formatTableDate(r.checkOut)}</span>
      </td>

      <td className={S.cell}>
        <span className={S.textDefault}>{r.nights}</span>
      </td>

      <td className={S.cell}>
        <span className={S.textAmount}>{formatAmount(r.totalUSD)}</span>
      </td>

      <td className={S.cell}>
        <StatusBadge status={r.status} />
      </td>

      <td className={S.cell}>
        <Link href={`/admin/reservations/${r.id}`} className={S.detailLink}>
          <Eye className={S.detailIcon} />
          {t.RESERVATIONS.ACTIONS.VIEW_DETAIL}
        </Link>
      </td>
    </tr>
  );
};
