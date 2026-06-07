export { sendEmail } from "./sender";
export {
  sendReservationApprovedEmail,
  sendReservationCancelledEmail,
  sendReservationCompletedEmail,
  sendReservationPendingEmail,
} from "./reservations";
export type { EmailLocale } from "./i18n/email.texts";
