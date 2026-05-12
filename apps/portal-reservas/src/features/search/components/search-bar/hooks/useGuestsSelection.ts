/**
 * @file useGuestsSelection.ts — Hook for managing guests count state.
 */

import { useState } from "react";
import { INITIAL_GUEST_SELECTIONS } from "../constants/guests.constants";

export function useGuestsSelection(
  initialAdults: number = INITIAL_GUEST_SELECTIONS.ADULTS,
  initialChildren: number = INITIAL_GUEST_SELECTIONS.CHILDREN,
  initialPets: number = INITIAL_GUEST_SELECTIONS.PETS,
) {
  const [adults, setAdults] = useState<number>(initialAdults);
  const [children, setChildren] = useState<number>(initialChildren);
  const [pets, setPets] = useState<number>(initialPets);

  return {
    adults,
    setAdults,
    children,
    setChildren,
    pets,
    setPets,
  };
}
