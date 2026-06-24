import React from 'react';
import { motion } from 'framer-motion';

const Account = () => {
  return (
    <div className="px-8 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
          Account
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          Manage your personal information and preferences.
        </p>
      </motion.div>
    </div>
  );
};

export default Account;
