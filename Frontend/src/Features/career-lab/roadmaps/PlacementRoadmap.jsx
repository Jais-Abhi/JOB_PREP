import React from 'react';
import { Link } from 'react-router';
import { GraduationCap, ArrowLeft, Sparkles } from 'lucide-react';

const PlacementRoadmap = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-xl shadow-purple-200 mx-auto">
          <GraduationCap size={40} className="text-white" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 mb-4">
            <Sparkles size={12} /> Coming Soon
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">Placement Roadmap</h1>
          <p className="text-slate-500 mt-3 text-base leading-relaxed">
            A structured, end-to-end placement preparation guide. From resume building to final
            round interviews — we'll walk you through every step.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left space-y-3 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">What's coming</p>
          {[
            'Week-by-week placement plan',
            'Company-specific prep guides',
            'Mock interview schedules',
            'Aptitude & reasoning prep resources',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
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

export default PlacementRoadmap;
