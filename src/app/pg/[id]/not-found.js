import Link from "next/link";

export default function PGNotFound() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6 text-4xl">
          🏠
        </div>
        <h1 className="text-2xl font-bold text-[#1a1a2e] mb-2">PG Not Found</h1>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          This listing may no longer be available or the link might be
          incorrect.
        </p>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 bg-[#1a1a2e] hover:bg-[#2d2d5e] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
        >
          Browse All PGs
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
