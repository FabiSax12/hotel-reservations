export interface SidebarLinkProps {
  route: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  isCollapsed?: boolean;
  isActive?: boolean;
}
