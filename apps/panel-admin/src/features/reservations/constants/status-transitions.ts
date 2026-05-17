import type { ReservationStatus } from "../domain/reservation";
import { RESERVATION_STATUS as CONSTANTS } from "./reservation-statuses";

export const VALID_TRANSITIONS: Record<ReservationStatus, readonly ReservationStatus[]> =
  Object.freeze({
    [CONSTANTS.PENDING]: [CONSTANTS.APPROVED, CONSTANTS.CANCELLED],
    [CONSTANTS.APPROVED]: [CONSTANTS.COMPLETED, CONSTANTS.CANCELLED],
    [CONSTANTS.CANCELLED]: [],
    [CONSTANTS.COMPLETED]: [],
  } as const);
