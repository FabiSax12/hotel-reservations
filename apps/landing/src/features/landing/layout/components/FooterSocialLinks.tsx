"use client";

import { MessageCircle } from "lucide-react";
import { SOCIAL } from "@/config/social";
import { LAYOUT } from "@/features/landing/layout/constants/styles";
import { useI18n } from "@/locales";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";

export function FooterSocialLinks() {
  const { t } = useI18n();
  const social = t.COMMON.LAYOUT.SOCIAL;

  return (
    <div className={LAYOUT.FOOTER_SOCIAL} role="list" aria-label={social.SECTION_LABEL}>
      <a
        href={SOCIAL.INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        className={LAYOUT.FOOTER_SOCIAL_LINK}
        aria-label={social.INSTAGRAM_LABEL}
        role="listitem"
      >
        <InstagramIcon className={LAYOUT.FOOTER_SOCIAL_ICON} />
      </a>
      <a
        href={SOCIAL.FACEBOOK}
        target="_blank"
        rel="noopener noreferrer"
        className={LAYOUT.FOOTER_SOCIAL_LINK}
        aria-label={social.FACEBOOK_LABEL}
        role="listitem"
      >
        <FacebookIcon className={LAYOUT.FOOTER_SOCIAL_ICON} />
      </a>
      <a
        href={SOCIAL.WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className={LAYOUT.FOOTER_SOCIAL_LINK}
        aria-label={social.WHATSAPP_LABEL}
        role="listitem"
      >
        <MessageCircle className={LAYOUT.FOOTER_SOCIAL_ICON} aria-hidden="true" />
      </a>
    </div>
  );
}
