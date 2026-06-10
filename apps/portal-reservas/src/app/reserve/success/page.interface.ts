export type SuccessSearchParams = { [key: string]: string | string[] | undefined };

export interface SuccessPageProps {
  searchParams: Promise<SuccessSearchParams>;
}
