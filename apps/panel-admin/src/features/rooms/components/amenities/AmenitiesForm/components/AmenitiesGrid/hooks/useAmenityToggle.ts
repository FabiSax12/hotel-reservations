import { useState } from "react";

export const useAmenityToggle = () => {
  const [activeDescId, setActiveDescId] = useState<string | null>(null);

  const toggleFlip = (id: string) => {
    setActiveDescId((prev) => (prev === id ? null : id));
  };

  return {
    activeDescId,
    toggleFlip,
  };
};
