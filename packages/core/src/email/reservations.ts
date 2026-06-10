import type { EmailLocale } from "./i18n/email.texts";
import { sendEmail } from "./sender";
import { reservationApprovedHtml } from "./templates/reservation-approved";
import { reservationCancelledHtml } from "./templates/reservation-cancelled";
import { reservationPendingHtml } from "./templates/reservation-pending";
import { EMAIL_TEXTS } from "./i18n/email.texts";

export async function sendReservationPendingEmail(
  guestEmail: string,
  guestName: string,
  reservationCode: string,
  checkIn: string,
  checkOut: string,
  roomName: string,
  locale: EmailLocale = "es",
): Promise<void> {
  const subject = `${EMAIL_TEXTS[locale].PENDING.PREVIEW} - ${reservationCode}`;
  await sendEmail(guestEmail, subject, reservationPendingHtml(guestName, reservationCode, checkIn, checkOut, roomName, locale));
}

export async function sendReservationApprovedEmail(
  guestEmail: string,
  guestName: string,
  reservationCode: string,
  checkIn: string,
  checkOut: string,
  roomName: string,
  totalUSD: number,
  locale: EmailLocale = "es",
): Promise<void> {
  const subject = `${EMAIL_TEXTS[locale].APPROVED.PREVIEW} - ${reservationCode}`;
  await sendEmail(guestEmail, subject, reservationApprovedHtml(guestName, reservationCode, checkIn, checkOut, roomName, totalUSD, locale));
}

export async function sendReservationCancelledEmail(
  guestEmail: string,
  guestName: string,
  reservationCode: string,
  cancellationReason: string,
  locale: EmailLocale = "es",
): Promise<void> {
  const subject = `${EMAIL_TEXTS[locale].CANCELLED.PREVIEW} - ${reservationCode}`;
  await sendEmail(guestEmail, subject, reservationCancelledHtml(guestName, reservationCode, cancellationReason, locale));
}
