import { Avatar, Button, Spinner } from "@heroui/react";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { signOutAction } from "@/features/auth/services/signOutAction";
import { useI18n } from "@/locales";
import { useAuth } from "@/shared/auth/context/useAuth";
import type { SidebarFooterProps } from "./SidebarFooter.interface";
import { SIDEBAR_FOOTER_STYLES as S } from "./SidebarFooter.styles";

export const SidebarFooter = ({ isCollapsed }: SidebarFooterProps) => {
  const { user, profile } = useAuth();

  const { t } = useI18n();

  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOutAction();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  console.log("isSigningOut", isSigningOut);

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
      <Button isIconOnly={isCollapsed} onPress={handleSignOut} variant="danger-soft" size="sm" className={S.logoutButton} type="submit" isPending={isSigningOut}>
        {({ isPending }) => <>
          {isPending ? <Spinner color="current" size="sm" /> : <LogOut className={S.icon} />}
          {!isCollapsed && <span>{isPending ? t.SIDEBAR.FOOTER.LOGGING_OUT : t.SIDEBAR.FOOTER.LOGOUT}</span>}
        </>}
      </Button>
    </div>
  );
};
