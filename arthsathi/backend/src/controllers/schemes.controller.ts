import { Request, Response } from "express";

// Map onboarding goal IDs to DB category values
const GOAL_TO_CATEGORY: Record<string, string> = {
  wedding: "marriage",
  marriage: "marriage",
  business: "business",
  education: "education",
  health: "health",
  house: "health",
};

const SCHEMES = [
  {
    id: "ayushman-bharat",
    slug: "ayushman-bharat",
    name: "Ayushman Bharat",
    description: "Health coverage up to ₹5 lakh per year for low-income families.",
    category: "health",
    eligibility: "Income below ₹2.5L/year",
    icon: "🏥",
    maxIncomeMonthly: 20833, // ₹2.5L/year → ~₹20,833/month
    bestMatch: false,
  },
  {
    id: "pm-kisan",
    slug: "pm-kisan",
    name: "PM Kisan Samman Nidhi",
    description: "₹6,000/year direct income support for farmers.",
    category: "agriculture",
    eligibility: "Eligible farmers with qualifying land",
    icon: "🌾",
    maxIncomeMonthly: null,
    bestMatch: false,
  },
  {
    id: "mudra-yojana",
    slug: "mudra-yojana",
    name: "Pradhan Mantri Mudra Yojana",
    description: "Loans up to ₹10 lakh for small business owners.",
    category: "business",
    eligibility: "Small business owners and entrepreneurs",
    icon: "💼",
    maxIncomeMonthly: null,
    bestMatch: false,
  },
  {
    id: "national-scholarship",
    slug: "national-scholarship",
    name: "National Scholarship Portal",
    description: "Scholarships for students from low-income families.",
    category: "education",
    eligibility: "Students meeting income and academic criteria",
    icon: "📚",
    maxIncomeMonthly: 25000,
    bestMatch: false,
  },
  {
    id: "pmjjby",
    slug: "pmjjby",
    name: "PM Jeevan Jyoti Bima Yojana",
    description: "Life insurance cover of ₹2 lakh at just ₹436/year via your bank account.",
    category: "insurance",
    eligibility: "Age 18–50, bank account holder",
    icon: "🛡️",
    maxIncomeMonthly: null,
    bestMatch: false,
  },
  {
    id: "pmsby",
    slug: "pmsby",
    name: "PM Suraksha Bima Yojana",
    description: "Accident insurance of ₹2 lakh at only ₹20/year.",
    category: "insurance",
    eligibility: "Age 18–70, bank account holder",
    icon: "🤝",
    maxIncomeMonthly: null,
    bestMatch: false,
  },
  {
    id: "nrega",
    slug: "nrega",
    name: "MGNREGA",
    description: "Guaranteed 100 days of wage employment per year for rural households.",
    category: "employment",
    eligibility: "Rural households with adult members willing to do unskilled manual work",
    icon: "⛏️",
    maxIncomeMonthly: null,
    bestMatch: false,
  },
  {
    id: "jan-dhan",
    slug: "jan-dhan",
    name: "Pradhan Mantri Jan Dhan Yojana",
    description: "Zero-balance bank account with ₹1 lakh accident cover and free RuPay debit card.",
    category: "banking",
    eligibility: "Any Indian citizen without a bank account",
    icon: "🏦",
    maxIncomeMonthly: null,
    bestMatch: false,
  },
];

// Categories always shown regardless of goal (universal schemes)
const UNIVERSAL_CATEGORIES = ["insurance", "banking"];

export function getMatchedSchemes(req: Request, res: Response): void {
  const { goal, income } = req.query;
  const incomeNum = income && !isNaN(Number(income)) ? Number(income) : null;

  const category = goal && typeof goal === "string"
    ? GOAL_TO_CATEGORY[goal.toLowerCase()] ?? null
    : null;

  // Filter by income cap where applicable
  const incomeFiltered = SCHEMES.filter((s) => {
    if (s.maxIncomeMonthly === null) return true;
    if (incomeNum === null) return true;
    return incomeNum <= s.maxIncomeMonthly;
  });

  // Rank: goal-matched first (bestMatch), then universal, then rest
  const ranked = incomeFiltered.map((s) => ({
    ...s,
    bestMatch: category ? s.category === category : false,
  })).sort((a, b) => {
    if (a.bestMatch && !b.bestMatch) return -1;
    if (!a.bestMatch && b.bestMatch) return 1;
    const aUniversal = UNIVERSAL_CATEGORIES.includes(a.category);
    const bUniversal = UNIVERSAL_CATEGORIES.includes(b.category);
    if (aUniversal && !bUniversal) return -1;
    if (!aUniversal && bUniversal) return 1;
    return 0;
  });

  res.json({ schemes: ranked, total: ranked.length });
}
