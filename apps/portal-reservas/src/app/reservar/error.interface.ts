export interface ReserveErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
