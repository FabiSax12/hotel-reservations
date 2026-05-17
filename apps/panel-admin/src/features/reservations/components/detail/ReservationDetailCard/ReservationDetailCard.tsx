"use client";

import { Card } from "@heroui/react";
import { RESERVATION_DETAIL_CARD_STYLES as STYLES } from "./ReservationDetailCard.styles";
import type { ReservationDetailCardProps } from "./ReservationDetailCard.interface";

export const ReservationDetailCard = ({ title, children }: ReservationDetailCardProps) => (
  <Card className={STYLES.card}>
    <Card.Header className={STYLES.header}>
      <p className={STYLES.sectionLabel}>{title}</p>
    </Card.Header>
    <Card.Content className={STYLES.content}>
      {children}
    </Card.Content>
  </Card>
);
