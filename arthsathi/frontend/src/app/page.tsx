"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { VoiceButton } from "@/components/VoiceButton";

export default function Home() {
  const { t } = useLanguage();
  const { speak, stop, isSpeaking, isSupported: ttsSupported } = useTextToSpeech();

  // Stop speech on unmount
  useEffect(() => {
    return () => stop();
  }, [stop]);

  const heroText =
    "We help you find government schemes, manage your finances, and protect yourself from unfair agreements — in your own language.";

  function handleSpeak() {
    if (isSpeaking) {
      stop();
    } else {
      speak(heroText);
    }
  }

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
              <h1 className="animate-fade-up text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#0f172a] tracking-tight mb-8 leading-tight">
                {t("heroHeading")}
              </h1>

              {/* Supporting Text */}
              <p className="animate-fade-up delay-200 text-lg sm:text-xl lg:text-2xl text-slate-500 max-w-3xl mx-auto mb-4 leading-relaxed font-normal">
                {t("heroSubtext")}
              </p>

              {/* TTS button — reads the hero subtext aloud */}
              {ttsSupported && (
                <div className="animate-fade-up delay-200 flex justify-center mb-8">
                  <VoiceButton
                    variant="speak"
                    active={isSpeaking}
                    onClick={handleSpeak}
                    ariaLabel={isSpeaking ? "Stop reading" : "Read aloud"}
                  />
                </div>
              )}

              {/* CTA Button */}
              <div className="animate-fade-up delay-300">
                <Link href="/onboarding">
                  <button className="group relative px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg sm:text-xl font-semibold rounded-full shadow-lg hover:shadow-emerald-200 hover:shadow-2xl transform hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ease-out">
                    <span className="relative z-10">{t("getStarted")}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <svg
                      className="relative z-10 inline-block ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="animate-fade-up delay-500 mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-slate-500">{t("securePrivate")}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-slate-500">{t("multiLanguage")}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-slate-500">{t("freeToUse")}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <span className="font-medium text-slate-500">Voice Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Core Features Section ─────────────────────────────── */}
      <section className="bg-white border-t border-slate-100 py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">What ArthSathi Does</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a]">Three tools. One trusted companion.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 — Financial Roadmap */}
            <div className="group p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-3">Financial Roadmap</h3>
              <p className="text-slate-500 leading-relaxed text-sm">Tell us your income, debts, and goals — whether that's your daughter's wedding, starting a business, or paying off a loan. We build a personalized, step-by-step plan to get you there.</p>
            </div>

            {/* Pillar 2 — Scheme & Insurance Matching */}
            <div className="group p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-3">Scheme &amp; Insurance Matching</h3>
              <p className="text-slate-500 leading-relaxed text-sm">We match you to government schemes and insurance policies you're actually eligible for — based on your income, state, and goals — and walk you through applying, step by step, in your language.</p>
            </div>

            {/* Pillar 3 — Document Safety */}
            <div className="group p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-3">Document Safety</h3>
              <p className="text-slate-500 leading-relaxed text-sm">Before you sign any agreement — land, loan, or contract — photograph it. We summarize every clause in your language, flag risky terms, and answer your questions so you know exactly what you're signing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works Section ──────────────────────────────── */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-24 px-6 lg:px-8 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a]">How it works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Choose Your Language", desc: "Select from 7 Indian languages. Use voice or text — whichever is easier for you.", color: "emerald" },
              { step: "02", title: "Build Your Profile", desc: "Share your income, debts, and goals. Identity verified securely via Aadhaar / DigiLocker.", color: "blue" },
              { step: "03", title: "Get Your Roadmap", desc: "Receive a personalized financial plan and a list of schemes and insurance you qualify for.", color: "purple" },
              { step: "04", title: "Apply with Guidance", desc: "We fill the forms, read them back to you, and help you submit — no English knowledge needed.", color: "amber" },
            ].map((item) => (
              <div key={item.step} className="relative flex flex-col">
                <div className={`text-4xl font-extrabold mb-4 ${
                  item.color === "emerald" ? "text-emerald-200" :
                  item.color === "blue" ? "text-blue-200" :
                  item.color === "purple" ? "text-purple-200" : "text-amber-200"
                }`}>{item.step}</div>
                <h4 className="text-base font-bold text-[#0f172a] mb-2">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SDG / Impact Section ─────────────────────────────── */}
      <section className="bg-[#0f172a] py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-10">
          <div className="text-center sm:text-left">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-2">Social Impact</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Built for the people who need it most</h2>
            <p className="text-slate-400 max-w-xl text-sm leading-relaxed">Only 24% of India's population is financially literate. ArthSathi is built to close that gap — giving rural and underprivileged communities access to the money, protection, and opportunities they're already entitled to.</p>
          </div>
          <div className="flex gap-4 flex-shrink-0">
            <div className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-white/5 border border-white/10 text-center p-3">
              <span className="text-2xl font-extrabold text-emerald-400">SDG 1</span>
              <span className="text-xs text-slate-400 mt-1 leading-tight">No Poverty</span>
            </div>
            <div className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-white/5 border border-white/10 text-center p-3">
              <span className="text-2xl font-extrabold text-blue-400">SDG 10</span>
              <span className="text-xs text-slate-400 mt-1 leading-tight">Reduced Inequalities</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
