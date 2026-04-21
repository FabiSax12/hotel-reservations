import Link from "next/link";
import { ROUTES } from "@/config/routes";

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const error = searchParams.error || "unknown_error";
  const description = searchParams.error_description || "An unexpected error occurred during authentication.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 px-4 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Authentication Error</h1>
        <p className="text-neutral-600 mb-6">{description}</p>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-left">
          <p className="text-xs font-mono text-amber-800">
            <strong>Error Code:</strong> {error}
          </p>
        </div>

        <Link
          href={ROUTES.AUTH.LOGIN}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 transition-colors w-full"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
