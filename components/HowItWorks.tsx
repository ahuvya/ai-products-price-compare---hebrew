
import React from 'react';

interface HowItWorksProps {
  onClose: () => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-100 animate-in zoom-in-95 duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-slate-800">איך צ'ק מחיר עובד?</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6 text-slate-600 leading-relaxed">
            <section className="flex gap-4">
              <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">סריקה בזמן אמת</h3>
                <p>כאשר אתם מחפשים מוצר, המערכת משתמשת בבינה מלאכותית מתקדמת (Gemini 3) כדי לסרוק את רשת האינטרנט בזמן אמת.</p>
              </div>
            </section>

            <section className="flex gap-4">
              <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">חיפוש ברשתות השיווק</h3>
                <p>האפליקציה בודקת אתרי השוואת מחירים פופולריים כמו CHP, Zap ו-PriceZ, וכן אתרי רשתות שיווק מובילות בישראל (רמי לוי, שופרסל, יוחננוף ועוד).</p>
              </div>
            </section>

            <section className="flex gap-4">
              <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">ניתוח והשוואה חכמה</h3>
                <p>הבינה המלאכותית מנתחת את כל התוצאות שנמצאו, מוודאת שמדובר במוצרים דומים (לפי משקל או יחידות) ומציגה לכם את 5 האופציות המשתלמות ביותר.</p>
              </div>
            </section>

            <section className="flex gap-4">
              <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">4</div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">דירוג ותוצאה סופית</h3>
                <p>התוצאה הזולה ביותר מקבלת את תואר ה"מנצח" ומודגשת, כדי שתוכלו לחסוך זמן וכסף בקלות.</p>
              </div>
            </section>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex justify-center">
            <button 
              onClick={onClose}
              className="bg-blue-600 text-white px-10 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              הבנתי, בואו נתחיל!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
