export const isActiveRoute = (route: string, pathname: string) => {
  const normalizedPath = pathname || "";
  if (route.includes("[id]")) {
    return normalizedPath.startsWith(route.replace("/[id]", ""));
  }
  return normalizedPath === route || normalizedPath.startsWith(`${route}/`);
};
