"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { useUserStore } from "@/store/userStore";
import { signOut } from "../services/authSessionService";

export function useAuthActions() {
  const router = useRouter();
  const { clearUser } = useUserStore();

  const handleLogout = async () => {
    try {
      await signOut();
      clearUser();
      router.push(ROUTES.HOME);
      router.refresh(); // Refresh to update server components/middleware state
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return { handleLogout };
}
