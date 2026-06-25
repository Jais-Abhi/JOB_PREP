import React from 'react';
import { Link } from 'react-router';
import { History as HistoryIcon, ArrowLeft, Sparkles } from 'lucide-react';

const History = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-xl shadow-blue-200 mx-auto">
          <HistoryIcon size={40} className="text-white" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mb-4">
            <Sparkles size={12} /> Coming Soon
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">Analysis History</h1>
          <p className="text-slate-500 mt-3 text-base leading-relaxed">
            Your complete history of resume analyses, interview reports, and ATS scores — all in one place.
            Track your progress over time.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left space-y-3 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">What's coming</p>
          {[
            'Full analysis history log',
            'Side-by-side report comparison',
            'Score trend charts',
            'Download past reports as PDF',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default History;
