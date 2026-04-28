"use client";

import { Avatar, Button, ListBox } from "@heroui/react";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { SIDEBAR_SECTIONS } from "../../constants/sidebar-links";
import { SIDEBAR_STYLES as S } from "./SidebarWrapper.styles";

const ADMIN_NAME = "Andrea Salazar";
const ADMIN_ROLE = "Administrador";

export const SidebarWrapper = () => {
  const pathname = usePathname() ?? "";
  const [isCollapsed, setIsCollapsed] = useState(false);

  const primaryItems = useMemo(
    () => SIDEBAR_SECTIONS.flatMap((section) => section.items.filter((item) => item.isPrimary)),
    [],
  );

  const isActiveRoute = (route: string) => {
    const normalizedPath = pathname || "";
    if (route.includes("[id]")) {
      return normalizedPath.startsWith(route.replace("/[id]", ""));
    }
    return normalizedPath === route || normalizedPath.startsWith(`${route}/`);
  };

  return (
    <aside
      className={`${S.wrapper} ${isCollapsed ? S.collapsed : S.expanded}`}
      aria-label="Navegacion principal"
    >
      <div className={S.header}>
        <div className={S.logo}>
          <span>Hotel</span>
          {!isCollapsed && <span>Admin</span>}
        </div>
        <Button
          isIconOnly
          size="sm"
          variant="ghost"
          className={S.collapseButton}
          aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          onPress={() => setIsCollapsed((prev) => !prev)}
        >
          {isCollapsed ? <ChevronRight className={S.icon} /> : <ChevronLeft className={S.icon} />}
        </Button>
      </div>

      <div className={S.body}>
        {isCollapsed ? (
          <ListBox aria-label="Navegacion primaria">
            {primaryItems.map((item) => (
              <ListBox.Item key={item.route} id={item.route} textValue={item.label}>
                <Link
                  href={item.route}
                  className={`${S.navItem} ${isActiveRoute(item.route) ? S.navItemActive : S.navItemInactive}`}
                >
                  <item.icon className={S.icon} />
                  <span className={S.collapsedLabel}>{item.label}</span>
                </Link>
              </ListBox.Item>
            ))}
          </ListBox>
        ) : (
          SIDEBAR_SECTIONS.map((section) => (
            <div key={section.title} className={S.section}>
              <p className={S.sectionTitle}>{section.title}</p>
              {/* <ListBox aria-label={section.title}> */}
              {section.items.map((item) => (
                // <ListBox.Item key={item.route} id={item.route} textValue={item.label}>
                <Link
                  key={item.route}
                  href={item.route}
                  className={`${S.navItem} ${isActiveRoute(item.route) ? S.navItemActive : S.navItemInactive
                    }`}
                >
                  <item.icon className={S.icon} />
                  <span>{item.label}</span>
                </Link>
                // </ListBox.Item>
              ))}
              {/* </ListBox> */}
            </div>
          ))
        )}
      </div>

      <div className={S.footer}>
        <div className={S.identity}>
          <Avatar size="sm">
            <Avatar.Fallback>AS</Avatar.Fallback>
          </Avatar>
          {!isCollapsed && (
            <div className={S.identityText}>
              <p className={S.identityName}>{ADMIN_NAME}</p>
              <p className={S.identityRole}>{ADMIN_ROLE}</p>
            </div>
          )}
        </div>
        <Button as={Link} href="/admin/login" variant="ghost" size="sm" className={S.logoutButton}>
          <LogOut className={S.icon} />
          {!isCollapsed && <span>Cerrar sesion</span>}
        </Button>
      </div>
    </aside>
  );
};
