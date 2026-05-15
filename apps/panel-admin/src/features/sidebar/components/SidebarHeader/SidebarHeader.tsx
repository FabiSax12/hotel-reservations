import { Button } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/locales";
import { SIDEBAR_HEADER_STYLES as STYLES } from "./SidebarHeader.styles";
import type { SidebarHeaderProps } from "./SidebarHeaderProps.interface";

export const SidebarHeader = ({ isCollapsed, toggleCollapsed }: SidebarHeaderProps) => {
  const { t } = useI18n();

  return (
    <div className={STYLES.header}>
      {!isCollapsed && <div className={STYLES.logo}>{t.SIDEBAR.HEADER.LOGO}</div>}
      <Button
        isIconOnly
        size="sm"
        variant="ghost"
        className={STYLES.collapseButton}
        aria-label={isCollapsed ? t.SIDEBAR.HEADER.EXPAND : t.SIDEBAR.HEADER.COLLAPSE}
        onPress={toggleCollapsed}
      >
        {isCollapsed ? (
          <ChevronRight className={STYLES.icon} />
        ) : (
          <ChevronLeft className={STYLES.icon} />
        )}
      </Button>
    </div>
  );
};
