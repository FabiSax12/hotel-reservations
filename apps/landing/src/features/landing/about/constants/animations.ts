import { EXPO_OUT } from "@/features/landing/constants/animations";

export const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const REVEAL = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EXPO_OUT } },
};

export const MOSAIC_ITEM = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: EXPO_OUT } },
};
