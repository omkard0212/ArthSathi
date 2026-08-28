import { Request, Response } from "express";

// Map onboarding goal IDs to DB category values
const GOAL_TO_CATEGORY: Record<string, string> = {
  wedding: "marriage",
  marriage: "marriage",
  business: "business",
  education: "education",
  health: "health",
  house: "health", // house repair → show health/general schemes
};

// Static scheme data matching the frontend — in a real app this comes from the DB
const SCHEMES = [
  {
    id: "ayushman-bharat",
    slug: "ayushman-bharat",
    name: "Ayushman Bharat",
    description: "Health coverage up to ₹5 lakh per year for low-income families.",
    category: "health",
    eligibility: "Income below ₹2.5L/year",
    icon: "🏥",
    bestMatch: true,
  },
  {
    id: "pm-kisan",
    slug: "pm-kisan",
    name: "PM Kisan Samman Nidhi",
    description: "₹6,000/year direct income support for farmers.",
    category: "agriculture",
    eligibility: "Eligible farmers with qualifying land",
    icon: "🌾",
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
    bestMatch: false,
  },
];

export function getMatchedSchemes(req: Request, res: Response): void {
  const { goal, income } = req.query;

  let matched = [...SCHEMES];

  if (goal && typeof goal === "string") {
    const category = GOAL_TO_CATEGORY[goal.toLowerCase()];
    if (category) {
      // Put matching category first, show all (so user always sees results)
      matched = [
        ...matched.filter((s) => s.category === category).map((s) => ({ ...s, bestMatch: true })),
        ...matched.filter((s) => s.category !== category).map((s) => ({ ...s, bestMatch: false })),
      ];
    }
  }

  // Basic income filter — hide Ayushman Bharat if income > 250000/month (very high earner)
  if (income && !isNaN(Number(income)) && Number(income) > 250000) {
    matched = matched.filter((s) => s.id !== "ayushman-bharat");
  }

  res.json({ schemes: matched, total: matched.length });
}
