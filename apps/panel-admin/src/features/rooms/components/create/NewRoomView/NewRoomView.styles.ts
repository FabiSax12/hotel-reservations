export const NEW_ROOM_VIEW_STYLES = {
  main: "min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden",
  background: "absolute inset-0 z-0 bg-cover bg-center scale-105 blur-[5px] transition-opacity duration-1000",
  overlay: "absolute inset-0 z-0 bg-black/5",
  blob: "absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl",
  content: "relative z-10",
  bgImage: "/images/room-bg.jpg"
} as const;
