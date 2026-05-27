"use client";

import { Button, Drawer, useOverlayState } from "@heroui/react";
import type { PermissionName } from "@hotel/db/types";
import { useEffect, useState } from "react";
import { useI18n } from "@/locales";
import { PERMISSION_CATEGORIES } from "../../constants/permissionCategories";
import { getUserPermissionsService, updateUserPermissions } from "../../services/permissions";
import type { PermissionDrawerProps } from "./PermissionDrawer.interface";

export function PermissionDrawer({ isOpen, onClose, admin, onSuccess }: PermissionDrawerProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<Set<PermissionName>>(
    new Set(admin?.permissions ?? []),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const state = useOverlayState({
    isOpen,
    onOpenChange: (open) => {
      if (!open) onClose();
    },
  });

  // Reset state when admin changes
  useEffect(() => {
    if (admin) {
      getUserPermissionsService(admin.id)
        .then((permissions) => {
          setSelectedPermissions(new Set(permissions));
          setError(null);
        })
        .catch(() => {
          setSelectedPermissions(new Set());
          setError("Failed to load permissions");
        });
    } else {
      setSelectedPermissions(new Set());
      setError(null);
    }
  }, [admin]);

  const handleTogglePermission = (permission: PermissionName) => {
    setSelectedPermissions((prev) => {
      const next = new Set(prev);
      if (next.has(permission)) {
        next.delete(permission);
      } else {
        next.add(permission);
      }
      return next;
    });
  };

  const handleSave = async () => {
    if (!admin) return;

    setIsSaving(true);
    setError(null);

    const result = await updateUserPermissions(admin.id, Array.from(selectedPermissions));

    setIsSaving(false);

    if ("error" in result) {
      const errorMessages: Record<string, string> = {
        SELF_MODIFY: "No puedes modificar tus propios permisos",
        OWNER_MODIFY: "No se pueden modificar los permisos del owner",
        INVALID_PERMISSION: "Permiso inválido",
        UNKNOWN_ERROR: "Error desconocido",
      };
      setError(errorMessages[result.error] ?? "Error desconocido");
      return;
    }

    onSuccess?.();
    onClose();
  };

  const { t } = useI18n();
  const TEXTS = t.ADMINS.PERMISSIONS;

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
            <Drawer.Heading>Permisos de {admin.full_name ?? admin.email}</Drawer.Heading>
          </Drawer.Header>

          <Drawer.Body>
            {error && (
              <div className="mb-4 rounded-lg bg-danger-50 p-3 text-danger text-sm">{error}</div>
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
              Cancelar
            </Button>
            <Button variant="primary" onPress={handleSave} isDisabled={isSaving}>
              {isSaving ? t.COMMON.ACTIONS.SAVING : t.COMMON.ACTIONS.SAVE}
            </Button>
          </Drawer.Footer>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  );
}
