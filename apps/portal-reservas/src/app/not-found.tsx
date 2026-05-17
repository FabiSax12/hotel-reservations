"use client";


import { useI18n } from "@/locales";

const NOT_FOUND_STYLES = {
  main: "flex min-h-[80vh] flex-col items-center justify-center p-8",
  wrapper: "flex flex-col items-center rounded-2xl bg-emerald-50/50 p-12 text-center border border-emerald-100 shadow-sm",
  title: "mb-4 text-4xl font-bold text-emerald-950",
  message: "mb-8 text-emerald-800/80",
  button: "rounded-lg bg-emerald-900 px-8 py-3 text-sm font-semibold text-emerald-50 transition-colors hover:bg-emerald-800",
} as const

export default function NotFound() {
  const { t } = useI18n();

  return (
    <main className={NOT_FOUND_STYLES.main}>
      <div className={NOT_FOUND_STYLES.wrapper}>
        <h2 className={NOT_FOUND_STYLES.title}>
          {t.COMMON.STATUS.NOT_FOUND_TITLE}
        </h2>
        <p className={NOT_FOUND_STYLES.message}>
          {t.COMMON.STATUS.NOT_FOUND_MESSAGE}
        </p>
        <a
          href="/"
          className={NOT_FOUND_STYLES.button}
        >
          {t.COMMON.STATUS.RETURN_HOME}
        </a>
      </div>
    </main>
  );
}
