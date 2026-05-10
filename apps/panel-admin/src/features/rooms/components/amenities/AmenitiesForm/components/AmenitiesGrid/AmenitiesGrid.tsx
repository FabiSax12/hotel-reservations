import React from "react";
import { AMENITIES_FORM_STYLES as STYLES } from "../../AmenitiesForm.styles";
import type { AmenitiesGridProps } from "./AmenitiesGrid.interface";
import { AddCustomTrigger } from "./components/AddCustomTrigger/AddCustomTrigger";
import { GridDeleteDialog } from "./components/GridDeleteDialog/GridDeleteDialog";
import { GridItem } from "./components/GridItem/GridItem";
import { AmenitiesGridProvider } from "./context/AmenitiesGridContext";

export const AmenitiesGrid = (props: AmenitiesGridProps) => {
  const { amenities } = props;

  return (
    <AmenitiesGridProvider {...props}>
      <div className={STYLES.grid}>
        {amenities.map((amenity) => (
          <GridItem key={amenity.id} amenity={amenity} />
        ))}

        <AddCustomTrigger />

        <GridDeleteDialog />
      </div>
    </AmenitiesGridProvider>
  );
};
