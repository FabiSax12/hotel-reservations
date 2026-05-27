"use server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";

export default async function Page() {
  throw redirect(ROUTES.ADMIN.DASHBOARD);
}
