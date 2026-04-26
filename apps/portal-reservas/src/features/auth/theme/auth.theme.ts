// ─── Portal Reservas – Auth Feature Styles ───────────────────────────────────
// All Tailwind class strings for the auth feature, kept out of JSX.

export const AUTH_FORM_STYLES = {
  /** Full-screen centering wrapper */
  pageWrapper: "flex min-h-screen items-center justify-center bg-gray-50",

  /** Card that contains the form */
  card: "w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm",

  /** Card with centered text (e.g. verify-email) */
  cardCentered:
    "w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm",

  /** Page heading */
  heading: "mb-6 text-2xl font-bold text-gray-900",

  /** Page heading inside centered card */
  headingCentered: "mb-2 text-2xl font-bold text-gray-900",

  /** HeroUI Form column layout */
  form: "flex flex-col gap-5",

  /** Wrapper for a password input with an icon toggle button */
  passwordFieldWrapper: "relative w-full",

  /** Extra right padding so the text doesn't overlap the toggle button */
  passwordInput: "pr-10",

  /** Eye / hide toggle button (absolutely positioned inside the wrapper) */
  passwordToggleBtn: "absolute inset-y-0 right-0 h-full",

  /** Global error pill */
  globalError: "rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700",

  /** Extra top margin on the submit button */
  submitBtn: "mt-1",
} as const;

export const VERIFY_EMAIL_STYLES = {
  /** Emoji icon container */
  iconWrapper: "mb-4 text-5xl",

  /** Descriptive subtitle */
  description: "mb-6 text-sm text-gray-600",

  /** Back-to-login link */
  link: "text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline",
} as const;
