# 🌱 AgriDoctor - Crop Disease Detection PWA

AgriDoctor is an AI-powered Progressive Web App (PWA) that helps farmers detect crop diseases instantly using machine learning. The app works completely offline after initial setup, making it ideal for use in rural areas with limited internet connectivity.

![AgriDoctor](https://img.shields.io/badge/Version-2.0.0-green) ![Release](https://img.shields.io/badge/Release-7th%20December%202025-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- **🔍 AI-Powered Disease Detection** - Uses TensorFlow.js machine learning models to identify crop diseases from leaf images
- **🌾 Multi-Crop Support** - Supports disease detection for Corn, Potato, and Wheat crops
- **📱 Offline-First PWA** - Works completely offline after initial model download
- **🌐 Bilingual Support** - Full English and Bengali (বাংলা) language support
- **📷 Camera & Gallery Integration** - Take photos or upload from gallery
- **🔄 Blur Detection** - Automatically detects blurry images and prompts for clearer photos
- **🍃 Smart Leaf Detection** - Uses COCO-SSD to identify and crop leaf regions for better accuracy
- **💡 Treatment Solutions** - Provides disease descriptions and recommended solutions

## 🆕 What’s New in Version 2

- **🧭 Navigation Bar** - Added a navigation bar for improved usability and quick access to Home, History, Features, and About pages
- **🕒 Prediction History** - Saves previous disease detection results using browser localStorage, allowing farmers to review past predictions fully offline
- **📘 Farmer Knowledge (Features Page)** - Introduced a new Features page that provides basic crop information and awareness for Corn, Potato, and Wheat

## 🦠 Supported Diseases

### Corn
- Common Rust
- Gray Leaf Spot
- Leaf Blight
- Healthy Detection

### Potato
- Early Blight
- Late Blight
- Healthy Detection

### Wheat
- Brown Rust
- Yellow Rust
- Healthy Detection

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **ML Framework**: TensorFlow.js
- **Object Detection**: COCO-SSD (@tensorflow-models/coco-ssd)
- **PWA**: vite-plugin-pwa with Workbox
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Storage**: localStorage (Prediction History)

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### Setup

```bash
# Clone the repository
git clone https://github.com/mushfiqur01/AgriDoctor.git

# Navigate to project directory
cd agridoctor

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
# or
bun run build
```

## 📱 PWA Installation

AgriDoctor can be installed as a native-like app on any device:

1. **Mobile (Android/iOS)**: Visit the app URL and tap "Add to Home Screen"
2. **Desktop (Chrome)**: Click the install icon in the address bar
3. **Desktop (Edge)**: Click "Apps" menu → "Install this site as an app"

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # App header with navigation
│   ├── PhotoTips.tsx   # Image capture guidelines
│   └── ...
├── contexts/           # React Context providers
│   └── LanguageContext.tsx  # Bilingual support
├── data/               # Static data files
│   └── diseaseInfo.ts  # Disease information database
├── pages/              # Page components
│   ├── Index.tsx       # Main entry point
│   ├── About.tsx       # About page
│   ├── History.tsx     # Prediction history page
│   ├── Features.tsx    # Farmer knowledge / features page
│   └── NotFound.tsx    # 404 page
├── screens/            # App screen components
│   ├── HomeScreen.tsx        # Crop selection
│   ├── ImagePreview.tsx      # Photo capture/upload
│   ├── PredictionResult.tsx  # Disease results
│   └── LanguageSelection.tsx # Language picker
├── services/           # Business logic
│   ├── predictionService.ts  # ML inference logic
│   └── modelPreloader.ts     # Model caching
└── hooks/              # Custom React hooks

public/
├── models/             # TensorFlow.js model files
│   ├── corn/          # Corn disease model
│   ├── potato/        # Potato disease model
│   └── wheat/         # Wheat disease model
└── ...                # PWA assets (icons, splash screens)
```

## 🧠 ML Pipeline

1. **Image Capture** - User takes/uploads a photo
2. **Blur Detection** - Laplacian variance algorithm checks image quality
3. **Leaf Detection** - COCO-SSD identifies leaf regions
4. **Preprocessing** - Resize to 224×224, normalize, convert to RGB
5. **Inference** - Run crop-specific TensorFlow.js model
6. **Results** - Display disease name, description, and solutions

## 🌍 Localization

The app supports:
- **English** - Default language
- **Bengali (বাংলা)** - Full translation including disease information

Language preference is stored in localStorage and persists across sessions.

## 📊 Model Information

All models are trained on crop-specific disease datasets and converted to TensorFlow.js LayersModel format:
- Input: 224×224×3 RGB images
- Output: Softmax probability vector
- Models are cached by the service worker for offline use

### Using Your IDE

Clone this repo and push changes. Pushed changes will also be reflected in Lovable.

### Using GitHub Codespaces

1. Navigate to the main page of your repository
2. Click on the "Code" button → "Codespaces" tab
3. Click "New codespace" to launch the environment

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to **fork** the repository and submit a **Pull Request**.


## 📞 Support

If you encounter any issues or have questions, please **open an issue** in the GitHub repository.

---

Made with ❤️ for farmers | © 2025 AgriDoctor
