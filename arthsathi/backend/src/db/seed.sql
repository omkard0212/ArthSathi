-- =============================================================
-- ArthSathi Seed Data — Government Schemes
-- Run: psql arthsathi < src/db/seed.sql
-- =============================================================

INSERT INTO schemes (name, description, category, state, min_income, max_income, benefit_amount, source_url) VALUES
  (
    'Ayushman Bharat PM-JAY',
    'Health insurance coverage of up to ₹5 lakh per family per year for secondary and tertiary care hospitalisation.',
    'health', NULL, NULL, 250000, 500000,
    'https://pmjay.gov.in'
  ),
  (
    'PM Jeevan Jyoti Bima Yojana',
    'Life insurance cover of ₹2 lakh for death due to any cause. Premium is only ₹436/year.',
    'health', NULL, NULL, NULL, 200000,
    'https://jansuraksha.gov.in/PMJJBY.aspx'
  ),
  (
    'PM Suraksha Bima Yojana',
    'Accident insurance cover of ₹2 lakh for accidental death/full disability, ₹1 lakh for partial disability. Premium ₹20/year.',
    'health', NULL, NULL, NULL, 200000,
    'https://jansuraksha.gov.in/PMSBY.aspx'
  ),
  (
    'PM Kisan Samman Nidhi',
    'Direct income support of ₹6,000 per year to farmer families in three equal installments.',
    'business', NULL, NULL, NULL, 6000,
    'https://pmkisan.gov.in'
  ),
  (
    'Pradhan Mantri Mudra Yojana',
    'Collateral-free loans up to ₹10 lakh for non-farm small/micro enterprises.',
    'business', NULL, NULL, NULL, 1000000,
    'https://www.mudra.org.in'
  ),
  (
    'National Scholarship Portal',
    'Central pool of scholarships for pre-matric, post-matric, and merit-cum-means students from minority communities.',
    'education', NULL, NULL, 250000, NULL,
    'https://scholarships.gov.in'
  ),
  (
    'MGNREGA',
    'Guarantees at least 100 days of wage employment in a financial year to every rural household.',
    'health', NULL, NULL, NULL, NULL,
    'https://nrega.nic.in'
  ),
  (
    'Pradhan Mantri Jan Dhan Yojana',
    'Zero-balance basic savings account with free RuPay debit card and ₹1 lakh accidental insurance cover.',
    'health', NULL, NULL, NULL, NULL,
    'https://pmjdy.gov.in'
  ),
  (
    'Pradhan Mantri Awas Yojana (Gramin)',
    'Financial assistance of ₹1.2–1.3 lakh for construction of pucca houses for homeless/kutcha house beneficiaries.',
    'health', NULL, NULL, NULL, 130000,
    'https://pmayg.nic.in'
  ),
  (
    'PM Fasal Bima Yojana',
    'Crop insurance scheme that provides comprehensive insurance coverage against crop loss/damage.',
    'business', NULL, NULL, NULL, NULL,
    'https://pmfby.gov.in'
  )
ON CONFLICT DO NOTHING;
