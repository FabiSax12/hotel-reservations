"use client";

import { Button, Drawer, useOverlayState } from "@heroui/react";
import { useI18n } from "@/locales";
import { PERMISSION_CATEGORIES } from "../../constants/permissionCategories";
import { usePermissionDrawer } from "../../hooks/usePermissionDrawer";
import type { PermissionDrawerProps } from "./PermissionDrawer.interface";
import { PERMISSION_DRAWER_STYLES as STYLES } from "./PermissionDrawer.styles";

export function PermissionDrawer({ isOpen, onClose, admin, onSuccess }: PermissionDrawerProps) {
  const { t } = useI18n();
  const TEXTS = t.ADMINS.PERMISSIONS;

  const { selectedPermissions, isSaving, error, isLoading, handleTogglePermission, handleSave } =
    usePermissionDrawer({
      admin,
      onSuccess,
      onClose,
    });

  const state = useOverlayState({
    isOpen,
    onOpenChange: (open) => {
      if (!open) onClose();
    },
  });

  if (!admin) return null;

  return (
    <Drawer.Backdrop
      isOpen={state.isOpen}
      onOpenChange={state.setOpen}
      isDismissable={false}
      variant="blur"
    >
      <Drawer.Content placement="right">
        <Drawer.Dialog>
          <Drawer.Header>
            <Drawer.Heading>
              {TEXTS.TITLE} - {admin.full_name ?? admin.email}
            </Drawer.Heading>
          </Drawer.Header>

          <Drawer.Body>
            {error && <div className={STYLES.error}>{TEXTS.ERRORS[error]}</div>}

            {isLoading && <div className={STYLES.loading}>{t.COMMON.STATUS.LOADING}</div>}

            <div className={STYLES.categories}>
              {PERMISSION_CATEGORIES.map((category) => (
                <div key={category.labelKey}>
                  <h3 className={STYLES.categoryHeading}>
                    {TEXTS.CATEGORIES[category.labelKey] ?? category.labelKey}
                  </h3>
                  <div className={STYLES.permissions}>
                    {category.permissions.map((permission) => (
                      <label key={permission} className={STYLES.permissionLabel}>
                        <input
                          type="checkbox"
                          checked={selectedPermissions.has(permission)}
                          onChange={() => handleTogglePermission(permission)}
                          className={STYLES.checkbox}
                        />
                        <span className={STYLES.permissionText}>
                          {TEXTS.PERMISSION_LABELS[permission] ?? permission}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Drawer.Body>

          <Drawer.Footer>
            <Button slot="close" variant="secondary" onPress={onClose}>
              {t.COMMON.ACTIONS.CANCEL}
            </Button>
            <Button variant="primary" onPress={handleSave} isDisabled={isSaving || isLoading}>
              {isSaving ? t.COMMON.ACTIONS.SAVING : t.COMMON.ACTIONS.SAVE}
            </Button>
          </Drawer.Footer>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  );
}
