
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-100 py-4 px-6 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">צ'ק מחיר</h1>
        </div>
        
        <nav className="hidden md:flex gap-6 items-center">
          <a href="#" className="text-slate-600 hover:text-blue-600 font-medium">ראשי</a>
          <a href="#" className="text-slate-600 hover:text-blue-600 font-medium">איך זה עובד?</a>
          <button className="bg-slate-800 text-white px-5 py-2 rounded-full font-semibold hover:bg-slate-700 transition-all">
            התחברות
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
