export const AMENITY_CARD_STYLES = {
  // 3D Card Flip Animation System
  flipWrapper: "relative w-full min-h-[120px] [perspective:1000px] group",
  flipInner: (isFlipped: boolean) => `
    relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500 min-h-[120px] flex
    ${isFlipped ? "[transform:rotateY(180deg)]" : ""}
  `,
  flipFront: (isSelected: boolean) => `
    w-full h-full [backface-visibility:hidden] relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer min-h-[120px]
    ${isSelected 
      ? "bg-emerald-600 border-emerald-500 shadow-lg shadow-emerald-900/10 scale-[1.02] text-white" 
      : "bg-white/60 backdrop-blur-md border-white/50 hover:border-emerald-500/40 hover:bg-white/80 hover:shadow-sm text-emerald-950/80"
    }
  `,
  flipBack: (isSelected: boolean) => `
    w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] absolute inset-0 rounded-2xl p-4 flex flex-col justify-center items-center text-center transition-all duration-300 min-h-[120px] cursor-pointer
    ${isSelected 
      ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/10 scale-[1.02]" 
      : "bg-white border-2 border-slate-100 text-emerald-950/80 hover:bg-white/90"
    }
  `,
  checkIcon: "absolute bottom-1.5 left-1.5 text-white/90 z-10",
  
  cardTriggerBtn: (isSelected: boolean, position: typeof AMENITY_CARD_CONSTANTS.POS_LEFT | typeof AMENITY_CARD_CONSTANTS.POS_RIGHT) => `
    absolute top-1.5 z-30 p-1 rounded-lg transition-all hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center w-7 h-7 min-w-0 bg-transparent border-none shadow-none outline-none
    ${position === AMENITY_CARD_CONSTANTS.POS_LEFT ? "left-1.5" : "right-1.5"}
    ${isSelected 
      ? "text-emerald-100 hover:text-white hover:bg-white/10" 
      : "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10"
    }
  `,

  iconWrapper: (isSelected: boolean) => `
    p-3 rounded-xl transition-colors duration-300
    ${isSelected ? "bg-white/20 text-white" : "bg-emerald-50/80 text-emerald-700 group-hover:bg-emerald-500/10"}
  `,
  amenityName: (isSelected: boolean) => `
    font-semibold text-center text-sm transition-colors duration-300
    ${isSelected ? "text-white" : "group-hover:text-emerald-950"}
  `,

  descText: "text-[11px] leading-relaxed font-semibold px-2 text-center",

  leftBtnWrapper: "absolute top-1.5 left-1.5 z-30",
  rightBtnWrapper: "absolute top-1.5 right-1.5 z-30",

  dropdownItemContent: (type: typeof AMENITY_CARD_CONSTANTS.ACTION_EDIT | typeof AMENITY_CARD_CONSTANTS.ACTION_DELETE) => `
    flex items-center gap-2
    ${type === AMENITY_CARD_CONSTANTS.ACTION_EDIT ? "text-slate-700 hover:text-emerald-700" : "text-rose-600 hover:text-rose-700"}
  `,
  dropdownItemLabel: "text-sm font-medium",
};

export const AMENITY_CARD_CONSTANTS = {
  CHECK_ICON_SIZE: 20,
  TRIGGER_ICON_SIZE: 14,
  ACTION_EDIT: "edit",
  ACTION_DELETE: "delete",
  MENU_ARIA_LABEL: "Amenity Actions",
  VARIANT_DANGER: "danger" as const,
  TYPE_BUTTON: "button" as const,
  POS_LEFT: "left" as const,
  POS_RIGHT: "right" as const,
  FALLBACK_EDIT: "Editar",
  FALLBACK_DELETE: "Eliminar",
  FALLBACK_DETAILS: "Ver descripción",
  FALLBACK_LESS: "Ver menos",
} as const;
