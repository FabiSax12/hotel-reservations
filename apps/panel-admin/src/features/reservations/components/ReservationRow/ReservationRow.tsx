"use client";

import { Avatar, Button } from "@heroui/react";
import { useI18n } from "@/locales";
import { formatTableDate } from "../../utils/format-reservation-date";
import { formatAmount } from "../../utils/format-currency";
import { StatusBadge } from "../StatusBadge/StatusBadge";
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
              <svg className={S.copyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg className={S.copyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
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
            <svg className={S.toggleIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg className={S.toggleIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
          {buttonLabel}
        </Button>
      </td>
    </tr>
  );
};
