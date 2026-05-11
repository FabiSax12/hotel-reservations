export const ADMINS_BG_IMAGE = "/images/room-bg.jpg" as const;

export const ADMINS_PAGE_STYLES = {
  root:    "relative min-h-screen overflow-hidden",
  bgLayer: "absolute inset-0 bg-cover bg-center bg-no-repeat",
  overlay: "absolute inset-0 bg-black/50",
  content: "relative z-10 flex flex-col gap-6 p-4 sm:p-8 min-h-screen",
} as const;
