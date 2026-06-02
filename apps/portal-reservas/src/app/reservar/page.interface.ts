export type ReserveSearchParams = { [key: string]: string | string[] | undefined };

export interface ReservePageProps {
  searchParams: Promise<ReserveSearchParams>;
}
