
import React, { useState, useEffect } from 'react';

const LoadingState: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "סורק את רשתות השיווק...",
    "משווה מחירים ב-CHP וזאפ...",
    "בודק מבצעים ברמי לוי ושופרסל...",
    "מנתח את המותג המשתלם ביותר...",
    "עוד רגע והמחיר הזול ביותר אצלך..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-in fade-in duration-500">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-10 h-10 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-xl font-bold text-slate-700 transition-all duration-500">
          {messages[messageIndex]}
        </p>
        <p className="text-slate-400 text-sm italic">זה עשוי לקחת כמה שניות, אנחנו מחפשים בכל האינטרנט</p>
      </div>

      <div className="w-full max-w-xs bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div className="bg-blue-600 h-full w-1/2 animate-[loading_2s_ease-in-out_infinite]"></div>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { transform: translateX(200%); }
          100% { transform: translateX(-200%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingState;
