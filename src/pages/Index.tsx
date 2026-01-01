import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelection } from '@/screens/LanguageSelection';
import { HomeScreen } from '@/screens/HomeScreen';
import { ImagePreview } from '@/screens/ImagePreview';
import { PredictionResultScreen } from '@/screens/PredictionResult';
import { ModelPreloader } from '@/components/ModelPreloader';
import { analyzeCropImage, PredictionResult, CropType, BlurDetectionError } from '@/services/predictionService';
import { areModelsPreloaded } from '@/services/modelPreloader';
import { toast } from 'sonner';

type Screen = 'home' | 'preview' | 'result';

const Index = () => {
  const { isLanguageSelected, language, t } = useLanguage();
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<CropType | null>(null);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [modelsReady, setModelsReady] = useState(areModelsPreloaded());

  if (!modelsReady) {
    return <ModelPreloader onComplete={() => setModelsReady(true)} />;
  }

  if (!isLanguageSelected) {
    return <LanguageSelection />;
  }

  const handleImageSelected = (imageData: string, crop: CropType) => {
    setSelectedImage(imageData);
    setSelectedCrop(crop);
    setCurrentScreen('preview');
  };

  const handleAnalyze = async () => {
    if (!selectedImage || !selectedCrop) {
      toast.error(t('error.noImage'));
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeCropImage(selectedImage, selectedCrop, language);
      setPredictionResult(result);
      setCurrentScreen('result');
    } catch (error) {
      console.error('Analysis error:', error);

      if (error instanceof BlurDetectionError) {
        const blurMessage =
          language === 'en'
            ? '❗ The image is too blurry to analyze.\n\nPlease take a clearer photo:\n• Hold camera steady\n• Ensure good lighting\n• Focus on the leaf\n• Avoid motion blur'
            : '❗ ছবিটি বিশ্লেষণের জন্য অত্যন্ত ঝাপসা।\n\nঅনুগ্রহ করে আরও পরিষ্কার ছবি তুলুন:\n• ক্যামেরা স্থির রাখুন\n• ভালো আলো নিশ্চিত করুন\n• পাতায় ফোকাস করুন\n• মোশন ব্লার এড়িয়ে চলুন';

        toast.error(blurMessage, {
          duration: 6000,
        });
      } else {
        toast.error(t('error.analysis'));
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBackToHome = () => {
    setSelectedImage(null);
    setSelectedCrop(null);
    setPredictionResult(null);
    setCurrentScreen('home');
  };

  const handleScanAgain = () => {
    setPredictionResult(null);
    setCurrentScreen('home');
  };

  switch (currentScreen) {
    case 'preview':
      return (
        <div className="pt-16">
          <ImagePreview
            imageData={selectedImage!}
            cropType={selectedCrop!}
            onBack={handleBackToHome}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
          />
        </div>
      );

    case 'result':
      return (
        <div className="pt-16">
          <PredictionResultScreen
            imageData={selectedImage!}
            result={predictionResult!}
            onScanAgain={handleScanAgain}
            onGoHome={handleBackToHome}
          />
        </div>
      );

    default:
      return (
        <div className="pt-16">
          <HomeScreen onImageSelected={handleImageSelected} />
        </div>
      );
  }
};

export default Index;
