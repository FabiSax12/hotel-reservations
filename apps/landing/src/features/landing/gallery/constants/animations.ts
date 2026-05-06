import { EXPO_OUT } from "@/features/landing/constants/animations";

export const HEADER_ITEM = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO_OUT } },
};
