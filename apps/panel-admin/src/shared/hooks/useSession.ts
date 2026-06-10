import { useAuth } from "@/shared/auth/context/useAuth";

/** @deprecated Use useAuth from @/shared/auth/AuthProvider instead. */
export const useSession = () => {
  const { session, loading, error } = useAuth();
  return { session, loading, error };
};
