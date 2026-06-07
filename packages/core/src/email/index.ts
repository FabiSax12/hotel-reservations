import { Resend } from "resend";

declare const process: { env: Record<string, string | undefined> };

const resend = new Resend(process.env["RESEND_API_KEY"]);

const FROM = "Hotel Reservations <onboarding@resend.dev>"; // cambiar por tu dominio verificado

export async function sendReservationPendingEmail(
  guestEmail: string,
  guestName: string,
  reservationCode: string,
  checkIn: string,
  checkOut: string,
  roomName: string,
): Promise<void> {
  await resend.emails.send({
    from: FROM,
    to: guestEmail,
    subject: `Solicitud de reserva recibida - ${reservationCode}`,
    html: `
      <h2>Hola, ${guestName}</h2>
      <p>Recibimos tu solicitud de reserva <strong>${reservationCode}</strong>.</p>
      <p>Tu reserva está en espera de confirmación. Te notificaremos cuando sea aprobada y el pago sea procesado.</p>
      <ul>
        <li><strong>Habitación:</strong> ${roomName}</li>
        <li><strong>Check-in:</strong> ${checkIn}</li>
        <li><strong>Check-out:</strong> ${checkOut}</li>
      </ul>
    `,
  });
}

export async function sendReservationApprovedEmail(
  guestEmail: string,
  guestName: string,
  reservationCode: string,
  checkIn: string,
  checkOut: string,
  roomName: string,
  totalUSD: number,
): Promise<void> {
  await resend.emails.send({
    from: FROM,
    to: guestEmail,
    subject: `Reserva confirmada - ${reservationCode}`,
    html: `
      <h2>¡Reserva confirmada, ${guestName}!</h2>
      <p>Tu reserva <strong>${reservationCode}</strong> ha sido aprobada y el pago procesado exitosamente.</p>
      <ul>
        <li><strong>Habitación:</strong> ${roomName}</li>
        <li><strong>Check-in:</strong> ${checkIn}</li>
        <li><strong>Check-out:</strong> ${checkOut}</li>
        <li><strong>Total:</strong> $${totalUSD} USD</li>
      </ul>
    `,
  });
}

export async function sendReservationCancelledEmail(
  guestEmail: string,
  guestName: string,
  reservationCode: string,
  cancellationReason: string,
): Promise<void> {
  await resend.emails.send({
    from: FROM,
    to: guestEmail,
    subject: `Reserva cancelada - ${reservationCode}`,
    html: `
      <h2>Hola, ${guestName}</h2>
      <p>Lamentamos informarte que tu reserva <strong>${reservationCode}</strong> ha sido cancelada.</p>
      <p><strong>Razón:</strong> ${cancellationReason}</p>
      <p>Si tienes dudas, contacta a nuestro equipo de soporte.</p>
    `,
  });
}
