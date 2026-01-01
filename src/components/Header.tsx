// src/components/Header.tsx
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { Leaf, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  hideAbout?: boolean;
  title?: string;  // NEW optional title prop
}

export function Header({ showBack, onBack, hideAbout, title }: HeaderProps) {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBack && onBack ? (
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className={`text-sm ${language === 'bn' ? 'font-bangla' : ''}`}>
                {t('general.back')}
              </span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-hero-gradient flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className={`font-bold text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                {title ?? t('app.name')}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!hideAbout && (
            <button
              onClick={() => navigate('/about')}
              className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label={t('about.title')}
            >
              <Info className="w-5 h-5" />
            </button>
          )}
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
