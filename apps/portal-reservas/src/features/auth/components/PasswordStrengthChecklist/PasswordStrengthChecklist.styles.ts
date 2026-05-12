export const PASSWORD_STRENGTH_CHECKLIST_STYLES = {
  list: "mt-2 flex flex-col gap-1",
  item: (met: boolean) => `flex items-center gap-1.5 text-xs ${met ? "text-success" : "text-gray-400"}`,
  icon: "shrink-0",
} as const;
