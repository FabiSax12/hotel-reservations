"use client";

import { useI18n } from "@/locales";

const NAV_KEYS = ["HOME", "ABOUT", "ROOMS", "CONTACT"] as const;

export function LandingFooter() {
  const { t } = useI18n();

  return (
    <footer className="bg-forest-950 border-t border-forest-900">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          <div className="flex flex-col gap-3">
            <span className="font-serif text-2xl tracking-[0.35em] uppercase text-stone-50">
              ALTAVERDE
            </span>
            <span className="text-xs tracking-[0.25em] uppercase text-stone-500">
              Luxury Nature Retreats · Costa Rica
            </span>
          </div>

          <nav>
            <ul className="flex flex-wrap gap-8">
              {NAV_KEYS.map((key) => (
                <li key={key}>
                  <a
                    href="#"
                    className="text-xs tracking-[0.25em] uppercase text-stone-500 hover:text-stone-300 transition-colors duration-300"
                  >
                    {t.COMMON.NAV[key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#"
            className="text-xs tracking-[0.25em] uppercase text-gold-500 hover:text-gold-400 transition-colors duration-300 border-b border-gold-500/40 pb-0.5"
          >
            {t.COMMON.ACTIONS.BOOK_NOW}
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-forest-900 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <p className="text-xs text-stone-700 tracking-wide">
            © 2024 ALTAVERDE. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 opacity-60" />
            <p className="text-xs text-stone-700 tracking-wide">
              Arenal & La Fortuna · Monteverde · Costa Rica
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
