import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLanguageSelected: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // App
    'app.name': 'AgriDoctor',
    'app.tagline': 'Crop Disease Detection',
    'app.description': 'Identify crop diseases instantly with AI-powered analysis',
    
    // Language Selection
    'lang.select': 'Select Language',
    'lang.english': 'English',
    'lang.bangla': 'বাংলা',
    
    // Home
    'home.welcome': 'Welcome to AgriDoctor',
    'home.subtitle': 'Detect crop diseases with just a photo',
    'home.takePhoto': 'Take Photo',
    'home.uploadGallery': 'Upload from Gallery',
    'home.supportedCrops': 'Supported Crops',
    'home.corn': 'Corn',
    'home.potato': 'Potato',
    'home.wheat': 'Wheat',
    
    // Image Selection
    'image.selected': 'Selected Image',
    'image.analyze': 'Analyze Image',
    'image.retake': 'Choose Another',
    'image.analyzing': 'Analyzing...',
    
    // Prediction
    'prediction.result': 'Analysis Result',
    'prediction.crop': 'Crop',
    'prediction.disease': 'Disease',
    'prediction.description': 'Description',
    'prediction.solutions': 'Solutions',
    'prediction.healthy': 'Healthy',
    'prediction.scanAgain': 'Scan Another',
    'prediction.goHome': 'Go Home',
    
    // Errors
    'error.camera': 'Camera access denied',
    'error.noImage': 'Please select an image first',
    'error.analysis': 'Analysis failed. Please try again.',
    
    // General
    'general.loading': 'Loading...',
    'general.back': 'Back',
    
    // About
    'about.title': 'About',
    'about.intro': 'AgriDoctor helps farmers detect crop diseases instantly using AI-powered image analysis. Simply take a photo of your crop leaf and get instant diagnosis with treatment solutions.',
    'about.features.title': 'Key Features',
    'about.feature1.title': 'Instant Detection',
    'about.feature1.desc': 'Take a photo and get disease diagnosis in seconds using advanced AI technology.',
    'about.feature2.title': 'Accurate Analysis',
    'about.feature2.desc': 'Trained on thousands of crop images for reliable disease identification.',
    'about.feature3.title': 'Works Offline',
    'about.feature3.desc': 'All analysis happens on your device. No internet required after initial setup.',
    'about.howToUse.title': 'How to Use',
    'about.step1.title': 'Select a Crop',
    'about.step1.desc': 'Choose the type of crop you want to analyze from the home screen.',
    'about.step2.title': 'Capture Photo',
    'about.step2.desc': 'Take a clear photo of the leaf or upload one from your gallery.',
    'about.step3.title': 'Get Results',
    'about.step3.desc': 'View the disease diagnosis along with detailed description.',
    'about.step4.title': 'Apply Solutions',
    'about.step4.desc': 'Follow the recommended treatment solutions to help your crops.',
    'about.version': 'Version',
    'about.appInfo.title': 'App Information',
    'about.appInfo.version': 'Version',
    'about.appInfo.releaseDate': 'Release Date',
    'about.appInfo.releaseDateValue': '7th December 2025',
    'about.appInfo.lastUpdate': 'Last Updated',
    'about.appInfo.lastUpdateValue': '7th December 2025',
    'about.footer.madeWith': 'Made with ❤️ for farmers',
  },
  bn: {
    // App
    'app.name': 'এগ্রিডক্টর',
    'app.tagline': 'ফসল রোগ নির্ণয়',
    'app.description': 'এআই-চালিত বিশ্লেষণের মাধ্যমে তাৎক্ষণিকভাবে ফসলের রোগ চিহ্নিত করুন',
    
    // Language Selection
    'lang.select': 'ভাষা নির্বাচন করুন',
    'lang.english': 'English',
    'lang.bangla': 'বাংলা',
    
    // Home
    'home.welcome': 'এগ্রিডক্টরে স্বাগতম',
    'home.subtitle': 'শুধু একটি ছবি দিয়ে ফসলের রোগ শনাক্ত করুন',
    'home.takePhoto': 'ছবি তুলুন',
    'home.uploadGallery': 'গ্যালারি থেকে আপলোড',
    'home.supportedCrops': 'সমর্থিত ফসল',
    'home.corn': 'ভুট্টা',
    'home.potato': 'আলু',
    'home.wheat': 'গম',
    
    // Image Selection
    'image.selected': 'নির্বাচিত ছবি',
    'image.analyze': 'ছবি বিশ্লেষণ করুন',
    'image.retake': 'অন্য ছবি নিন',
    'image.analyzing': 'বিশ্লেষণ করা হচ্ছে...',
    
    // Prediction
    'prediction.result': 'বিশ্লেষণ ফলাফল',
    'prediction.crop': 'ফসল',
    'prediction.disease': 'রোগ',
    'prediction.description': 'বিবরণ',
    'prediction.solutions': 'সমাধান',
    'prediction.healthy': 'সুস্থ',
    'prediction.scanAgain': 'আবার স্ক্যান করুন',
    'prediction.goHome': 'হোমে যান',
    
    // Errors
    'error.camera': 'ক্যামেরা অ্যাক্সেস প্রত্যাখ্যান করা হয়েছে',
    'error.noImage': 'প্রথমে একটি ছবি নির্বাচন করুন',
    'error.analysis': 'বিশ্লেষণ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।',
    
    // General
    'general.loading': 'লোড হচ্ছে...',
    'general.back': 'পিছনে',
    
    // About
    'about.title': 'সম্পর্কে',
    'about.intro': 'এগ্রিডক্টর কৃষকদের এআই-চালিত ইমেজ বিশ্লেষণ ব্যবহার করে তাৎক্ষণিকভাবে ফসলের রোগ শনাক্ত করতে সাহায্য করে। শুধু আপনার ফসলের পাতার ছবি তুলুন এবং চিকিৎসা সমাধান সহ তাৎক্ষণিক রোগ নির্ণয় পান।',
    'about.features.title': 'মূল বৈশিষ্ট্য',
    'about.feature1.title': 'তাৎক্ষণিক শনাক্তকরণ',
    'about.feature1.desc': 'উন্নত এআই প্রযুক্তি ব্যবহার করে কয়েক সেকেন্ডের মধ্যে ছবি তুলুন এবং রোগ নির্ণয় পান।',
    'about.feature2.title': 'সঠিক বিশ্লেষণ',
    'about.feature2.desc': 'নির্ভরযোগ্য রোগ শনাক্তকরণের জন্য হাজার হাজার ফসলের ছবিতে প্রশিক্ষিত।',
    'about.feature3.title': 'অফলাইনে কাজ করে',
    'about.feature3.desc': 'সমস্ত বিশ্লেষণ আপনার ডিভাইসে হয়। প্রাথমিক সেটআপের পরে ইন্টারনেটের প্রয়োজন নেই।',
    'about.howToUse.title': 'কীভাবে ব্যবহার করবেন',
    'about.step1.title': 'ফসল নির্বাচন করুন',
    'about.step1.desc': 'হোম স্ক্রীন থেকে আপনি যে ধরনের ফসল বিশ্লেষণ করতে চান তা বেছে নিন।',
    'about.step2.title': 'ছবি তুলুন',
    'about.step2.desc': 'পাতার একটি স্পষ্ট ছবি তুলুন বা আপনার গ্যালারি থেকে একটি আপলোড করুন।',
    'about.step3.title': 'ফলাফল দেখুন',
    'about.step3.desc': 'বিস্তারিত বিবরণ সহ রোগ নির্ণয় দেখুন।',
    'about.step4.title': 'সমাধান প্রয়োগ করুন',
    'about.step4.desc': 'আপনার ফসলকে সাহায্য করতে প্রস্তাবিত চিকিৎসা সমাধান অনুসরণ করুন।',
    'about.version': 'সংস্করণ',
    'about.appInfo.title': 'অ্যাপ তথ্য',
    'about.appInfo.version': 'সংস্করণ',
    'about.appInfo.releaseDate': 'প্রকাশের তারিখ',
    'about.appInfo.releaseDateValue': '৭ই ডিসেম্বর ২০২৫',
    'about.appInfo.lastUpdate': 'সর্বশেষ আপডেট',
    'about.appInfo.lastUpdateValue': '৭ই ডিসেম্বর ২০২৫',
    'about.footer.madeWith': 'কৃষকদের জন্য ❤️ দিয়ে তৈরি',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_KEY = 'agridoctor_language';
const LANGUAGE_SELECTED_KEY = 'agridoctor_language_selected';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY) as Language;
    const wasSelected = localStorage.getItem(LANGUAGE_SELECTED_KEY);
    
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bn')) {
      setLanguageState(savedLanguage);
    }
    
    if (wasSelected === 'true') {
      setIsLanguageSelected(true);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
    localStorage.setItem(LANGUAGE_SELECTED_KEY, 'true');
    setIsLanguageSelected(true);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLanguageSelected }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
