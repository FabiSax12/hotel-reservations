export interface SidebarRoutesSectionProps {
  section: {
    title: string;
    items: {
      label: string;
      route: string;
      icon: React.ComponentType<{ className?: string }>;
      isPrimary?: boolean;
    }[];
  };
  isCollapsed: boolean;
}
