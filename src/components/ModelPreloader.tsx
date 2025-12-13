import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { preloadAllModels, areModelsPreloaded, PreloadProgress } from '@/services/modelPreloader';
import { Progress } from '@/components/ui/progress';
import { Loader2, Download, CheckCircle2, Leaf, Wheat } from 'lucide-react';

interface ModelPreloaderProps {
  onComplete: () => void;
}

export function ModelPreloader({ onComplete }: ModelPreloaderProps) {
  const { language } = useLanguage();
  const [progress, setProgress] = useState<PreloadProgress>({
    stage: 'coco',
    progress: 0,
    message: 'Preparing models...',
    messageBn: 'মডেল প্রস্তুত করা হচ্ছে...'
  });
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const startPreload = async () => {
    setError(null);
    setIsRetrying(false);
    
    try {
      await preloadAllModels(setProgress);
      // Small delay to show completion message
      setTimeout(onComplete, 1500);
    } catch (err) {
      console.error("Preload failed:", err);
      setError(language === 'bn' 
        ? 'মডেল লোড করতে ব্যর্থ। ইন্টারনেট সংযোগ পরীক্ষা করুন।'
        : 'Failed to load models. Please check your internet connection.'
      );
    }
  };

  useEffect(() => {
    // Check if already preloaded
    if (areModelsPreloaded()) {
      console.log("Models already preloaded, skipping...");
      onComplete();
      return;
    }
    
    startPreload();
  }, []);

  const handleRetry = () => {
    setIsRetrying(true);
    startPreload();
  };

  const getStageIcon = () => {
    switch (progress.stage) {
      case 'coco':
        return <Leaf className="h-8 w-8 text-primary animate-pulse" />;
      case 'corn':
      case 'potato':
      case 'wheat':
        return <Wheat className="h-8 w-8 text-primary animate-pulse" />;
      case 'complete':
        return <CheckCircle2 className="h-8 w-8 text-green-500" />;
      default:
        return <Download className="h-8 w-8 text-primary animate-pulse" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center p-6">
      {/* Logo/Brand */}
      <div className="mb-8 text-center">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Leaf className="h-10 w-10 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          {language === 'bn' ? 'এগ্রিডক্টর' : 'AgriDoctor'}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {language === 'bn' ? 'ফসল রোগ নির্ণয়' : 'Crop Disease Detection'}
        </p>
      </div>

      {/* Progress Card */}
      <div className="w-full max-w-sm bg-card rounded-2xl p-6 shadow-xl border border-border">
        {error ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="h-8 w-8 text-destructive" />
            </div>
            <p className="text-destructive text-sm mb-4">{error}</p>
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isRetrying ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {language === 'bn' ? 'চেষ্টা করা হচ্ছে...' : 'Retrying...'}
                </span>
              ) : (
                language === 'bn' ? 'আবার চেষ্টা করুন' : 'Try Again'
              )}
            </button>
          </div>
        ) : (
          <>
            {/* Stage Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                {getStageIcon()}
              </div>
            </div>

            {/* Progress Message */}
            <p className="text-center text-foreground font-medium mb-2">
              {language === 'bn' ? progress.messageBn : progress.message}
            </p>

            {/* Progress Bar */}
            <Progress value={progress.progress} className="h-2 mb-2" />
            
            <p className="text-center text-xs text-muted-foreground">
              {progress.progress}%
            </p>

            {/* Info Text */}
            <p className="text-center text-xs text-muted-foreground mt-4">
              {language === 'bn' 
                ? 'প্রথমবার মডেল ডাউনলোড করা হচ্ছে। এটি অফলাইন ব্যবহারের জন্য সংরক্ষণ করা হবে।'
                : 'Downloading models for the first time. They will be saved for offline use.'
              }
            </p>
          </>
        )}
      </div>

      {/* Network hint */}
      {!error && progress.stage !== 'complete' && (
        <p className="text-xs text-muted-foreground mt-6 text-center max-w-xs">
          {language === 'bn'
            ? '⚡ ভালো ইন্টারনেট সংযোগ প্রয়োজন'
            : '⚡ Good internet connection required'
          }
        </p>
      )}
    </div>
  );
}
