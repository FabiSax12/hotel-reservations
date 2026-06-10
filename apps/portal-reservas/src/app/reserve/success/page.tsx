/**
 * @file page.tsx — Post-payment success route (/reserve/success).
 *
 * Server component: reads the gateway session ID from the URL and renders the
 * confirmation screen. A visit without a session ID falls back to the home page.
 */

import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { SESSION_ID_PARAM, SuccessView } from "@/features/checkout";
import type { SuccessPageProps } from "./page.interface";

export default async function ReserveSuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const raw = params[SESSION_ID_PARAM];
  const sessionId = Array.isArray(raw) ? raw[0] : raw;

  if (!sessionId) {
    redirect(ROUTES.HOME);
  }

  return <SuccessView sessionId={sessionId} />;
}
