"use client";

import { useI18n } from "@/locales";
import { SIDEBAR_SECTIONS } from "../../constants/sidebarSections";
import { useSidebarCollapsed } from "../../hooks/useSidebarCollapsed";
import { SidebarFooter } from "../SidebarFooter/SidebarFooter";
import { SidebarHeader } from "../SidebarHeader/SidebarHeader";
import { SidebarRoutesSection } from "../SidebarRoutesSection/SidebarRoutesSection";
import { SIDEBAR_STYLES as STYLES } from "./SidebarWrapper.styles";

export const SidebarWrapper = () => {
  const { isCollapsed, toggleCollapsed } = useSidebarCollapsed();
  const { t } = useI18n();

  return (
    <aside
      className={`${STYLES.wrapper} ${isCollapsed ? STYLES.collapsed : STYLES.expanded}`}
      aria-label={t.SIDEBAR.WRAPPER.ARIA_LABEL}
    >
      <SidebarHeader isCollapsed={isCollapsed} toggleCollapsed={toggleCollapsed} />

      <div className={STYLES.body}>
        {SIDEBAR_SECTIONS.map((section) => (
          <SidebarRoutesSection
            key={section.sectionKey}
            section={section}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>

      <SidebarFooter isCollapsed={isCollapsed} />
    </aside>
  );
};
