import { Avatar, Button } from "@heroui/react";
import { signOut } from "@hotel/core/auth";
import { LogOut } from "lucide-react";
import type { SidebarFooterProps } from "./SidebarFooter.interface";
import { SIDEBAR_FOOTER_STYLES as S } from "./SidebarFooter.styles";

const ADMIN_NAME = "Andrea Salazar";
const ADMIN_ROLE = "Administrador";

export const SidebarFooter = ({ isCollapsed }: SidebarFooterProps) => {
    const handleLogout = () => {
        signOut();
    };

    return (
        <div className={S.footer}>
            <div className={S.identity}>
                <Avatar size="sm">
                    <Avatar.Fallback>AS</Avatar.Fallback>
                </Avatar>
                {!isCollapsed && (
                    <div className={S.identityText}>
                        <p className={S.identityName}>{ADMIN_NAME}</p>
                        <p className={S.identityRole}>{ADMIN_ROLE}</p>
                    </div>
                )}
            </div>
            <Button variant="ghost" size="sm" className={S.logoutButton} onPress={handleLogout}>
                <LogOut className={S.icon} />
                {!isCollapsed && <span>Cerrar sesion</span>}
            </Button>
        </div>
    );
};
