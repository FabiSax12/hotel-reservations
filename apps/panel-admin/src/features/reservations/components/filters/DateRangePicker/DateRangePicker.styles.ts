export const DATE_RANGE_PICKER_STYLES = {
  group: [
    "rounded-full border border-gray-200 shadow-sm bg-white hover:shadow-md transition-shadow px-3 py-1.5 text-sm",
    "[--focus:oklch(53.32%_0.1495_147.32)]",
  ].join(" "),
  segment: "data-[focused=true]:!bg-emerald-700 data-[focused=true]:!text-white",
  triggerIndicator: "!text-emerald-700",
  calendarCell: [
    "data-[selected=true]:bg-emerald-100",
    "data-[selected=true]:text-emerald-900",

    "data-[selection-start=true]:[&>*]:!bg-emerald-900",
    "data-[selection-start=true]:[&>*]:!text-white",

    "data-[selection-end=true]:[&>*]:!bg-emerald-900",
    "data-[selection-end=true]:[&>*]:!text-white",

    "data-[today=true]:[&>*]:!ring-0",
    "data-[today=true]:[&>*]:!outline-none",
    "data-[today=true]:[&>*]:!text-gray-800",
    "data-[today=true]:data-[selection-start=true]:[&>*]:!text-white",
    "data-[today=true]:data-[selection-end=true]:[&>*]:!text-white",
  ].join(" "),
  navButton:
    "!text-emerald-700 !bg-transparent data-[hovered=true]:!bg-emerald-50 hover:!bg-emerald-50",
  yearPickerTrigger: "group",
  yearPickerTriggerHeading: "group-data-[open=true]:!text-emerald-700",
  yearPickerTriggerIndicator: "!text-emerald-700",
  yearPickerCell: [
    "data-[selected=true]:!bg-emerald-900",
    "data-[selected=true]:!text-white",
    "[&[aria-selected=true]]:!bg-emerald-900",
    "[&[aria-selected=true]]:!text-white",
  ].join(" "),
} as const;
