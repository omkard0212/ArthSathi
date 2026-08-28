"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { VoiceButton } from "@/components/VoiceButton";

type Step = "upload" | "processing" | "result";

interface RiskyClause {
  text: string;
  reason: string;
  severity: "high" | "medium" | "low";
}

interface AnalysisResult {
  summary: string;
  riskyClauses: RiskyClause[];
  safeToSign: boolean;
  disclaimer: string;
}

// Static demo result — in production this comes from Claude API + OCR
const DEMO_RESULT: AnalysisResult = {
  summary:
    "This appears to be a loan agreement. The borrower agrees to repay ₹50,000 at 24% annual interest over 24 months. The lender has the right to seize assets if payment is missed for 30 days.",
  riskyClauses: [
    {
      text: "The lender may seize any movable or immovable property of the borrower upon default exceeding 30 days.",
      reason: "Asset seizure clause — if you miss even one payment, the lender can legally take your belongings or property.",
      severity: "high",
    },
    {
      text: "Interest shall compound monthly at 2% per month on outstanding principal.",
      reason: "Compounding monthly interest — 2% per month equals ~26.8% annual effective rate, significantly higher than stated.",
      severity: "high",
    },
    {
      text: "Any disputes shall be settled by arbitration chosen by the lender.",
      reason: "One-sided arbitration clause — the lender picks the arbitrator, which may not be fair to you.",
      severity: "medium",
    },
  ],
  safeToSign: false,
  disclaimer:
    "This is an AI-generated summary for informational purposes only and is not legal advice. Please consult a legal professional before signing any document.",
};

const SEVERITY_STYLES = {
  high: {
    border: "border-red-200 bg-red-50",
    badge: "bg-red-100 text-red-700 border-red-200",
    icon: "⚠️",
    label: "High Risk",
  },
  medium: {
    border: "border-amber-200 bg-amber-50",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    icon: "⚡",
    label: "Caution",
  },
  low: {
    border: "border-blue-200 bg-blue-50",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    icon: "ℹ️",
    label: "Note",
  },
};

export default function DocumentSafety() {
  const { t } = useLanguage();
  const { speak, stop, isSpeaking, isSupported: ttsSupported } = useTextToSpeech();

  const [step, setStep] = useState<Step>("upload");
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [question, setQuestion] = useState("");
  const [qaHistory, setQaHistory] = useState<{ q: string; a: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((file: File) => {
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") return;
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFileChange(file);
    },
    [handleFileChange]
  );

  const handleAnalyse = () => {
    if (!preview) return;
    setStep("processing");
    // Simulate API call delay — replace with real OCR + Claude API call
    setTimeout(() => {
      setResult(DEMO_RESULT);
      setStep("result");
    }, 2500);
  };

  const handleSummarySpeak = () => {
    if (!result) return;
    if (isSpeaking) { stop(); return; }
    const text = `${result.summary} There are ${result.riskyClauses.length} risky clauses. ${result.safeToSign ? "This document appears safe to sign." : "We recommend NOT signing this document without consulting someone first."}`;
    speak(text);
  };

  const handleAskQuestion = () => {
    if (!question.trim() || !result) return;
    // Stub — in production send to Claude with document context
    const stubAnswer = "Based on the document, this refers to the interest compounding clause in section 3. It means your owed amount grows every month, not just annually. Please consult a legal professional for specific advice.";
    setQaHistory((prev) => [...prev, { q: question.trim(), a: stubAnswer }]);
    setQuestion("");
  };

  const handleReset = () => {
    setStep("upload");
    setPreview(null);
    setResult(null);
    setQaHistory([]);
    setQuestion("");
    stop();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-2xl font-bold text-slate-900">{t("appName")}</span>
            </Link>
            <Link href="/" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">
              ← {t("backToHome") || "Back to Home"}
            </Link>
          </div>
        </div>
      </nav>

      <main className="py-12 px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl shadow-lg mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-3">
              {t("docSafetyTitle") || "Document Safety Check"}
            </h1>
            <p className="text-lg text-slate-500">
              {t("docSafetySubtext") || "Photo any agreement before signing. We'll explain every clause in plain language and flag anything risky."}
            </p>
          </div>

          {/* Step: Upload */}
          {step === "upload" && (
            <div className="space-y-6">
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-emerald-400 rounded-2xl p-12 text-center cursor-pointer transition-colors duration-200 bg-white hover:bg-emerald-50/30"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                  aria-label="Upload document"
                />
                {preview ? (
                  <div>
                    {preview.startsWith("data:image") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={preview} alt="Document preview" className="max-h-64 mx-auto rounded-xl object-contain shadow" />
                    ) : (
                      <div className="text-6xl mb-3">📄</div>
                    )}
                    <p className="mt-4 text-sm text-slate-500">Click to change document</p>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">📸</div>
                    <p className="text-lg font-semibold text-slate-700 mb-1">
                      {t("uploadDoc") || "Upload or photograph your document"}
                    </p>
                    <p className="text-sm text-slate-400">
                      {t("uploadHint") || "Tap to pick a photo, or drag & drop. Supports JPG, PNG, PDF."}
                    </p>
                  </div>
                )}
              </div>

              {preview && (
                <button
                  onClick={handleAnalyse}
                  className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg rounded-2xl shadow-md hover:shadow-lg hover:shadow-red-100 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  🔍 {t("analyseDoc") || "Analyse This Document"}
                </button>
              )}

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
                <strong>Note:</strong> {t("docPrivacyNote") || "Your document is processed securely and is not stored. Always consult a legal expert for important agreements."}
              </div>
            </div>
          )}

          {/* Step: Processing */}
          {step === "processing" && (
            <div className="text-center py-20 space-y-6">
              <div className="inline-flex flex-col items-center gap-4">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">🔍</div>
                </div>
                <p className="text-xl font-semibold text-slate-700">
                  {t("analysingDoc") || "Reading and analysing your document…"}
                </p>
                <div className="space-y-2 text-sm text-slate-400">
                  <p>✓ Extracting text from image</p>
                  <p>✓ Translating content</p>
                  <p className="text-emerald-600 animate-pulse">⟳ Identifying risky clauses…</p>
                </div>
              </div>
            </div>
          )}

          {/* Step: Result */}
          {step === "result" && result && (
            <div className="space-y-6">
              {/* Safety verdict */}
              <div className={`p-6 rounded-2xl border-2 ${result.safeToSign ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{result.safeToSign ? "✅" : "⛔"}</span>
                  <h2 className={`text-xl font-bold ${result.safeToSign ? "text-emerald-800" : "text-red-800"}`}>
                    {result.safeToSign
                      ? (t("safeToSign") || "Appears safe to sign")
                      : (t("notSafeToSign") || "Do NOT sign without getting advice first")}
                  </h2>
                  {ttsSupported && (
                    <VoiceButton variant="speak" active={isSpeaking} onClick={handleSummarySpeak} ariaLabel="Read summary aloud" />
                  )}
                </div>
                <p className="text-slate-700 leading-relaxed">{result.summary}</p>
              </div>

              {/* Risky clauses */}
              {result.riskyClauses.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-3">
                    ⚠️ {t("riskyClauses") || "Risky Clauses Found"} ({result.riskyClauses.length})
                  </h3>
                  <div className="space-y-4">
                    {result.riskyClauses.map((clause, i) => {
                      const style = SEVERITY_STYLES[clause.severity];
                      return (
                        <div key={i} className={`p-5 rounded-xl border ${style.border}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span>{style.icon}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${style.badge}`}>
                              {style.label}
                            </span>
                          </div>
                          <p className="text-slate-700 text-sm font-medium italic mb-2">"{clause.text}"</p>
                          <p className="text-slate-600 text-sm">{clause.reason}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Q&A */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">
                  💬 {t("askQuestion") || "Ask a question about this document"}
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAskQuestion()}
                    placeholder={t("questionPlaceholder") || "e.g. What happens if I miss a payment?"}
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    aria-label="Ask a question about the document"
                  />
                  <button
                    onClick={handleAskQuestion}
                    disabled={!question.trim()}
                    className="px-5 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Submit question"
                  >
                    Ask
                  </button>
                </div>
                {qaHistory.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {qaHistory.map((item, i) => (
                      <div key={i} className="space-y-2">
                        <p className="text-sm font-semibold text-slate-700">Q: {item.q}</p>
                        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">A: {item.a}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-slate-400 text-center leading-relaxed">{result.disclaimer}</p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 border-2 border-slate-200 text-slate-600 font-semibold rounded-xl hover:border-emerald-300 hover:text-emerald-700 transition-colors"
                >
                  Check Another Document
                </button>
                <Link href="/onboarding" className="flex-1">
                  <button className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-md transition-all">
                    Find Schemes for Me →
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
