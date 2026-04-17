export type Locale = string;

export interface TranslationMap {
  [key: string]: string | TranslationMap;
}
