"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LANGUAGES = [
  "Hindi",
  "Marathi",
  "Tamil",
  "Telugu",
  "Bengali",
  "English",
];

const GOALS = [
  { id: "wedding", label: "Beti/Bete ki Shaadi" },
  { id: "business", label: "Start a Business" },
  { id: "education", label: "Education" },
  { id: "health", label: "Health Emergency" },
  { id: "house", label: "House Repair" },
];

export default function Onboarding() {
  const router = useRouter();
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    
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
      newErrors.language = "Please select your preferred language";
    }

    if (!formData.monthlyIncome && formData.monthlyIncome !== "0") {
      newErrors.monthlyIncome = "Please enter your monthly income";
    }

    if (!formData.existingDebts && formData.existingDebts !== "0") {
      newErrors.existingDebts = "Please enter your existing debts (or 0)";
    }

    if (!formData.goal) {
      newErrors.goal = "Please select your main goal";
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
      router.push("/schemes");
    }
  };

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
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Tell us about yourself
            </h1>
            <p className="text-lg text-slate-600">
              Share a few details so we can help you find schemes that may be right for you.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Language Preference */}
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-semibold text-slate-900 mb-2"
                >
                  Language Preference
                </label>
                <select
                  id="language"
                  value={formData.language}
                  onChange={(e) => handleInputChange("language", e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    touched.language && errors.language
                      ? "border-red-400"
                      : "border-slate-300"
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                >
                  <option value="">Select your preferred language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
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
                  Monthly Income (₹)
                </label>
                <input
                  type="number"
                  id="monthlyIncome"
                  min="0"
                  step="1"
                  value={formData.monthlyIncome}
                  onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                  placeholder="Enter your monthly income"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    touched.monthlyIncome && errors.monthlyIncome
                      ? "border-red-400"
                      : "border-slate-300"
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                />
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
                  Existing Debts (₹)
                </label>
                <input
                  type="number"
                  id="existingDebts"
                  min="0"
                  step="1"
                  value={formData.existingDebts}
                  onChange={(e) => handleInputChange("existingDebts", e.target.value)}
                  placeholder="Enter existing debts (or 0 if none)"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    touched.existingDebts && errors.existingDebts
                      ? "border-red-400"
                      : "border-slate-300"
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                />
                {touched.existingDebts && errors.existingDebts && (
                  <p className="mt-2 text-sm text-red-600">{errors.existingDebts}</p>
                )}
              </div>

              {/* Goal Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  What is your main goal?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {GOALS.map((goal) => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => handleGoalSelect(goal.id)}
                      className={`p-4 rounded-lg border-2 text-left ${
                        formData.goal === goal.id
                          ? "border-emerald-600 bg-emerald-50"
                          : "border-slate-200 bg-white hover:border-emerald-300"
                      } transition-colors`}
                    >
                      <span
                        className={`font-medium ${
                          formData.goal === goal.id
                            ? "text-emerald-900"
                            : "text-slate-700"
                        }`}
                      >
                        {goal.label}
                      </span>
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
                className="w-full px-8 py-4 bg-emerald-600 text-white text-lg font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Find Schemes →
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
