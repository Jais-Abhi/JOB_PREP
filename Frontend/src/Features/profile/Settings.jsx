import React from 'react';
import { motion } from 'framer-motion';

const Settings = () => {
  return (
    <div className="px-8 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          Configure application settings and notifications.
        </p>
      </motion.div>
    </div>
  );
};

export default Settings;
