import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import {
  PredictionResult as PredictionResultType,
  CropType,
} from '@/services/predictionService';
import { saveToHistory } from '@/services/historyService';
import {
  CheckCircle2,
  AlertCircle,
  Leaf,
  Home,
  RefreshCcw,
} from 'lucide-react';
import { v4 as uuid } from 'uuid';

/* =====================
   TYPES
===================== */
interface PredictionResultProps {
  imageData: string;
  result: PredictionResultType;
  onScanAgain: () => void;
  onGoHome: () => void;
}

/* =====================
   CONSTANTS
===================== */
const cropEmojis: Record<CropType, string> = {
  corn: '🌽',
  potato: '🥔',
  wheat: '🌾',
};

const cropNames: Record<CropType, { en: string; bn: string }> = {
  corn: { en: 'Corn', bn: 'ভুট্টা' },
  potato: { en: 'Potato', bn: 'আলু' },
  wheat: { en: 'Wheat', bn: 'গম' },
};

/* =====================
   LOCAL STORAGE HELPER
===================== */
function savePredictionToLocalStorage(data: any) {
  try {
    const existing =
      JSON.parse(localStorage.getItem('predictionHistory') || '[]');

    // newest first
    existing.unshift(data);

    localStorage.setItem(
      'predictionHistory',
      JSON.stringify(existing)
    );
  } catch (error) {
    console.error('Failed to save prediction history', error);
  }
}

/* =====================
   COMPONENT
===================== */
export function PredictionResultScreen({
  imageData,
  result,
  onScanAgain,
  onGoHome,
}: PredictionResultProps) {
  const { t, language } = useLanguage();

  /* =====================
     AUTO SAVE (ONCE)
  ===================== */
  useEffect(() => {
    const historyItem = {
      id: uuid(),
      imageData,
      crop: result.crop,
      diseaseKey: result.diseaseKey,
      diseaseInfo: result.diseaseInfo,
      createdAt: Date.now(),
    };

    // existing service save
    saveToHistory(historyItem);

    // ✅ NEW: localStorage save
    savePredictionToLocalStorage(historyItem);
  }, []);

  /* =====================
     STATUS LOGIC
  ===================== */
  const isHealthy = result.diseaseKey.includes('Healthy');
  const StatusIcon = isHealthy ? CheckCircle2 : AlertCircle;
  const statusColor = isHealthy ? 'text-accent' : 'text-destructive';
  const statusBg = isHealthy
    ? 'bg-accent/10'
    : 'bg-destructive/10';

  return (
    <div className="min-h-screen bg-soft-gradient">
      <Header showBack onBack={onGoHome} />

      <main className="pt-20 pb-8 px-4">
        <div className="max-w-lg mx-auto">
          {/* Title */}
          <div className="text-center py-4 animate-slide-up">
            <h1
              className={`text-2xl font-bold text-foreground ${
                language === 'bn' ? 'font-bangla' : ''
              }`}
            >
              {t('prediction.result')}
            </h1>
          </div>

          {/* Image Preview */}
          <div className="image-preview mb-6 animate-scale-in overflow-hidden">
            <img
              src={imageData}
              alt="Analyzed crop"
              className="w-full h-48 object-cover"
            />
          </div>

          {/* Status Badge */}
          <div
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl ${statusBg} mb-6 animate-scale-in`}
            style={{ animationDelay: '100ms' }}
          >
            <StatusIcon className={`w-6 h-6 ${statusColor}`} />
            <span
              className={`font-bold text-lg ${statusColor} ${
                language === 'bn' ? 'font-bangla' : ''
              }`}
            >
              {result.diseaseInfo.name}
            </span>
          </div>

          {/* Result Details */}
          <div className="space-y-4 mb-8">
            {/* Crop Info */}
            <div
              className="result-card animate-slide-up"
              style={{ animationDelay: '150ms' }}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {cropEmojis[result.crop]}
                </span>
                <div>
                  <p
                    className={`text-sm text-muted-foreground ${
                      language === 'bn' ? 'font-bangla' : ''
                    }`}
                  >
                    {t('prediction.crop')}
                  </p>
                  <p
                    className={`text-lg font-bold text-foreground ${
                      language === 'bn' ? 'font-bangla' : ''
                    }`}
                  >
                    {cropNames[result.crop][language]}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div
              className="result-card animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p
                    className={`text-sm text-muted-foreground mb-1 ${
                      language === 'bn' ? 'font-bangla' : ''
                    }`}
                  >
                    {t('prediction.description')}
                  </p>
                  <p
                    className={`text-foreground leading-relaxed ${
                      language === 'bn' ? 'font-bangla' : ''
                    }`}
                  >
                    {result.diseaseInfo.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Solutions */}
            <div
              className="result-card animate-slide-up"
              style={{ animationDelay: '250ms' }}
            >
              <p
                className={`text-sm text-muted-foreground mb-3 ${
                  language === 'bn' ? 'font-bangla' : ''
                }`}
              >
                {t('prediction.solutions')}
              </p>

              <div className="space-y-3">
                {result.diseaseInfo.solutions.map(
                  (solution, index) => (
                    <div key={index} className="solution-item">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <p
                        className={`text-foreground ${
                          language === 'bn'
                            ? 'font-bangla'
                            : ''
                        }`}
                      >
                        {solution}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className="space-y-4 animate-slide-up"
            style={{ animationDelay: '300ms' }}
          >
            <button
              onClick={onScanAgain}
              className="btn-action w-full flex items-center justify-center gap-3 text-lg"
            >
              <RefreshCcw className="w-5 h-5" />
              <span
                className={language === 'bn' ? 'font-bangla' : ''}
              >
                {t('prediction.scanAgain')}
              </span>
            </button>

            <button
              onClick={onGoHome}
              className="btn-secondary w-full flex items-center justify-center gap-3 text-lg"
            >
              <Home className="w-5 h-5" />
              <span
                className={language === 'bn' ? 'font-bangla' : ''}
              >
                {t('prediction.goHome')}
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
