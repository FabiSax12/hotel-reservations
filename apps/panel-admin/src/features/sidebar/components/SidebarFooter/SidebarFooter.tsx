import { Avatar, Button, Spinner } from "@heroui/react";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { signOutAction } from "@/features/auth/services/signOutAction";
import { useI18n } from "@/locales";
import { useAuth } from "@/shared/auth/context/useAuth";
import type { SidebarFooterProps } from "./SidebarFooter.interface";
import { SIDEBAR_FOOTER_STYLES as STYLES } from "./SidebarFooter.styles";

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

  return (
    <div className={STYLES.footer}>
      <div className={STYLES.identity}>
        <Avatar size="sm">
          <Avatar.Fallback>AS</Avatar.Fallback>
        </Avatar>
        {!isCollapsed && (
          <div className={STYLES.identityText}>
            <p className={STYLES.identityName}>{user?.user_metadata?.full_name ?? user?.email}</p>
            <p className={STYLES.identityRole}>{profile?.role ?? user?.role}</p>
          </div>
        )}
      </div>
      <Button
        isIconOnly={isCollapsed}
        onPress={handleSignOut}
        variant="danger-soft"
        size="sm"
        className={STYLES.logoutButton}
        type="submit"
        isPending={isSigningOut}
      >
        {({ isPending }) => (
          <>
            {isPending ? <Spinner color="current" size="sm" /> : <LogOut className={STYLES.icon} />}
            {!isCollapsed && (
              <span>{isPending ? t.SIDEBAR.FOOTER.LOGGING_OUT : t.SIDEBAR.FOOTER.LOGOUT}</span>
            )}
          </>
        )}
      </Button>
    </div>
  );
};
