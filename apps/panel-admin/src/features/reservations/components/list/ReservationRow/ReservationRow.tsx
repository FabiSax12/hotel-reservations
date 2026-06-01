"use client";

import { Avatar, Button } from "@heroui/react";
import { Check, Copy, Eye } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/locales";
import { formatAmount } from "../../../utils/format-currency";
import { formatTableDate } from "../../../utils/format-reservation-date";
import { StatusBadge } from "../../shared/StatusBadge/StatusBadge";
import type { ReservationRowProps } from "./ReservationRow.interface";
import { RESERVATION_ROW_STYLES as STYLES } from "./ReservationRow.styles";
import { useCopyCode } from "./useCopyCode";

export const ReservationRow = ({ reservation: r }: ReservationRowProps) => {
  const { t } = useI18n();
  const { copied, handleCopyCode } = useCopyCode(r.code);

  return (
    <tr className={STYLES.row}>
      <td className={STYLES.cell}>
        <div className={STYLES.codeChip}>
          <code className={STYLES.codeText}>{r.code}</code>
          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            className={STYLES.copyButton}
            aria-label={t.RESERVATIONS.ACTIONS.COPY_CODE}
            onPress={handleCopyCode}
          >
            {copied ? <Check className={STYLES.copyIcon} /> : <Copy className={STYLES.copyIcon} />}
          </Button>
        </div>
      </td>

      <td className={STYLES.cell}>
        <div className={STYLES.guestRow}>
          <Avatar size="sm">
            <Avatar.Fallback>{r.guest.initials}</Avatar.Fallback>
          </Avatar>
          <div className={STYLES.guestTextBlock}>
            <p className={STYLES.textPrimary}>{r.guest.name}</p>
            <p className={STYLES.textSecondary}>{r.guest.email}</p>
          </div>
        </div>
      </td>

      <td className={STYLES.cell}>
        <p className={STYLES.textPrimary}>{r.room.name}</p>
        <p className={STYLES.textSecondary}>{r.room.location}</p>
      </td>

      <td className={STYLES.cell}>
        <span className={STYLES.textDefault}>{formatTableDate(r.checkIn)}</span>
      </td>

      <td className={STYLES.cell}>
        <span className={STYLES.textDefault}>{formatTableDate(r.checkOut)}</span>
      </td>

      <td className={STYLES.cell}>
        <span className={STYLES.textDefault}>{r.nights}</span>
      </td>

      <td className={STYLES.cell}>
        <span className={STYLES.textAmount}>{formatAmount(r.totalUSD)}</span>
      </td>

      <td className={STYLES.cell}>
        <StatusBadge status={r.status} />
      </td>

      <td className={STYLES.cell}>
        <Link href={`/admin/reservations/${r.id}`} className={STYLES.detailLink}>
          <Eye className={STYLES.detailIcon} />
          {t.RESERVATIONS.ACTIONS.VIEW_DETAIL}
        </Link>
      </td>
    </tr>
  );
};
