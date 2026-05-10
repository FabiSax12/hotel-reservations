import type React from "react";
import { createContext, useContext } from "react";
import type { AmenitiesGridProps } from "../AmenitiesGrid.interface";
import { useAmenityAdding } from "../hooks/useAmenityAdding";
import { useDeleteAmenityDialog } from "../hooks/useAmenityDelete";
import { useAmenityEditing } from "../hooks/useAmenityEditing";
import { useAmenityToggle } from "../hooks/useAmenityToggle";

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

const AmenitiesGridContext = createContext<AmenitiesGridContextValue | null>(null);

export const useAmenitiesGridContext = () => {
  const context = useContext(AmenitiesGridContext);
  if (!context) {
    throw new Error("useAmenitiesGridContext must be used within AmenitiesGridProvider");
  }
  return context;
};

export const AmenitiesGridProvider = ({
  children,
  ...props
}: AmenitiesGridProps & { children: React.ReactNode }) => {
  const adding = useAmenityAdding(props.handleAddCustom);
  const editing = useAmenityEditing(props.handleUpdateCustom);
  const toggle = useAmenityToggle();
  const deletion = useDeleteAmenityDialog(props.handleDeleteCustom);

  const value: AmenitiesGridContextValue = {
    ...props,
    ...adding,
    ...editing,
    ...toggle,
    ...deletion,
  };

  return <AmenitiesGridContext.Provider value={value}>{children}</AmenitiesGridContext.Provider>;
};
