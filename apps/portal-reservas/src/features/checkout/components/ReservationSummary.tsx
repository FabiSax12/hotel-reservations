/**
 * @file ReservationSummary.tsx — Expanded review of the reservation.
 *
 * The stay facts (StayMeta) followed by one expanded card per room. Renders a
 * single room or every room of a package, numbering each card in package mode.
 */

"use client";

import { useI18n } from "@/locales";
import type { ReservationSummaryProps } from "../domain/types";
import { CHECKOUT_STYLES } from "../theme/checkout.theme";
import { StayMeta } from "./StayMeta";
import { SummaryRoomCard } from "./SummaryRoomCard";

export function ReservationSummary({ draft }: ReservationSummaryProps) {
  const { t } = useI18n();
  const roomCount = draft.rooms.length;

  return (
    <>
      <section className={CHECKOUT_STYLES.section}>
        <p className={CHECKOUT_STYLES.sectionEyebrow}>
          <span className={CHECKOUT_STYLES.sectionEyebrowDot} aria-hidden="true" />
          {t.CHECKOUT.STAY_TITLE}
        </p>
        <StayMeta draft={draft} />
      </section>

      <section className={CHECKOUT_STYLES.section}>
        <div className={CHECKOUT_STYLES.roomList}>
          {draft.rooms.map((room, index) => (
            <SummaryRoomCard
              key={room.id}
              room={room}
              position={draft.isPackage ? index + 1 : undefined}
              total={draft.isPackage ? roomCount : undefined}
            />
          ))}
        </div>
      </section>
    </>
  );
}
