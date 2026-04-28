"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ROUTES } from "@/config/routes";
import { SidebarWrapper } from "@/features/sidebar/components/SidebarWrapper/SidebarWrapper";

const NO_SIDEBAR_ROUTES = new Set<string>([ROUTES.ADMIN.LOGIN, ROUTES.ADMIN.ACTIVATE]);

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const hideSidebar = NO_SIDEBAR_ROUTES.has(pathname);

  if (hideSidebar) {
    return <>{children}</>;
  }

  return (
    <main className="flex h-screen overflow-hidden w-screen bg-gray-50">
      <SidebarWrapper />
      <section className="flex-1 overflow-y-scroll">{children}</section>
    </main>
  );
}
