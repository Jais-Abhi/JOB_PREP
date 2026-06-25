import React from 'react';
import { motion } from 'framer-motion';
import { FileSearch, FileSignature, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const Resume = () => {
  return (
    <div className="max-w-6xl mx-auto px-8 py-12 space-y-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          Supercharge your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">job_Prep_Ai</span> Profile
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Ensure your resume gets past Applicant Tracking Systems (ATS). Choose to analyze your current resume or build a brand new one optimized for success.
        </p>
      </motion.div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Option 1: ATS Score Check */}
        <Link to="/resume/ats-check" className="block group">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="h-full bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 shadow-inner text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <FileSearch size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Check ATS Score</h2>
              <p className="text-slate-600 mb-8 flex-1 leading-relaxed">
                Upload your existing resume. Our system analyzes your formatting and keywords against modern ATS algorithms to give you an actionable score.
              </p>
              <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                Analyze Resume <ArrowRight className="ml-2" size={18} />
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Option 2: Create ATS Friendly Resume */}
        <Link to="/resume/create" className="block group">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="h-full bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl p-8 border border-indigo-500 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col relative overflow-hidden text-white"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 shadow-inner">
                <FileSignature size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-3">Create ATS Resume</h2>
              <p className="text-indigo-100 mb-8 flex-1 leading-relaxed">
                Start fresh with our intelligent builder. Answer a few questions, and we'll generate a perfectly formatted, highly-optimized resume for you.
              </p>
              <div className="flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
                Build Now <ArrowRight className="ml-2" size={18} />
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default Resume;
