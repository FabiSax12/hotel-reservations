import { Button } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/locales";
import { SIDEBAR_HEADER_STYLES as S } from "./SidebarHeader.styles";

export const SidebarHeader = ({ isCollapsed, toggleCollapsed }: { isCollapsed: boolean; toggleCollapsed: () => void }) => {
    const { t } = useI18n();

    return (
        <div className={S.header}>
            {!isCollapsed && (
                <div className={S.logo}>
                    {t.SIDEBAR.HEADER.LOGO}
                </div>
            )}
            <Button
                isIconOnly
                size="sm"
                variant="ghost"
                className={S.collapseButton}
                aria-label={isCollapsed ? t.SIDEBAR.HEADER.EXPAND : t.SIDEBAR.HEADER.COLLAPSE}
                onPress={toggleCollapsed}
            >
                {isCollapsed ? <ChevronRight className={S.icon} /> : <ChevronLeft className={S.icon} />}
            </Button>
        </div>
    )
}