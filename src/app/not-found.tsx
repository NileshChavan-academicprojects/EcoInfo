
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-medium text-neutral-200">404</h2>
        <div className="h-8 w-px bg-neutral-700"></div> {/* Vertical separator */}
        <p className="text-base text-neutral-400">This page could not be found.</p>
      </div>
      <div className="mt-8">
        <Link
          href="/dashboard"
          className="rounded-md px-4 py-2 text-sm text-neutral-300 ring-1 ring-neutral-700 hover:bg-neutral-800 hover:text-white transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
