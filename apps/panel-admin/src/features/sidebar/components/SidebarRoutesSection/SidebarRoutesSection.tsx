import { Separator } from "@heroui/react";
import { usePathname } from "next/navigation";
import { isActiveRoute } from "../../utils/isActiveRoute";
import { SidebarLink } from "../SidebarLink/SidebarLink";
import type { SidebarRoutesSectionProps } from "./SidebarRoutesSection.interface";
import { SIDEBAR_ROUTES_SECTION_STYLES as S } from "./SidebarRoutesSection.styles";

export const SidebarRoutesSection = ({ section, isCollapsed }: SidebarRoutesSectionProps) => {
    const pathname = usePathname();

    return (
        <div className={S.section}>
            {!isCollapsed && <p className={S.sectionTitle}>{section.title}</p>}
            {section.items.map((item) => (
                <SidebarLink
                    key={item.route}
                    Icon={item.icon}
                    route={item.route}
                    label={item.label}
                    isCollapsed={isCollapsed}
                    isActive={isActiveRoute(pathname, item.route)}
                />
            ))}
            {isCollapsed && <Separator className="my-4" />}
        </div>
    );
};
