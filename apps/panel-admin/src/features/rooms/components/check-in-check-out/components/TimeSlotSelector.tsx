"use client";

import { ListBox, Select } from "@heroui/react";
import * as LucideIcons from "lucide-react";
import type { TimeSlotSelectorProps } from "../CheckInCheckOut.interface";
import { CHECK_IN_CHECK_OUT_STYLES as STYLES } from "../CheckInCheckOut.styles";

export const TimeSlotSelector = ({
  label,
  placeholder,
  rangeHint,
  icon,
  selectedTimes,
  onChange,
  options,
  emptySelectionText,
}: TimeSlotSelectorProps) => {
  return (
    <div className={STYLES.section}>
      <div className={STYLES.sectionHeader}>
        <div className={STYLES.sectionIconWrapper}>{icon}</div>
        <h2 className={STYLES.sectionTitle}>{label}</h2>
      </div>
      <p className={STYLES.sectionDescription}>
        {placeholder}
        {rangeHint}
      </p>

      <Select
        aria-label={label}
        placeholder={placeholder}
        selectionMode="multiple"
        className={STYLES.selectInput}
        value={selectedTimes}
        onChange={(keys) => onChange(keys as string[])}
        variant="secondary"
      >
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox selectionMode="multiple">
            {options.map((time) => (
              <ListBox.Item key={time} id={time} textValue={time}>
                {time}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>

      {/* Selected check badges */}
      <div className={STYLES.listWrapper}>
        {selectedTimes.length === 0 ? (
          <span className={STYLES.noSelectedText}>{emptySelectionText}</span>
        ) : (
          selectedTimes.map((time) => (
            <span key={time} className={STYLES.timeBadge}>
              <LucideIcons.Clock size={12} className={STYLES.timeBadgeIcon} />
              {time}
            </span>
          ))
        )}
      </div>
    </div>
  );
};
