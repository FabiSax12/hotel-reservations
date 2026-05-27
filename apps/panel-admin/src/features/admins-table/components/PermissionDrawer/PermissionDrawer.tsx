"use client";

import { Button, Drawer, useOverlayState } from "@heroui/react";
import { useI18n } from "@/locales";
import { PERMISSION_CATEGORIES } from "../../constants/permissionCategories";
import { usePermissionDrawer } from "../../hooks/usePermissionDrawer";
import type { PermissionDrawerProps } from "./PermissionDrawer.interface";

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
            {error && (
              <div className="mb-4 rounded-lg bg-danger-50 p-3 text-danger text-sm">
                {TEXTS.ERRORS[error]}
              </div>
            )}

            {isLoading && (
              <div className="mb-4 rounded-lg bg-default-100 p-3 text-sm">
                {t.COMMON.STATUS.LOADING}
              </div>
            )}

            <div className="space-y-6">
              {PERMISSION_CATEGORIES.map((category) => (
                <div key={category.labelKey}>
                  <h3 className="mb-2 text-sm font-semibold text-default-600">
                    {TEXTS.CATEGORIES[category.labelKey] ?? category.labelKey}
                  </h3>
                  <div className="space-y-2">
                    {category.permissions.map((permission) => (
                      <label key={permission} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedPermissions.has(permission)}
                          onChange={() => handleTogglePermission(permission)}
                          className="h-4 w-4 rounded border-default-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-default-700">
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
