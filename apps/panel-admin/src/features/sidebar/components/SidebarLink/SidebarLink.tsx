import Link from "next/link";
import type { SidebarLinkProps } from "./SidebarLink.interface";
import { SIDEBAR_LINK_STYLES as S } from "./SidebarLink.styles";

export const SidebarLink = ({ route, label, Icon, isCollapsed, isActive }: SidebarLinkProps) => {
    return <Link
        key={route}
        href={route}
        className={`${S.navItem} ${isActive ? S.navItemActive : S.navItemInactive}`}
    >
        <Icon className={S.icon} />
        <span className={isCollapsed ? S.collapsedLabel : undefined}>{label}</span>
    </Link>;
};
