
import React from 'react';
import { PriceResult, PriceItem } from '../types';

interface ResultDisplayProps {
  result: PriceResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (!result.topResults || result.topResults.length === 0) {
    return (
      <div className="bg-amber-50 border-r-4 border-amber-500 p-6 rounded-xl text-amber-800 font-bold">
        לא נמצאו תוצאות ספציפיות. נסה חיפוש שונה.
      </div>
    );
  }

  const winner = result.topResults[0];
  const others = result.topResults.slice(1);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500 pb-12">
      {/* The Winner Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-emerald-500 transform hover:scale-[1.01] transition-transform">
        <div className="bg-emerald-600 px-8 py-5 text-white flex justify-between items-center">
          <div>
            <span className="bg-emerald-400/30 text-emerald-50 text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-1 inline-block">
              הכי זול שמצאנו 🏆
            </span>
            <h2 className="text-3xl font-black">{winner.price}</h2>
          </div>
          <div className="text-right">
            <p className="text-emerald-100 text-sm">{winner.storeName}</p>
            <p className="text-xl font-bold">{winner.brand}</p>
          </div>
        </div>
        
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-grow">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{winner.productName}</h3>
            {winner.valueNote && (
              <p className="text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-lg inline-block text-sm">
                {winner.valueNote}
              </p>
            )}
          </div>
          <div className="flex-shrink-0">
             <button className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100">
               לפרטים נוספים
             </button>
          </div>
        </div>
      </div>

      {/* Top 5 List Title */}
      <div>
        <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
          <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">5</span>
          התוצאות המשתלמות ביותר
        </h3>
        
        <div className="grid gap-4">
          {result.topResults.map((item, idx) => (
            <div key={idx} className={`bg-white rounded-2xl p-5 shadow-sm border ${idx === 0 ? 'border-emerald-200' : 'border-slate-100'} flex flex-col md:flex-row items-center justify-between gap-4 transition-all hover:shadow-md`}>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${idx === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{item.productName}</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{item.brand}</span>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{item.storeName}</span>
                    {item.valueNote && <span className="text-xs font-medium text-emerald-600">{item.valueNote}</span>}
                  </div>
                </div>
              </div>
              <div className="text-2xl font-black text-slate-800 w-full md:w-auto text-center md:text-left">
                {item.price}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary and Sources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2 uppercase tracking-tighter text-sm">
            ניתוח המחירים
          </h4>
          <p className="text-slate-100 leading-relaxed text-lg">
            {result.summary}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <h4 className="text-slate-700 font-bold mb-4 text-sm flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            מקורות השוואה
          </h4>
          <div className="space-y-2">
            {result.sources.length > 0 ? result.sources.map((source, idx) => (
              <a
                key={idx}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between group p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <span className="text-xs text-slate-600 truncate max-w-[150px] group-hover:text-blue-600">{source.title}</span>
                <svg className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )) : (
              <p className="text-xs text-slate-400">המידע מבוסס על סריקת רשת רחבה</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
