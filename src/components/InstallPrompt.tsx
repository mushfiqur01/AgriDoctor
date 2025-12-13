import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const { language } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Check if user has dismissed before
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Listen for successful install
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up">
      <div className="max-w-lg mx-auto bg-card border border-border rounded-2xl shadow-xl p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Download className="w-6 h-6 text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
              {language === 'en' ? 'Install AgriDoctor' : 'AgriDoctor ইনস্টল করুন'}
            </h3>
            <p className={`text-sm text-muted-foreground mt-0.5 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {language === 'en' 
                ? 'Add to home screen for offline access' 
                : 'অফলাইন অ্যাক্সেসের জন্য হোম স্ক্রিনে যোগ করুন'}
            </p>
            
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleInstall}
                className="btn-action px-4 py-2 text-sm"
              >
                <span className={language === 'bn' ? 'font-bangla' : ''}>
                  {language === 'en' ? 'Install' : 'ইনস্টল'}
                </span>
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className={language === 'bn' ? 'font-bangla' : ''}>
                  {language === 'en' ? 'Not now' : 'এখন না'}
                </span>
              </button>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
