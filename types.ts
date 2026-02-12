
export interface PriceItem {
  productName: string;
  price: string;
  storeName: string;
  brand: string;
  valueNote?: string;
}

export interface PriceResult {
  topResults: PriceItem[];
  summary: string;
  sources: Array<{ title: string; uri: string }>;
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: number;
}

export type LocationMode = 'auto' | 'custom';

export interface LocationState {
  mode: LocationMode;
  customValue: string;
  coords?: { lat: number; lng: number };
}
