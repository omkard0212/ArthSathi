"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getSchemeBySlug } from "@/data/schemes";
import { useLanguage } from "@/context/LanguageContext";

const getBadgeStyles = (color: string) => {
  const styles = {
    emerald: "bg-emerald-100 text-emerald-800 border-emerald-200",
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    amber: "bg-amber-100 text-amber-800 border-amber-200",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
  };
  return styles[color as keyof typeof styles] || styles.emerald;
};

export default function SchemeDetail() {
  const params = useParams();
  const router = useRouter();
  const { t } = useLanguage();
  const slug = params.slug as string;

  const scheme = getSchemeBySlug(slug);

  if (!scheme) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Scheme not found</h1>
          <Link
            href="/schemes"
            className="text-emerald-600 hover:text-emerald-700 font-semibold"
          >
            ← Back to Schemes
          </Link>
        </div>
      </div>
    );
  }

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
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/schemes"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold mb-8 group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t("backToSchemes")}
          </Link>

          {/* Scheme Header */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 mb-8">
            <div className="flex items-start gap-6 mb-6">
              <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center text-5xl border border-slate-200">
                {scheme.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h1 className="text-4xl font-bold text-slate-900">{t(scheme.nameKey)}</h1>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold border whitespace-nowrap ${getBadgeStyles(
                      scheme.categoryColor
                    )}`}
                  >
                    {t(scheme.categoryKey)}
                  </span>
                </div>
                <p className="text-lg text-slate-600">{t(scheme.descKey)}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <svg
                className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5"
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
                <p className="text-sm font-bold text-emerald-900 mb-1">{t("eligibility")}</p>
                <p className="text-emerald-800">{t(scheme.eligibilityKey)}</p>
              </div>
            </div>
          </div>

          {/* Overview Section */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8 mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              {t("overview")}
            </h2>
            <p className="text-slate-700 leading-relaxed">{t(scheme.overviewKey)}</p>
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8 mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {t("benefits")}
            </h2>
            <ul className="space-y-3">
              {scheme.benefitKeys.map((key, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-slate-700">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility Criteria Section */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8 mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              {t("eligibilityCriteria")}
            </h2>
            <ul className="space-y-3">
              {scheme.eligibilityCriteriaKeys.map((key, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-slate-700">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Information Section */}
          <div className="bg-amber-50 rounded-2xl border border-amber-200 shadow-md p-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              {t("importantInfo")}
            </h2>
            <ul className="space-y-3">
              {scheme.importantInfoKeys.map((key, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-amber-900">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
