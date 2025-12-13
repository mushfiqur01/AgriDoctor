import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:bg-secondary hover:scale-105 active:scale-95"
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4 text-primary" />
      <span className={`text-sm font-semibold text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
        {language === 'en' ? 'বাং' : 'EN'}
      </span>
    </button>
  );
}
