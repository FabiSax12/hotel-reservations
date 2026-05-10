import { EXPO_OUT } from "@/features/landing/constants/animations";

export const AUTO_INTERVAL = 5500;

export const HEADER_STAGGER = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export const HEADER_ITEM = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EXPO_OUT } },
};

export const SLIDE_VARIANTS = {
  enter: (dir: number) => ({ x: dir > 0 ? "55%" : "-55%", opacity: 0, scale: 0.94, filter: "blur(0px)", transition: { type: "spring" as const, duration: 0.72, bounce: 0.08 } }),
  center: { x: "0%", opacity: 1, scale: 1, filter: "blur(0px)", transition: { type: "spring" as const, duration: 0.72, bounce: 0.08 } },
  exit: (dir: number) => ({ x: dir < 0 ? "55%" : "-55%", opacity: 0, scale: 0.94, filter: "blur(8px)", transition: { type: "spring" as const, duration: 0.28, bounce: 0 } }),
};

export const SLIDE_VARIANTS_REDUCED = {
  enter: (_dir: number) => ({ opacity: 0, transition: { duration: 0.2 } }),
  center: { opacity: 1, transition: { duration: 0.2 } },
  exit: (_dir: number) => ({ opacity: 0, transition: { duration: 0.12 } }),
};
