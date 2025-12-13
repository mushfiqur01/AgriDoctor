// Prediction Service
// This service handles crop disease prediction using TensorFlow.js models
// with COCO-SSD leaf detection preprocessing

import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { getDiseaseInfo, DiseaseInfo } from '@/data/diseaseInfo';

export type CropType = 'corn' | 'potato' | 'wheat';

export interface PredictionResult {
  crop: CropType;
  diseaseKey: string;
  diseaseInfo: DiseaseInfo;
  confidence: number;
}

// Custom error for blur detection
export class BlurDetectionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BlurDetectionError';
  }
}

// Blur detection threshold (lower = stricter, higher = more lenient)
const BLUR_THRESHOLD = 100;

// Model cache to avoid reloading
let cachedModel: tf.LayersModel | null = null;
let cachedCrop: CropType | null = null;
let cocoModel: cocoSsd.ObjectDetection | null = null;

// Exact class labels in model output order - DO NOT MODIFY ORDER
const CornLabels = [
  "Corn___Common_Rust",
  "Corn___Gray_Leaf_Spot",
  "Corn___Healthy",
  "Corn___Leaf_Blight"
];

const PotatoLabels = [
  "Potato___Early_Blight",
  "Potato___Healthy",
  "Potato___Late_Blight"
];

const WheatLabels = [
  "Wheat___Brown_Rust",
  "Wheat___Healthy",
  "Wheat___Yellow_Rust"
];

// Model paths
const MODEL_PATHS: Record<CropType, string> = {
  corn: '/models/corn/model.json',
  potato: '/models/potato/model.json',
  wheat: '/models/wheat/model.json'
};

// Load COCO-SSD model for leaf detection
async function loadCocoModel(): Promise<cocoSsd.ObjectDetection> {
  if (cocoModel) {
    console.log("Using cached COCO-SSD model");
    return cocoModel;
  }
  
  console.log("Loading COCO-SSD model...");
  cocoModel = await cocoSsd.load();
  console.log("COCO-SSD model loaded");
  return cocoModel;
}

// Load classifier model for the selected crop (LayersModel only)
async function loadModel(crop: CropType): Promise<tf.LayersModel> {
  console.log("=== LOAD MODEL START ===");
  console.log("Requested crop:", crop);
  
  if (cachedModel && cachedCrop === crop) {
    console.log(`Using cached ${crop} model`);
    return cachedModel;
  }
  
  if (cachedModel) {
    console.log("Disposing old model for crop:", cachedCrop);
    cachedModel.dispose();
    cachedModel = null;
    cachedCrop = null;
  }
  
  const modelPath = MODEL_PATHS[crop];
  console.log(`Loading ${crop} model from ${modelPath}...`);
  
  const model = await tf.loadLayersModel(modelPath);
  console.log("Successfully loaded as LayersModel");
  cachedModel = model;
  cachedCrop = crop;
  return model;
}

// Detect and crop leaf region using COCO-SSD
async function detectAndCropLeaf(img: HTMLImageElement | HTMLCanvasElement): Promise<HTMLCanvasElement> {
  console.log("=== LEAF DETECTION START ===");
  
  const detector = await loadCocoModel();
  const predictions = await detector.detect(img);
  
  console.log("COCO-SSD detections:", predictions.length);
  predictions.forEach((p, i) => console.log(`  ${i}: ${p.class} (${(p.score * 100).toFixed(1)}%)`));
  
  // Look for plant-related classes or use the most prominent object
  const plantClasses = ['potted plant', 'broccoli', 'orange', 'apple', 'banana'];
  let bestBox = predictions.find(p => plantClasses.includes(p.class));
  
  // If no plant detected, use the highest confidence detection or full image
  if (!bestBox && predictions.length > 0) {
    bestBox = predictions[0];
    console.log("No plant class found, using:", bestBox.class);
  }
  
  // Create canvas for cropped region
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  if (bestBox) {
    const [x, y, width, height] = bestBox.bbox;
    // Add padding around detected region
    const padding = 20;
    const cropX = Math.max(0, x - padding);
    const cropY = Math.max(0, y - padding);
    const cropW = Math.min(img.width - cropX, width + padding * 2);
    const cropH = Math.min(img.height - cropY, height + padding * 2);
    
    console.log(`Cropping region: [${cropX}, ${cropY}, ${cropW}, ${cropH}]`);
    
    canvas.width = cropW;
    canvas.height = cropH;
    ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
  } else {
    // No detection - use full image
    console.log("No detection, using full image");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  }
  
  return canvas;
}

// Preprocess image: resize to 224x224, RGB, normalize /255, shape [1, 224, 224, 3]
function preprocess(img: HTMLImageElement | HTMLCanvasElement): tf.Tensor4D {
  console.log("=== PREPROCESS START ===");
  console.log("Image dimensions:", img.width, "x", img.height);
  
  return tf.tidy(() => {
    let tensor = tf.browser.fromPixels(img);
    console.log("Initial tensor shape:", tensor.shape);

    // Remove alpha channel if present (RGBA -> RGB)
    if (tensor.shape[2] === 4) {
      console.log("Removing alpha channel (RGBA -> RGB)");
      tensor = tensor.slice([0, 0, 0], [-1, -1, 3]);
    }

    const processed = tensor
      .resizeBilinear([224, 224])
      .toFloat()
      .div(255.0)
      .expandDims(0) as tf.Tensor4D;
    
    console.log("Final tensor shape:", processed.shape);
    return processed;
  });
}

// Load image from base64 data URL
function loadImage(imageData: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      console.log("Image loaded:", img.width, "x", img.height);
      resolve(img);
    };
    img.onerror = (err) => {
      console.error("Image load failed:", err);
      reject(new Error('Failed to load image'));
    };
    img.src = imageData;
  });
}

// Blur detection using Laplacian variance
// Sharp images have high variance, blurry images have low variance
function detectBlur(img: HTMLImageElement): number {
  console.log("=== BLUR DETECTION START ===");
  
  // Create canvas and get grayscale image data
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  // Resize for faster processing
  const maxDim = 256;
  const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
  canvas.width = Math.floor(img.width * scale);
  canvas.height = Math.floor(img.height * scale);
  
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  
  // Convert to grayscale
  const width = canvas.width;
  const height = canvas.height;
  const gray: number[] = [];
  
  for (let i = 0; i < pixels.length; i += 4) {
    // Luminosity method for grayscale
    gray.push(0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2]);
  }
  
  // Apply Laplacian kernel: [0, 1, 0], [1, -4, 1], [0, 1, 0]
  const laplacian: number[] = [];
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      const lap = (
        gray[idx - width] +     // top
        gray[idx - 1] +         // left
        gray[idx + 1] +         // right
        gray[idx + width] -     // bottom
        4 * gray[idx]           // center
      );
      laplacian.push(lap);
    }
  }
  
  // Calculate variance of Laplacian
  const mean = laplacian.reduce((a, b) => a + b, 0) / laplacian.length;
  const variance = laplacian.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / laplacian.length;
  
  console.log("Blur variance score:", variance.toFixed(2));
  console.log("Blur threshold:", BLUR_THRESHOLD);
  console.log("Is blurry:", variance < BLUR_THRESHOLD);
  
  return variance;
}

// Check if image is too blurry
function isImageBlurry(img: HTMLImageElement): boolean {
  const variance = detectBlur(img);
  return variance < BLUR_THRESHOLD;
}

// Run prediction on preprocessed image
async function predict(crop: CropType, img: HTMLImageElement | HTMLCanvasElement): Promise<Float32Array> {
  console.log("=== PREDICT START ===");
  
  try {
    const model = await loadModel(crop);
    const tensor = preprocess(img);
    
    console.log("Running model.predict()...");
    const output = model.predict(tensor) as tf.Tensor;
    console.log("Output shape:", output.shape);
    
    const data = await output.data() as Float32Array;
    console.log("Prediction data:", Array.from(data));
    
    tensor.dispose();
    output.dispose();
    
    return data;
  } catch (err) {
    console.error("Prediction error:", err);
    throw err;
  }
}

// Main analysis function
export async function analyzeCropImage(
  imageData: string,
  crop: CropType,
  language: 'en' | 'bn'
): Promise<PredictionResult> {
  console.log("=== ANALYZE CROP IMAGE START ===");
  console.log("Crop:", crop, "Language:", language);
  
  try {
    // Load image
    const img = await loadImage(imageData);
    
    // Step 1: Check for blur BEFORE running crop model
    if (isImageBlurry(img)) {
      console.log("Image rejected: too blurry");
      throw new BlurDetectionError('Image is too blurry for accurate detection');
    }
    console.log("Blur check passed - image is sharp enough");
    
    // Detect and crop leaf region
    const croppedLeaf = await detectAndCropLeaf(img);
    
    // Run prediction on cropped leaf
    const predictions = await predict(crop, croppedLeaf);
    
    // Get labels for the selected crop
    const labels = crop === "potato"
      ? PotatoLabels
      : crop === "corn"
      ? CornLabels
      : WheatLabels;
    
    console.log("Labels:", labels);
    
    // Find max probability
    let maxIndex = 0;
    let maxProb = predictions[0];
    for (let i = 1; i < predictions.length; i++) {
      if (predictions[i] > maxProb) {
        maxProb = predictions[i];
        maxIndex = i;
      }
    }
    
    const predictedLabel = labels[maxIndex];
    const confidence = maxProb * 100;
    
    console.log("=== RESULT ===");
    console.log(`Predicted: ${predictedLabel} (${confidence.toFixed(2)}%)`);
    
    // Get disease information
    const diseaseInfo = getDiseaseInfo(crop, predictedLabel, language);
    
    if (!diseaseInfo) {
      throw new Error(`Disease info not found for: ${predictedLabel}`);
    }
    
    return {
      crop,
      diseaseKey: predictedLabel,
      diseaseInfo,
      confidence
    };
  } catch (error) {
    console.error("Analysis error:", error);
    throw error;
  }
}

// Utility to convert image file to base64
export function imageFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
