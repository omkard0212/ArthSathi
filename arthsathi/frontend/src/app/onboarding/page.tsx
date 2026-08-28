"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useSpeechToText } from "@/hooks/useSpeechToText";
import { VoiceButton } from "@/components/VoiceButton";

const LANGUAGES = [
  { value: "English", label: "English" },
  { value: "हिंदी", label: "हिंदी" },
  { value: "ਪੰਜਾਬੀ", label: "ਪੰਜਾਬੀ" },
  { value: "मराठी", label: "मराठी" },
  { value: "தமிழ்", label: "தமிழ்" },
  { value: "తెలుగు", label: "తెలుగు" },
  { value: "বাংলা", label: "বাংলা" },
];

const GOALS = [
  { id: "wedding", labelKey: "wedding", icon: "💍" },
  { id: "business", labelKey: "business", icon: "💼" },
  { id: "education", labelKey: "education", icon: "📚" },
  { id: "health", labelKey: "health", icon: "🏥" },
  { id: "house", labelKey: "houseRepair", icon: "🏠" },
];

export default function Onboarding() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const { speak, stop, isSpeaking, isSupported: ttsSupported } = useTextToSpeech();
  const { startListening, stopListening, isListening, transcript, isSupported: sttSupported } = useSpeechToText();
  const [inputMode, setInputMode] = useState<"voice" | "text">("text");

  const [formData, setFormData] = useState({
    language: "",
    monthlyIncome: "",
    existingDebts: "",
    goal: "",
  });

  const [errors, setErrors] = useState({
    language: "",
    monthlyIncome: "",
    existingDebts: "",
    goal: "",
  });

  const [touched, setTouched] = useState({
    language: false,
    monthlyIncome: false,
    existingDebts: false,
    goal: false,
  });

  // Set initial language in form
  useEffect(() => {
    setFormData((prev) => ({ ...prev, language: language }));
  }, [language]);

  // Stop speech on unmount
  useEffect(() => {
    return () => stop();
  }, [stop]);

  // Parse transcript into a number for the income field
  useEffect(() => {
    if (!transcript) return;
    const digits = transcript.replace(/[^\d]/g, "");
    if (digits) {
      handleInputChange("monthlyIncome", digits);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);

  function handleHeadingSpeak() {
    if (isSpeaking) {
      stop();
    } else {
      speak(`${t("tellUsAbout")}. ${t("shareDetails")}`);
    }
  }

  function handleMicClick() {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    // Update app language when language field changes
    if (field === "language" && LANGUAGES.find(l => l.value === value)) {
      setLanguage(value as "English" | "हिंदी" | "ਪੰਜਾਬੀ" | "मराठी" | "தமிழ்" | "తెలుగు" | "বাংলা");
    }
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleGoalSelect = (goalId: string) => {
    setFormData((prev) => ({ ...prev, goal: goalId }));
    setTouched((prev) => ({ ...prev, goal: true }));
    if (errors.goal) {
      setErrors((prev) => ({ ...prev, goal: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      language: "",
      monthlyIncome: "",
      existingDebts: "",
      goal: "",
    };

    if (!formData.language) {
      newErrors.language = t("pleaseSelectLanguage");
    }

    if (!formData.monthlyIncome && formData.monthlyIncome !== "0") {
      newErrors.monthlyIncome = t("pleaseEnterIncome");
    }

    if (!formData.existingDebts && formData.existingDebts !== "0") {
      newErrors.existingDebts = t("pleaseEnterDebts");
    }

    if (!formData.goal) {
      newErrors.goal = t("pleaseSelectGoal");
    }

    setErrors(newErrors);
    setTouched({
      language: true,
      monthlyIncome: true,
      existingDebts: true,
      goal: true,
    });

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Navigate to schemes page with user profile as query params (no DB yet on frontend)
      const params = new URLSearchParams({
        goal: formData.goal,
        income: formData.monthlyIncome,
      });
      router.push(`/schemes?${params.toString()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
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
          <div className="absolute top-20 right-10 w-32 h-32 bg-emerald-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="relative max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="animate-fade-up text-4xl sm:text-5xl font-extrabold text-[#0f172a]">
                {t("tellUsAbout")}
              </h1>
              {ttsSupported && (
                <VoiceButton
                  variant="speak"
                  active={isSpeaking}
                  onClick={handleHeadingSpeak}
                  ariaLabel={isSpeaking ? "Stop reading" : "Read heading aloud"}
                />
              )}
            </div>
            <p className="animate-fade-up delay-100 text-lg text-slate-500 mb-6">
              {t("shareDetails")}
            </p>

            {/* Voice / Text toggle */}
            <div className="animate-fade-up delay-200 inline-flex items-center gap-1 p-1 bg-slate-100 rounded-full">
              <button
                type="button"
                onClick={() => setInputMode("text")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  inputMode === "text"
                    ? "bg-white text-[#0f172a] shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                📝 Text
              </button>
              <button
                type="button"
                onClick={() => setInputMode("voice")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  inputMode === "voice"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                🎤 Voice
              </button>
            </div>
            {inputMode === "voice" && (
              <p className="mt-2 text-xs text-emerald-600 font-medium">Voice mode on — use the mic icon to fill fields</p>
            )}
          </div>

          {/* Form Card */}
          <div className="animate-fade-up delay-200 bg-white rounded-2xl shadow-[0_4px_24px_-4px_rgba(15,23,42,0.1)] border border-slate-200/80 p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Language Preference */}
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-semibold text-slate-900 mb-2"
                >
                  {t("languagePreference")}
                </label>
                <select
                  id="language"
                  value={formData.language}
                  onChange={(e) => handleInputChange("language", e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-slate-900 transition-all duration-200 focus:outline-none focus:ring-0 ${
                    touched.language && errors.language
                      ? "border-red-400"
                      : "border-slate-200 hover:border-slate-300 focus:border-emerald-500"
                  }`}
                >
                  <option value="">{t("selectLanguage")}</option>
                  {LANGUAGES.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
                {touched.language && errors.language && (
                  <p className="mt-2 text-sm text-red-600">{errors.language}</p>
                )}
              </div>

              {/* Monthly Income */}
              <div>
                <label
                  htmlFor="monthlyIncome"
                  className="block text-sm font-semibold text-slate-900 mb-2"
                >
                  {t("monthlyIncome")}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="monthlyIncome"
                    min="0"
                    step="1"
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                    placeholder={t("enterIncome")}
                    className={`w-full px-4 py-3 rounded-xl border-2 text-slate-900 transition-all duration-200 focus:outline-none focus:ring-0 ${
                      sttSupported ? "pr-12" : ""
                    } ${
                      touched.monthlyIncome && errors.monthlyIncome
                        ? "border-red-400"
                        : isListening
                        ? "border-emerald-500"
                        : "border-slate-200 hover:border-slate-300 focus:border-emerald-500"
                    }`}
                  />
                  {sttSupported && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <VoiceButton
                        variant="listen"
                        active={isListening}
                        onClick={handleMicClick}
                        size="sm"
                        ariaLabel={isListening ? "Stop listening" : "Speak your income"}
                      />
                    </div>
                  )}
                </div>
                {isListening && (
                  <p className="mt-1.5 text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                    Listening…
                  </p>
                )}
                {touched.monthlyIncome && errors.monthlyIncome && (
                  <p className="mt-2 text-sm text-red-600">{errors.monthlyIncome}</p>
                )}
              </div>

              {/* Existing Debts */}
              <div>
                <label
                  htmlFor="existingDebts"
                  className="block text-sm font-semibold text-slate-900 mb-2"
                >
                  {t("existingDebts")}
                </label>
                <input
                  type="number"
                  id="existingDebts"
                  min="0"
                  step="1"
                  value={formData.existingDebts}
                  onChange={(e) => handleInputChange("existingDebts", e.target.value)}
                  placeholder={t("enterDebts")}
                  className={`w-full px-4 py-3 rounded-xl border-2 text-slate-900 transition-all duration-200 focus:outline-none focus:ring-0 ${
                    touched.existingDebts && errors.existingDebts
                      ? "border-red-400"
                      : "border-slate-200 hover:border-slate-300 focus:border-emerald-500"
                  }`}
                />
                {touched.existingDebts && errors.existingDebts && (
                  <p className="mt-2 text-sm text-red-600">{errors.existingDebts}</p>
                )}
              </div>

              {/* Goal Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-4">
                  {t("mainGoal")}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {GOALS.map((goal) => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => handleGoalSelect(goal.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        formData.goal === goal.id
                          ? "border-emerald-500 bg-emerald-50 shadow-sm ring-1 ring-emerald-200"
                          : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{goal.icon}</span>
                          <span className={`font-medium text-sm ${formData.goal === goal.id ? "text-emerald-800" : "text-slate-700"}`}>
                            {t(goal.labelKey)}
                          </span>
                        </div>
                        {formData.goal === goal.id && (
                          <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                {touched.goal && errors.goal && (
                  <p className="mt-2 text-sm text-red-600">{errors.goal}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-full shadow-md hover:shadow-emerald-200 hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 ease-out overflow-hidden"
              >
                <span className="relative z-10">{t("findSchemes")}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <svg
                  className="relative z-10 inline-block ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </form>
          </div>

          {/* Optional: Subtle decorative icon */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-slate-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{t("infoSecure")}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
