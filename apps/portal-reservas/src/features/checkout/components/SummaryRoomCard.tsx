/**
 * @file SummaryRoomCard.tsx — Expanded room details on the confirmation page.
 *
 * The same information as the detail panel, but roomier: a large hero image, a
 * fact grid (check-in / check-out times, capacity, area, beds), the full
 * description and the complete amenity list. Renders a position badge when the
 * room is part of a package.
 */

"use client";

import Image from "next/image";
import { formatBedConfig } from "@/features/rooms";
import { useI18n } from "@/locales";
import { CHECKOUT_ICON_PATHS } from "../constants/checkout-icons.const";
import type { SummaryRoomCardProps } from "../domain/types";
import { CHECKOUT_STYLES } from "../theme/checkout.theme";
import { CheckoutIcon } from "./CheckoutIcon";

export function SummaryRoomCard({ room, position, total }: SummaryRoomCardProps) {
  const { t } = useI18n();

  const facts = [
    {
      key: "in",
      icon: CHECKOUT_ICON_PATHS.calendar,
      label: t.CHECKOUT.CHECK_IN_LABEL,
      value: room.checkInTime,
    },
    {
      key: "out",
      icon: CHECKOUT_ICON_PATHS.calendar,
      label: t.CHECKOUT.CHECK_OUT_LABEL,
      value: room.checkOutTime,
    },
    {
      key: "cap",
      icon: CHECKOUT_ICON_PATHS.guests,
      label: t.CHECKOUT.CAPACITY_LABEL,
      value: String(room.capacity),
    },
    {
      key: "area",
      icon: CHECKOUT_ICON_PATHS.area,
      label: t.CHECKOUT.AREA_LABEL,
      value: t.CHECKOUT.AREA_VALUE.replace("{value}", String(room.sqft)),
    },
    {
      key: "beds",
      icon: CHECKOUT_ICON_PATHS.bed,
      label: t.CHECKOUT.BEDS_LABEL,
      value: formatBedConfig(room.beds),
    },
  ];

  return (
    <article className={CHECKOUT_STYLES.roomCard}>
      <div className={CHECKOUT_STYLES.roomMedia}>
        <Image
          src={room.image}
          alt={room.title}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className={CHECKOUT_STYLES.roomImg}
          unoptimized
        />
        <div className={CHECKOUT_STYLES.roomMediaScrim} aria-hidden="true" />
        {position && total ? (
          <span className={CHECKOUT_STYLES.roomPosition}>
            {t.CHECKOUT.ROOM_POSITION.replace("{current}", String(position)).replace(
              "{total}",
              String(total),
            )}
          </span>
        ) : null}
      </div>

      <div className={CHECKOUT_STYLES.roomBody}>
        <header className={CHECKOUT_STYLES.roomHead}>
          <span className={CHECKOUT_STYLES.roomType}>{room.type}</span>
          <h3 className={CHECKOUT_STYLES.roomTitle}>{room.title}</h3>
          <p className={CHECKOUT_STYLES.roomLocation}>
            <CheckoutIcon
              path={CHECKOUT_ICON_PATHS.location}
              className={CHECKOUT_STYLES.roomLocationIcon}
            />
            {room.location}
          </p>
        </header>

        <div className={CHECKOUT_STYLES.factGrid}>
          {facts.map((fact) => (
            <div key={fact.key} className={CHECKOUT_STYLES.factItem}>
              <CheckoutIcon path={fact.icon} className={CHECKOUT_STYLES.factIcon} />
              <span className={CHECKOUT_STYLES.factText}>
                <span className={CHECKOUT_STYLES.factLabel}>{fact.label}</span>
                <span className={CHECKOUT_STYLES.factValue}>{fact.value}</span>
              </span>
            </div>
          ))}
        </div>

        <section>
          <p className={CHECKOUT_STYLES.blockLabel}>{t.CHECKOUT.ABOUT_TITLE}</p>
          <p className={CHECKOUT_STYLES.about}>{room.description}</p>
        </section>

        <section>
          <p className={CHECKOUT_STYLES.blockLabel}>{t.CHECKOUT.AMENITIES_TITLE}</p>
          <ul className={CHECKOUT_STYLES.amenityGrid}>
            {room.amenities.map((amenity) => (
              <li key={amenity} className={CHECKOUT_STYLES.amenityItem}>
                <CheckoutIcon
                  path={CHECKOUT_ICON_PATHS.amenity}
                  className={CHECKOUT_STYLES.amenityIcon}
                />
                {amenity}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
