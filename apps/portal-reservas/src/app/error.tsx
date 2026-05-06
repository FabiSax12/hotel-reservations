/**
 * @file error.tsx — Route-level error boundary for the home page.
 */

"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-forest-950">
      <div className="flex flex-col items-center gap-6 text-center max-w-md px-6">
        <div className="w-14 h-14 rounded-full bg-red-900/30 border border-red-800/50 flex items-center justify-center">
          <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <h2 className="text-2xl font-serif text-stone-50">Algo salió mal</h2>
        <p className="text-stone-400 text-sm">
          No pudimos cargar la página. Por favor, intentá de nuevo.
        </p>
        <button
          type="button"
          onClick={reset}
          className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-forest-950 font-bold rounded-xl transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    </main>
  );
}
