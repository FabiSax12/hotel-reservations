"use client";

import { useI18n } from "@/locales";
import { LAYOUT } from "@/features/landing/layout/constants/styles";

const NAV_KEYS = ["HOME", "ABOUT", "ROOMS", "CONTACT"] as const;

export function LandingFooter() {
  const { t } = useI18n();

  return (
    <footer className={LAYOUT.FOOTER_WRAPPER}>
      <div className={LAYOUT.FOOTER_INNER}>
        <div className={LAYOUT.FOOTER_TOP}>
          <div className={LAYOUT.FOOTER_BRAND}>
            <span className={LAYOUT.FOOTER_HOTEL_NAME}>
              {t.COMMON.LAYOUT.HOTEL_NAME}
            </span>
            <span className={LAYOUT.FOOTER_TAGLINE}>
              {t.COMMON.LAYOUT.TAGLINE}
            </span>
          </div>

          <nav>
            <ul className={LAYOUT.FOOTER_LINKS}>
              {NAV_KEYS.map((key) => (
                <li key={key}>
                  <a href="#" className={LAYOUT.FOOTER_LINK}>
                    {t.COMMON.NAV[key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href="#" className={LAYOUT.FOOTER_BOOK}>
            {t.COMMON.ACTIONS.BOOK_NOW}
          </a>
        </div>

        <div className={LAYOUT.FOOTER_BOTTOM}>
          <p className={LAYOUT.FOOTER_COPYRIGHT}>
            {t.COMMON.LAYOUT.COPYRIGHT}
          </p>
          <div className={LAYOUT.FOOTER_LOCATION_ROW}>
            <span className={LAYOUT.FOOTER_LOCATION_DOT} />
            <p className={LAYOUT.FOOTER_LOCATION_TEXT}>
              {t.COMMON.LAYOUT.LOCATIONS_FOOTER}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
