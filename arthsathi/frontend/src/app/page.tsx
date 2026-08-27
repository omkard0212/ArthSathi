"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex items-center gap-2">
              {/* Financial Icon */}
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
              <span className="text-2xl font-bold text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer">
                {t("appName")}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative py-20 sm:py-28 lg:py-36">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Floating Card 1 - Top Right */}
              <div className="absolute top-20 right-10 lg:right-20 w-48 h-32 bg-emerald-50 rounded-2xl shadow-lg transform rotate-6 opacity-40 animate-float">
                <div className="p-4">
                  <div className="w-8 h-8 bg-emerald-200 rounded-full mb-2"></div>
                  <div className="h-2 bg-emerald-200 rounded w-3/4 mb-2"></div>
                  <div className="h-2 bg-emerald-200 rounded w-1/2"></div>
                </div>
              </div>

              {/* Floating Card 2 - Bottom Left */}
              <div className="absolute bottom-32 left-10 lg:left-20 w-44 h-28 bg-blue-50 rounded-2xl shadow-lg transform -rotate-6 opacity-40 animate-float-delayed">
                <div className="p-4">
                  <div className="w-6 h-6 bg-blue-200 rounded mb-2"></div>
                  <div className="h-2 bg-blue-200 rounded w-full mb-2"></div>
                  <div className="h-2 bg-blue-200 rounded w-2/3"></div>
                </div>
              </div>

              {/* Rupee Symbol - Subtle */}
              <div className="absolute top-1/3 left-1/4 text-8xl font-bold text-emerald-100 opacity-20 select-none hidden lg:block">
                ₹
              </div>

              {/* Abstract Circle */}
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-full opacity-20 blur-3xl hidden lg:block"></div>
            </div>

            {/* Hero Content */}
            <div className="relative text-center max-w-4xl mx-auto">
              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-tight">
                {t("heroHeading")}
              </h1>

              {/* Supporting Text */}
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
                {t("heroSubtext")}
              </p>

              {/* CTA Button */}
              <Link href="/onboarding">
                <button className="group relative px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg sm:text-xl font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-out">
                  <span className="relative z-10">{t("getStarted")}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Arrow Icon */}
                  <svg
                    className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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

              {/* Trust Indicators */}
              <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{t("securePrivate")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{t("multiLanguage")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{t("freeToUse")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
