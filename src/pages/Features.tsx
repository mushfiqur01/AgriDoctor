import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { Leaf, Layers, Droplet } from "lucide-react";

const featuresData = {
  corn: {
    titleEn: "Corn",
    titleBn: "ভুট্টা",
    image: "https://cdn.britannica.com/36/167236-050-BF90337E/Ears-corn.jpg",
    general: {
      en: [
        "Corn is a warm-season crop and thrives in well-drained, fertile soils with a pH of 5.8 to 7.0.",
        "Planting season typically spans late spring to early summer.",
        "Corn requires moderate water, especially during germination and tasseling stages.",
        "Nitrogen fertilization is crucial for healthy stalk and cob development.",
        "Common pests include corn borers, aphids, and armyworms.",
        "Crop rotation helps prevent disease buildup and soil nutrient depletion.",
      ],
      bn: [
        "ভুট্টা একটি গরম মৌসুমের ফসল এবং ভালো নিষ্কাশনযুক্ত, উর্বর মাটিতে বৃদ্ধি পায় যার pH ৫.৮ থেকে ৭.০ এর মধ্যে হওয়া উচিত।",
        "রোপণের সময় সাধারণত বসন্তের শেষ থেকে গ্রীষ্মের শুরু পর্যন্ত হয়।",
        "উত্থান এবং টাসেলিং সময় বেশি পানি প্রয়োজন।",
        "সুস্থ গাছ ও ভুট্টা উৎপাদনের জন্য নাইট্রোজেন সার অত্যন্ত গুরুত্বপূর্ণ।",
        "সাধারণ কীটের মধ্যে ভুট্টা বোরার, অ্যাফিডস, এবং আর্মিওয়ার্মস অন্তর্ভুক্ত।",
        "ফসল পাল্টানো রোগ ও মাটির পুষ্টি ক্ষয় কমাতে সাহায্য করে।",
      ],
    },
    tips: {
      en: [
        "Plant in well-prepared soil in late spring for optimal growth.",
        "Ensure 20-30 inches of water throughout the growing season; drip irrigation is effective.",
        "Use certified hybrid seeds for better yield and disease resistance.",
        "Practice crop rotation with legumes to improve soil nitrogen.",
        "Monitor and control pests early to avoid yield loss.",
      ],
      bn: [
        "উপযুক্ত মাটি প্রস্তুত করে বসন্তের শেষদিকে রোপণ করুন।",
        "বৃদ্ধি কালীন পর্যাপ্ত পানি দিন (২০-৩০ ইঞ্চি); ড্রিপ সেচ ভাল ফল দেয়।",
        "উচ্চ ফলনের জন্য সনদপ্রাপ্ত হাইব্রিড বীজ ব্যবহার করুন।",
        "মাটির নাইট্রোজেন উন্নয়নে লেগুম জাতীয় ফসলের সাথে ফসল পাল্টান।",
        "ক্ষতি এড়াতে কীট early পর্যায়ে নিয়ন্ত্রণ করুন।",
      ],
    },
  },

  potato: {
    titleEn: "Potato",
    titleBn: "আলু",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI7t2YvyHFQgaI_hiHdCsZ1RNUvQnMVrpfRA&s",
    general: {
      en: [
        "Potatoes grow best in cool climates with well-drained loamy soil rich in organic matter.",
        "Planting season is early spring or autumn depending on region.",
        "Consistent moisture is necessary for proper tuber development.",
        "Potassium fertilization boosts yield and disease resistance.",
        "Common diseases include late blight, scab, and blackleg.",
        "Crop spacing affects tuber size and quality.",
      ],
      bn: [
        "আলু ঠান্ডা আবহাওয়ায় এবং ভালো নিষ্কাশনযুক্ত, জৈব পদার্থ সমৃদ্ধ দোআঁশ মাটিতে ভালো বৃদ্ধি পায়।",
        "রোপণের সময় সাধারণত বসন্তের শুরু বা শরৎকাল।",
        "টিউবার সঠিক বৃদ্ধির জন্য নিয়মিত সেচ প্রয়োজন।",
        "ফলন বাড়াতে পটাশিয়াম সার প্রয়োগ করা হয়।",
        "সাধারণ রোগের মধ্যে লেট ব্লাইট, স্ক্যাব, এবং ব্ল্যাকলেগ অন্তর্ভুক্ত।",
        "ফসলের দূরত্ব টিউবার আকার ও মানে প্রভাব ফেলে।",
      ],
    },
    tips: {
      en: [
        "Use certified seed potatoes and practice crop rotation to minimize disease.",
        "Plant in cool weather avoiding waterlogged soils.",
        "Maintain soil moisture especially during tuber bulking stage.",
        "Apply balanced fertilizers rich in potassium and phosphorus.",
        "Mulch fields to conserve moisture and control weeds.",
      ],
      bn: [
        "সনদপ্রাপ্ত বীজ ব্যবহার করুন এবং রোগ কমাতে ফসল পাল্টান।",
        "ঠান্ডা আবহাওয়ায় রোপণ করুন, পানি জমে থাকা মাটি এড়িয়ে চলুন।",
        "টিউবার বৃদ্ধির সময় মাটির আর্দ্রতা বজায় রাখুন।",
        "পটাশ ও ফসফরাস সমৃদ্ধ সার ব্যবহার করুন।",
        "মাল্চিং করুন পানি রক্ষা এবং আগাছা নিয়ন্ত্রণের জন্য।",
      ],
    },
  },

  wheat: {
    titleEn: "Wheat",
    titleBn: "গম",
    image: "https://images.presentationgo.com/2025/04/green-wheat-field-sunrise.jpg",
    general: {
      en: [
        "Wheat grows best in cool, moist climates with well-drained fertile soil.",
        "Planting is usually done in late autumn to early winter.",
        "Irrigation is important during critical growth stages like tillering and heading.",
        "Nitrogen fertilization improves yield and grain quality.",
        "Common pests include aphids, armyworms, and Hessian flies.",
        "Selecting disease-resistant varieties improves crop health.",
      ],
      bn: [
        "গম ঠান্ডা, আর্দ্র আবহাওয়া এবং ভালো নিষ্কাশনযুক্ত উর্বর মাটি পছন্দ করে।",
        "রোপণের সময় সাধারণত শরৎ থেকে শীতকাল।",
        "টিলারিং ও হেডিং স্টেজে সেচ গুরুত্বপূর্ণ।",
        "ফলন ও মান উন্নয়নে নাইট্রোজেন সার প্রয়োগ করা হয়।",
        "সাধারণ কীটের মধ্যে অ্যাফিডস, আর্মিওয়ার্মস এবং হেসিয়ান ফ্লাই অন্তর্ভুক্ত।",
        "রোগ প্রতিরোধী জাত নির্বাচন করলে ফসল সুস্থ থাকে।",
      ],
    },
    tips: {
      en: [
        "Plant in well-prepared seedbeds during late autumn.",
        "Maintain soil moisture during heading and grain filling stages.",
        "Use disease-resistant wheat varieties when available.",
        "Rotate crops to reduce pest and disease pressure.",
        "Apply balanced fertilization with nitrogen, phosphorus, and potassium.",
      ],
      bn: [
        "শরৎকালে ভালো প্রস্তুত বীজ বেডে রোপণ করুন।",
        "হেডিং ও গ্রেইন ফিলিং সময়ে মাটির আর্দ্রতা বজায় রাখুন।",
        "যদি সম্ভব হয় তবে রোগ প্রতিরোধী জাত ব্যবহার করুন।",
        "কীট ও রোগ কমাতে ফসল পাল্টান।",
        "সার প্রয়োগে নাইট্রোজেন, ফসফরাস ও পটাশিয়াম ব্যালান্স রাখুন।",
      ],
    },
  },
};

export default function Features() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header showBack onBack={() => window.history.back()} />

      <main className="pt-20 pb-12 px-6 max-w-5xl mx-auto space-y-12">
        <h1
          className={`text-4xl font-extrabold text-center mb-10 ${
            language === "bn" ? "font-bangla" : ""
          }`}
        >
          {language === "en" ? "Features & Crop Care" : "বৈশিষ্ট্য ও ফসল পরিচর্যা"}
        </h1>

        {Object.entries(featuresData).map(([key, crop]) => (
          <section
            key={key}
            className="bg-card border border-border rounded-2xl p-8 shadow-lg"
          >
            {/* Header with icon-style image */}
            <header className="flex items-center gap-4 mb-6">
              <img
                src={crop.image}
                alt={language === "en" ? crop.titleEn : crop.titleBn}
                className="w-12 h-12 rounded-md object-cover border"
              />
              <h2
                className={`text-3xl font-semibold text-primary ${
                  language === "bn" ? "font-bangla" : ""
                }`}
              >
                {language === "en" ? crop.titleEn : crop.titleBn}
              </h2>
            </header>

            {/* General Info */}
            <section className="mb-6">
              <h3 className="flex items-center gap-2 text-xl font-semibold mb-3">
                <Layers className="w-5 h-5 text-primary" />
                {language === "en" ? "General Information" : "সাধারণ তথ্য"}
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {(language === "en"
                  ? crop.general.en
                  : crop.general.bn
                ).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Tips */}
            <section>
              <h3 className="flex items-center gap-2 text-xl font-semibold mb-3 text-primary">
                <Droplet className="w-5 h-5" />
                {language === "en" ? "Tips & Best Practices" : "টিপস ও সেরা অভ্যাস"}
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-primary">
                {(language === "en" ? crop.tips.en : crop.tips.bn).map(
                  (tip, idx) => (
                    <li key={idx}>{tip}</li>
                  )
                )}
              </ul>
            </section>
          </section>
        ))}
      </main>
    </div>
  );
}
