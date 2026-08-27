import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center h-16">
            <div className="flex items-center gap-2">
              <svg
                className="w-8 h-8 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-2xl font-bold text-slate-900">ArthSathi</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8">
        <div className="py-32 text-center">
          <h1 className="text-6xl font-bold text-slate-900 mb-6">
            Your Personal Financial Companion
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
            We help you find government schemes, manage your finances, and
            protect yourself from unfair agreements — in your own language.
          </p>

          <Link href="/onboarding">
            <button className="px-8 py-4 bg-emerald-600 text-white text-lg font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
              Get Started →
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
