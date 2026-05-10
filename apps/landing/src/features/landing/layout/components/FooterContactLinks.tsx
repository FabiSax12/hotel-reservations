"use client";

import { Mail, MapPin, MessageCircle } from "lucide-react";
import { useI18n } from "@/locales";
import { LAYOUT } from "@/features/landing/layout/constants/styles";
import { CONTACT } from "@/config/contact";

export function FooterContactLinks() {
  const { t } = useI18n();
  const contact = t.COMMON.LAYOUT.CONTACT;

  return (
    <div className={LAYOUT.FOOTER_CONTACT}>
      <a
        href={CONTACT.MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={LAYOUT.FOOTER_CONTACT_LINK}
        aria-label={contact.ADDRESS_LABEL}
      >
        <MapPin className={LAYOUT.FOOTER_CONTACT_ICON} aria-hidden="true" />
        {CONTACT.ADDRESS}
      </a>
      <a
        href={`mailto:${CONTACT.EMAIL}`}
        className={LAYOUT.FOOTER_CONTACT_LINK}
        aria-label={contact.EMAIL_LABEL}
      >
        <Mail className={LAYOUT.FOOTER_CONTACT_ICON} aria-hidden="true" />
        {CONTACT.EMAIL}
      </a>
      <a
        href={CONTACT.WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={LAYOUT.FOOTER_CONTACT_LINK}
        aria-label={contact.WHATSAPP_LABEL}
      >
        <MessageCircle className={LAYOUT.FOOTER_CONTACT_ICON} aria-hidden="true" />
        {CONTACT.PHONE}
      </a>
    </div>
  );
}
