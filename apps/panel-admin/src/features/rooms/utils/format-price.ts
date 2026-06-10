import type { SupportedLocale } from "@hotel/i18n";
import { PRICE_FORMAT_OPTIONS } from "@/features/rooms/constants/priceFormatOptions";

export const formatPrice = (price: number, locale: SupportedLocale): string => {
  let numberLocale: Intl.LocalesArgument;

  switch (locale) {
    case "en":
      numberLocale = "en-US";
      break;
    case "es":
      numberLocale = "es-CR";
      break;
    default:
      numberLocale = "en-US";
  }

  return new Intl.NumberFormat(numberLocale, PRICE_FORMAT_OPTIONS).format(price);
};
