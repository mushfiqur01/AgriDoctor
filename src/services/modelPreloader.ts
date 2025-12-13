// Model Preloader Service
// Downloads all ML models on first PWA load for offline capability

import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

export interface PreloadProgress {
  stage: 'coco' | 'corn' | 'potato' | 'wheat' | 'complete';
  progress: number; // 0-100
  message: string;
  messageBn: string;
}

const MODEL_PATHS = {
  corn: '/models/corn/model.json',
  potato: '/models/potato/model.json',
  wheat: '/models/wheat/model.json'
};

const PRELOAD_KEY = 'agridoctor_models_preloaded';

// Check if models have been preloaded before
export function areModelsPreloaded(): boolean {
  return localStorage.getItem(PRELOAD_KEY) === 'true';
}

// Mark models as preloaded
function markModelsPreloaded(): void {
  localStorage.setItem(PRELOAD_KEY, 'true');
}

// Preload all models with progress callback
export async function preloadAllModels(
  onProgress: (progress: PreloadProgress) => void
): Promise<void> {
  console.log("=== STARTING MODEL PRELOAD ===");
  
  try {
    // Stage 1: Load COCO-SSD (for leaf detection)
    onProgress({
      stage: 'coco',
      progress: 0,
      message: 'Loading leaf detection model...',
      messageBn: 'পাতা সনাক্তকরণ মডেল লোড হচ্ছে...'
    });
    
    console.log("Loading COCO-SSD model...");
    await cocoSsd.load();
    console.log("COCO-SSD loaded successfully");
    
    onProgress({
      stage: 'coco',
      progress: 25,
      message: 'Leaf detection ready',
      messageBn: 'পাতা সনাক্তকরণ প্রস্তুত'
    });

    // Stage 2: Load Corn model
    onProgress({
      stage: 'corn',
      progress: 25,
      message: 'Loading corn disease model...',
      messageBn: 'ভুট্টা রোগ মডেল লোড হচ্ছে...'
    });
    
    console.log("Loading Corn model...");
    const cornModel = await tf.loadLayersModel(MODEL_PATHS.corn);
    cornModel.dispose(); // Dispose after caching
    console.log("Corn model loaded and cached");
    
    onProgress({
      stage: 'corn',
      progress: 50,
      message: 'Corn model ready',
      messageBn: 'ভুট্টা মডেল প্রস্তুত'
    });

    // Stage 3: Load Potato model
    onProgress({
      stage: 'potato',
      progress: 50,
      message: 'Loading potato disease model...',
      messageBn: 'আলু রোগ মডেল লোড হচ্ছে...'
    });
    
    console.log("Loading Potato model...");
    const potatoModel = await tf.loadLayersModel(MODEL_PATHS.potato);
    potatoModel.dispose();
    console.log("Potato model loaded and cached");
    
    onProgress({
      stage: 'potato',
      progress: 75,
      message: 'Potato model ready',
      messageBn: 'আলু মডেল প্রস্তুত'
    });

    // Stage 4: Load Wheat model
    onProgress({
      stage: 'wheat',
      progress: 75,
      message: 'Loading wheat disease model...',
      messageBn: 'গম রোগ মডেল লোড হচ্ছে...'
    });
    
    console.log("Loading Wheat model...");
    const wheatModel = await tf.loadLayersModel(MODEL_PATHS.wheat);
    wheatModel.dispose();
    console.log("Wheat model loaded and cached");
    
    onProgress({
      stage: 'wheat',
      progress: 100,
      message: 'All models ready',
      messageBn: 'সব মডেল প্রস্তুত'
    });

    // Mark as complete
    onProgress({
      stage: 'complete',
      progress: 100,
      message: 'Ready for offline use!',
      messageBn: 'অফলাইন ব্যবহারের জন্য প্রস্তুত!'
    });
    
    markModelsPreloaded();
    console.log("=== MODEL PRELOAD COMPLETE ===");
    
  } catch (error) {
    console.error("Model preload error:", error);
    throw error;
  }
}
