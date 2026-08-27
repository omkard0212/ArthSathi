"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "English" | "हिंदी" | "ਪੰਜਾਬੀ" | "मराठी" | "தமிழ்" | "తెలుగు" | "বাংলা";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  English: {
    // Landing Page
    appName: "ArthSathi",
    heroHeading: "Your Personal Financial Companion",
    heroSubtext:
      "We help you find government schemes, manage your finances, and protect yourself from unfair agreements — in your own language.",
    getStarted: "Get Started",
    securePrivate: "Secure & Private",
    multiLanguage: "Multi-language Support",
    freeToUse: "Free to Use",

    // Onboarding Page
    tellUsAbout: "Tell us about yourself",
    shareDetails:
      "Share a few details so we can help you find schemes that may be right for you.",
    languagePreference: "Language Preference",
    selectLanguage: "Select your preferred language",
    monthlyIncome: "Monthly Income (₹)",
    enterIncome: "Enter your monthly income",
    existingDebts: "Existing Debts (₹)",
    enterDebts: "Enter existing debts (or 0 if none)",
    mainGoal: "What is your main goal?",
    findSchemes: "Find Schemes",
    infoSecure: "Your information is secure and private",
    pleaseSelectLanguage: "Please select your preferred language",
    pleaseEnterIncome: "Please enter your monthly income",
    pleaseEnterDebts: "Please enter your existing debts (or 0)",
    pleaseSelectGoal: "Please select your main goal",

    // Goals
    wedding: "Beti/Bete ki Shaadi",
    business: "Start a Business",
    education: "Education",
    health: "Health Emergency",
    houseRepair: "House Repair",

    // Schemes Page
    schemesForYou: "Schemes For You",
    basedOnProfile:
      "Based on your profile, here are the schemes you may be eligible for",
    knowMore: "Know More",
    eligibility: "Eligibility",
    moreSchemes: "More schemes will be added based on your eligibility",

    // Categories
    healthCategory: "Health",
    agricultureCategory: "Agriculture",
    businessCategory: "Business",
    educationCategory: "Education",

    // Scheme Details Page
    backToSchemes: "Back to Schemes",
    overview: "Overview",
    benefits: "Benefits",
    eligibilityCriteria: "Eligibility Criteria",
    importantInfo: "Important Information",

    // Ayushman Bharat
    ayushmanBharat: "Ayushman Bharat",
    ayushmanDesc: "Health coverage up to ₹5 lakh per year for low-income families.",
    ayushmanEligibility: "Income below ₹2.5L/year",
    ayushmanOverview:
      "Ayushman Bharat is a flagship health insurance scheme providing comprehensive health coverage to economically vulnerable families across India.",
    ayushmanBenefit1: "Health coverage up to ₹5 lakh per family per year",
    ayushmanBenefit2: "Cashless treatment at empaneled hospitals",
    ayushmanBenefit3: "Coverage for pre and post-hospitalization expenses",
    ayushmanBenefit4: "Free medicines and diagnostic tests",
    ayushmanEligibilityCriteria1: "Annual family income below ₹2.5 lakh",
    ayushmanEligibilityCriteria2: "BPL cardholder or SECC database listed",
    ayushmanEligibilityCriteria3: "Valid Aadhaar card required",
    ayushmanInfo1: "No age limit for beneficiaries",
    ayushmanInfo2: "Covers pre-existing conditions from day one",
    ayushmanInfo3: "Portable across India - use in any state",

    // PM Kisan
    pmKisan: "PM Kisan Samman Nidhi",
    pmKisanDesc: "₹6,000/year direct income support for farmers.",
    pmKisanEligibility: "Eligible farmers with qualifying land",
    pmKisanOverview:
      "PM-KISAN provides direct income support to all landholding farmer families to supplement their financial needs for agricultural inputs.",
    pmKisanBenefit1: "₹6,000 per year in three equal installments",
    pmKisanBenefit2: "Direct Bank Transfer (DBT) to farmer's account",
    pmKisanBenefit3: "No intermediary - direct government support",
    pmKisanBenefit4: "Financial aid for purchasing seeds and fertilizers",
    pmKisanEligibilityCriteria1: "Small and marginal farmer families",
    pmKisanEligibilityCriteria2: "Landholding farmers with cultivable land",
    pmKisanEligibilityCriteria3: "Valid bank account and Aadhaar linkage",
    pmKisanInfo1: "Payment made every four months",
    pmKisanInfo2: "Family definition includes husband, wife, and minor children",
    pmKisanInfo3: "Registration can be done online or through CSCs",

    // Mudra Yojana
    mudraYojana: "Pradhan Mantri Mudra Yojana",
    mudraDesc: "Loans up to ₹10 lakh for small business owners.",
    mudraEligibility: "Small business owners and entrepreneurs",
    mudraOverview:
      "MUDRA scheme provides loans to micro and small enterprises for income-generating activities in manufacturing, trading, and service sectors.",
    mudraBenefit1: "Loans up to ₹10 lakh without collateral",
    mudraBenefit2: "Three categories: Shishu, Kishore, Tarun",
    mudraBenefit3: "Flexible repayment terms based on business cash flow",
    mudraBenefit4: "Lower interest rates compared to traditional loans",
    mudraEligibilityCriteria1: "Small business owners and entrepreneurs",
    mudraEligibilityCriteria2: "Non-corporate, non-farm enterprises",
    mudraEligibilityCriteria3: "Valid business plan and KYC documents",
    mudraInfo1: "No processing fees or hidden charges",
    mudraInfo2: "Loan amount: Shishu (up to ₹50K), Kishore (₹50K-₹5L), Tarun (₹5L-₹10L)",
    mudraInfo3: "Available through banks, NBFCs, and MFIs",

    // Scholarship Portal
    scholarshipPortal: "National Scholarship Portal",
    scholarshipDesc: "Scholarships for students from low-income families.",
    scholarshipEligibility: "Students meeting income and academic criteria",
    scholarshipOverview:
      "NSP is a one-stop solution for students seeking scholarships from various Central and State Government schemes.",
    scholarshipBenefit1: "Multiple scholarships under one platform",
    scholarshipBenefit2: "Direct Benefit Transfer to student's bank account",
    scholarshipBenefit3: "Pre and post-matric scholarship support",
    scholarshipBenefit4: "Merit-cum-means based financial assistance",
    scholarshipEligibilityCriteria1: "Students from economically weaker sections",
    scholarshipEligibilityCriteria2: "Meeting academic performance criteria",
    scholarshipEligibilityCriteria3: "Valid Aadhaar and bank account",
    scholarshipInfo1: "Single application for multiple schemes",
    scholarshipInfo2: "Completely online process - no physical documents",
    scholarshipInfo3: "Transparent tracking of application status",
  },
  हिंदी: {
    // Landing Page
    appName: "अर्थसाथी",
    heroHeading: "आपका व्यक्तिगत वित्तीय साथी",
    heroSubtext:
      "हम आपको सरकारी योजनाएं खोजने, अपने वित्त का प्रबंधन करने और अनुचित समझौतों से खुद को बचाने में मदद करते हैं — आपकी अपनी भाषा में।",
    getStarted: "शुरू करें",
    securePrivate: "सुरक्षित और निजी",
    multiLanguage: "बहुभाषा समर्थन",
    freeToUse: "उपयोग के लिए निःशुल्क",

    // Onboarding Page
    tellUsAbout: "हमें अपने बारे में बताएं",
    shareDetails:
      "कुछ विवरण साझा करें ताकि हम आपके लिए उपयुक्त योजनाएं खोजने में मदद कर सकें।",
    languagePreference: "भाषा प्राथमिकता",
    selectLanguage: "अपनी पसंदीदा भाषा चुनें",
    monthlyIncome: "मासिक आय (₹)",
    enterIncome: "अपनी मासिक आय दर्ज करें",
    existingDebts: "मौजूदा कर्ज (₹)",
    enterDebts: "मौजूदा कर्ज दर्ज करें (या 0 यदि कोई नहीं)",
    mainGoal: "आपका मुख्य लक्ष्य क्या है?",
    findSchemes: "योजनाएं खोजें",
    infoSecure: "आपकी जानकारी सुरक्षित और निजी है",
    pleaseSelectLanguage: "कृपया अपनी पसंदीदा भाषा चुनें",
    pleaseEnterIncome: "कृपया अपनी मासिक आय दर्ज करें",
    pleaseEnterDebts: "कृपया अपना मौजूदा कर्ज दर्ज करें (या 0)",
    pleaseSelectGoal: "कृपया अपना मुख्य लक्ष्य चुनें",

    // Goals
    wedding: "बेटी/बेटे की शादी",
    business: "व्यवसाय शुरू करें",
    education: "शिक्षा",
    health: "स्वास्थ्य आपातकाल",
    houseRepair: "घर की मरम्मत",

    // Schemes Page
    schemesForYou: "आपके लिए योजनाएं",
    basedOnProfile: "आपकी प्रोफाइल के आधार पर, ये योजनाएं आपके लिए उपयुक्त हो सकती हैं",
    knowMore: "और जानें",
    eligibility: "पात्रता",
    moreSchemes: "आपकी पात्रता के आधार पर और योजनाएं जोड़ी जाएंगी",

    // Categories
    healthCategory: "स्वास्थ्य",
    agricultureCategory: "कृषि",
    businessCategory: "व्यवसाय",
    educationCategory: "शिक्षा",

    // Scheme Details Page
    backToSchemes: "योजनाओं पर वापस जाएं",
    overview: "अवलोकन",
    benefits: "लाभ",
    eligibilityCriteria: "पात्रता मानदंड",
    importantInfo: "महत्वपूर्ण जानकारी",

    // Ayushman Bharat
    ayushmanBharat: "आयुष्मान भारत",
    ayushmanDesc: "निम्न आय वाले परिवारों के लिए प्रति वर्ष ₹5 लाख तक का स्वास्थ्य कवरेज।",
    ayushmanEligibility: "₹2.5 लाख प्रति वर्ष से कम आय",
    ayushmanOverview:
      "आयुष्मान भारत एक प्रमुख स्वास्थ्य बीमा योजना है जो पूरे भारत में आर्थिक रूप से कमजोर परिवारों को व्यापक स्वास्थ्य कवरेज प्रदान करती है।",
    ayushmanBenefit1: "प्रति परिवार प्रति वर्ष ₹5 लाख तक का स्वास्थ्य कवरेज",
    ayushmanBenefit2: "सूचीबद्ध अस्पतालों में कैशलेस उपचार",
    ayushmanBenefit3: "अस्पताल में भर्ती से पहले और बाद के खर्चों का कवरेज",
    ayushmanBenefit4: "मुफ्त दवाएं और नैदानिक परीक्षण",
    ayushmanEligibilityCriteria1: "₹2.5 लाख से कम वार्षिक पारिवारिक आय",
    ayushmanEligibilityCriteria2: "बीपीएल कार्डधारक या SECC डेटाबेस में सूचीबद्ध",
    ayushmanEligibilityCriteria3: "वैध आधार कार्ड आवश्यक",
    ayushmanInfo1: "लाभार्थियों के लिए कोई आयु सीमा नहीं",
    ayushmanInfo2: "पहले दिन से पहले से मौजूद स्थितियों को कवर करता है",
    ayushmanInfo3: "पूरे भारत में पोर्टेबल - किसी भी राज्य में उपयोग करें",

    // PM Kisan
    pmKisan: "पीएम किसान सम्मान निधि",
    pmKisanDesc: "किसानों के लिए ₹6,000/वर्ष प्रत्यक्ष आय समर्थन।",
    pmKisanEligibility: "योग्य भूमि वाले पात्र किसान",
    pmKisanOverview:
      "पीएम-किसान सभी भूमिधारी किसान परिवारों को कृषि इनपुट के लिए उनकी वित्तीय जरूरतों को पूरा करने के लिए प्रत्यक्ष आय समर्थन प्रदान करता है।",
    pmKisanBenefit1: "तीन समान किस्तों में प्रति वर्ष ₹6,000",
    pmKisanBenefit2: "किसान के खाते में सीधे बैंक ट्रांसफर (DBT)",
    pmKisanBenefit3: "कोई मध्यस्थ नहीं - सीधा सरकारी समर्थन",
    pmKisanBenefit4: "बीज और उर्वरक खरीदने के लिए वित्तीय सहायता",
    pmKisanEligibilityCriteria1: "लघु और सीमांत किसान परिवार",
    pmKisanEligibilityCriteria2: "खेती योग्य भूमि वाले भूमिधारी किसान",
    pmKisanEligibilityCriteria3: "वैध बैंक खाता और आधार लिंकेज",
    pmKisanInfo1: "हर चार महीने में भुगतान",
    pmKisanInfo2: "परिवार की परिभाषा में पति, पत्नी और नाबालिग बच्चे शामिल हैं",
    pmKisanInfo3: "ऑनलाइन या CSC के माध्यम से पंजीकरण किया जा सकता है",

    // Mudra Yojana
    mudraYojana: "प्रधानमंत्री मुद्रा योजना",
    mudraDesc: "छोटे व्यवसाय मालिकों के लिए ₹10 लाख तक का ऋण।",
    mudraEligibility: "छोटे व्यवसाय मालिक और उद्यमी",
    mudraOverview:
      "मुद्रा योजना विनिर्माण, व्यापार और सेवा क्षेत्रों में आय-उत्पादक गतिविधियों के लिए सूक्ष्म और लघु उद्यमों को ऋण प्रदान करती है।",
    mudraBenefit1: "बिना संपार्श्विक के ₹10 लाख तक का ऋण",
    mudraBenefit2: "तीन श्रेणियां: शिशु, किशोर, तरुण",
    mudraBenefit3: "व्यवसाय नकदी प्रवाह के आधार पर लचीली पुनर्भुगतान शर्तें",
    mudraBenefit4: "पारंपरिक ऋणों की तुलना में कम ब्याज दरें",
    mudraEligibilityCriteria1: "छोटे व्यवसाय मालिक और उद्यमी",
    mudraEligibilityCriteria2: "गैर-कॉर्पोरेट, गैर-कृषि उद्यम",
    mudraEligibilityCriteria3: "वैध व्यवसाय योजना और KYC दस्तावेज",
    mudraInfo1: "कोई प्रोसेसिंग फीस या छिपे हुए शुल्क नहीं",
    mudraInfo2: "ऋण राशि: शिशु (₹50 हजार तक), किशोर (₹50 हजार-₹5 लाख), तरुण (₹5 लाख-₹10 लाख)",
    mudraInfo3: "बैंकों, NBFC और MFI के माध्यम से उपलब्ध",

    // Scholarship Portal
    scholarshipPortal: "राष्ट्रीय छात्रवृत्ति पोर्टल",
    scholarshipDesc: "निम्न आय वाले परिवारों के छात्रों के लिए छात्रवृत्ति।",
    scholarshipEligibility: "आय और शैक्षणिक मानदंड पूरा करने वाले छात्र",
    scholarshipOverview:
      "NSP विभिन्न केंद्र और राज्य सरकार की योजनाओं से छात्रवृत्ति चाहने वाले छात्रों के लिए वन-स्टॉप समाधान है।",
    scholarshipBenefit1: "एक मंच के तहत कई छात्रवृत्तियां",
    scholarshipBenefit2: "छात्र के बैंक खाते में सीधा लाभ हस्तांतरण",
    scholarshipBenefit3: "प्री और पोस्ट-मैट्रिक छात्रवृत्ति समर्थन",
    scholarshipBenefit4: "मेरिट-सह-साधन आधारित वित्तीय सहायता",
    scholarshipEligibilityCriteria1: "आर्थिक रूप से कमजोर वर्गों के छात्र",
    scholarshipEligibilityCriteria2: "शैक्षणिक प्रदर्शन मानदंड पूरा करना",
    scholarshipEligibilityCriteria3: "वैध आधार और बैंक खाता",
    scholarshipInfo1: "कई योजनाओं के लिए एकल आवेदन",
    scholarshipInfo2: "पूरी तरह से ऑनलाइन प्रक्रिया - कोई भौतिक दस्तावेज नहीं",
    scholarshipInfo3: "आवेदन स्थिति की पारदर्शी ट्रैकिंग",
  },
  ਪੰਜਾਬੀ: {
    // Landing Page
    appName: "ਅਰਥਸਾਥੀ",
    heroHeading: "ਤੁਹਾਡਾ ਨਿੱਜੀ ਵਿੱਤੀ ਸਾਥੀ",
    heroSubtext:
      "ਅਸੀਂ ਤੁਹਾਨੂੰ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਲੱਭਣ, ਆਪਣੇ ਵਿੱਤ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰਨ ਅਤੇ ਗੈਰ-ਉਚਿਤ ਸਮਝੌਤਿਆਂ ਤੋਂ ਆਪਣੇ ਆਪ ਨੂੰ ਬਚਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਾਂ — ਤੁਹਾਡੀ ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ।",
    getStarted: "ਸ਼ੁਰੂ ਕਰੋ",
    securePrivate: "ਸੁਰੱਖਿਅਤ ਅਤੇ ਨਿੱਜੀ",
    multiLanguage: "ਬਹੁ-ਭਾਸ਼ਾ ਸਹਾਇਤਾ",
    freeToUse: "ਵਰਤੋਂ ਲਈ ਮੁਫ਼ਤ",

    // Onboarding Page
    tellUsAbout: "ਸਾਨੂੰ ਆਪਣੇ ਬਾਰੇ ਦੱਸੋ",
    shareDetails:
      "ਕੁਝ ਵੇਰਵੇ ਸਾਂਝੇ ਕਰੋ ਤਾਂ ਜੋ ਅਸੀਂ ਤੁਹਾਡੇ ਲਈ ਢੁਕਵੀਆਂ ਯੋਜਨਾਵਾਂ ਲੱਭਣ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕੀਏ।",
    languagePreference: "ਭਾਸ਼ਾ ਤਰਜੀਹ",
    selectLanguage: "ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ",
    monthlyIncome: "ਮਾਸਿਕ ਆਮਦਨ (₹)",
    enterIncome: "ਆਪਣੀ ਮਾਸਿਕ ਆਮਦਨ ਦਰਜ ਕਰੋ",
    existingDebts: "ਮੌਜੂਦਾ ਕਰਜ਼ੇ (₹)",
    enterDebts: "ਮੌਜੂਦਾ ਕਰਜ਼ੇ ਦਰਜ ਕਰੋ (ਜਾਂ 0 ਜੇਕਰ ਕੋਈ ਨਹੀਂ)",
    mainGoal: "ਤੁਹਾਡਾ ਮੁੱਖ ਟੀਚਾ ਕੀ ਹੈ?",
    findSchemes: "ਯੋਜਨਾਵਾਂ ਲੱਭੋ",
    infoSecure: "ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ ਸੁਰੱਖਿਅਤ ਅਤੇ ਨਿੱਜੀ ਹੈ",
    pleaseSelectLanguage: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ",
    pleaseEnterIncome: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਮਾਸਿਕ ਆਮਦਨ ਦਰਜ ਕਰੋ",
    pleaseEnterDebts: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਮੌਜੂਦਾ ਕਰਜ਼ੇ ਦਰਜ ਕਰੋ (ਜਾਂ 0)",
    pleaseSelectGoal: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਮੁੱਖ ਟੀਚਾ ਚੁਣੋ",

    // Goals
    wedding: "ਧੀ/ਪੁੱਤਰ ਦਾ ਵਿਆਹ",
    business: "ਕਾਰੋਬਾਰ ਸ਼ੁਰੂ ਕਰੋ",
    education: "ਸਿੱਖਿਆ",
    health: "ਸਿਹਤ ਐਮਰਜੈਂਸੀ",
    houseRepair: "ਘਰ ਦੀ ਮੁਰੰਮਤ",

    // Schemes Page
    schemesForYou: "ਤੁਹਾਡੇ ਲਈ ਯੋਜਨਾਵਾਂ",
    basedOnProfile: "ਤੁਹਾਡੀ ਪ੍ਰੋਫਾਈਲ ਦੇ ਆਧਾਰ 'ਤੇ, ਇਹ ਯੋਜਨਾਵਾਂ ਤੁਹਾਡੇ ਲਈ ਢੁਕਵੀਆਂ ਹੋ ਸਕਦੀਆਂ ਹਨ",
    knowMore: "ਹੋਰ ਜਾਣੋ",
    eligibility: "ਯੋਗਤਾ",
    moreSchemes: "ਤੁਹਾਡੀ ਯੋਗਤਾ ਦੇ ਆਧਾਰ 'ਤੇ ਹੋਰ ਯੋਜਨਾਵਾਂ ਸ਼ਾਮਲ ਕੀਤੀਆਂ ਜਾਣਗੀਆਂ",

    // Categories
    healthCategory: "ਸਿਹਤ",
    agricultureCategory: "ਖੇਤੀਬਾੜੀ",
    businessCategory: "ਕਾਰੋਬਾਰ",
    educationCategory: "ਸਿੱਖਿਆ",

    // Scheme Details Page
    backToSchemes: "ਯੋਜਨਾਵਾਂ 'ਤੇ ਵਾਪਸ ਜਾਓ",
    overview: "ਸੰਖੇਪ ਜਾਣਕਾਰੀ",
    benefits: "ਲਾਭ",
    eligibilityCriteria: "ਯੋਗਤਾ ਮਾਪਦੰਡ",
    importantInfo: "ਮਹੱਤਵਪੂਰਨ ਜਾਣਕਾਰੀ",

    // Ayushman Bharat
    ayushmanBharat: "ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ",
    ayushmanDesc: "ਘੱਟ ਆਮਦਨ ਵਾਲੇ ਪਰਿਵਾਰਾਂ ਲਈ ਪ੍ਰਤੀ ਸਾਲ ₹5 ਲੱਖ ਤੱਕ ਸਿਹਤ ਕਵਰੇਜ।",
    ayushmanEligibility: "₹2.5 ਲੱਖ ਪ੍ਰਤੀ ਸਾਲ ਤੋਂ ਘੱਟ ਆਮਦਨ",
    ayushmanOverview:
      "ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ ਇੱਕ ਪ੍ਰਮੁੱਖ ਸਿਹਤ ਬੀਮਾ ਯੋਜਨਾ ਹੈ ਜੋ ਪੂਰੇ ਭਾਰਤ ਵਿੱਚ ਆਰਥਿਕ ਤੌਰ 'ਤੇ ਕਮਜ਼ੋਰ ਪਰਿਵਾਰਾਂ ਨੂੰ ਵਿਆਪਕ ਸਿਹਤ ਕਵਰੇਜ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ।",
    ayushmanBenefit1: "ਪ੍ਰਤੀ ਪਰਿਵਾਰ ਪ੍ਰਤੀ ਸਾਲ ₹5 ਲੱਖ ਤੱਕ ਸਿਹਤ ਕਵਰੇਜ",
    ayushmanBenefit2: "ਸੂਚੀਬੱਧ ਹਸਪਤਾਲਾਂ ਵਿੱਚ ਕੈਸ਼ਲੈੱਸ ਇਲਾਜ",
    ayushmanBenefit3: "ਹਸਪਤਾਲ ਵਿੱਚ ਭਰਤੀ ਤੋਂ ਪਹਿਲਾਂ ਅਤੇ ਬਾਅਦ ਦੇ ਖਰਚਿਆਂ ਦਾ ਕਵਰੇਜ",
    ayushmanBenefit4: "ਮੁਫ਼ਤ ਦਵਾਈਆਂ ਅਤੇ ਨਿਦਾਨ ਟੈਸਟ",
    ayushmanEligibilityCriteria1: "₹2.5 ਲੱਖ ਤੋਂ ਘੱਟ ਸਾਲਾਨਾ ਪਰਿਵਾਰਕ ਆਮਦਨ",
    ayushmanEligibilityCriteria2: "BPL ਕਾਰਡਧਾਰਕ ਜਾਂ SECC ਡੇਟਾਬੇਸ ਵਿੱਚ ਸੂਚੀਬੱਧ",
    ayushmanEligibilityCriteria3: "ਵੈਧ ਆਧਾਰ ਕਾਰਡ ਲੋੜੀਂਦਾ ਹੈ",
    ayushmanInfo1: "ਲਾਭਪਾਤਰੀਆਂ ਲਈ ਕੋਈ ਉਮਰ ਸੀਮਾ ਨਹੀਂ",
    ayushmanInfo2: "ਪਹਿਲੇ ਦਿਨ ਤੋਂ ਪਹਿਲਾਂ ਤੋਂ ਮੌਜੂਦ ਸਥਿਤੀਆਂ ਨੂੰ ਕਵਰ ਕਰਦਾ ਹੈ",
    ayushmanInfo3: "ਪੂਰੇ ਭਾਰਤ ਵਿੱਚ ਪੋਰਟੇਬਲ - ਕਿਸੇ ਵੀ ਰਾਜ ਵਿੱਚ ਵਰਤੋਂ ਕਰੋ",

    // PM Kisan
    pmKisan: "ਪੀਐਮ ਕਿਸਾਨ ਸਮਾਨ ਨਿਧੀ",
    pmKisanDesc: "ਕਿਸਾਨਾਂ ਲਈ ₹6,000/ਸਾਲ ਸਿੱਧੀ ਆਮਦਨ ਸਹਾਇਤਾ।",
    pmKisanEligibility: "ਯੋਗ ਜ਼ਮੀਨ ਵਾਲੇ ਯੋਗ ਕਿਸਾਨ",
    pmKisanOverview:
      "ਪੀਐਮ-ਕਿਸਾਨ ਸਾਰੇ ਜ਼ਮੀਨਧਾਰਕ ਕਿਸਾਨ ਪਰਿਵਾਰਾਂ ਨੂੰ ਖੇਤੀਬਾੜੀ ਇਨਪੁਟਸ ਲਈ ਉਨ੍ਹਾਂ ਦੀਆਂ ਵਿੱਤੀ ਲੋੜਾਂ ਪੂਰੀਆਂ ਕਰਨ ਲਈ ਸਿੱਧੀ ਆਮਦਨ ਸਹਾਇਤਾ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।",
    pmKisanBenefit1: "ਤਿੰਨ ਬਰਾਬਰ ਕਿਸ਼ਤਾਂ ਵਿੱਚ ਪ੍ਰਤੀ ਸਾਲ ₹6,000",
    pmKisanBenefit2: "ਕਿਸਾਨ ਦੇ ਖਾਤੇ ਵਿੱਚ ਸਿੱਧਾ ਬੈਂਕ ਟ੍ਰਾਂਸਫਰ (DBT)",
    pmKisanBenefit3: "ਕੋਈ ਵਿਚੋਲਾ ਨਹੀਂ - ਸਿੱਧੀ ਸਰਕਾਰੀ ਸਹਾਇਤਾ",
    pmKisanBenefit4: "ਬੀਜ ਅਤੇ ਖਾਦ ਖਰੀਦਣ ਲਈ ਵਿੱਤੀ ਸਹਾਇਤਾ",
    pmKisanEligibilityCriteria1: "ਛੋਟੇ ਅਤੇ ਸੀਮਾਂਤ ਕਿਸਾਨ ਪਰਿਵਾਰ",
    pmKisanEligibilityCriteria2: "ਖੇਤੀਯੋਗ ਜ਼ਮੀਨ ਵਾਲੇ ਜ਼ਮੀਨਧਾਰਕ ਕਿਸਾਨ",
    pmKisanEligibilityCriteria3: "ਵੈਧ ਬੈਂਕ ਖਾਤਾ ਅਤੇ ਆਧਾਰ ਲਿੰਕੇਜ",
    pmKisanInfo1: "ਹਰ ਚਾਰ ਮਹੀਨਿਆਂ ਵਿੱਚ ਭੁਗਤਾਨ",
    pmKisanInfo2: "ਪਰਿਵਾਰ ਦੀ ਪਰਿਭਾਸ਼ਾ ਵਿੱਚ ਪਤੀ, ਪਤਨੀ ਅਤੇ ਨਾਬਾਲਗ ਬੱਚੇ ਸ਼ਾਮਲ ਹਨ",
    pmKisanInfo3: "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਔਨਲਾਈਨ ਜਾਂ CSC ਰਾਹੀਂ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ",

    // Mudra Yojana
    mudraYojana: "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਮੁਦਰਾ ਯੋਜਨਾ",
    mudraDesc: "ਛੋਟੇ ਕਾਰੋਬਾਰ ਮਾਲਕਾਂ ਲਈ ₹10 ਲੱਖ ਤੱਕ ਕਰਜ਼ਾ।",
    mudraEligibility: "ਛੋਟੇ ਕਾਰੋਬਾਰ ਮਾਲਕ ਅਤੇ ਉਦਯੋਗਪਤੀ",
    mudraOverview:
      "ਮੁਦਰਾ ਯੋਜਨਾ ਨਿਰਮਾਣ, ਵਪਾਰ ਅਤੇ ਸੇਵਾ ਖੇਤਰਾਂ ਵਿੱਚ ਆਮਦਨ ਪੈਦਾ ਕਰਨ ਵਾਲੀਆਂ ਗਤੀਵਿਧੀਆਂ ਲਈ ਸੂਖਮ ਅਤੇ ਛੋਟੇ ਉਦਯੋਗਾਂ ਨੂੰ ਕਰਜ਼ਾ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ।",
    mudraBenefit1: "ਬਿਨਾਂ ਜ਼ਮਾਨਤ ਦੇ ₹10 ਲੱਖ ਤੱਕ ਕਰਜ਼ਾ",
    mudraBenefit2: "ਤਿੰਨ ਸ਼੍ਰੇਣੀਆਂ: ਸ਼ਿਸ਼ੂ, ਕਿਸ਼ੋਰ, ਤਰੁਣ",
    mudraBenefit3: "ਕਾਰੋਬਾਰੀ ਨਕਦੀ ਪ੍ਰਵਾਹ ਦੇ ਆਧਾਰ 'ਤੇ ਲਚਕਦਾਰ ਮੁੜ ਭੁਗਤਾਨ ਸ਼ਰਤਾਂ",
    mudraBenefit4: "ਰਵਾਇਤੀ ਕਰਜ਼ਿਆਂ ਦੇ ਮੁਕਾਬਲੇ ਘੱਟ ਵਿਆਜ ਦਰਾਂ",
    mudraEligibilityCriteria1: "ਛੋਟੇ ਕਾਰੋਬਾਰ ਮਾਲਕ ਅਤੇ ਉਦਯੋਗਪਤੀ",
    mudraEligibilityCriteria2: "ਗੈਰ-ਕਾਰਪੋਰੇਟ, ਗੈਰ-ਖੇਤੀ ਉਦਯੋਗ",
    mudraEligibilityCriteria3: "ਵੈਧ ਕਾਰੋਬਾਰੀ ਯੋਜਨਾ ਅਤੇ KYC ਦਸਤਾਵੇਜ਼",
    mudraInfo1: "ਕੋਈ ਪ੍ਰੋਸੈਸਿੰਗ ਫੀਸ ਜਾਂ ਲੁਕੇ ਹੋਏ ਖਰਚੇ ਨਹੀਂ",
    mudraInfo2: "ਕਰਜ਼ੇ ਦੀ ਰਕਮ: ਸ਼ਿਸ਼ੂ (₹50 ਹਜ਼ਾਰ ਤੱਕ), ਕਿਸ਼ੋਰ (₹50 ਹਜ਼ਾਰ-₹5 ਲੱਖ), ਤਰੁਣ (₹5 ਲੱਖ-₹10 ਲੱਖ)",
    mudraInfo3: "ਬੈਂਕਾਂ, NBFC ਅਤੇ MFI ਰਾਹੀਂ ਉਪਲਬਧ",

    // Scholarship Portal
    scholarshipPortal: "ਰਾਸ਼ਟਰੀ ਸਕਾਲਰਸ਼ਿਪ ਪੋਰਟਲ",
    scholarshipDesc: "ਘੱਟ ਆਮਦਨ ਵਾਲੇ ਪਰਿਵਾਰਾਂ ਦੇ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਸਕਾਲਰਸ਼ਿਪ।",
    scholarshipEligibility: "ਆਮਦਨ ਅਤੇ ਅਕਾਦਮਿਕ ਮਾਪਦੰਡ ਪੂਰੇ ਕਰਨ ਵਾਲੇ ਵਿਦਿਆਰਥੀ",
    scholarshipOverview:
      "NSP ਵੱਖ-ਵੱਖ ਕੇਂਦਰੀ ਅਤੇ ਰਾਜ ਸਰਕਾਰ ਦੀਆਂ ਯੋਜਨਾਵਾਂ ਤੋਂ ਸਕਾਲਰਸ਼ਿਪ ਦੀ ਭਾਲ ਕਰਨ ਵਾਲੇ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਵਨ-ਸਟਾਪ ਹੱਲ ਹੈ।",
    scholarshipBenefit1: "ਇੱਕ ਪਲੇਟਫਾਰਮ ਦੇ ਤਹਿਤ ਕਈ ਸਕਾਲਰਸ਼ਿਪਾਂ",
    scholarshipBenefit2: "ਵਿਦਿਆਰਥੀ ਦੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਸਿੱਧਾ ਲਾਭ ਟ੍ਰਾਂਸਫਰ",
    scholarshipBenefit3: "ਪ੍ਰੀ ਅਤੇ ਪੋਸਟ-ਮੈਟ੍ਰਿਕ ਸਕਾਲਰਸ਼ਿਪ ਸਹਾਇਤਾ",
    scholarshipBenefit4: "ਮੈਰਿਟ-ਕਮ-ਮੀਨਜ਼ ਅਧਾਰਤ ਵਿੱਤੀ ਸਹਾਇਤਾ",
    scholarshipEligibilityCriteria1: "ਆਰਥਿਕ ਤੌਰ 'ਤੇ ਕਮਜ਼ੋਰ ਵਰਗਾਂ ਦੇ ਵਿਦਿਆਰਥੀ",
    scholarshipEligibilityCriteria2: "ਅਕਾਦਮਿਕ ਪ੍ਰਦਰਸ਼ਨ ਮਾਪਦੰਡ ਪੂਰੇ ਕਰਨਾ",
    scholarshipEligibilityCriteria3: "ਵੈਧ ਆਧਾਰ ਅਤੇ ਬੈਂਕ ਖਾਤਾ",
    scholarshipInfo1: "ਕਈ ਯੋਜਨਾਵਾਂ ਲਈ ਸਿੰਗਲ ਐਪਲੀਕੇਸ਼ਨ",
    scholarshipInfo2: "ਪੂਰੀ ਤਰ੍ਹਾਂ ਔਨਲਾਈਨ ਪ੍ਰਕਿਰਿਆ - ਕੋਈ ਭੌਤਿਕ ਦਸਤਾਵੇਜ਼ ਨਹੀਂ",
    scholarshipInfo3: "ਐਪਲੀਕੇਸ਼ਨ ਸਥਿਤੀ ਦੀ ਪਾਰਦਰਸ਼ੀ ਟਰੈਕਿੰਗ",
  },
  मराठी: {
    // Landing Page
    appName: "अर्थसाथी",
    heroHeading: "तुमचा वैयक्तिक आर्थिक साथीदार",
    heroSubtext:
      "आम्ही तुम्हाला सरकारी योजना शोधण्यात, तुमच्या आर्थिक व्यवस्थापनात आणि अन्यायी करारांपासून स्वतःचे संरक्षण करण्यात मदत करतो — तुमच्या स्वतःच्या भाषेत.",
    getStarted: "सुरू करा",
    securePrivate: "सुरक्षित आणि खाजगी",
    multiLanguage: "बहुभाषा समर्थन",
    freeToUse: "वापरण्यासाठी मोफत",

    // Onboarding Page
    tellUsAbout: "आम्हाला तुमच्याबद्दल सांगा",
    shareDetails:
      "काही तपशील शेअर करा जेणेकरून आम्ही तुमच्यासाठी योग्य योजना शोधण्यात मदत करू शकू.",
    languagePreference: "भाषा प्राधान्य",
    selectLanguage: "तुमची पसंतीची भाषा निवडा",
    monthlyIncome: "मासिक उत्पन्न (₹)",
    enterIncome: "तुमचे मासिक उत्पन्न प्रविष्ट करा",
    existingDebts: "विद्यमान कर्ज (₹)",
    enterDebts: "विद्यमान कर्ज प्रविष्ट करा (किंवा नसल्यास 0)",
    mainGoal: "तुमचे मुख्य ध्येय काय आहे?",
    findSchemes: "योजना शोधा",
    infoSecure: "तुमची माहिती सुरक्षित आणि खाजगी आहे",
    pleaseSelectLanguage: "कृपया तुमची पसंतीची भाषा निवडा",
    pleaseEnterIncome: "कृपया तुमचे मासिक उत्पन्न प्रविष्ट करा",
    pleaseEnterDebts: "कृपया तुमचे विद्यमान कर्ज प्रविष्ट करा (किंवा 0)",
    pleaseSelectGoal: "कृपया तुमचे मुख्य ध्येय निवडा",

    // Goals
    wedding: "मुलगी/मुलाचे लग्न",
    business: "व्यवसाय सुरू करा",
    education: "शिक्षण",
    health: "आरोग्य आपत्कालीन",
    houseRepair: "घर दुरुस्ती",

    // Schemes Page
    schemesForYou: "तुमच्यासाठी योजना",
    basedOnProfile: "तुमच्या प्रोफाइलवर आधारित, या योजना तुमच्यासाठी योग्य असू शकतात",
    knowMore: "अधिक जाणा",
    eligibility: "पात्रता",
    moreSchemes: "तुमच्या पात्रतेवर आधारित अधिक योजना जोडल्या जातील",

    // Categories
    healthCategory: "आरोग्य",
    agricultureCategory: "शेती",
    businessCategory: "व्यवसाय",
    educationCategory: "शिक्षण",

    // Scheme Details Page
    backToSchemes: "योजनांकडे परत",
    overview: "विहंगावलोकन",
    benefits: "फायदे",
    eligibilityCriteria: "पात्रता निकष",
    importantInfo: "महत्त्वाची माहिती",

    // Ayushman Bharat
    ayushmanBharat: "आयुष्मान भारत",
    ayushmanDesc: "कमी उत्पन्न असलेल्या कुटुंबांसाठी दरवर्षी ₹5 लाख पर्यंत आरोग्य संरक्षण.",
    ayushmanEligibility: "₹2.5 लाख प्रतिवर्ष खालील उत्पन्न",
    ayushmanOverview:
      "आयुष्मान भारत ही एक प्रमुख आरोग्य विमा योजना आहे जी संपूर्ण भारतात आर्थिकदृष्ट्या असुरक्षित कुटुंबांना सर्वसमावेशक आरोग्य संरक्षण प्रदान करते.",
    ayushmanBenefit1: "प्रति कुटुंब दरवर्षी ₹5 लाख पर्यंत आरोग्य संरक्षण",
    ayushmanBenefit2: "सूचीबद्ध रुग्णालयांमध्ये कॅशलेस उपचार",
    ayushmanBenefit3: "रुग्णालयात दाखल होण्यापूर्वी आणि नंतरच्या खर्चाचे संरक्षण",
    ayushmanBenefit4: "मोफत औषधे आणि निदान चाचण्या",
    ayushmanEligibilityCriteria1: "₹2.5 लाख पेक्षा कमी वार्षिक कौटुंबिक उत्पन्न",
    ayushmanEligibilityCriteria2: "बीपीएल कार्डधारक किंवा SECC डेटाबेसमध्ये सूचीबद्ध",
    ayushmanEligibilityCriteria3: "वैध आधार कार्ड आवश्यक",
    ayushmanInfo1: "लाभार्थ्यांसाठी कोणतीही वय मर्यादा नाही",
    ayushmanInfo2: "पहिल्या दिवसापासून पूर्वीच्या परिस्थितींचा समावेश",
    ayushmanInfo3: "संपूर्ण भारतात पोर्टेबल - कोणत्याही राज्यात वापरा",

    // PM Kisan
    pmKisan: "पीएम किसान सम्मान निधी",
    pmKisanDesc: "शेतकऱ्यांसाठी ₹6,000/वर्ष थेट उत्पन्न समर्थन.",
    pmKisanEligibility: "पात्र जमीन असलेले पात्र शेतकरी",
    pmKisanOverview:
      "पीएम-किसान सर्व जमीनधारक शेतकरी कुटुंबांना कृषी इनपुटसाठी त्यांच्या आर्थिक गरजा पूर्ण करण्यासाठी थेट उत्पन्न समर्थन प्रदान करते.",
    pmKisanBenefit1: "तीन समान हप्त्यांमध्ये दरवर्षी ₹6,000",
    pmKisanBenefit2: "शेतकऱ्याच्या खात्यात थेट बँक हस्तांतरण (DBT)",
    pmKisanBenefit3: "कोणतेही मध्यस्थ नाही - थेट सरकारी समर्थन",
    pmKisanBenefit4: "बियाणे आणि खते खरेदीसाठी आर्थिक मदत",
    pmKisanEligibilityCriteria1: "लहान आणि सीमांत शेतकरी कुटुंबे",
    pmKisanEligibilityCriteria2: "शेतीयोग्य जमीन असलेले जमीनधारक शेतकरी",
    pmKisanEligibilityCriteria3: "वैध बँक खाते आणि आधार लिंकेज",
    pmKisanInfo1: "दर चार महिन्यांनी पैसे",
    pmKisanInfo2: "कुटुंबाच्या व्याख्येमध्ये पती, पत्नी आणि अल्पवयीन मुले समाविष्ट आहेत",
    pmKisanInfo3: "ऑनलाइन किंवा CSC द्वारे नोंदणी केली जाऊ शकते",

    // Mudra Yojana
    mudraYojana: "प्रधानमंत्री मुद्रा योजना",
    mudraDesc: "लहान व्यवसाय मालकांसाठी ₹10 लाख पर्यंत कर्ज.",
    mudraEligibility: "लहान व्यवसाय मालक आणि उद्योजक",
    mudraOverview:
      "मुद्रा योजना उत्पादन, व्यापार आणि सेवा क्षेत्रातील उत्पन्न-निर्मिती क्रियाकलापांसाठी सूक्ष्म आणि लघु उपक्रमांना कर्ज प्रदान करते.",
    mudraBenefit1: "तारण न घेता ₹10 लाख पर्यंत कर्ज",
    mudraBenefit2: "तीन श्रेणी: शिशु, किशोर, तरुण",
    mudraBenefit3: "व्यवसाय रोख प्रवाहावर आधारित लवचिक परतफेड अटी",
    mudraBenefit4: "पारंपरिक कर्जाच्या तुलनेत कमी व्याज दर",
    mudraEligibilityCriteria1: "लहान व्यवसाय मालक आणि उद्योजक",
    mudraEligibilityCriteria2: "गैर-कॉर्पोरेट, गैर-शेती उपक्रम",
    mudraEligibilityCriteria3: "वैध व्यवसाय योजना आणि KYC दस्तऐवज",
    mudraInfo1: "कोणतेही प्रक्रिया शुल्क किंवा छुपे शुल्क नाही",
    mudraInfo2: "कर्ज रक्कम: शिशु (₹50 हजार पर्यंत), किशोर (₹50 हजार-₹5 लाख), तरुण (₹5 लाख-₹10 लाख)",
    mudraInfo3: "बँका, NBFC आणि MFI द्वारे उपलब्ध",

    // Scholarship Portal
    scholarshipPortal: "राष्ट्रीय शिष्यवृत्ती पोर्टल",
    scholarshipDesc: "कमी उत्पन्न असलेल्या कुटुंबातील विद्यार्थ्यांसाठी शिष्यवृत्ती.",
    scholarshipEligibility: "उत्पन्न आणि शैक्षणिक निकष पूर्ण करणारे विद्यार्थी",
    scholarshipOverview:
      "NSP विविध केंद्र आणि राज्य सरकारी योजनांमधून शिष्यवृत्ती शोधणाऱ्या विद्यार्थ्यांसाठी वन-स्टॉप सोल्यूशन आहे.",
    scholarshipBenefit1: "एका प्लॅटफॉर्म अंतर्गत अनेक शिष्यवृत्ती",
    scholarshipBenefit2: "विद्यार्थ्याच्या बँक खात्यात थेट लाभ हस्तांतरण",
    scholarshipBenefit3: "प्री आणि पोस्ट-मॅट्रिक शिष्यवृत्ती समर्थन",
    scholarshipBenefit4: "मेरिट-कम-मीन्स आधारित आर्थिक सहाय्य",
    scholarshipEligibilityCriteria1: "आर्थिकदृष्ट्या कमकुवत घटकातील विद्यार्थी",
    scholarshipEligibilityCriteria2: "शैक्षणिक कामगिरी निकष पूर्ण करणे",
    scholarshipEligibilityCriteria3: "वैध आधार आणि बँक खाते",
    scholarshipInfo1: "अनेक योजनांसाठी एकल अर्ज",
    scholarshipInfo2: "पूर्णपणे ऑनलाइन प्रक्रिया - भौतिक दस्तऐवज नाही",
    scholarshipInfo3: "अर्ज स्थितीचे पारदर्शक ट्रॅकिंग",
  },
  தமிழ்: {
    // Landing Page
    appName: "அர்த்சாத்தி",
    heroHeading: "உங்கள் தனிப்பட்ட நிதி துணை",
    heroSubtext:
      "நாங்கள் அரசாங்க திட்டங்களைக் கண்டறிய, உங்கள் நிதியை நிர்வகிக்க மற்றும் நியாயமற்ற ஒப்பந்தங்களிலிருந்து உங்களைப் பாதுகாக்க உதவுகிறோம் — உங்கள் சொந்த மொழியில்.",
    getStarted: "தொடங்குங்கள்",
    securePrivate: "பாதுகாப்பான மற்றும் தனிப்பட்ட",
    multiLanguage: "பல மொழி ஆதரவு",
    freeToUse: "பயன்படுத்த இலவசம்",

    // Onboarding Page
    tellUsAbout: "உங்களைப் பற்றி எங்களுக்குச் சொல்லுங்கள்",
    shareDetails:
      "உங்களுக்கு ஏற்ற திட்டங்களைக் கண்டறிய உதவ சில விவரங்களைப் பகிரவும்.",
    languagePreference: "மொழி விருப்பம்",
    selectLanguage: "உங்கள் விருப்ப மொழியைத் தேர்ந்தெடுக்கவும்",
    monthlyIncome: "மாதாந்திர வருமானம் (₹)",
    enterIncome: "உங்கள் மாதாந்திர வருமானத்தை உள்ளிடவும்",
    existingDebts: "தற்போதைய கடன்கள் (₹)",
    enterDebts: "தற்போதைய கடன்களை உள்ளிடவும் (அல்லது இல்லையெனில் 0)",
    mainGoal: "உங்கள் முக்கிய இலக்கு என்ன?",
    findSchemes: "திட்டங்களைக் கண்டறியவும்",
    infoSecure: "உங்கள் தகவல் பாதுகாப்பானது மற்றும் தனிப்பட்டது",
    pleaseSelectLanguage: "உங்கள் விருப்ப மொழியைத் தேர்ந்தெடுக்கவும்",
    pleaseEnterIncome: "உங்கள் மாதாந்திர வருமானத்தை உள்ளிடவும்",
    pleaseEnterDebts: "உங்கள் தற்போதைய கடன்களை உள்ளிடவும் (அல்லது 0)",
    pleaseSelectGoal: "உங்கள் முக்கிய இலக்கைத் தேர்ந்தெடுக்கவும்",

    // Goals
    wedding: "மகள்/மகன் திருமணம்",
    business: "வணிகத்தைத் தொடங்குங்கள்",
    education: "கல்வி",
    health: "சுகாதார அவசரநிலை",
    houseRepair: "வீடு பழுதுபார்ப்பு",

    // Schemes Page
    schemesForYou: "உங்களுக்கான திட்டங்கள்",
    basedOnProfile: "உங்கள் சுயவிவரத்தின் அடிப்படையில், இந்த திட்டங்கள் உங்களுக்கு ஏற்றவையாக இருக்கலாம்",
    knowMore: "மேலும் அறிக",
    eligibility: "தகுதி",
    moreSchemes: "உங்கள் தகுதியின் அடிப்படையில் மேலும் திட்டங்கள் சேர்க்கப்படும்",

    // Categories
    healthCategory: "சுகாதாரம்",
    agricultureCategory: "விவசாயம்",
    businessCategory: "வணிகம்",
    educationCategory: "கல்வி",

    // Scheme Details Page
    backToSchemes: "திட்டங்களுக்குத் திரும்பு",
    overview: "மேலோட்டம்",
    benefits: "நன்மைகள்",
    eligibilityCriteria: "தகுதி நிபந்தனைகள்",
    importantInfo: "முக்கியமான தகவல்",

    // Ayushman Bharat
    ayushmanBharat: "ஆயுஷ்மான் பாரத்",
    ayushmanDesc: "குறைந்த வருமானம் கொண்ட குடும்பங்களுக்கு ஆண்டுக்கு ₹5 லட்சம் வரை சுகாதார காப்பீடு.",
    ayushmanEligibility: "₹2.5 லட்சம்/ஆண்டுக்கு குறைவான வருமானம்",
    ayushmanOverview:
      "ஆயுஷ்மான் பாரத் என்பது இந்தியா முழுவதும் பொருளாதார ரீதியாக பாதிக்கப்படக்கூடிய குடும்பங்களுக்கு விரிவான சுகாதார காப்பீட்டை வழங்கும் முதன்மையான சுகாதார காப்பீட்டு திட்டமாகும்.",
    ayushmanBenefit1: "ஒரு குடும்பத்திற்கு ஆண்டுக்கு ₹5 லட்சம் வரை சுகாதார காப்பீடு",
    ayushmanBenefit2: "பட்டியலிடப்பட்ட மருத்துவமனைகளில் பணமில்லா சிகிச்சை",
    ayushmanBenefit3: "மருத்துவமனையில் சேர்ப்பதற்கு முன்பும் பின்பும் உள்ள செலவுகளுக்கான காப்பீடு",
    ayushmanBenefit4: "இலவச மருந்துகள் மற்றும் நோயறிதல் சோதனைகள்",
    ayushmanEligibilityCriteria1: "₹2.5 லட்சத்திற்கும் குறைவான வருடாந்திர குடும்ப வருமானம்",
    ayushmanEligibilityCriteria2: "BPL அட்டை வைத்திருப்பவர் அல்லது SECC தரவுத்தளத்தில் பட்டியலிடப்பட்டவர்",
    ayushmanEligibilityCriteria3: "செல்லுபடியாகும் ஆதார் அட்டை தேவை",
    ayushmanInfo1: "பயனாளிகளுக்கு வயது வரம்பு இல்லை",
    ayushmanInfo2: "முதல் நாளிலிருந்தே முன்பே இருக்கும் நிலைமைகளை உள்ளடக்குகிறது",
    ayushmanInfo3: "இந்தியா முழுவதும் பயன்படுத்தக்கூடியது - எந்த மாநிலத்திலும் பயன்படுத்தவும்",

    // PM Kisan
    pmKisan: "பிஎம் கிசான் சம்மான் நிதி",
    pmKisanDesc: "விவசாயிகளுக்கு ₹6,000/ஆண்டு நேரடி வருமான ஆதரவு.",
    pmKisanEligibility: "தகுதியான நிலம் கொண்ட தகுதியான விவசாயிகள்",
    pmKisanOverview:
      "பிஎம்-கிசான் அனைத்து நிலம் வைத்திருக்கும் விவசாயிக் குடும்பங்களுக்கு விவசாய உள்ளீடுகளுக்கான அவர்களின் நிதித் தேவைகளை நிறைவேற்ற நேரடி வருமான ஆதரவை வழங்குகிறது.",
    pmKisanBenefit1: "மூன்று சம தவணைகளில் ஆண்டுக்கு ₹6,000",
    pmKisanBenefit2: "விவசாயியின் கணக்கில் நேரடி வங்கி பரிமாற்றம் (DBT)",
    pmKisanBenefit3: "இடைத்தரகர் இல்லை - நேரடி அரசு ஆதரவு",
    pmKisanBenefit4: "விதைகள் மற்றும் உரங்களை வாங்குவதற்கான நிதி உதவி",
    pmKisanEligibilityCriteria1: "சிறு மற்றும் குறு விவசாயிக் குடும்பங்கள்",
    pmKisanEligibilityCriteria2: "சாகுபடி செய்யக்கூடிய நிலம் கொண்ட நில உடைமையாளர் விவசாயிகள்",
    pmKisanEligibilityCriteria3: "செல்லுபடியாகும் வங்கிக் கணக்கு மற்றும் ஆதார் இணைப்பு",
    pmKisanInfo1: "ஒவ்வொரு நான்கு மாதங்களுக்கு ஒருமுறை பணம்",
    pmKisanInfo2: "குடும்ப வரையறையில் கணவர், மனைவி மற்றும் சிறார்கள் அடங்கும்",
    pmKisanInfo3: "ஆன்லைன் அல்லது CSC மூலம் பதிவு செய்யலாம்",

    // Mudra Yojana
    mudraYojana: "பிரதம மந்திரி முத்ரா யோஜனா",
    mudraDesc: "சிறு வணிக உரிமையாளர்களுக்கு ₹10 லட்சம் வரை கடன்.",
    mudraEligibility: "சிறு வணிக உரிமையாளர்கள் மற்றும் தொழில்முனைவோர்",
    mudraOverview:
      "முத்ரா திட்டம் உற்பத்தி, வர்த்தகம் மற்றும் சேவைத் துறைகளில் வருமானம் ஈட்டும் செயல்பாடுகளுக்கு நுண்ணிய மற்றும் சிறு நிறுவனங்களுக்கு கடன்களை வழங்குகிறது.",
    mudraBenefit1: "உத்தரவாதம் இல்லாமல் ₹10 லட்சம் வரை கடன்",
    mudraBenefit2: "மூன்று வகைகள்: சிசு, கிஷோர், தருண்",
    mudraBenefit3: "வணிக பண ஓட்டத்தின் அடிப்படையில் நெகிழ்வான திருப்பிச் செலுத்தும் விதிமுறைகள்",
    mudraBenefit4: "பாரம்பரிய கடன்களுடன் ஒப்பிடும்போது குறைந்த வட்டி விகிதங்கள்",
    mudraEligibilityCriteria1: "சிறு வணிக உரிமையாளர்கள் மற்றும் தொழில்முனைவோர்",
    mudraEligibilityCriteria2: "கார்ப்பரேட் அல்லாத, விவசாயம் அல்லாத நிறுவனங்கள்",
    mudraEligibilityCriteria3: "செல்லுபடியாகும் வணிகத் திட்டம் மற்றும் KYC ஆவணங்கள்",
    mudraInfo1: "செயலாக்க கட்டணம் அல்லது மறைக்கப்பட்ட கட்டணங்கள் இல்லை",
    mudraInfo2: "கடன் தொகை: சிசு (₹50 ஆயிரம் வரை), கிஷோர் (₹50 ஆயிரம்-₹5 லட்சம்), தருண் (₹5 லட்சம்-₹10 லட்சம்)",
    mudraInfo3: "வங்கிகள், NBFC மற்றும் MFI மூலம் கிடைக்கும்",

    // Scholarship Portal
    scholarshipPortal: "தேசிய உதவித்தொகை போர்ட்டல்",
    scholarshipDesc: "குறைந்த வருமானம் கொண்ட குடும்பங்களைச் சேர்ந்த மாணவர்களுக்கு உதவித்தொகை.",
    scholarshipEligibility: "வருமானம் மற்றும் கல்வி நிபந்தனைகளை பூர்த்தி செய்யும் மாணவர்கள்",
    scholarshipOverview:
      "NSP என்பது பல்வேறு மத்திய மற்றும் மாநில அரசு திட்டங்களில் இருந்து உதவித்தொகை தேடும் மாணவர்களுக்கான ஒரே நிறுத்த தீர்வாகும்.",
    scholarshipBenefit1: "ஒரே தளத்தின் கீழ் பல உதவித்தொகைகள்",
    scholarshipBenefit2: "மாணவரின் வங்கிக் கணக்கில் நேரடி பலன் பரிமாற்றம்",
    scholarshipBenefit3: "மெட்ரிக் முன் மற்றும் பிந்தைய உதவித்தொகை ஆதரவு",
    scholarshipBenefit4: "திறன்-மற்றும்-வழிமுறை அடிப்படையிலான நிதி உதவி",
    scholarshipEligibilityCriteria1: "பொருளாதார ரீதியாக பலவீனமான பிரிவைச் சேர்ந்த மாணவர்கள்",
    scholarshipEligibilityCriteria2: "கல்வி செயல்திறன் நிபந்தனைகளை பூர்த்தி செய்தல்",
    scholarshipEligibilityCriteria3: "செல்லுபடியாகும் ஆதார் மற்றும் வங்கிக் கணக்கு",
    scholarshipInfo1: "பல திட்டங்களுக்கு ஒரே விண்ணப்பம்",
    scholarshipInfo2: "முழுமையாக ஆன்லைன் செயல்முறை - உடல் ஆவணங்கள் இல்லை",
    scholarshipInfo3: "விண்ணப்ப நிலையின் வெளிப்படையான கண்காணிப்பு",
  },
  తెలుగు: {
    // Landing Page
    appName: "అర్థసాథి",
    heroHeading: "మీ వ్యక్తిగత ఆర్థిక సహచరుడు",
    heroSubtext:
      "మేము మీకు ప్రభుత్వ పథకాలను కనుగొనడంలో, మీ ఆర్థిక వ్యవహారాలను నిర్వహించడంలో మరియు అన్యాయమైన ఒప్పందాల నుండి మిమ్మల్ని రక్షించడంలో సహాయం చేస్తాము — మీ స్వంత భాషలో.",
    getStarted: "ప్రారంభించండి",
    securePrivate: "సురక్షితమైన మరియు ప్రైవేట్",
    multiLanguage: "బహుళ-భాషా మద్దతు",
    freeToUse: "ఉపయోగించడానికి ఉచితం",

    // Onboarding Page
    tellUsAbout: "మీ గురించి మాకు చెప్పండి",
    shareDetails:
      "మీకు సరిపోయే పథకాలను కనుగొనడంలో మాకు సహాయపడటానికి కొన్ని వివరాలను పంచుకోండి.",
    languagePreference: "భాషా ప్రాధాన్యత",
    selectLanguage: "మీ ఇష్టమైన భాషను ఎంచుకోండి",
    monthlyIncome: "నెలవారీ ఆదాయం (₹)",
    enterIncome: "మీ నెలవారీ ఆదాయాన్ని నమోదు చేయండి",
    existingDebts: "ఇప్పటికే ఉన్న అప్పులు (₹)",
    enterDebts: "ఇప్పటికే ఉన్న అప్పులను నమోదు చేయండి (లేదా లేకుంటే 0)",
    mainGoal: "మీ ప్రధాన లక్ష్యం ఏమిటి?",
    findSchemes: "పథకాలను కనుగొనండి",
    infoSecure: "మీ సమాచారం సురక్షితంగా మరియు ప్రైవేట్‌గా ఉంది",
    pleaseSelectLanguage: "దయచేసి మీ ఇష్టమైన భాషను ఎంచుకోండి",
    pleaseEnterIncome: "దయచేసి మీ నెలవారీ ఆదాయాన్ని నమోదు చేయండి",
    pleaseEnterDebts: "దయచేసి మీ ఇప్పటికే ఉన్న అప్పులను నమోదు చేయండి (లేదా 0)",
    pleaseSelectGoal: "దయచేసి మీ ప్రధాన లక్ష్యాన్ని ఎంచుకోండి",

    // Goals
    wedding: "కూతురు/కుమారుని వివాహం",
    business: "వ్యాపారం ప్రారంభించండి",
    education: "విద్య",
    health: "ఆరోగ్య అత్యవసర పరిస్థితి",
    houseRepair: "ఇల్లు మరమ్మతు",

    // Schemes Page
    schemesForYou: "మీ కోసం పథకాలు",
    basedOnProfile: "మీ ప్రొఫైల్ ఆధారంగా, ఈ పథకాలు మీకు అనుకూలంగా ఉండవచ్చు",
    knowMore: "మరింత తెలుసుకోండి",
    eligibility: "అర్హత",
    moreSchemes: "మీ అర్హత ఆధారంగా మరిన్ని పథకాలు జోడించబడతాయి",

    // Categories
    healthCategory: "ఆరోగ్యం",
    agricultureCategory: "వ్యవసాయం",
    businessCategory: "వ్యాపారం",
    educationCategory: "విద్య",

    // Scheme Details Page
    backToSchemes: "పథకాలకు తిరిగి వెళ్ళండి",
    overview: "అవలోకనం",
    benefits: "ప్రయోజనాలు",
    eligibilityCriteria: "అర్హత ప్రమాణాలు",
    importantInfo: "ముఖ్యమైన సమాచారం",

    // Ayushman Bharat
    ayushmanBharat: "ఆయుష్మాన్ భారత్",
    ayushmanDesc: "తక్కువ ఆదాయ కుటుంబాలకు సంవత్సరానికి ₹5 లక్షల వరకు ఆరోగ్య కవరేజీ.",
    ayushmanEligibility: "₹2.5 లక్షల/సంవత్సరం కంటే తక్కువ ఆదాయం",
    ayushmanOverview:
      "ఆయుష్మాన్ భారత్ అనేది భారతదేశం అంతటా ఆర్థికంగా బలహీనమైన కుటుంబాలకు సమగ్ర ఆరోగ్య కవరేజీని అందించే ప్రధాన ఆరోగ్య బీమా పథకం.",
    ayushmanBenefit1: "కుటుంబానికి సంవత్సరానికి ₹5 లక్షల వరకు ఆరోగ్య కవరేజీ",
    ayushmanBenefit2: "జాబితా చేయబడిన ఆస్పత్రులలో క్యాష్‌లెస్ చికిత్స",
    ayushmanBenefit3: "ఆసుపత్రిలో చేరడానికి ముందు మరియు తరువాత ఖర్చుల కవరేజీ",
    ayushmanBenefit4: "ఉచిత మందులు మరియు రోగ నిర్ధారణ పరీక్షలు",
    ayushmanEligibilityCriteria1: "₹2.5 లక్షల కంటే తక్కువ వార్షిక కుటుంబ ఆదాయం",
    ayushmanEligibilityCriteria2: "BPL కార్డు హోల్డర్ లేదా SECC డేటాబేస్‌లో జాబితా చేయబడింది",
    ayushmanEligibilityCriteria3: "చెల్లుబాటు అయ్యే ఆధార్ కార్డు అవసరం",
    ayushmanInfo1: "లబ్ధిదారులకు వయస్సు పరిమితి లేదు",
    ayushmanInfo2: "మొదటి రోజు నుండి ముందు ఉన్న పరిస్థితులను కవర్ చేస్తుంది",
    ayushmanInfo3: "భారతదేశం అంతటా పోర్టబుల్ - ఏ రాష్ట్రంలోనైనా ఉపయోగించండి",

    // PM Kisan
    pmKisan: "PM కిసాన్ సమ్మాన్ నిధి",
    pmKisanDesc: "రైతులకు ₹6,000/సంవత్సరం ప్రత్యక్ష ఆదాయ మద్దతు.",
    pmKisanEligibility: "అర్హత కలిగిన భూమి ఉన్న అర్హ రైతులు",
    pmKisanOverview:
      "PM-కిసాన్ అన్ని భూస్వామ్య రైతు కుటుంబాలకు వ్యవసాయ ఇన్‌పుట్‌ల కోసం వారి ఆర్థిక అవసరాలను తీర్చడానికి ప్రత్యక్ష ఆదాయ మద్దతును అందిస్తుంది.",
    pmKisanBenefit1: "మూడు సమాన వాయిదాలలో సంవత్సరానికి ₹6,000",
    pmKisanBenefit2: "రైతు ఖాతాకు ప్రత్యక్ష బ్యాంక్ బదిలీ (DBT)",
    pmKisanBenefit3: "మధ్యవర్తి లేదు - ప్రత్యక్ష ప్రభుత్వ మద్దతు",
    pmKisanBenefit4: "విత్తనాలు మరియు ఎరువులు కొనుగోలు కోసం ఆర్థిక సహాయం",
    pmKisanEligibilityCriteria1: "చిన్న మరియు ఉపాంత రైతు కుటుంబాలు",
    pmKisanEligibilityCriteria2: "వ్యవసాయ యోగ్యమైన భూమి ఉన్న భూస్వామ్య రైతులు",
    pmKisanEligibilityCriteria3: "చెల్లుబాటు అయ్యే బ్యాంక్ ఖాతా మరియు ఆధార్ లింకేజీ",
    pmKisanInfo1: "ప్రతి నాలుగు నెలలకు ఒకసారి చెల్లింపు",
    pmKisanInfo2: "కుటుంబ నిర్వచనంలో భర్త, భార్య మరియు మైనర్ పిల్లలు ఉంటారు",
    pmKisanInfo3: "ఆన్‌లైన్ లేదా CSC ద్వారా నమోదు చేసుకోవచ్చు",

    // Mudra Yojana
    mudraYojana: "ప్రధాన మంత్రి ముద్రా యోజన",
    mudraDesc: "చిన్న వ్యాపార యజమానులకు ₹10 లక్షల వరకు రుణాలు.",
    mudraEligibility: "చిన్న వ్యాపార యజమానులు మరియు వ్యవసాయదారులు",
    mudraOverview:
      "ముద్రా పథకం తయారీ, వాణిజ్యం మరియు సేవా రంగాలలో ఆదాయ-ఉత్పత్తి కార్యకలాపాల కోసం సూక్ష్మ మరియు చిన్న సంస్థలకు రుణాలను అందిస్తుంది.",
    mudraBenefit1: "తాకట్టు లేకుండా ₹10 లక్షల వరకు రుణాలు",
    mudraBenefit2: "మూడు వర్గాలు: శిశు, కిశోర్, తరుణ్",
    mudraBenefit3: "వ్యాపార నగదు ప్రవాహం ఆధారంగా సౌకర్యవంతమైన తిరిగి చెల్లింపు నిబంధనలు",
    mudraBenefit4: "సంప్రదాయ రుణాలతో పోలిస్తే తక్కువ వడ్డీ రేట్లు",
    mudraEligibilityCriteria1: "చిన్న వ్యాపార యజమానులు మరియు వ్యవసాయదారులు",
    mudraEligibilityCriteria2: "కార్పొరేట్-యేతర, వ్యవసాయేతర సంస్థలు",
    mudraEligibilityCriteria3: "చెల్లుబాటు అయ్యే వ్యాపార ప్రణాళిక మరియు KYC పత్రాలు",
    mudraInfo1: "ప్రాసెసింగ్ ఫీజు లేదా దాచిన ఛార్జీలు లేవు",
    mudraInfo2: "రుణ మొత్తం: శిశు (₹50 వేల వరకు), కిశోర్ (₹50 వేలు-₹5 లక్షలు), తరుణ్ (₹5 లక్షలు-₹10 లక్షలు)",
    mudraInfo3: "బ్యాంకులు, NBFC మరియు MFI ద్వారా అందుబాటులో ఉంది",

    // Scholarship Portal
    scholarshipPortal: "జాతీయ స్కాలర్‌షిప్ పోర్టల్",
    scholarshipDesc: "తక్కువ ఆదాయ కుటుంబాల విద్యార్థులకు స్కాలర్‌షిప్‌లు.",
    scholarshipEligibility: "ఆదాయం మరియు విద్యా ప్రమాణాలను కలిగి ఉన్న విద్యార్థులు",
    scholarshipOverview:
      "NSP వివిధ కేంద్ర మరియు రాష్ట్ర ప్రభుత్వ పథకాల నుండి స్కాలర్‌షిప్‌లను వెతుకుతున్న విద్యార్థులకు వన్-స్టాప్ సొల్యూషన్.",
    scholarshipBenefit1: "ఒక ప్లాట్‌ఫారమ్ క్రింద బహుళ స్కాలర్‌షిప్‌లు",
    scholarshipBenefit2: "విద్యార్థి బ్యాంక్ ఖాతాకు ప్రత్యక్ష ప్రయోజన బదిలీ",
    scholarshipBenefit3: "ప్రీ మరియు పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్ మద్దతు",
    scholarshipBenefit4: "మెరిట్-కమ్-మీన్స్ ఆధారిత ఆర్థిక సహాయం",
    scholarshipEligibilityCriteria1: "ఆర్థికంగా బలహీన వర్గాల విద్యార్థులు",
    scholarshipEligibilityCriteria2: "విద్యా పనితీరు ప్రమాణాలను కలిగి ఉండటం",
    scholarshipEligibilityCriteria3: "చెల్లుబాటు అయ్యే ఆధార్ మరియు బ్యాంక్ ఖాతా",
    scholarshipInfo1: "బహుళ పథకాల కోసం ఒకే దరఖాస్తు",
    scholarshipInfo2: "పూర్తిగా ఆన్‌లైన్ ప్రక్రియ - భౌతిక పత్రాలు లేవు",
    scholarshipInfo3: "అప్లికేషన్ స్థితి యొక్క పారదర్శక ట్రాకింగ్",
  },
  বাংলা: {
    // Landing Page
    appName: "অর্থসাথী",
    heroHeading: "আপনার ব্যক্তিগত আর্থিক সঙ্গী",
    heroSubtext:
      "আমরা আপনাকে সরকারি প্রকল্প খুঁজে পেতে, আপনার আর্থিক ব্যবস্থাপনা করতে এবং অন্যায্য চুক্তি থেকে নিজেকে রক্ষা করতে সাহায্য করি — আপনার নিজের ভাষায়।",
    getStarted: "শুরু করুন",
    securePrivate: "সুরক্ষিত এবং ব্যক্তিগত",
    multiLanguage: "বহু-ভাষা সমর্থন",
    freeToUse: "ব্যবহার করতে বিনামূল্যে",

    // Onboarding Page
    tellUsAbout: "আমাদের আপনার সম্পর্কে বলুন",
    shareDetails:
      "কিছু বিবরণ শেয়ার করুন যাতে আমরা আপনার জন্য সঠিক প্রকল্পগুলি খুঁজে পেতে সাহায্য করতে পারি।",
    languagePreference: "ভাষা পছন্দ",
    selectLanguage: "আপনার পছন্দের ভাষা নির্বাচন করুন",
    monthlyIncome: "মাসিক আয় (₹)",
    enterIncome: "আপনার মাসিক আয় লিখুন",
    existingDebts: "বিদ্যমান ঋণ (₹)",
    enterDebts: "বিদ্যমান ঋণ লিখুন (বা না থাকলে 0)",
    mainGoal: "আপনার মূল লক্ষ্য কী?",
    findSchemes: "প্রকল্প খুঁজুন",
    infoSecure: "আপনার তথ্য সুরক্ষিত এবং ব্যক্তিগত",
    pleaseSelectLanguage: "অনুগ্রহ করে আপনার পছন্দের ভাষা নির্বাচন করুন",
    pleaseEnterIncome: "অনুগ্রহ করে আপনার মাসিক আয় লিখুন",
    pleaseEnterDebts: "অনুগ্রহ করে আপনার বিদ্যমান ঋণ লিখুন (বা 0)",
    pleaseSelectGoal: "অনুগ্রহ করে আপনার মূল লক্ষ্য নির্বাচন করুন",

    // Goals
    wedding: "মেয়ে/ছেলের বিবাহ",
    business: "ব্যবসা শুরু করুন",
    education: "শিক্ষা",
    health: "স্বাস্থ্য জরুরী",
    houseRepair: "বাড়ি মেরামত",

    // Schemes Page
    schemesForYou: "আপনার জন্য প্রকল্পগুলি",
    basedOnProfile: "আপনার প্রোফাইলের উপর ভিত্তি করে, এই প্রকল্পগুলি আপনার জন্য উপযুক্ত হতে পারে",
    knowMore: "আরও জানুন",
    eligibility: "যোগ্যতা",
    moreSchemes: "আপনার যোগ্যতার উপর ভিত্তি করে আরও প্রকল্প যুক্ত করা হবে",

    // Categories
    healthCategory: "স্বাস্থ্য",
    agricultureCategory: "কৃষি",
    businessCategory: "ব্যবসা",
    educationCategory: "শিক্ষা",

    // Scheme Details Page
    backToSchemes: "প্রকল্পগুলিতে ফিরে যান",
    overview: "সংক্ষিপ্ত বিবরণ",
    benefits: "সুবিধা",
    eligibilityCriteria: "যোগ্যতার মানদণ্ড",
    importantInfo: "গুরুত্বপূর্ণ তথ্য",

    // Ayushman Bharat
    ayushmanBharat: "আয়ুষ্মান ভারত",
    ayushmanDesc: "নিম্ন আয়ের পরিবারগুলির জন্য বছরে ₹5 লক্ষ পর্যন্ত স্বাস্থ্য কভারেজ।",
    ayushmanEligibility: "₹2.5 লক্ষ/বছরের নিচে আয়",
    ayushmanOverview:
      "আয়ুষ্মান ভারত একটি প্রধান স্বাস্থ্য বীমা প্রকল্প যা সারা ভারত জুড়ে অর্থনৈতিকভাবে দুর্বল পরিবারগুলিকে ব্যাপক স্বাস্থ্য কভারেজ প্রদান করে।",
    ayushmanBenefit1: "প্রতি পরিবার প্রতি বছর ₹5 লক্ষ পর্যন্ত স্বাস্থ্য কভারেজ",
    ayushmanBenefit2: "তালিকাভুক্ত হাসপাতালে নগদবিহীন চিকিত্সা",
    ayushmanBenefit3: "হাসপাতালে ভর্তির আগে এবং পরে খরচের কভারেজ",
    ayushmanBenefit4: "বিনামূল্যে ওষুধ এবং নির্ণয় পরীক্ষা",
    ayushmanEligibilityCriteria1: "₹2.5 লক্ষের কম বার্ষিক পারিবারিক আয়",
    ayushmanEligibilityCriteria2: "BPL কার্ডধারক বা SECC ডেটাবেসে তালিকাভুক্ত",
    ayushmanEligibilityCriteria3: "বৈধ আধার কার্ড প্রয়োজন",
    ayushmanInfo1: "সুবিধাভোগীদের জন্য কোন বয়স সীমা নেই",
    ayushmanInfo2: "প্রথম দিন থেকে পূর্ব-বিদ্যমান অবস্থা কভার করে",
    ayushmanInfo3: "সারা ভারত জুড়ে পোর্টেবল - যে কোনো রাজ্যে ব্যবহার করুন",

    // PM Kisan
    pmKisan: "PM কিষাণ সম্মান নিধি",
    pmKisanDesc: "কৃষকদের জন্য ₹6,000/বছর সরাসরি আয় সহায়তা।",
    pmKisanEligibility: "যোগ্য জমি সহ যোগ্য কৃষক",
    pmKisanOverview:
      "PM-কিষাণ সমস্ত জমির মালিকানাধীন কৃষক পরিবারগুলিকে কৃষি ইনপুটের জন্য তাদের আর্থিক প্রয়োজন পূরণের জন্য সরাসরি আয় সহায়তা প্রদান করে।",
    pmKisanBenefit1: "তিনটি সমান কিস্তিতে প্রতি বছর ₹6,000",
    pmKisanBenefit2: "কৃষকের অ্যাকাউন্টে সরাসরি ব্যাংক স্থানান্তর (DBT)",
    pmKisanBenefit3: "কোন মধ্যস্থতাকারী নেই - সরাসরি সরকারি সহায়তা",
    pmKisanBenefit4: "বীজ এবং সার কেনার জন্য আর্থিক সহায়তা",
    pmKisanEligibilityCriteria1: "ছোট এবং প্রান্তিক কৃষক পরিবার",
    pmKisanEligibilityCriteria2: "চাষযোগ্য জমি সহ জমির মালিকানাধীন কৃষক",
    pmKisanEligibilityCriteria3: "বৈধ ব্যাংক অ্যাকাউন্ট এবং আধার সংযোগ",
    pmKisanInfo1: "প্রতি চার মাসে একবার পেমেন্ট",
    pmKisanInfo2: "পরিবার সংজ্ঞায় স্বামী, স্ত্রী এবং নাবালক শিশু অন্তর্ভুক্ত",
    pmKisanInfo3: "অনলাইন বা CSC-এর মাধ্যমে নিবন্ধন করা যায়",

    // Mudra Yojana
    mudraYojana: "প্রধানমন্ত্রী মুদ্রা যোজনা",
    mudraDesc: "ছোট ব্যবসার মালিকদের জন্য ₹10 লক্ষ পর্যন্ত ঋণ।",
    mudraEligibility: "ছোট ব্যবসার মালিক এবং উদ্যোক্তা",
    mudraOverview:
      "মুদ্রা প্রকল্প উৎপাদন, বাণিজ্য এবং সেবা খাতে আয়-উৎপন্নকারী কার্যক্রমের জন্য ক্ষুদ্র এবং ছোট উদ্যোগে ঋণ প্রদান করে।",
    mudraBenefit1: "জামানত ছাড়াই ₹10 লক্ষ পর্যন্ত ঋণ",
    mudraBenefit2: "তিনটি বিভাগ: শিশু, কিশোর, তরুণ",
    mudraBenefit3: "ব্যবসায়িক নগদ প্রবাহের উপর ভিত্তি করে নমনীয় পরিশোধের শর্ত",
    mudraBenefit4: "ঐতিহ্যবাহী ঋণের তুলনায় কম সুদের হার",
    mudraEligibilityCriteria1: "ছোট ব্যবসার মালিক এবং উদ্যোক্তা",
    mudraEligibilityCriteria2: "কর্পোরেট নয়, কৃষি নয় এমন উদ্যোগ",
    mudraEligibilityCriteria3: "বৈধ ব্যবসায়িক পরিকল্পনা এবং KYC নথি",
    mudraInfo1: "কোন প্রক্রিয়াকরণ ফি বা লুকানো চার্জ নেই",
    mudraInfo2: "ঋণের পরিমাণ: শিশু (₹50 হাজার পর্যন্ত), কিশোর (₹50 হাজার-₹5 লক্ষ), তরুণ (₹5 লক্ষ-₹10 লক্ষ)",
    mudraInfo3: "ব্যাংক, NBFC এবং MFI এর মাধ্যমে উপলব্ধ",

    // Scholarship Portal
    scholarshipPortal: "জাতীয় বৃত্তি পোর্টাল",
    scholarshipDesc: "নিম্ন আয়ের পরিবারের শিক্ষার্থীদের জন্য বৃত্তি।",
    scholarshipEligibility: "আয় এবং একাডেমিক মানদণ্ড পূরণকারী শিক্ষার্থী",
    scholarshipOverview:
      "NSP বিভিন্ন কেন্দ্রীয় এবং রাজ্য সরকারি প্রকল্প থেকে বৃত্তি খোঁজার শিক্ষার্থীদের জন্য ওয়ান-স্টপ সমাধান।",
    scholarshipBenefit1: "একটি প্ল্যাটফর্মের অধীনে একাধিক বৃত্তি",
    scholarshipBenefit2: "শিক্ষার্থীর ব্যাংক অ্যাকাউন্টে সরাসরি সুবিধা স্থানান্তর",
    scholarshipBenefit3: "প্রি এবং পোস্ট-ম্যাট্রিক বৃত্তি সহায়তা",
    scholarshipBenefit4: "মেধা-কাম-মানস ভিত্তিক আর্থিক সহায়তা",
    scholarshipEligibilityCriteria1: "অর্থনৈতিকভাবে দুর্বল শ্রেণীর শিক্ষার্থী",
    scholarshipEligibilityCriteria2: "একাডেমিক পারফরম্যান্স মানদণ্ড পূরণ",
    scholarshipEligibilityCriteria3: "বৈধ আধার এবং ব্যাংক অ্যাকাউন্ট",
    scholarshipInfo1: "একাধিক প্রকল্পের জন্য একক আবেদন",
    scholarshipInfo2: "সম্পূর্ণ অনলাইন প্রক্রিয়া - কোন শারীরিক নথি নেই",
    scholarshipInfo3: "আবেদনের স্থিতির স্বচ্ছ ট্র্যাকিং",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("English");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("appLanguage") as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("appLanguage", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
