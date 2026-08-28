"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { VoiceButton } from "@/components/VoiceButton";

// Rule-based roadmap engine — no AI, fully explainable
function generateRoadmap(income: number, debts: number, goal: string) {
  const monthly = income;
  const debtRatio = debts > 0 ? debts / (monthly * 12) : 0; // debts as fraction of annual income
  const steps: { title: string; description: string; priority: "high" | "medium" | "low"; icon: string }[] = [];

  // Step 1 — Emergency fund (always first)
  steps.push({
    title: "Build an Emergency Fund",
    description: `Save at least ₹${(monthly * 3).toLocaleString("en-IN")} (3 months of income) in a savings account before anything else. This protects you from unexpected expenses.`,
    priority: "high",
    icon: "🛡️",
  });

  // Step 2 — Debt clearance if significant
  if (debtRatio > 0.3) {
    steps.push({
      title: "Clear High-Interest Debts First",
      description: `Your debts are significant relative to your income. Allocate at least 20% of monthly income (₹${(monthly * 0.2).toLocaleString("en-IN")}) toward repaying debts before other goals.`,
      priority: "high",
      icon: "📉",
    });
  }

  // Step 3 — Goal-specific step
  const goalSteps: Record<string, { title: string; description: string; icon: string }> = {
    wedding: {
      title: "Save for Wedding Expenses",
      description: `Start a dedicated wedding fund. Save ₹${(monthly * 0.15).toLocaleString("en-IN")}/month (15% of income). Use a recurring deposit (RD) at your bank for disciplined saving.`,
      icon: "💍",
    },
    business: {
      title: "Build Business Capital",
      description: `Save ₹${(monthly * 0.2).toLocaleString("en-IN")}/month toward business capital. Explore PM Mudra Yojana for collateral-free loans up to ₹10 lakh once you have a basic plan.`,
      icon: "💼",
    },
    education: {
      title: "Education Fund",
      description: `Open a recurring deposit for education expenses. Save ₹${(monthly * 0.15).toLocaleString("en-IN")}/month. Check the National Scholarship Portal — you may already be eligible.`,
      icon: "📚",
    },
    health: {
      title: "Health Coverage First",
      description: `Enroll in Ayushman Bharat if eligible — it covers up to ₹5 lakh hospital costs for free. Also save ₹${(monthly * 0.1).toLocaleString("en-IN")}/month as a health reserve.`,
      icon: "🏥",
    },
    house: {
      title: "House Repair Fund",
      description: `Save ₹${(monthly * 0.15).toLocaleString("en-IN")}/month in a separate account for house repairs. Prioritize structural repairs first, cosmetic changes later.`,
      icon: "🏠",
    },
  };

  const goalStep = goalSteps[goal] || goalSteps.health;
  steps.push({ ...goalStep, priority: "medium" });

  // Step 4 — Insurance
  steps.push({
    title: "Get Life & Health Insurance",
    description: `PMJJBY life insurance costs only ₹436/year and covers ₹2 lakh. PMSBY accident insurance costs ₹20/year. Both are available through your bank account.`,
    priority: "medium",
    icon: "📋",
  });

  // Step 5 — Long term savings
  if (monthly > 5000) {
    steps.push({
      title: "Start Small Savings",
      description: `Open a Post Office Recurring Deposit or PPF account. Even ₹${Math.round(monthly * 0.05).toLocaleString("en-IN")}/month (5% of income) compounds significantly over 5–10 years.`,
      priority: "low",
      icon: "🌱",
    });
  }

  return steps;
}

const PRIORITY_STYLES = {
  high:   { badge: "bg-red-100 text-red-700 border-red-200",    dot: "bg-red-500",    label: "High Priority" },
  medium: { badge: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500", label: "Important" },
  low:    { badge: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-500", label: "Long Term" },
};

export default function Roadmap() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const { speak, stop, isSpeaking, isSupported: ttsSupported } = useTextToSpeech();

  const goal   = searchParams.get("goal")   || "health";
  const income = Number(searchParams.get("income")  || "0");
  const debts  = Number(searchParams.get("debts")   || "0");

  const steps = generateRoadmap(income, debts, goal);

  useEffect(() => { return () => stop(); }, [stop]);

  function handleSpeak() {
    if (isSpeaking) { stop(); return; }
    const summary = `Your financial roadmap has ${steps.length} steps. Step 1: ${steps[0].title}. ${steps[0].description}`;
    speak(summary);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-2xl font-bold text-slate-900">{t("appName")}</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="py-12 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="animate-fade-up inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-lg mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="flex items-center justify-center gap-3 mb-2">
              <h1 className="animate-fade-up delay-100 text-4xl sm:text-5xl font-extrabold text-[#0f172a]">
                Your Roadmap
              </h1>
              {ttsSupported && (
                <VoiceButton variant="speak" active={isSpeaking} onClick={handleSpeak} ariaLabel="Read roadmap summary" />
              )}
            </div>
            <p className="animate-fade-up delay-200 text-lg text-slate-500">
              A personalised plan based on your income and goals
            </p>

            {/* Summary pill */}
            {income > 0 && (
              <div className="animate-fade-up delay-300 mt-4 inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-sm text-slate-600">
                <span>💰 ₹{income.toLocaleString("en-IN")}/month</span>
                {debts > 0 && <><span className="text-slate-300">·</span><span>🏦 ₹{debts.toLocaleString("en-IN")} debts</span></>}
                <span className="text-slate-300">·</span>
                <span className="capitalize">🎯 {goal.replace("_", " ")}</span>
              </div>
            )}
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const style = PRIORITY_STYLES[step.priority];
              return (
                <div
                  key={index}
                  className={`animate-fade-up bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_-2px_rgba(15,23,42,0.08)] p-6 delay-${(index + 2) * 100}`}
                >
                  <div className="flex items-start gap-4">
                    {/* Step number + icon */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                        {index + 1}
                      </div>
                      {index < steps.length - 1 && (
                        <div className="w-0.5 h-6 bg-slate-200 rounded-full"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-2xl">{step.icon}</span>
                        <h3 className="text-lg font-bold text-[#0f172a]">{step.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${style.badge}`}>
                          {style.label}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed text-sm">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/schemes?goal=${goal}&income=${income}`}
              className="group px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-full shadow-md hover:shadow-emerald-200 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              View Matching Schemes
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/document-safety"
              className="px-6 py-3 border-2 border-amber-200 text-amber-700 font-semibold rounded-full hover:border-amber-400 hover:bg-amber-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              📄 Check a Document
            </Link>
            <Link
              href="/onboarding"
              className="px-6 py-3 border-2 border-slate-200 text-slate-600 font-semibold rounded-full hover:border-emerald-300 hover:text-emerald-700 transition-all duration-200 flex items-center justify-center"
            >
              Update My Profile
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
