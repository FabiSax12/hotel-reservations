import { Avatar, Button } from "@heroui/react";
import { LogOut } from "lucide-react";
import { signOutAction } from "@/features/auth/services/signOutAction";
import { useAuth } from "@/shared/auth/context/useAuth";
import type { SidebarFooterProps } from "./SidebarFooter.interface";
import { SIDEBAR_FOOTER_STYLES as S } from "./SidebarFooter.styles";

export const SidebarFooter = ({ isCollapsed }: SidebarFooterProps) => {
  const { user, profile } = useAuth();

  console.log("User in SidebarFooter:", user, profile);

  return (
    <div className={S.footer}>
      <div className={S.identity}>
        <Avatar size="sm">
          <Avatar.Fallback>AS</Avatar.Fallback>
        </Avatar>
        {!isCollapsed && (
          <div className={S.identityText}>
            <p className={S.identityName}>{user?.user_metadata?.full_name ?? user?.email}</p>
            <p className={S.identityRole}>{profile?.role ?? user?.role}</p>
          </div>
        )}
      </div>
      <form action={signOutAction}>
        <Button variant="ghost" size="sm" className={S.logoutButton} type="submit">
          <LogOut className={S.icon} />
          {!isCollapsed && <span>Cerrar sesion</span>}
        </Button>
      </form>
    </div>
  );
};
