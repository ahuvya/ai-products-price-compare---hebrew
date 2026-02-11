
import React from 'react';

interface HeaderProps {
  onReset: () => void;
  onShowHowItWorks: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset, onShowHowItWorks }) => {
  return (
    <header className="bg-white border-b border-slate-100 py-4 px-6 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="bg-blue-600 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">צ'ק מחיר</h1>
        </button>
        
        <nav className="flex gap-6 items-center">
          <button 
            onClick={onReset}
            className="text-slate-600 hover:text-blue-600 font-medium"
          >
            ראשי
          </button>
          <button 
            onClick={onShowHowItWorks}
            className="text-slate-600 hover:text-blue-600 font-medium"
          >
            איך זה עובד?
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
