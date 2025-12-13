// Disease information database
// Keys match exact model output labels

export interface DiseaseInfo {
  name: string;
  description: string;
  solutions: string[];
}

export interface CropDiseaseData {
  [diseaseKey: string]: {
    en: DiseaseInfo;
    bn: DiseaseInfo;
  };
}

export interface DiseaseDatabase {
  [cropKey: string]: CropDiseaseData;
}

// Disease information with keys matching exact model output labels
export const diseaseDatabase: DiseaseDatabase = {
  corn: {
    "Corn___Common_Rust": {
      en: {
        name: "Common Rust",
        description: "Common rust appears as small, circular to elongated, cinnamon-brown pustules on both leaf surfaces.",
        solutions: [
          "Apply fungicides if infection is severe.",
          "Plant resistant corn varieties.",
          "Remove and destroy infected plant debris."
        ]
      },
      bn: {
        name: "সাধারণ মরিচা",
        description: "সাধারণ মরিচা পাতার উভয় পৃষ্ঠে ছোট, গোলাকার থেকে লম্বাটে, দারুচিনি-বাদামী পুস্টুল হিসেবে দেখা যায়।",
        solutions: [
          "সংক্রমণ গুরুতর হলে ছত্রাকনাশক প্রয়োগ করুন।",
          "প্রতিরোধী ভুট্টার জাত চাষ করুন।",
          "সংক্রমিত উদ্ভিদের ধ্বংসাবশেষ সরিয়ে ধ্বংস করুন।"
        ]
      }
    },
    "Corn___Gray_Leaf_Spot": {
      en: {
        name: "Gray Leaf Spot",
        description: "Rectangular, gray to tan lesions that run parallel to leaf veins, causing significant yield loss.",
        solutions: [
          "Use resistant corn hybrids.",
          "Apply foliar fungicides preventatively.",
          "Practice crop rotation with non-host crops."
        ]
      },
      bn: {
        name: "ধূসর পাতার দাগ",
        description: "আয়তক্ষেত্রাকার, ধূসর থেকে তামাটে ক্ষত যা পাতার শিরার সমান্তরালে চলে, উল্লেখযোগ্য ফলন হ্রাস করে।",
        solutions: [
          "প্রতিরোধী ভুট্টা হাইব্রিড ব্যবহার করুন।",
          "প্রতিরোধমূলকভাবে পাতায় ছত্রাকনাশক প্রয়োগ করুন।",
          "অ-হোস্ট ফসলের সাথে ফসল ঘূর্ণন অনুশীলন করুন।"
        ]
      }
    },
    "Corn___Healthy": {
      en: {
        name: "Healthy Leaf",
        description: "The leaf shows no disease symptoms. The plant appears to be in good health with proper green coloration.",
        solutions: ["No action required.", "Continue regular care and monitoring."]
      },
      bn: {
        name: "সুস্থ পাতা",
        description: "পাতায় কোনো রোগের লক্ষণ নেই। উদ্ভিদটি যথাযথ সবুজ রঙ সহ সুস্থ অবস্থায় আছে।",
        solutions: ["কোনো পদক্ষেপ দরকার নেই।", "নিয়মিত যত্ন ও পর্যবেক্ষণ চালিয়ে যান।"]
      }
    },
    "Corn___Leaf_Blight": {
      en: {
        name: "Leaf Blight",
        description: "Characterized by long, elliptical, grayish-green to tan lesions that can grow up to 6 inches.",
        solutions: [
          "Use resistant hybrids.",
          "Apply foliar fungicides at early stages.",
          "Practice crop rotation with non-host crops."
        ]
      },
      bn: {
        name: "পাতা ঝলসানো",
        description: "লম্বা, উপবৃত্তাকার, ধূসর-সবুজ থেকে তামাটে ক্ষত যা ৬ ইঞ্চি পর্যন্ত বড় হতে পারে।",
        solutions: [
          "প্রতিরোধী হাইব্রিড ব্যবহার করুন।",
          "প্রাথমিক পর্যায়ে পাতায় ছত্রাকনাশক প্রয়োগ করুন।",
          "অ-হোস্ট ফসলের সাথে ফসল ঘূর্ণন অনুশীলন করুন।"
        ]
      }
    }
  },
  potato: {
    "Potato___Early_Blight": {
      en: {
        name: "Early Blight",
        description: "Dark brown to black lesions with concentric rings, often starting on older leaves.",
        solutions: [
          "Apply protective fungicides before infection.",
          "Remove infected leaves promptly.",
          "Ensure adequate spacing for air circulation."
        ]
      },
      bn: {
        name: "আগাম ঝলসানো",
        description: "গাঢ় বাদামী থেকে কালো ক্ষত যার মধ্যে একই কেন্দ্রীয় বলয় আছে, সাধারণত পুরানো পাতায় শুরু হয়।",
        solutions: [
          "সংক্রমণের আগে প্রতিরক্ষামূলক ছত্রাকনাশক প্রয়োগ করুন।",
          "সংক্রমিত পাতা দ্রুত সরিয়ে ফেলুন।",
          "বায়ু সঞ্চালনের জন্য পর্যাপ্ত ব্যবধান নিশ্চিত করুন।"
        ]
      }
    },
    "Potato___Healthy": {
      en: {
        name: "Healthy Leaf",
        description: "The potato leaf shows no signs of disease. Leaves are green and firm with normal appearance.",
        solutions: ["No action required.", "Maintain proper irrigation and nutrition."]
      },
      bn: {
        name: "সুস্থ পাতা",
        description: "আলুর পাতায় কোনো রোগের লক্ষণ নেই। পাতা সবুজ এবং স্বাভাবিক চেহারা সহ শক্ত।",
        solutions: ["কোনো পদক্ষেপ দরকার নেই।", "যথাযথ সেচ ও পুষ্টি বজায় রাখুন।"]
      }
    },
    "Potato___Late_Blight": {
      en: {
        name: "Late Blight",
        description: "Water-soaked lesions that quickly turn brown to purple-black, often with white mold on undersides.",
        solutions: [
          "Apply systemic fungicides immediately.",
          "Destroy all infected plant material.",
          "Avoid overhead irrigation."
        ]
      },
      bn: {
        name: "বিলম্বিত ঝলসানো",
        description: "পানি-ভেজা ক্ষত যা দ্রুত বাদামী থেকে বেগুনি-কালো হয়ে যায়, প্রায়ই নীচের দিকে সাদা ছাতা থাকে।",
        solutions: [
          "অবিলম্বে সিস্টেমিক ছত্রাকনাশক প্রয়োগ করুন।",
          "সমস্ত সংক্রমিত উদ্ভিদ উপাদান ধ্বংস করুন।",
          "উপর থেকে সেচ এড়িয়ে চলুন।"
        ]
      }
    }
  },
  wheat: {
    "Wheat___Brown_Rust": {
      en: {
        name: "Brown Rust",
        description: "Orange-brown pustules scattered randomly on leaf surfaces, causing reduced photosynthesis and yield loss.",
        solutions: [
          "Apply fungicides at early infection stages.",
          "Plant resistant wheat varieties.",
          "Remove volunteer wheat and grass hosts."
        ]
      },
      bn: {
        name: "বাদামী মরিচা",
        description: "পাতার পৃষ্ঠে এলোমেলোভাবে ছড়িয়ে থাকা কমলা-বাদামী পুস্টুল, যা সালোকসংশ্লেষণ কমায় এবং ফলন হ্রাস করে।",
        solutions: [
          "সংক্রমণের প্রাথমিক পর্যায়ে ছত্রাকনাশক প্রয়োগ করুন।",
          "প্রতিরোধী গমের জাত চাষ করুন।",
          "স্বেচ্ছাসেবী গম এবং ঘাস হোস্ট সরিয়ে ফেলুন।"
        ]
      }
    },
    "Wheat___Healthy": {
      en: {
        name: "Healthy Leaf",
        description: "The wheat leaf is healthy with no visible disease symptoms. Good green color and proper leaf structure.",
        solutions: ["No action required.", "Continue regular care and monitoring."]
      },
      bn: {
        name: "সুস্থ পাতা",
        description: "গমের পাতা সুস্থ, কোনো দৃশ্যমান রোগের লক্ষণ নেই। ভালো সবুজ রঙ এবং যথাযথ পাতার গঠন।",
        solutions: ["কোনো পদক্ষেপ দরকার নেই।", "নিয়মিত যত্ন ও পর্যবেক্ষণ চালিয়ে যান।"]
      }
    },
    "Wheat___Yellow_Rust": {
      en: {
        name: "Yellow Rust",
        description: "Yellow-orange pustules arranged in stripes along leaf veins, spreading rapidly in cool, humid conditions.",
        solutions: [
          "Apply systemic fungicides promptly.",
          "Use certified disease-free seeds.",
          "Practice crop rotation with non-cereal crops."
        ]
      },
      bn: {
        name: "হলুদ মরিচা",
        description: "পাতার শিরা বরাবর ডোরায় সাজানো হলুদ-কমলা পুস্টুল, শীতল ও আর্দ্র অবস্থায় দ্রুত ছড়িয়ে পড়ে।",
        solutions: [
          "দ্রুত সিস্টেমিক ছত্রাকনাশক প্রয়োগ করুন।",
          "প্রত্যয়িত রোগমুক্ত বীজ ব্যবহার করুন।",
          "অ-শস্য ফসলের সাথে ফসল ঘূর্ণন অনুশীলন করুন।"
        ]
      }
    }
  }
};

export function getDiseaseInfo(crop: string, diseaseLabel: string, language: 'en' | 'bn'): DiseaseInfo | null {
  const cropData = diseaseDatabase[crop.toLowerCase()];
  if (!cropData) return null;
  
  // Look up using exact model output label (e.g., "Potato___Early_Blight")
  const diseaseData = cropData[diseaseLabel];
  if (!diseaseData) return null;
  
  return diseaseData[language];
}

export function getAllDiseasesForCrop(crop: string): string[] {
  const cropData = diseaseDatabase[crop.toLowerCase()];
  if (!cropData) return [];
  return Object.keys(cropData);
}
