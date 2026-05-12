import type React from "react";
import type { AmenitiesGridProps } from "../AmenitiesGrid.interface";
import { useAmenityAdding } from "../hooks/useAmenityAdding";
import { useDeleteAmenityDialog } from "../hooks/useAmenityDelete";
import { useAmenityEditing } from "../hooks/useAmenityEditing";
import { useAmenityToggle } from "../hooks/useAmenityToggle";
import { AmenitiesGridContext } from "./AmenitiesGridContext";
import type { AmenitiesGridContextValue } from "./AmenitiesGridContext";

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
