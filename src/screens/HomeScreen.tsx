import { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Camera, Image, Sparkles, ArrowLeft } from 'lucide-react';
import { PhotoTips } from '@/components/PhotoTips';
import { toast } from 'sonner';
import { CropType } from '@/services/predictionService';

interface HomeScreenProps {
  onImageSelected: (imageData: string, crop: CropType) => void;
}

interface CropOption {
  type: CropType;
  icon: string;
  nameEn: string;
  nameBn: string;
}

const crops: CropOption[] = [
  { type: 'corn', icon: '🌽', nameEn: 'Corn', nameBn: 'ভুট্টা' },
  { type: 'potato', icon: '🥔', nameEn: 'Potato', nameBn: 'আলু' },
  { type: 'wheat', icon: '🌾', nameEn: 'Wheat', nameBn: 'গম' },
];

export function HomeScreen({ onImageSelected }: HomeScreenProps) {
  const { t, language } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState<CropType | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedCrop) {
      if (!file.type.startsWith('image/')) {
        toast.error(language === 'en' ? 'Please select an image file' : 'অনুগ্রহ করে একটি ছবি ফাইল নির্বাচন করুন');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        onImageSelected(imageData, selectedCrop);
      };
      reader.readAsDataURL(file);
    }
    // Reset input value so same file can be selected again
    event.target.value = '';
  };

  const handleCameraClick = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const handleGalleryClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCropSelect = (crop: CropType) => {
    setSelectedCrop(crop);
  };

  const handleBack = () => {
    setSelectedCrop(null);
  };

  return (
    <div className="min-h-screen bg-soft-gradient">
      <Header />
      
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-lg mx-auto">
          {/* Hero Section */}
          <div className="text-center py-6 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span className={language === 'bn' ? 'font-bangla' : ''}>
                {language === 'en' ? 'AI-Powered Analysis' : 'এআই-চালিত বিশ্লেষণ'}
              </span>
            </div>
            
            <h1 className={`text-3xl font-extrabold text-foreground mb-3 ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('home.welcome')}
            </h1>
            <p className={`text-muted-foreground text-lg ${language === 'bn' ? 'font-bangla' : ''}`}>
              {t('home.subtitle')}
            </p>
          </div>

          {!selectedCrop ? (
            /* Step 1: Crop Selection */
            <div className="animate-scale-in">
              <h2 className={`text-center text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-6 ${language === 'bn' ? 'font-bangla' : ''}`}>
                {language === 'en' ? 'Select a Crop' : 'একটি ফসল নির্বাচন করুন'}
              </h2>
              
              <div className="grid grid-cols-3 gap-4">
                {crops.map((crop, index) => (
                  <button
                    key={crop.type}
                    onClick={() => handleCropSelect(crop.type)}
                    className="card-elevated p-4 flex flex-col items-center gap-3 hover:border-primary hover:bg-primary/5 transition-all duration-200 animate-scale-in cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-4xl animate-float" style={{ animationDelay: `${index * 200}ms` }}>
                      {crop.icon}
                    </span>
                    <span className={`text-sm font-medium text-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
                      {language === 'en' ? crop.nameEn : crop.nameBn}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Step 2: Image Capture */
            <div className="animate-scale-in">
              {/* Back Button & Selected Crop */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className={`text-sm ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {language === 'en' ? 'Change crop' : 'ফসল পরিবর্তন'}
                  </span>
                </button>
                
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10">
                  <span className="text-xl">{crops.find(c => c.type === selectedCrop)?.icon}</span>
                  <span className={`text-sm font-medium text-primary ${language === 'bn' ? 'font-bangla' : ''}`}>
                    {language === 'en' 
                      ? crops.find(c => c.type === selectedCrop)?.nameEn 
                      : crops.find(c => c.type === selectedCrop)?.nameBn}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleCameraClick}
                  className="btn-action w-full flex items-center justify-center gap-3 text-lg"
                >
                  <Camera className="w-6 h-6" />
                  <span className={language === 'bn' ? 'font-bangla' : ''}>
                    {t('home.takePhoto')}
                  </span>
                </button>

                <button
                  onClick={handleGalleryClick}
                  className="btn-secondary w-full flex items-center justify-center gap-3 text-lg"
                >
                  <Image className="w-6 h-6" />
                  <span className={language === 'bn' ? 'font-bangla' : ''}>
                    {t('home.uploadGallery')}
                  </span>
                </button>
              </div>

              {/* Photo Tips */}
              <PhotoTips />
            </div>
          )}

          {/* Hidden Inputs */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className="hidden"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </main>
    </div>
  );
}
