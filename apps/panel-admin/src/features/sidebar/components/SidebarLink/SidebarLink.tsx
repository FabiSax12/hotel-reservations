import Link from "next/link";
import type { SidebarLinkProps } from "./SidebarLink.interface";
import { SIDEBAR_LINK_STYLES as STYLES } from "./SidebarLink.styles";

export const SidebarLink = ({ route, label, Icon, isCollapsed, isActive }: SidebarLinkProps) => {
  return (
    <Link
      key={route}
      href={route}
      className={`${STYLES.navItem} ${isActive ? STYLES.navItemActive : STYLES.navItemInactive}`}
    >
      <Icon className={STYLES.icon} />
      <span className={isCollapsed ? STYLES.collapsedLabel : undefined}>{label}</span>
    </Link>
  );
};
