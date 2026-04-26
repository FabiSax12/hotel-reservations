export const DATE_RANGE_PICKER_STYLES = {
  group:
    "rounded-full border border-gray-200 shadow-sm bg-white hover:shadow-md transition-shadow px-3 py-1.5 text-sm",
  calendarCell: [
    "data-[selected=true]:bg-emerald-100",
    "data-[selected=true]:text-emerald-900",

    "data-[selection-start=true]:[&>*]:!bg-emerald-900",
    "data-[selection-start=true]:[&>*]:!text-white",

    "data-[selection-end=true]:[&>*]:!bg-emerald-900",
    "data-[selection-end=true]:[&>*]:!text-white",
  ].join(" "),
} as const;
