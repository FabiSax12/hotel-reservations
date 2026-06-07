import { Resend } from "resend";

declare const process: { env: Record<string, string | undefined> };

const resend = new Resend(process.env["RESEND_API_KEY"]);

export const FROM = "Hotel Reservations <onboarding@resend.dev>";

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
): Promise<void> {
  await resend.emails.send({ from: FROM, to, subject, html });
}
