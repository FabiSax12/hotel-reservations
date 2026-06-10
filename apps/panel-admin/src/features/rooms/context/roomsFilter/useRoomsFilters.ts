import { useContext } from "react";
import { RoomsFilterContext } from "./roomsFilterContext";

export const useRoomsFilters = () => {
  const context = useContext(RoomsFilterContext);
  if (!context) {
    throw new Error("useRoomsFilters must be used within RoomsFilterProvider");
  }
  return context;
};
