/**
 * @file RoomDetailCta.tsx — Availability-aware reserve CTA for the panel footer.
 *
 * Mirrors the room card CTA states (no dates / loading / available / unavailable)
 * but at panel scale. Reuses the rooms feature's CTA-state hook and the inline
 * availability calendar (via the rooms barrel); picking dates re-runs the search
 * while the panel stays open (the selection lives above the room list), so the
 * CTA simply updates.
 */

"use client";

import {
  CTASpinner,
  CtaIcon,
  RoomRangeCalendar,
  usePackageCardState,
  useReserveAction,
} from "@/features/rooms";
import { useI18n } from "@/locales";
import { ICON_PATHS } from "../constants/room-detail-icons.const";
import type { RoomDetailCtaProps } from "../domain/types";
import { ROOM_DETAIL_STYLES } from "../theme/room-detail.theme";

export function RoomDetailCta({ room, reserveRooms, isPackage }: RoomDetailCtaProps) {
  const { t } = useI18n();
  const {
    wrapperRef,
    calendarRef,
    hasDates,
    isAvailable,
    isLoading,
    isCalendarOpen,
    toggleCalendar,
    closeCalendar,
  } = usePackageCardState();
  const { reserve, isReserving } = useReserveAction();

  const reserveLabel = isPackage ? t.ROOMS.PACKAGE_RESERVE : t.ROOMS.RESERVE_ACTION;

  return (
    <div ref={wrapperRef} className={ROOM_DETAIL_STYLES.ctaWrap}>
      {isCalendarOpen && (
        <RoomRangeCalendar
          availableDates={room.availableDates}
          location={room.location}
          roomId={room.id}
          onClose={closeCalendar}
          anchorRef={wrapperRef}
          onPortalRef={(el) => {
            calendarRef.current = el;
          }}
        />
      )}

      {!hasDates && (
        <button
          type="button"
          className={ROOM_DETAIL_STYLES.checkDatesBtn}
          onClick={toggleCalendar}
          aria-expanded={isCalendarOpen}
        >
          <CtaIcon
            path={ICON_PATHS.calendar}
            className={ROOM_DETAIL_STYLES.ctaIcon}
            strokeWidth={2}
          />
          {t.ROOMS.CHECK_DATES_ACTION}
        </button>
      )}

      {hasDates && isLoading && (
        <button type="button" className={ROOM_DETAIL_STYLES.reserveBtn} disabled aria-busy="true">
          <CTASpinner /> {t.ROOMS.VERIFYING}
        </button>
      )}

      {hasDates && !isLoading && isAvailable && (
        <button
          type="button"
          className={ROOM_DETAIL_STYLES.reserveBtn}
          onClick={() => reserve(reserveRooms)}
          disabled={isReserving}
          aria-busy={isReserving}
        >
          {isReserving ? (
            <>
              <CTASpinner /> {t.ROOMS.LOADING_RESERVE}
            </>
          ) : (
            <>
              {reserveLabel}
              <CtaIcon
                path={ICON_PATHS.chevronRight}
                className={ROOM_DETAIL_STYLES.ctaIcon}
                strokeWidth={2.5}
              />
            </>
          )}
        </button>
      )}

      {hasDates && !isLoading && !isAvailable && (
        <>
          <p className={ROOM_DETAIL_STYLES.unavailableLabel}>{t.ROOMS.UNAVAILABLE_LABEL}</p>
          <button
            type="button"
            className={ROOM_DETAIL_STYLES.seeFreeDatesBtn}
            onClick={toggleCalendar}
            aria-expanded={isCalendarOpen}
          >
            {t.ROOMS.SEE_FREE_DATES}
          </button>
        </>
      )}
    </div>
  );
}
