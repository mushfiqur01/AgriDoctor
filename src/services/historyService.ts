import { PredictionResult, CropType } from './predictionService';

export interface HistoryItem {
  id: string;
  imageData: string;
  crop: CropType;
  diseaseKey: string;
  diseaseInfo: PredictionResult['diseaseInfo'];
  createdAt: number;
}

const STORAGE_KEY = 'prediction_history';

export function getHistory(): HistoryItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveToHistory(item: HistoryItem) {
  const history = getHistory();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([item, ...history]));
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
