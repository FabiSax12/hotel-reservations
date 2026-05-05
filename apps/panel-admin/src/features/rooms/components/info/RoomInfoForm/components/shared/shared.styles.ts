import { THEME_COLORS } from "@/features/rooms/constants/info.constants";

export const SHARED_FORM_STYLES = {
  section: "relative",
  sectionHeader: "flex flex-col items-center gap-1 mb-6",
  sectionTitle: `text-[11px] font-black uppercase tracking-[0.3em] text-[${THEME_COLORS.LABEL}] text-center`,
  fullWidth: "w-full",
  fieldGroup: "flex flex-col gap-3",
  label: `text-[12px] font-black uppercase tracking-widest text-[${THEME_COLORS.LABEL}] ml-2`,
  input: `w-full rounded-[24px] border-[${THEME_COLORS.BORDER}] focus:border-[${THEME_COLORS.PRIMARY}] h-14 px-6 bg-white/50 transition-all focus:bg-white focus:ring-4 focus:ring-[${THEME_COLORS.PRIMARY}]/10`,
  selectTrigger: `rounded-[24px] border-[${THEME_COLORS.BORDER}] focus:border-[${THEME_COLORS.PRIMARY}] h-16 bg-white/50 px-6`,
  listBox: `rounded-[32px] border-[${THEME_COLORS.BORDER}] shadow-2xl p-4 bg-white/90 backdrop-blur-xl`,
  inputWrapper: "relative flex items-center w-full",
  inputIcon: `absolute left-6 z-10 text-[${THEME_COLORS.PRIMARY}] pointer-events-none`,
  inputWithIcon: "pl-14",
  hint: `text-[10px] text-[${THEME_COLORS.LABEL}]/60 leading-relaxed text-center mt-auto pt-6 px-4 italic`,
  fieldHint: `text-[10px] text-[${THEME_COLORS.LABEL}]/70 mt-1 ml-2`,
} as const;
