/**
 * @file useGuestsSelection.ts — Hook for managing guests count state.
 */

import { useState } from "react";

export function useGuestsSelection(initialAdults = 2, initialChildren = 0, initialPets = 0) {
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
