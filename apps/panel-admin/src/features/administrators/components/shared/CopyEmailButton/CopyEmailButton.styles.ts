export const COPY_EMAIL_BUTTON_STYLES = {
  button:
    "opacity-0 group-hover:opacity-100 " +
    "flex h-6 w-6 items-center justify-center rounded-md " +
    "text-gray-400 hover:bg-gray-100 hover:text-gray-600 " +
    "transition-all duration-150 cursor-pointer",

  buttonCopied:
    "flex h-6 w-6 items-center justify-center rounded-md " +
    "bg-emerald-50 text-emerald-600 " +
    "transition-all duration-150",

  icon: "shrink-0",
} as const;
