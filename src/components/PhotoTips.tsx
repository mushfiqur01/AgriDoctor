import { useLanguage } from '@/contexts/LanguageContext';
import { Lightbulb, Sun, Focus, Leaf, Camera, Sparkles } from 'lucide-react';

const tips = [
  {
    icon: Focus,
    en: 'Hold your phone steady to avoid blurry photos',
    bn: 'ঝাপসা ছবি এড়াতে ফোন স্থির রাখুন',
  },
  {
    icon: Sun,
    en: 'Use good natural light, avoid harsh shadows',
    bn: 'ভালো প্রাকৃতিক আলো ব্যবহার করুন, কড়া ছায়া এড়িয়ে চলুন',
  },
  {
    icon: Leaf,
    en: 'Focus on the diseased or damaged area',
    bn: 'রোগাক্রান্ত বা ক্ষতিগ্রস্ত অংশে ফোকাস করুন',
  },
  {
    icon: Camera,
    en: 'Get close, but show the whole leaf if possible',
    bn: 'কাছে যান, তবে সম্ভব হলে পুরো পাতা দেখান',
  },
  {
    icon: Sparkles,
    en: 'Use a plain background for clearer results',
    bn: 'পরিষ্কার ফলাফলের জন্য সাদামাটা পটভূমি ব্যবহার করুন',
  },
];

export function PhotoTips() {
  const { language } = useLanguage();

  return (
    <div className="mt-6 p-4 rounded-2xl bg-accent/50 border border-border/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-full bg-primary/10">
          <Lightbulb className="w-4 h-4 text-primary" />
        </div>
        <h3 className={`text-sm font-semibold text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
          {language === 'en' ? 'Photo Tips for Best Results' : 'সেরা ফলাফলের জন্য ছবি তোলার টিপস'}
        </h3>
      </div>
      
      <ul className="space-y-2.5">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-2.5">
            <tip.icon className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <span className={`text-sm text-muted-foreground leading-relaxed ${language === 'bn' ? 'font-bangla' : ''}`}>
              {language === 'en' ? tip.en : tip.bn}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
