export type EmailLocale = "es" | "en";

export const EMAIL_TEXTS = {
  es: {
    HOTEL_NAME: "ALTAVERDE HOTEL",
    HOTEL_SUBTITLE: "Donde el bosque se encuentra con el cielo",
    CONTACT_TITLE: "Información de contacto",
    CONTACT_PHONE: "📞 +506 xxxx-xxxx",
    CONTACT_EMAIL: "✉️ xxxxxxxxx@example.com",
    CONTACT_ADDRESS: "📍 xxxxxxxxxxxxxxxxxxxxxxxxxx",
    COPYRIGHT: "© xxxxxxxxxxxxxxxxxxxxxxxxxx",
    FOOTER_NOTE:
      "Si tienes alguna pregunta o necesitas hacer cambios en tu reservación, no dudes en contactarnos.",
    DETAILS_TITLE: "Detalles de la reservación",
    LABEL_CONFIRMATION: "Confirmación:",
    LABEL_ROOM: "Habitación:",
    LABEL_CHECKIN: "Llegada:",
    LABEL_CHECKOUT: "Salida:",
    LABEL_TOTAL: "Total:",
    PENDING: {
      BADGE: "Pendiente de aprobación",
      PREVIEW: "Tu solicitud de reservación ha sido recibida",
      GREETING: "Hola",
      BODY: "¡Gracias por elegir nuestro hotel! Hemos recibido tu solicitud de reservación y nuestro equipo la está revisando. Recibirás un correo de confirmación en las próximas 24 horas.",
    },
    APPROVED: {
      BADGE: "Reservación confirmada",
      PREVIEW: "Tu reservación ha sido confirmada",
      GREETING: "Hola",
      BODY: "¡Excelentes noticias! Tu reservación ha sido aprobada y tu pago ha sido procesado exitosamente. Estamos emocionados de recibirte.",
    },
    CANCELLED: {
      BADGE: "Reservación cancelada",
      PREVIEW: "Tu reservación ha sido cancelada",
      GREETING: "Hola",
      BODY: "Lamentamos informarte que tu reservación ha sido cancelada. A continuación encontrarás los detalles de la cancelación.",
      DETAILS_TITLE: "Detalles de cancelación",
      LABEL_REASON: "Razón:",
      FOOTER_NOTE:
        "Si tienes alguna pregunta o crees que esto fue un error, no dudes en contactarnos.",
    },
    COMPLETED: {
      BADGE: "Reservación completada",
      PREVIEW: "Tu estadía ha concluido",
      GREETING: "Hola",
      BODY: "Esperamos que hayas disfrutado tu estadía en Altaverde Hotel. Fue un placer tenerte como huésped. ¡Esperamos verte de nuevo pronto!",
    },
  },
  en: {
    HOTEL_NAME: "ALTAVERDE HOTEL",
    HOTEL_SUBTITLE: "Where the forest meets the sky",
    CONTACT_TITLE: "Contact Information",
    CONTACT_PHONE: "📞 +506 xxxx-xxxx",
    CONTACT_EMAIL: "✉️ xxxxxxxxx@example.com",
    CONTACT_ADDRESS: "📍 xxxxxxxxxxxxxxxxxxxxxxxxxx",
    COPYRIGHT: "© xxxxxxxxxxxxxxxxxxxxxxxxxx",
    FOOTER_NOTE:
      "If you have any questions or need to make changes to your reservation, please don't hesitate to contact us.",
    DETAILS_TITLE: "Reservation Details",
    LABEL_CONFIRMATION: "Confirmation:",
    LABEL_ROOM: "Room:",
    LABEL_CHECKIN: "Check-in:",
    LABEL_CHECKOUT: "Check-out:",
    LABEL_TOTAL: "Total:",
    PENDING: {
      BADGE: "Pending Approval",
      PREVIEW: "Your reservation request has been received",
      GREETING: "Hello",
      BODY: "Thank you for choosing our hotel! We've received your reservation request and our team is currently reviewing it. You'll receive a confirmation email within 24 hours.",
    },
    APPROVED: {
      BADGE: "Reservation Confirmed",
      PREVIEW: "Your reservation has been confirmed",
      GREETING: "Hello",
      BODY: "Great news! Your reservation has been approved and your payment has been processed successfully. We look forward to welcoming you.",
    },
    CANCELLED: {
      BADGE: "Reservation Cancelled",
      PREVIEW: "Your reservation has been cancelled",
      GREETING: "Hello",
      BODY: "We regret to inform you that your reservation has been cancelled. Below you will find the details of the cancellation.",
      DETAILS_TITLE: "Cancellation Details",
      LABEL_REASON: "Reason:",
      FOOTER_NOTE:
        "If you have any questions or believe this was an error, please don't hesitate to contact us.",
    },
    COMPLETED: {
      BADGE: "Stay Completed",
      PREVIEW: "Your stay has concluded",
      GREETING: "Hello",
      BODY: "We hope you enjoyed your stay at Altaverde Hotel. It was a pleasure having you as our guest. We hope to see you again soon!",
    },
  },
} as const;
