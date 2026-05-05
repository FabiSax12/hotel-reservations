"use client";

import { Mail, MessageCircle } from "lucide-react";
import { useI18n } from "@/locales";
import { LAYOUT } from "@/features/landing/layout/constants/styles";
import { ROUTES } from "@/config/routes";
import { CONTACT } from "@/config/contact";
import { SOCIAL } from "@/config/social";
import { InstagramIcon, FacebookIcon } from "./SocialIcons";
import { NAV_KEYS, NAV_HREFS, CURRENT_YEAR } from "@/features/landing/layout/constants/nav";

export function LandingFooter() {
  const { t } = useI18n();
  const layout = t.COMMON.LAYOUT;

  return (
    <footer id="contact" className={LAYOUT.FOOTER_WRAPPER}>
      <div className={LAYOUT.FOOTER_INNER}>
        <div className={LAYOUT.FOOTER_TOP}>
          <div className={LAYOUT.FOOTER_BRAND}>
            <span className={LAYOUT.FOOTER_HOTEL_NAME}>{layout.HOTEL_NAME}</span>
            <span className={LAYOUT.FOOTER_TAGLINE}>{layout.TAGLINE}</span>
          </div>

          <nav aria-label="Footer navigation">
            <ul className={LAYOUT.FOOTER_LINKS}>
              {NAV_KEYS.map((key) => (
                <li key={key}>
                  <a href={NAV_HREFS[key]} className={LAYOUT.FOOTER_LINK}>
                    {t.COMMON.NAV[key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href={ROUTES.PORTAL} className={LAYOUT.FOOTER_BOOK}>
            {t.COMMON.ACTIONS.BOOK_NOW}
          </a>
        </div>

        <div className={LAYOUT.FOOTER_MIDDLE}>
          <div className={LAYOUT.FOOTER_CONTACT}>
            <a
              href={`mailto:${CONTACT.EMAIL}`}
              className={LAYOUT.FOOTER_CONTACT_LINK}
              aria-label={layout.CONTACT.EMAIL_LABEL}
            >
              <Mail className={LAYOUT.FOOTER_CONTACT_ICON} aria-hidden="true" />
              {CONTACT.EMAIL}
            </a>
            <a
              href={CONTACT.WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={LAYOUT.FOOTER_CONTACT_LINK}
              aria-label={layout.CONTACT.WHATSAPP_LABEL}
            >
              <MessageCircle className={LAYOUT.FOOTER_CONTACT_ICON} aria-hidden="true" />
              {CONTACT.PHONE}
            </a>
          </div>

          <div className={LAYOUT.FOOTER_SOCIAL} role="list" aria-label="Social media">
            <a
              href={SOCIAL.INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className={LAYOUT.FOOTER_SOCIAL_LINK}
              aria-label={layout.SOCIAL.INSTAGRAM_LABEL}
              role="listitem"
            >
              <InstagramIcon className={LAYOUT.FOOTER_SOCIAL_ICON} />
            </a>
            <a
              href={SOCIAL.FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className={LAYOUT.FOOTER_SOCIAL_LINK}
              aria-label={layout.SOCIAL.FACEBOOK_LABEL}
              role="listitem"
            >
              <FacebookIcon className={LAYOUT.FOOTER_SOCIAL_ICON} />
            </a>
            <a
              href={SOCIAL.WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className={LAYOUT.FOOTER_SOCIAL_LINK}
              aria-label={layout.SOCIAL.WHATSAPP_LABEL}
              role="listitem"
            >
              <MessageCircle className={LAYOUT.FOOTER_SOCIAL_ICON} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className={LAYOUT.FOOTER_BOTTOM}>
          <div className={LAYOUT.FOOTER_LOCATION_ROW}>
            <span className={LAYOUT.FOOTER_LOCATION_DOT} />
            <p className={LAYOUT.FOOTER_LOCATION_TEXT}>{layout.LOCATIONS_FOOTER}</p>
          </div>

          <div className={LAYOUT.FOOTER_LEGAL}>
            <a href={ROUTES.LEGAL.PRIVACY} className={LAYOUT.FOOTER_LEGAL_LINK}>
              {layout.LEGAL.PRIVACY}
            </a>
            <span className={LAYOUT.FOOTER_LEGAL_SEPARATOR} aria-hidden="true" />
            <a href={ROUTES.LEGAL.TERMS} className={LAYOUT.FOOTER_LEGAL_LINK}>
              {layout.LEGAL.TERMS}
            </a>
            <span className={LAYOUT.FOOTER_LEGAL_SEPARATOR} aria-hidden="true" />
            <p className={LAYOUT.FOOTER_COPYRIGHT}>
              © {CURRENT_YEAR} {layout.HOTEL_NAME}. {layout.COPYRIGHT}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
