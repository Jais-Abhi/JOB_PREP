import React from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  ScanSearch,
  FileText,
  Briefcase,
  GitBranch,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  Zap,
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: 'easeOut' },
});

const quickActions = [
  {
    icon: ScanSearch,
    title: 'ATS Analyzer',
    description: 'Scan your resume against a job description and get an ATS compatibility score.',
    to: '/resume/ats-check',
    gradient: 'from-indigo-500 to-blue-600',
    shadow: 'shadow-indigo-200',
    badge: 'Most Used',
    badgeColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    icon: Briefcase,
    title: 'Job Match Analysis',
    description: 'Get a full AI-powered interview report tailored to a specific job description.',
    to: '/job-preparation',
    gradient: 'from-amber-500 to-orange-600',
    shadow: 'shadow-amber-200',
    badge: 'AI Powered',
    badgeColor: 'bg-amber-100 text-amber-700',
  },
  {
    icon: FileText,
    title: 'ATS Resume Builder',
    description: 'Build an optimized, recruiter-friendly resume step by step.',
    to: '/resume/create',
    gradient: 'from-blue-500 to-cyan-600',
    shadow: 'shadow-blue-200',
  },
  {
    icon: GitBranch,
    title: 'Skill Roadmap',
    description: 'Get a personalized learning path to land your target role.',
    to: '/roadmaps/skill',
    gradient: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-200',
    badge: 'Coming Soon',
    badgeColor: 'bg-slate-100 text-slate-500',
  },
];

const stats = [
  { label: 'Reports Generated', value: '0', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Resumes Analyzed', value: '0', icon: ScanSearch, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Time Saved', value: '0 hrs', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Skills Identified', value: '0', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 space-y-10">

      {/* ── Hero Banner ── */}
      <motion.div {...fadeUp(0)} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 p-8 sm:p-10 text-white">
        <div className="absolute -top-12 -right-12 w-52 h-52 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-32 bg-white/5 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <Sparkles size={12} /> AI-Powered Career Platform
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Welcome back, {firstName}! 👋
            </h1>
            <p className="text-blue-100 text-sm sm:text-base max-w-lg">
              Your AI-powered career copilot is ready. Run an analysis, build your resume, or explore your skill roadmap.
            </p>
          </div>
          <Link
            to="/job-preparation"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-5 py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 text-sm"
          >
            <Zap size={16} /> Start Analysis <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>

      {/* ── Stats Row ── */}
      <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon size={20} className={s.color} />
            </div>
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* ── Quick Actions ── */}
      <motion.section {...fadeUp(0.2)}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
            <p className="text-sm text-slate-500 mt-0.5">Jump straight into a tool</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickActions.map((action, i) => (
            <motion.div key={action.to} {...fadeUp(0.2 + i * 0.07)} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <Link
                to={action.to}
                className="group flex flex-col h-full bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 hover:shadow-lg transition-all duration-200 shadow-sm"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.gradient} shadow-lg ${action.shadow} flex items-center justify-center mb-4`}>
                  <action.icon size={22} className="text-white" />
                </div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{action.title}</h3>
                  {action.badge && (
                    <span className={`flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${action.badgeColor}`}>
                      {action.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed flex-1">{action.description}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Open <ArrowRight size={13} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Getting Started / Tips ── */}
      <motion.section {...fadeUp(0.4)}>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Sparkles size={16} className="text-indigo-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Getting Started</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: '01', title: 'Upload Your Resume', desc: 'Use the ATS Analyzer to score your resume against a real job description.', to: '/resume/ats-check' },
              { step: '02', title: 'Run Job Match Analysis', desc: 'Get an AI-generated interview report, skill gap analysis, and prep plan.', to: '/job-preparation' },
              { step: '03', title: 'Follow Your Roadmap', desc: 'Use your Skill Roadmap to learn what you need and land the role.', to: '/roadmaps/skill' },
            ].map((tip) => (
              <Link
                key={tip.step}
                to={tip.to}
                className="group relative flex flex-col p-5 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-transparent hover:border-indigo-200 transition-all duration-200"
              >
                <span className="text-4xl font-extrabold text-slate-200 group-hover:text-indigo-200 transition-colors mb-3 leading-none">{tip.step}</span>
                <h3 className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 mb-1 transition-colors">{tip.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{tip.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

    </div>
  );
};

export default Dashboard;