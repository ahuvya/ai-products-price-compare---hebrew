
import React, { useState, useEffect, useCallback } from 'react';
import { searchProductPrice } from './services/geminiService';
import { PriceResult, SearchHistoryItem } from './types';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import ResultDisplay from './components/ResultDisplay';
import LoadingState from './components/LoadingState';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PriceResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | undefined>();

  useEffect(() => {
    // Attempt to get user location for better results
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => console.log("Location access denied")
      );
    }
    
    // Load history from local storage
    const savedHistory = localStorage.getItem('price_search_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await searchProductPrice(query, userLocation);
      setResult(data);
      
      // Update history
      const newHistoryItem: SearchHistoryItem = {
        id: Date.now().toString(),
        query,
        timestamp: Date.now(),
      };
      const updatedHistory = [newHistoryItem, ...history.filter(h => h.query !== query)].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem('price_search_history', JSON.stringify(updatedHistory));

    } catch (err) {
      setError("אירעה שגיאה בחיפוש המחירים. נסה שוב מאוחר יותר.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('price_search_history');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 p-6 md:p-10 mb-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">חיפוש מחיר זול</h2>
            <p className="text-slate-500">הכנס שם של מוצר ונמצא עבורך את המחיר המשתלם ביותר בישראל</p>
          </div>

          <SearchBox onSearch={handleSearch} isLoading={loading} />

          {history.length > 0 && !loading && !result && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-700">חיפושים אחרונים</h3>
                <button 
                  onClick={clearHistory}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  נקה הכל
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {history.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSearch(item.query)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm transition-colors border border-slate-200"
                  >
                    {item.query}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {loading && <LoadingState />}
        
        {error && (
          <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-lg mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {result && <ResultDisplay result={result} />}
      </main>

      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} צ'ק מחיר - כל הזכויות שמורות</p>
        <p className="mt-1">המידע מבוסס על חיפוש AI בזמן אמת</p>
      </footer>
    </div>
  );
};

export default App;
