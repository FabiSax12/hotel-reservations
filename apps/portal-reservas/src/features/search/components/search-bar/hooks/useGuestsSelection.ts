/**
 * @file useGuestsSelection.ts — Hook for managing guests count state.
 */

import { useState } from "react";
import { INITIAL_GUEST_SELECTIONS } from "../constants/guests.constants";

export function useGuestsSelection(
  initialAdults = INITIAL_GUEST_SELECTIONS.ADULTS,
  initialChildren = INITIAL_GUEST_SELECTIONS.CHILDREN,
  initialPets = INITIAL_GUEST_SELECTIONS.PETS,
) {
  const [adults, setAdults] = useState(initialAdults);
  const [children, setChildren] = useState(initialChildren);
  const [pets, setPets] = useState(initialPets);

  return {
    adults,
    setAdults,
    children,
    setChildren,
    pets,
    setPets,
  };
}
