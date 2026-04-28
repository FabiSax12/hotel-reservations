import { Separator } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useI18n } from "@/locales";
import { isActiveRoute } from "../../utils/isActiveRoute";
import { SidebarLink } from "../SidebarLink/SidebarLink";
import type { SidebarRoutesSectionProps } from "./SidebarRoutesSection.interface";
import { SIDEBAR_ROUTES_SECTION_STYLES as S } from "./SidebarRoutesSection.styles";

export const SidebarRoutesSection = ({ section, isCollapsed }: SidebarRoutesSectionProps) => {
  const pathname = usePathname();
  const { t } = useI18n();
  const sectionTitle = t.SIDEBAR.ROUTES_SECTIONS.SECTIONS[section.sectionKey];

  return (
    <div className={S.section}>
      {!isCollapsed && <p className={S.sectionTitle}>{sectionTitle}</p>}
      {section.items.map((item) => (
        <SidebarLink
          key={item.route}
          Icon={item.icon}
          route={item.route}
          label={t.SIDEBAR.ROUTES_SECTIONS.ITEMS[item.labelKey]}
          isCollapsed={isCollapsed}
          isActive={isActiveRoute(pathname, item.route)}
        />
      ))}
      {isCollapsed && <Separator className="my-4" />}
    </div>
  );
};
