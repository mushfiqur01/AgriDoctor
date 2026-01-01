# 🌱 AgriDoctor – Crop Disease Detection PWA (Version 2)

AgriDoctor is an AI-powered Progressive Web App (PWA) that helps farmers detect crop diseases instantly using machine learning. The app works completely offline after initial setup, making it ideal for use in rural areas with limited internet connectivity.

> Version 2 introduces improved navigation, prediction history tracking, and farmer-friendly crop knowledge pages.

---

## ✨ Features

### 🔍 AI-Powered Disease Detection
- Uses TensorFlow.js machine learning models
- Identifies crop diseases from leaf images

### 🌾 Multi-Crop Support
- Corn
- Potato
- Wheat

### 📱 Offline-First PWA
- Works completely offline after initial model download

### 🌐 Bilingual Support
- English
- Bengali (বাংলা)

### 📷 Camera & Gallery Integration
- Capture photos using camera
- Upload images from device gallery

### 🔄 Blur Detection
- Automatically detects blurry images
- Prompts users to retake clearer photos

### 🍃 Smart Leaf Detection
- Uses COCO-SSD to detect leaf regions
- Improves prediction accuracy

### 💡 Treatment Solutions
- Disease description
- Recommended solutions for farmers

---

## 🆕 What’s New in Version 2

### 🧭 Navbar
- Added a navigation bar for better usability
- Easy access to Home, History, Features, and About pages

### 🕒 Prediction History Page
- Stores previous predictions using browser localStorage
- Allows farmers to review past disease detection results
- Works fully offline

### 📘 Features Page (Farmer Knowledge)
- New Features page added
- Provides basic information about:
  - Corn
  - Potato
  - Wheat
- Helps farmers gain general crop knowledge and awareness

---

## 🦠 Supported Diseases

### 🌽 Corn
- Common Rust
- Gray Leaf Spot
- Leaf Blight
- Healthy Detection

### 🥔 Potato
- Early Blight
- Late Blight
- Healthy Detection

### 🌾 Wheat
- Brown Rust
- Yellow Rust
- Healthy Detection

---

## 🛠️ Tech Stack

- Frontend: React 18 + TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS + shadcn/ui
- Machine Learning: TensorFlow.js
- Object Detection: COCO-SSD
- PWA: vite-plugin-pwa + Workbox
- Routing: React Router DOM
- State Management: React Context API
- Storage: localStorage (Prediction History)

---

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### Setup

```bash
git clone https://github.com/Dina-Shanjida/3200_AgriDoctor.git
cd 3200_AgriDoctor
git checkout version2
npm install
npm run dev
```

## 🏗️ Project Structure

```plaintext
src/
├── components/
│   ├── ui/
│   ├── Header.tsx
│   └── ...
├── contexts/
│   └── LanguageContext.tsx
├── data/
│   └── diseaseInfo.ts
├── pages/
│   ├── Index.tsx
│   ├── About.tsx
│   ├── History.tsx
│   ├── Features.tsx
│   └── NotFound.tsx
├── screens/
│   ├── HomeScreen.tsx
│   ├── ImagePreview.tsx
│   ├── PredictionResult.tsx
│   └── LanguageSelection.tsx
├── services/
│   ├── predictionService.ts
│   └── modelPreloader.ts
└── hooks/
```
---
## 🧠 ML Pipeline

1. Image Capture (Camera / Gallery)
2. Blur Detection (Laplacian Variance)
3. Leaf Detection (COCO-SSD)
4. Image Preprocessing (Resize, Normalize)
5. Model Inference (TensorFlow.js)
6. Result Display (Disease & Solution)
7. Save Result to History (localStorage)

---

## 🌍 Localization

- English
- Bengali (বাংলা)

Language preference is stored in localStorage.

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👥 Contributing

Contributions are welcome. Feel free to submit a Pull Request.

---

## 📞 Support

For support, please open an issue on the GitHub repository.

---

Made with ❤️ for farmers  
© 2025 AgriDoctor


Made with ❤️ for farmers
© 2025 AgriDoctor
