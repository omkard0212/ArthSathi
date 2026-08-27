export interface Scheme {
  id: number;
  slug: string;
  name: string;
  nameKey: string;
  description: string;
  descKey: string;
  category: string;
  categoryKey: string;
  categoryColor: string;
  eligibility: string;
  eligibilityKey: string;
  icon: string;
  overviewKey: string;
  benefitKeys: string[];
  eligibilityCriteriaKeys: string[];
  importantInfoKeys: string[];
}

export const SCHEMES: Scheme[] = [
  {
    id: 1,
    slug: "ayushman-bharat",
    name: "Ayushman Bharat",
    nameKey: "ayushmanBharat",
    description: "Health coverage up to ₹5 lakh per year for low-income families.",
    descKey: "ayushmanDesc",
    category: "Health",
    categoryKey: "healthCategory",
    categoryColor: "emerald",
    eligibility: "Income below ₹2.5L/year",
    eligibilityKey: "ayushmanEligibility",
    icon: "🏥",
    overviewKey: "ayushmanOverview",
    benefitKeys: [
      "ayushmanBenefit1",
      "ayushmanBenefit2",
      "ayushmanBenefit3",
      "ayushmanBenefit4",
    ],
    eligibilityCriteriaKeys: [
      "ayushmanEligibilityCriteria1",
      "ayushmanEligibilityCriteria2",
      "ayushmanEligibilityCriteria3",
    ],
    importantInfoKeys: ["ayushmanInfo1", "ayushmanInfo2", "ayushmanInfo3"],
  },
  {
    id: 2,
    slug: "pm-kisan",
    name: "PM Kisan Samman Nidhi",
    nameKey: "pmKisan",
    description: "₹6,000/year direct income support for farmers.",
    descKey: "pmKisanDesc",
    category: "Agriculture",
    categoryKey: "agricultureCategory",
    categoryColor: "blue",
    eligibility: "Eligible farmers with qualifying land",
    eligibilityKey: "pmKisanEligibility",
    icon: "🌾",
    overviewKey: "pmKisanOverview",
    benefitKeys: ["pmKisanBenefit1", "pmKisanBenefit2", "pmKisanBenefit3", "pmKisanBenefit4"],
    eligibilityCriteriaKeys: [
      "pmKisanEligibilityCriteria1",
      "pmKisanEligibilityCriteria2",
      "pmKisanEligibilityCriteria3",
    ],
    importantInfoKeys: ["pmKisanInfo1", "pmKisanInfo2", "pmKisanInfo3"],
  },
  {
    id: 3,
    slug: "mudra-yojana",
    name: "Pradhan Mantri Mudra Yojana",
    nameKey: "mudraYojana",
    description: "Loans up to ₹10 lakh for small business owners.",
    descKey: "mudraDesc",
    category: "Business",
    categoryKey: "businessCategory",
    categoryColor: "amber",
    eligibility: "Small business owners and entrepreneurs",
    eligibilityKey: "mudraEligibility",
    icon: "💼",
    overviewKey: "mudraOverview",
    benefitKeys: ["mudraBenefit1", "mudraBenefit2", "mudraBenefit3", "mudraBenefit4"],
    eligibilityCriteriaKeys: [
      "mudraEligibilityCriteria1",
      "mudraEligibilityCriteria2",
      "mudraEligibilityCriteria3",
    ],
    importantInfoKeys: ["mudraInfo1", "mudraInfo2", "mudraInfo3"],
  },
  {
    id: 4,
    slug: "national-scholarship",
    name: "National Scholarship Portal",
    nameKey: "scholarshipPortal",
    description: "Scholarships for students from low-income families.",
    descKey: "scholarshipDesc",
    category: "Education",
    categoryKey: "educationCategory",
    categoryColor: "purple",
    eligibility: "Students meeting income and academic criteria",
    eligibilityKey: "scholarshipEligibility",
    icon: "📚",
    overviewKey: "scholarshipOverview",
    benefitKeys: [
      "scholarshipBenefit1",
      "scholarshipBenefit2",
      "scholarshipBenefit3",
      "scholarshipBenefit4",
    ],
    eligibilityCriteriaKeys: [
      "scholarshipEligibilityCriteria1",
      "scholarshipEligibilityCriteria2",
      "scholarshipEligibilityCriteria3",
    ],
    importantInfoKeys: ["scholarshipInfo1", "scholarshipInfo2", "scholarshipInfo3"],
  },
];

export const getSchemeBySlug = (slug: string): Scheme | undefined => {
  return SCHEMES.find((scheme) => scheme.slug === slug);
};
