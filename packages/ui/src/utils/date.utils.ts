/**
 * @file date.utils.ts — Pure date helper functions.
 */

export const parseDateHelper = (isoStr: string) => {
  if (!isoStr) return 0;
  return new Date(isoStr + "T00:00:00").getTime();
};
