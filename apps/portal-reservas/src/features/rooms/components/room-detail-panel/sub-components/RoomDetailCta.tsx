/**
 * @file RoomDetailCta.tsx — Availability-aware reserve CTA for the panel footer.
 *
 * Mirrors the room card CTA states (no dates / loading / available / unavailable)
 * but at panel scale. Reuses the shared room CTA-state hook and the inline
 * availability calendar; picking dates re-runs the search while the panel stays
 * open (the selection lives above the room list), so the CTA simply updates.
 */

"use client";

import { ROOM_DETAIL_STYLES as S } from "@/theme/room-detail.theme";
import { useI18n } from "@/locales";
import { usePackageCardState } from "../../../hooks/usePackageCardState";
import type { RoomDetailCtaProps } from "../../../domain/types";
import { RoomRangeCalendar } from "../../sub-components/RoomRangeCalendar";
import { CTASpinner } from "../../sub-components/CTASpinner";

const SVG_VIEW_BOX = "0 0 24 24";
const CALENDAR_PATH = "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z";
const ARROW_PATH = "M9 5l7 7-7 7";

export function RoomDetailCta({ room, isPackage }: RoomDetailCtaProps) {
  const { t } = useI18n();
  const {
    wrapperRef,
    calendarRef,
    hasDates,
    isAvailable,
    isLoading,
    isReserving,
    isCalendarOpen,
    handleReserve,
    toggleCalendar,
    closeCalendar,
  } = usePackageCardState(room);

  const reserveLabel = isPackage ? t.ROOMS.PACKAGE_RESERVE : t.ROOMS.RESERVE_ACTION;

  return (
    <div ref={wrapperRef} className={S.ctaWrap}>
      {isCalendarOpen && (
        <RoomRangeCalendar
          availableDates={room.availableDates}
          location={room.location}
          roomId={room.id}
          onClose={closeCalendar}
          anchorRef={wrapperRef}
          onPortalRef={(el) => { calendarRef.current = el; }}
        />
      )}

      {!hasDates && (
        <button type="button" className={S.checkDatesBtn} onClick={toggleCalendar} aria-expanded={isCalendarOpen}>
          <svg className={S.ctaIcon} fill="none" viewBox={SVG_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={CALENDAR_PATH} />
          </svg>
          {t.ROOMS.CHECK_DATES_ACTION}
        </button>
      )}

      {hasDates && isLoading && (
        <button type="button" className={S.reserveBtn} disabled aria-busy="true">
          <CTASpinner /> {t.ROOMS.VERIFYING}
        </button>
      )}

      {hasDates && !isLoading && isAvailable && (
        <button type="button" className={S.reserveBtn} onClick={handleReserve} disabled={isReserving} aria-busy={isReserving}>
          {isReserving ? (
            <><CTASpinner /> {t.ROOMS.LOADING_RESERVE}</>
          ) : (
            <>
              {reserveLabel}
              <svg className={S.ctaIcon} fill="none" viewBox={SVG_VIEW_BOX} stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={ARROW_PATH} />
              </svg>
            </>
          )}
        </button>
      )}

      {hasDates && !isLoading && !isAvailable && (
        <>
          <p className={S.unavailableLabel}>{t.ROOMS.UNAVAILABLE_LABEL}</p>
          <button type="button" className={S.seeFreeDatesBtn} onClick={toggleCalendar} aria-expanded={isCalendarOpen}>
            {t.ROOMS.SEE_FREE_DATES}
          </button>
        </>
      )}
    </div>
  );
}
