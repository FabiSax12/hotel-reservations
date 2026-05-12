"use client";

import { Avatar, Button } from "@heroui/react";
import { useI18n } from "@/locales";
import { ICON_PATHS } from "../../../constants/reservations-icons";
import { formatAmount } from "../../../utils/format-currency";
import { formatTableDate } from "../../../utils/format-reservation-date";
import { StatusBadge } from "../../shared/StatusBadge/StatusBadge";
import type { ReservationRowProps } from "./ReservationRow.interface";
import { RESERVATION_ROW_STYLES as S } from "./ReservationRow.styles";
import { useCopyCode } from "./useCopyCode";

export const ReservationRow = ({ reservation: r, isExpanded, onToggle }: ReservationRowProps) => {
  const { t } = useI18n();
  const { copied, handleCopyCode } = useCopyCode(r.code);

  const rowClassName = `${S.row} ${isExpanded ? S.rowExpanded : ""}`;
  const toggleClassName = isExpanded ? S.toggleButtonOn : S.toggleButtonOff;
  const buttonLabel = isExpanded
    ? t.RESERVATIONS.ACTIONS.VIEW_LESS
    : t.RESERVATIONS.ACTIONS.VIEW_MORE;

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
              <svg
                className={S.copyIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points={ICON_PATHS.COPY_DONE.points} />
              </svg>
            ) : (
              <svg
                className={S.copyIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect
                  x={ICON_PATHS.COPY.rect.x}
                  y={ICON_PATHS.COPY.rect.y}
                  width={ICON_PATHS.COPY.rect.width}
                  height={ICON_PATHS.COPY.rect.height}
                  rx={ICON_PATHS.COPY.rect.rx}
                />
                <path d={ICON_PATHS.COPY.path} />
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
        <Button size="sm" variant="outline" className={toggleClassName} onPress={onToggle}>
          {isExpanded ? (
            <svg
              className={S.toggleIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d={ICON_PATHS.EYE_CLOSED.path1} />
              <path d={ICON_PATHS.EYE_CLOSED.path2} />
              <line
                x1={ICON_PATHS.EYE_CLOSED.line.x1}
                y1={ICON_PATHS.EYE_CLOSED.line.y1}
                x2={ICON_PATHS.EYE_CLOSED.line.x2}
                y2={ICON_PATHS.EYE_CLOSED.line.y2}
              />
            </svg>
          ) : (
            <svg
              className={S.toggleIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d={ICON_PATHS.EYE_OPEN.path1} />
              <circle
                cx={ICON_PATHS.EYE_OPEN.circle.cx}
                cy={ICON_PATHS.EYE_OPEN.circle.cy}
                r={ICON_PATHS.EYE_OPEN.circle.r}
              />
            </svg>
          )}
          {buttonLabel}
        </Button>
      </td>
    </tr>
  );
};
