import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Scan, RefreshCcw, Loader2 } from 'lucide-react';
import { CropType } from '@/services/predictionService';

interface ImagePreviewProps {
  imageData: string;
  cropType: CropType;
  onBack: () => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const cropInfo: Record<CropType, { icon: string; en: string; bn: string }> = {
  corn: { icon: '🌽', en: 'Corn', bn: 'ভুট্টা' },
  potato: { icon: '🥔', en: 'Potato', bn: 'আলু' },
  wheat: { icon: '🌾', en: 'Wheat', bn: 'গম' },
};

export function ImagePreview({ imageData, cropType, onBack, onAnalyze, isAnalyzing }: ImagePreviewProps) {
  const { t, language } = useLanguage();
  const crop = cropInfo[cropType];

  return (
    <div className="min-h-screen bg-soft-gradient">
      <Header showBack onBack={onBack} />
      
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-lg mx-auto">
          {/* Title */}
          <div className="text-center py-4 animate-slide-up">
            <h1 className={`text-2xl font-bold text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('image.selected')}
            </h1>
            {/* Selected Crop Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 mt-3">
              <span className="text-lg">{crop.icon}</span>
              <span className={`text-sm font-medium text-primary ${language === 'bn' ? 'font-bangla' : ''}`}>
                {language === 'en' ? crop.en : crop.bn}
              </span>
            </div>
          </div>

          {/* Image Preview */}
          <div className="image-preview mb-8 animate-scale-in">
            <img
              src={imageData}
              alt="Selected crop"
              className="w-full h-auto max-h-[400px] object-contain bg-muted"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <button
              onClick={onAnalyze}
              disabled={isAnalyzing}
              className="btn-action w-full flex items-center justify-center gap-3 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className={language === 'bn' ? 'font-bangla' : ''}>
                    {t('image.analyzing')}
                  </span>
                </>
              ) : (
                <>
                  <Scan className="w-6 h-6" />
                  <span className={language === 'bn' ? 'font-bangla' : ''}>
                    {t('image.analyze')}
                  </span>
                </>
              )}
            </button>

            <button
              onClick={onBack}
              disabled={isAnalyzing}
              className="btn-secondary w-full flex items-center justify-center gap-3 text-lg disabled:opacity-50"
            >
              <RefreshCcw className="w-5 h-5" />
              <span className={language === 'bn' ? 'font-bangla' : ''}>
                {t('image.retake')}
              </span>
            </button>
          </div>

          {/* Analyzing Overlay */}
          {isAnalyzing && (
            <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 flex items-center justify-center">
              <div className="card-elevated text-center p-8 animate-scale-in">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
                <p className={`text-lg font-semibold text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {t('image.analyzing')}
                </p>
                <p className={`text-sm text-muted-foreground mt-2 ${language === 'bn' ? 'font-bangla' : ''}`}>
                  {language === 'en' ? 'Please wait while we analyze your image' : 'অনুগ্রহ করে অপেক্ষা করুন'}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
