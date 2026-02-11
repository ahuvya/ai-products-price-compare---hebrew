
export interface PriceItem {
  productName: string;
  price: string;
  storeName: string;
  brand: string;
  valueNote?: string; // e.g., "מחיר ליחידה: 5.50 ש"ח"
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
