import { THEME_COLORS } from "@/features/rooms/constants/info.constants";

export const SWITCH_CARD_STYLES = {
  card: (isActive: boolean) =>
    `group cursor-pointer transition-all duration-300 ${
      isActive ? "border-emerald-200" : "border-rose-200"
    } hover:shadow-lg`,
  content: "flex flex-col gap-3 !items-start",
  header: "flex items-center gap-3 w-full",
  iconContainer: (isActive: boolean) =>
    `p-2 rounded-xl transition-colors duration-300 ${
      isActive ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
    }`,
  info: "flex flex-col",
  label: `text-[15px] font-black text-[${THEME_COLORS.ACCENT}] tracking-tight`,
  statusText: (isActive: boolean) =>
    `text-[11px] font-black tracking-wider ${
      isActive ? "text-emerald-600" : "text-rose-600"
    }`,
  switchWrapper: "mt-auto w-full flex justify-end",
} as const;
