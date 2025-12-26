import { useLanguage } from '@/contexts/LanguageContext';
import { Leaf, Camera, Search, Smartphone, Calendar, RefreshCw, Info } from 'lucide-react';

export default function About() {
  const { t, language } = useLanguage();

  const features = [
    { icon: Camera, titleKey: 'about.feature1.title', descKey: 'about.feature1.desc' },
    { icon: Search, titleKey: 'about.feature2.title', descKey: 'about.feature2.desc' },
    { icon: Smartphone, titleKey: 'about.feature3.title', descKey: 'about.feature3.desc' },
  ];

  const steps = [
    { number: 1, titleKey: 'about.step1.title', descKey: 'about.step1.desc' },
    { number: 2, titleKey: 'about.step2.title', descKey: 'about.step2.desc' },
    { number: 3, titleKey: 'about.step3.title', descKey: 'about.step3.desc' },
    { number: 4, titleKey: 'about.step4.title', descKey: 'about.step4.desc' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-lg mx-auto space-y-8">
          {/* App Info Section */}
          <section className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-hero-gradient flex items-center justify-center shadow-lg">
              <Leaf className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className={`text-2xl font-bold text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('app.name')}
            </h1>
            <p className={`text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('about.intro')}
            </p>
          </section>

          {/* Features Section */}
          <section className="space-y-4">
            <h2 className={`text-lg font-semibold text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('about.features.title')}
            </h2>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className={`font-medium text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {t(feature.titleKey)}
                    </h3>
                    <p className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {t(feature.descKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How to Use Section */}
          <section className="space-y-4">
            <h2 className={`text-lg font-semibold text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('about.howToUse.title')}
            </h2>
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.number} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary-foreground">{step.number}</span>
                  </div>
                  <div className="space-y-1 pt-1">
                    <h3 className={`font-medium text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {t(step.titleKey)}
                    </h3>
                    <p className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {t(step.descKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Supported Crops */}
          <section className="space-y-4">
            <h2 className={`text-lg font-semibold text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('home.supportedCrops')}
            </h2>
            <div className="flex gap-4 justify-center">
              {['corn', 'potato', 'wheat'].map((crop) => (
                <div key={crop} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">
                      {crop === 'corn' ? '🌽' : crop === 'potato' ? '🥔' : '🌾'}
                    </span>
                  </div>
                  <span className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {t(`home.${crop}`)}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* App Info Section */}
          <section className="space-y-4">
            <h2 className={`text-lg font-semibold text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('about.appInfo.title')}
            </h2>
            <div className="rounded-xl bg-card border border-border overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Info className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {t('about.appInfo.version')}
                  </p>
                  <p className="font-medium text-foreground">1.0.0</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Calendar className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {t('about.appInfo.releaseDate')}
                  </p>
                  <p className={`font-medium text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {t('about.appInfo.releaseDateValue')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4">
                <RefreshCw className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {t('about.appInfo.lastUpdate')}
                  </p>
                  <p className={`font-medium text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {t('about.appInfo.lastUpdateValue')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <section className="text-center pt-4 border-t border-border space-y-2">
            <p className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('about.footer.madeWith')}
            </p>
            <p className="text-xs text-muted-foreground">© 2025 AgriDoctor</p>
          </section>
        </div>
      </main>
    </div>
  );
}
