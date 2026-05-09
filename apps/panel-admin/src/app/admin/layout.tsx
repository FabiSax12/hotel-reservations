"use client";

import type { ReactNode } from "react";
import { SidebarWrapper } from "@/features/sidebar/components/SidebarWrapper/SidebarWrapper";
import { ADMIN_LAYOUT_STYLES as STYLES } from "./layout.styles";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className={STYLES.main}>
      <SidebarWrapper />
      <section className={STYLES.section}>{children}</section>
    </main>
  );
}
