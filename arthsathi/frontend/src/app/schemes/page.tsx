"use client";

import Link from "next/link";
import { SCHEMES } from "@/data/schemes";
import { useLanguage } from "@/context/LanguageContext";

// Helper function to get badge styles based on category
const getBadgeStyles = (color: string) => {
  const styles = {
    emerald: "bg-emerald-100 text-emerald-800 border-emerald-200",
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    amber: "bg-amber-100 text-amber-800 border-amber-200",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
  };
  return styles[color as keyof typeof styles] || styles.emerald;
};

export default function Schemes() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <svg
                className="w-8 h-8 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-2xl font-bold text-slate-900">{t("appName")}</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative py-12 px-6 lg:px-8">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top right gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-100/40 to-transparent rounded-full blur-3xl"></div>
          {/* Bottom left gradient */}
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100/40 to-transparent rounded-full blur-3xl"></div>
          {/* Center accent */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-100/20 via-blue-100/20 to-emerald-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-lg mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
              {t("schemesForYou")}
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              {t("basedOnProfile")}
            </p>
          </div>

          {/* Schemes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {SCHEMES.map((scheme) => (
              <div
                key={scheme.id}
                className="group bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  {/* Icon and Category Badge Row */}
                  <div className="flex items-start justify-between mb-4">
                    {/* Category Icon */}
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl flex items-center justify-center text-3xl border border-slate-200">
                      {scheme.icon}
                    </div>
                    
                    {/* Category Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getBadgeStyles(
                        scheme.categoryColor
                      )}`}
                    >
                      {t(scheme.categoryKey)}
                    </span>
                  </div>

                  {/* Scheme Name */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                    {t(scheme.nameKey)}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 mb-5 leading-relaxed min-h-[3rem]">
                    {t(scheme.descKey)}
                  </p>

                  {/* Eligibility */}
                  <div className="flex items-start gap-2 mb-6 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <svg
                      className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">
                        {t("eligibility")}
                      </p>
                      <p className="text-sm text-slate-700 font-medium">
                        {t(scheme.eligibilityKey)}
                      </p>
                    </div>
                  </div>

                  {/* Know More Button */}
                  <Link href={`/schemes/${scheme.slug}`}>
                    <button
                      className="group/btn w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                      aria-label={`Learn more about ${t(scheme.nameKey)}`}
                    >
                      <span>{t("knowMore")}</span>
                      <svg
                        className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Info Section */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-3 bg-white rounded-full shadow-md border border-slate-200">
              <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-slate-600 font-medium">
                {t("moreSchemes")}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
