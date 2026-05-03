import { THEME_COLORS } from "../../../../../constants/info.constants";
import { SHARED_FORM_STYLES } from "../shared/shared.styles";

export const ROOM_EXTRA_INFO_STYLES = {
  ...SHARED_FORM_STYLES,
  gridContainer: "grid grid-cols-2 gap-4 mt-4",
  switchCard: (isActive: boolean) =>
    `group flex cursor-pointer transition-all duration-300 flex-col !items-start gap-3 p-4 bg-white rounded-[24px] border ${
      isActive ? "border-emerald-200" : "border-rose-200"
    } transition-all hover:shadow-lg`,
  cardHeader: "flex items-center gap-3 w-full",
  iconContainer: (isActive: boolean) =>
    `p-2 rounded-xl transition-colors duration-300 ${
      isActive ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
    }`,
  cardInfo: "flex flex-col",
  switchLabel: `text-[15px] font-black text-[${THEME_COLORS.ACCENT}] tracking-tight`,
  statusText: (isActive: boolean) =>
    `text-[11px] font-black tracking-wider ${
      isActive ? "text-emerald-600" : "text-rose-600"
    }`,
  switchWrapper: "mt-auto w-full flex justify-end",
} as const;
