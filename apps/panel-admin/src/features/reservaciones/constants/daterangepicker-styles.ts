export const DATE_RANGE_PICKER = Object.freeze({
  WRAPPER: "relative",
  CONTAINER: "flex items-stretch rounded-full border border-neutral-200 shadow-sm bg-white",
  FIELD_BASE: "flex flex-col justify-center px-5 py-2 rounded-full cursor-pointer transition min-w-[110px]",
  FIELD_ACTIVE: "bg-white shadow-lg",
  FIELD_INACTIVE: "hover:bg-black/5",
  FIELD_FLEX: "flex-1",
  LABEL: "text-[10px] font-extrabold tracking-widest text-neutral-800 uppercase mb-0.5",
  VALUE_EMPTY: "text-sm font-bold text-neutral-400",
  VALUE_FILLED: "text-sm font-bold text-emerald-950",
} as const);
