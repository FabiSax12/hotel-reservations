import type { SidebarItemKey } from "../types/sidebarItemKey";
import type { SidebarSectionKey } from "../types/sidebarSectionKey";

export type SidebarTexts = {
  WRAPPER: {
    ARIA_LABEL: string;
  };
  HEADER: {
    LOGO: string;
    EXPAND: string;
    COLLAPSE: string;
  };
  ROUTES_SECTIONS: {
    SECTIONS: {
      [k in SidebarSectionKey]: string;
    };
    ITEMS: {
      [item in SidebarItemKey]: string;
    };
  };
  FOOTER: {
    LOGOUT: string;
    LOGGING_OUT: string;
  };
};
