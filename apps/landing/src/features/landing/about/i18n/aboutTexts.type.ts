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
  STATS: {
    SUITES: AboutStats;
    YEARS: AboutStats;
    GUESTS: AboutStats;
    RATING: AboutStats;
  };
};
