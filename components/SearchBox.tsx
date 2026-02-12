
import React, { useState } from 'react';
import { LocationState, LocationMode } from '../types';

interface SearchBoxProps {
  onSearch: (query: string, location: LocationState) => void;
  isLoading: boolean;
  initialLocation: LocationState;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, isLoading, initialLocation }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState<LocationState>(initialLocation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query, location);
    }
  };

  const setLocationMode = (mode: LocationMode) => {
    setLocation(prev => ({ ...prev, mode }));
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="מה תרצו לקנות? (למשל: חלב, נייר טואלט...)"
              className="w-full h-16 pr-14 pl-6 text-lg rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all"
              disabled={isLoading}
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className={`h-16 px-10 rounded-2xl font-bold text-lg transition-all shadow-lg md:w-auto w-full ${
              isLoading || !query.trim()
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-blue-200'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>בודק...</span>
              </div>
            ) : (
              'חפש הכי זול'
            )}
          </button>
        </div>
      </form>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <span className="text-sm font-bold text-slate-500">איפה לחפש?</span>
        <div className="flex bg-white p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setLocationMode('auto')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              location.mode === 'auto' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            המיקום שלי
          </button>
          <button
            onClick={() => setLocationMode('custom')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              location.mode === 'custom' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            עיר ספציפית
          </button>
        </div>

        {location.mode === 'custom' && (
          <input
            type="text"
            value={location.customValue}
            onChange={(e) => setLocation(prev => ({ ...prev, customValue: e.target.value }))}
            placeholder="הכנס שם עיר..."
            className="flex-grow h-10 px-4 text-sm rounded-xl border border-slate-200 outline-none focus:border-blue-400 transition-all"
          />
        )}
        
        {location.mode === 'auto' && (
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            מבוסס על המיקום הנוכחי שלך
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
