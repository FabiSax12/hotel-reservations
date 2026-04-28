import { THEME_COLORS, THEME_INTERACTIONS } from "../../../constants/info.constants";

export const ROOM_INFO_FORM_STYLES = {
  container: `w-full max-w-4xl mx-auto p-6 md:p-10 bg-${THEME_COLORS.SURFACE} rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]`,
  title: "mb-8 text-3xl font-black tracking-tight text-gray-900 font-instrument-sans",
  form: "flex flex-col gap-8",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-6",
  fullWidth: "w-full",
  section: "flex flex-col gap-6",
  sectionTitle: "text-[11px] font-black uppercase tracking-widest text-gray-400 mb-4",
  fieldGroup: "flex flex-col gap-2",
  label: "text-[11px] font-black uppercase tracking-widest text-gray-500",
  input: "rounded-xl",
  selectTrigger: "rounded-xl",
  listBox: "rounded-xl",
  actions: "flex justify-end gap-4 mt-8 pt-8 border-t border-gray-100",
  submitButton: `bg-[${THEME_COLORS.PRIMARY}] text-white font-black uppercase tracking-widest text-[13px] px-8 py-4 rounded-xl transition-all duration-${THEME_INTERACTIONS.TRANSITION_DURATION} hover:opacity-90 active:scale-[${THEME_INTERACTIONS.ACTIVE_SCALE}]`,
  cancelButton: `bg-transparent text-gray-400 font-black uppercase tracking-widest text-[13px] px-8 py-4 rounded-xl transition-all duration-${THEME_INTERACTIONS.TRANSITION_DURATION} hover:text-gray-600 active:scale-[${THEME_INTERACTIONS.ACTIVE_SCALE}]`,
  switchContainer: `flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100`,
  switchLabel: "text-sm",
} as const;
