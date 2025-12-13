import { useLanguage } from '@/contexts/LanguageContext';
import { Leaf, Sparkles } from 'lucide-react';

export function LanguageSelection() {
  const { setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-soft-gradient flex flex-col items-center justify-center p-6">
      {/* Logo & Brand */}
      <div className="text-center mb-12 animate-slide-up">
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-hero-gradient flex items-center justify-center shadow-card animate-float">
          <Leaf className="w-12 h-12 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-extrabold text-foreground mb-2">AgriDoctor</h1>
        <p className="text-lg text-muted-foreground">Crop Disease Detection</p>
      </div>

      {/* Language Selection */}
      <div className="w-full max-w-sm space-y-4 animate-scale-in" style={{ animationDelay: '200ms' }}>
        <p className="text-center text-muted-foreground mb-6 font-medium">
          Select your language / ভাষা নির্বাচন করুন
        </p>
        
        <button
          onClick={() => setLanguage('en')}
          className="language-btn language-btn-en flex items-center justify-center gap-3 group"
        >
          <Sparkles className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" />
          <span>English</span>
        </button>

        <button
          onClick={() => setLanguage('bn')}
          className="language-btn language-btn-bn font-bangla flex items-center justify-center gap-3 group"
        >
          <Sparkles className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" />
          <span>বাংলা</span>
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted-foreground/50">
        <span className="text-2xl">🌽</span>
        <span className="text-2xl">🥔</span>
        <span className="text-2xl">🌾</span>
      </div>
    </div>
  );
}
