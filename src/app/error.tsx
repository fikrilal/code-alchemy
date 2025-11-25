"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center text-center p-8">
      <div>
        <h1 className="text-3xl font-semibold">Something went wrong</h1>
        <p className="text-slate-500 mt-2">{error?.message ?? "An unexpected error occurred."}</p>
        <button onClick={() => reset()} className="mt-6 px-4 py-2 border rounded">
          Try again
        </button>
      </div>
    </main>
  );
}
