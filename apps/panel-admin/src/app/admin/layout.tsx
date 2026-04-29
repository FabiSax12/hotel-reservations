"use client";

import type { ReactNode } from "react";
import { SidebarWrapper } from "@/features/sidebar/components/SidebarWrapper/SidebarWrapper";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-screen overflow-hidden w-screen bg-gray-50">
      <SidebarWrapper />
      <section className="flex-1 overflow-y-scroll">{children}</section>
    </main>
  );
}
