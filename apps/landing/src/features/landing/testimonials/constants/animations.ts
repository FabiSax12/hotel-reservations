import { EXPO_OUT } from "@/features/landing/constants/animations";

export const HEADER_ITEM = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EXPO_OUT } },
};

export const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO_OUT } },
};

export const CARD_VARIANTS_REDUCED = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};
