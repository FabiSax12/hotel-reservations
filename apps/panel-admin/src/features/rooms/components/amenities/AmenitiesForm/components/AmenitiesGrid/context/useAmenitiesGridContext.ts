import { useContext } from "react";
import { AmenitiesGridContext } from "./AmenitiesGridContext";

export const useAmenitiesGridContext = () => {
  const context = useContext(AmenitiesGridContext);
  if (!context) {
    throw new Error("useAmenitiesGridContext must be used within AmenitiesGridProvider");
  }
  return context;
};
