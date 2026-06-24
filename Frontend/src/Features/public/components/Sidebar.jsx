import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router';
import {
  FileText,
  Briefcase,
  Map,
  CheckSquare,
  LayoutDashboard
} from 'lucide-react';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', color: 'from-indigo-500 to-blue-500' },
    { icon: Briefcase, label: 'Job Preparation', path: '/job-preparation', color: 'from-purple-500 to-pink-500' },
    { icon: FileText, label: 'Resume', path: '/resume', color: 'from-blue-500 to-cyan-500' },
    { icon: Map, label: 'Roadmaps', path: '/roadmaps', color: 'from-emerald-500 to-teal-500' },
    { icon: CheckSquare, label: 'My Plans', path: '/plans', color: 'from-amber-500 to-orange-500' },
  ];

  return (
      <motion.div
        animate={{ width: sidebarOpen ? 280 : 80 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="fixed left-0 top-0 h-screen bg-white border-r border-slate-200 shadow-lg z-50 overflow-hidden"
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        {/* Logo Section */}
        <motion.div
          className="flex items-center h-20 pl-[20px] bg-gradient-to-r from-indigo-600 to-blue-600 border-b border-indigo-700"
        >
          <motion.div
            animate={{ scale: sidebarOpen ? 1 : 1 }}
            className="flex items-center gap-3 origin-left"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
              <Briefcase className="text-white" size={24} />
            </div>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-white font-bold text-lg whitespace-nowrap"
              >
                PrepAI
              </motion.span>
            )}
          </motion.div>
        </motion.div>

        {/* Menu Items */}
        <nav className="mt-8 px-3 space-y-3 flex flex-col items-center w-full">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={index}
                whileHover={{ x: sidebarOpen ? 0 : 5 }}
                className="group relative flex w-full"
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 py-3 px-3 rounded-lg transition-all duration-300 w-full ${
                    isActive 
                      ? 'bg-gradient-to-r from-slate-100 to-slate-50 shadow-sm border border-slate-200' 
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className={`flex-shrink-0 bg-gradient-to-br ${item.color} p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow`}>
                    <Icon className="text-white" size={20} />
                  </div>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className={`font-medium text-sm whitespace-nowrap ${isActive ? 'text-indigo-600' : 'text-slate-700 group-hover:text-indigo-600'}`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </Link>

                {/* Tooltip on hover when sidebar closed */}
                {!sidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 10 }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-slate-900 text-white rounded-lg text-sm whitespace-nowrap pointer-events-none z-50"
                  >
                    {item.label}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </nav>

        {/* Divider */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-4 my-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"
          />
        )}

      </motion.div>
  );
};

export default Sidebar;
