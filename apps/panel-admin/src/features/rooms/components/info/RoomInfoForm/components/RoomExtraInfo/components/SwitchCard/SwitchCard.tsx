import React from "react";
import { Card, Switch } from "@heroui/react";
import { SWITCH_CARD_STYLES as s } from "./SwitchCard.styles";
import { ICON_SIZES } from "@/features/rooms/constants/info.constants";
import type { SwitchCardProps } from "./SwitchCard.interface";

export const SwitchCard: React.FC<SwitchCardProps> = ({
  isActive,
  onChange,
  label,
  activeText,
  inactiveText,
  icon: Icon,
  ariaLabel,
}) => {
  return (
    <Card
      className={s.card(isActive)}
      onClick={() => onChange(!isActive)}
    >
      <Card.Content className={s.content}>
        <div className={s.header}>
          <div className={s.iconContainer(isActive)}>
            <Icon size={ICON_SIZES.SM} />
          </div>
          <div className={s.info}>
            <span className={s.label}>{label}</span>
            <span className={s.statusText(isActive)}>
              {isActive ? activeText : inactiveText}
            </span>
          </div>
        </div>
        <div className={s.switchWrapper}>
          <Switch
            isSelected={isActive}
            onChange={() => onChange(!isActive)}
            aria-label={ariaLabel}
          />
        </div>
      </Card.Content>
    </Card>
  );
};
