import type { ReservationStatus } from "../domain/reservation";
import { RESERVATION_STATUS as S } from "./reservation-statuses";

export const VALID_TRANSITIONS: Record<ReservationStatus, readonly ReservationStatus[]> =
  Object.freeze({
    [S.PENDING]: [S.APPROVED, S.CANCELLED],
    [S.APPROVED]: [S.COMPLETED, S.CANCELLED],
    [S.CANCELLED]: [],
    [S.COMPLETED]: [],
  } as const);
