export type AuthErrorSearchParams = { [key: string]: string | string[] | undefined };
 
export interface AuthErrorPageProps {
  searchParams: Promise<AuthErrorSearchParams>;
}
 
export interface AuthErrorContentProps {
  searchParams: AuthErrorSearchParams;
}
