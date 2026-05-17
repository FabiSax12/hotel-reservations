"use client";

import { Avatar, Button } from "@heroui/react";
import { useI18n } from "@/locales";
import { formatTableDate } from "../../../utils/format-reservation-date";
import { formatAmount } from "../../../utils/format-currency";
import { StatusBadge } from "../../shared/StatusBadge/StatusBadge";
import { Copy, Check, Eye, EyeOff } from "lucide-react";
import { useCopyCode } from "./useCopyCode";
import { RESERVATION_ROW_STYLES as S } from "./ReservationRow.styles";
import type { ReservationRowProps } from "./ReservationRow.interface";

export const ReservationRow = ({ reservation: r, isExpanded, onToggle }: ReservationRowProps) => {
  const { t } = useI18n();
  const { copied, handleCopyCode } = useCopyCode(r.code);

  const rowClassName    = `${S.row} ${isExpanded ? S.rowExpanded : ""}`;
  const toggleClassName = isExpanded ? S.toggleButtonOn : S.toggleButtonOff;
  const buttonLabel     = isExpanded ? t.RESERVATIONS.ACTIONS.VIEW_LESS : t.RESERVATIONS.ACTIONS.VIEW_MORE;

  return (
    <tr className={rowClassName}>
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
        <Button
          size="sm"
          variant="outline"
          className={toggleClassName}
          onPress={onToggle}
        >
          {isExpanded ? (
            <EyeOff className={S.toggleIcon} />
          ) : (
            <Eye className={S.toggleIcon} />
          )}
          {buttonLabel}
        </Button>
      </td>
    </tr>
  );
};
