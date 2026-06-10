export const formatCapacity = (adults: number, kids: number, unit: string): string =>
  `${adults + kids} ${unit}`;
