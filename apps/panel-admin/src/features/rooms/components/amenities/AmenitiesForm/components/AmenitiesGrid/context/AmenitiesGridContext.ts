import { createContext } from "react";
import type { AmenitiesGridProps } from "../AmenitiesGrid.interface";
import type { useAmenityAdding } from "../hooks/useAmenityAdding";
import type { useDeleteAmenityDialog } from "../hooks/useAmenityDelete";
import type { useAmenityEditing } from "../hooks/useAmenityEditing";
import type { useAmenityToggle } from "../hooks/useAmenityToggle";

type UseAmenityAddingReturn = ReturnType<typeof useAmenityAdding>;
type UseAmenityEditingReturn = ReturnType<typeof useAmenityEditing>;
type UseAmenityToggleReturn = ReturnType<typeof useAmenityToggle>;
type UseDeleteAmenityDialogReturn = ReturnType<typeof useDeleteAmenityDialog>;

export interface AmenitiesGridContextValue
  extends AmenitiesGridProps,
    UseAmenityAddingReturn,
    UseAmenityEditingReturn,
    UseAmenityToggleReturn,
    UseDeleteAmenityDialogReturn {}

export const AmenitiesGridContext = createContext<AmenitiesGridContextValue | null>(null);
