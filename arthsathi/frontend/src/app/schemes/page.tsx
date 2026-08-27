"use client";

import Link from "next/link";

const SCHEMES = [
  {
    id: 1,
    name: "Ayushman Bharat",
    description: "Health coverage up to ₹5 lakh per year for low-income families.",
    category: "Health",
    categoryColor: "emerald",
    eligibility: "Income below ₹2.5L/year",
  },
  {
    id: 2,
    name: "PM Kisan Samman Nidhi",
    description: "₹6,000/year direct income support for farmers.",
    category: "Agriculture",
    categoryColor: "blue",
    eligibility: "Eligible farmers with qualifying land",
  },
  {
    id: 3,
    name: "Pradhan Mantri Mudra Yojana",
    description: "Loans up to ₹10 lakh for small business owners.",
    category: "Business",
    categoryColor: "amber",
    eligibility: "Small business owners and entrepreneurs",
  },
  {
    id: 4,
    name: "National Scholarship Portal",
    description: "Scholarships for students from low-income families.",
    category: "Education",
    categoryColor: "purple",
    eligibility: "Students meeting income and academic criteria",
  },
];

const getBadgeStyles = (color: string) => {
  const styles = {
    emerald: "bg-emerald-100 text-emerald-800",
    blue: "bg-blue-100 text-blue-800",
    amber: "bg-amber-100 text-amber-800",
    purple: "bg-purple-100 text-purple-800",
  };
  return styles[color as keyof typeof styles] || styles.emerald;
};

export default function Schemes() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center gap-2">
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
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-slate-900 mb-4">
              Schemes For You
            </h1>
            <p className="text-lg text-slate-600">
              Based on your profile, here are the schemes you may be eligible for
            </p>
          </div>

          {/* Schemes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SCHEMES.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {scheme.name}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeStyles(
                      scheme.categoryColor
                    )}`}
                  >
                    {scheme.category}
                  </span>
                </div>

                <p className="text-slate-600 mb-4">
                  {scheme.description}
                </p>

                <div className="mb-6 p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">
                    Eligibility
                  </p>
                  <p className="text-sm text-slate-700">
                    {scheme.eligibility}
                  </p>
                </div>

                <button
                  className="w-full px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                  aria-label={`Learn more about ${scheme.name}`}
                >
                  Know More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
