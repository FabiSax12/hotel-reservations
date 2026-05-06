import { EXPO_OUT } from "@/features/landing/constants/animations";

export const HEADER_ITEM = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EXPO_OUT } },
};

export const CARD_VARIANT = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.07, ease: EXPO_OUT },
  }),
};
