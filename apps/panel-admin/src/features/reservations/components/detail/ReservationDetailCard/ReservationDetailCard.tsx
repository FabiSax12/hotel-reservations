"use client";

import { Card } from "@heroui/react";
import type { ReservationDetailCardProps } from "./ReservationDetailCard.interface";
import { RESERVATION_DETAIL_CARD_STYLES as S } from "./ReservationDetailCard.styles";

export const ReservationDetailCard = ({ title, children }: ReservationDetailCardProps) => (
  <Card className={S.card}>
    <Card.Header className={S.header}>
      <p className={S.sectionLabel}>{title}</p>
    </Card.Header>
    <Card.Content className={S.content}>{children}</Card.Content>
  </Card>
);
