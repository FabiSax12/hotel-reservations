import { useState } from "react";
import { SIDEBAR_LOCAL_STORAGE_KEY } from "../constants/localStorageKey";

export const useSidebarCollapsed = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(
    Boolean(localStorage.getItem(SIDEBAR_LOCAL_STORAGE_KEY) || false),
  );

  const toggleCollapsed = () => {
    setIsCollapsed((prev) => !prev);
    localStorage.setItem(SIDEBAR_LOCAL_STORAGE_KEY, String(!isCollapsed));
  };

  return { isCollapsed, toggleCollapsed };
};
