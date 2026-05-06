"use client";

import { useI18n } from "@/locales";
import { LAYOUT } from "@/features/landing/layout/constants/styles";
import { ROUTES } from "@/config/routes";
import { NAV_KEYS, NAV_HREFS, CURRENT_YEAR } from "@/features/landing/layout/constants/nav";
import { FooterContactLinks } from "./FooterContactLinks";
import { FooterSocialLinks } from "./FooterSocialLinks";

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
          <FooterContactLinks />
          <FooterSocialLinks />
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
