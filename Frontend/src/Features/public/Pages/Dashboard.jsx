'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import {
  FileText,
  Briefcase,
  Map,
  CheckSquare,
  User,
  Settings,
  ChevronRight,
  LogOut,
  Bell
} from 'lucide-react';

const Dashboard = () => {

  const preparationPlans = [
    { title: 'Frontend Development', progress: 65, status: 'In Progress' },
    { title: 'System Design', progress: 40, status: 'In Progress' },
    { title: 'Data Structures', progress: 85, status: 'Almost Done' },
    { title: 'Algorithm Optimization', progress: 25, status: 'Started' },
  ];

  return (
    <>
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-8 pt-8 pb-2"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Welcome Back! 👋
              </h1>
              <p className="text-slate-500 text-sm mt-1">Let's continue your preparation journey</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 hover:shadow-lg transition-shadow"
            >
              <Bell className="text-indigo-600" size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </motion.button>
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="px-8 py-8 space-y-8">
          {/* User Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-800">Your Profile</h2>
                <p className="text-slate-600">Manage your preparation progress and account settings</p>
              </div>
              <motion.div
                whileHover={{ rotate: 20, scale: 1.1 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg"
              >
                <User className="text-white" size={32} />
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Plans', value: '4', icon: CheckSquare, color: 'from-emerald-500 to-teal-500' },
              { label: 'In Progress', value: '2', icon: Briefcase, color: 'from-blue-500 to-cyan-500' },
              { label: 'Completed', value: '0', icon: FileText, color: 'from-purple-500 to-pink-500' },
              { label: 'Streak', value: '7 days', icon: Map, color: 'from-amber-500 to-orange-500' },
            ].map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5, shadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                      <p className="text-3xl font-bold text-slate-800 mt-2">{stat.value}</p>
                    </div>
                    <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg shadow-lg`}>
                      <StatIcon className="text-white" size={24} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Preparation Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-800">My Preparation Plans</h3>
                <p className="text-slate-600 text-sm mt-1">Track your learning progress</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow text-sm font-medium"
              >
                <ChevronRight size={18} /> Add Plan
              </motion.button>
            </div>

            <div className="space-y-4">
              {preparationPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="group bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200 hover:border-indigo-300 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {plan.title}
                      </h4>
                      <p className="text-slate-600 text-sm">{plan.status}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      plan.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-700'
                        : plan.status === 'Almost Done'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {plan.status}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-white rounded-full overflow-hidden shadow-sm">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${plan.progress}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 1.5 }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                    />
                  </div>

                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-700">{plan.progress}% Complete</span>
                    <motion.div
                      whileHover={{ x: 3 }}
                      className="text-slate-400 group-hover:text-indigo-500 transition-colors"
                    >
                      <ChevronRight size={18} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-2xl p-8 text-white overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Ready to level up? 🚀</h3>
              <p className="text-blue-100 mb-6">Start your next preparation challenge and track your progress in real-time.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                Begin Now
              </motion.button>
            </div>
          </motion.div>

          {/* Footer Spacing */}
          <div className="pb-8" />
        </div>
    </>
  );
};

export default Dashboard;