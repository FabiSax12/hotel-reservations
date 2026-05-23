export type AboutStats = {
  VALUE: string;
  LABEL: string;
};

export type AboutTexts = {
  EYEBROW: string;
  HEADLINE: string;
  BODY: string;
  QUOTE: string;
  QUOTE_ATTRIBUTION: string;
  MOSAIC_ALT_1: string;
  MOSAIC_ALT_2: string;
  MOSAIC_ALT_3: string;
  MOSAIC_URL_1: string;
  MOSAIC_URL_2: string;
  MOSAIC_URL_3: string;
  STATS: {
    SUITES: AboutStats;
    YEARS: AboutStats;
    GUESTS: AboutStats;
    RATING: AboutStats;
  };
};
