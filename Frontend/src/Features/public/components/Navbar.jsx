import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate, Link } from 'react-router';
import { ArrowLeft, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../../Config/api.js';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleLogoutClick = () => {
    setDropdownOpen(false);
    setIsLogoutDialogOpen(true);
  };

  const handleConfirmLogout = async () => {
    try {
      await api.get('/api/user/auth/logout');
      setIsLogoutDialogOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Derive page name from pathname
  const getPageName = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path === '/resume') return 'Resume Studio';
    if (path === '/resume/ats-check') return 'ATS Score Check';
    if (path === '/resume/create') return 'Create ATS Resume';
    if (path === '/roadmaps') return 'Roadmaps';
    if (path === '/plans') return 'My Plans';
    if (path === '/account') return 'Account';
    if (path === '/settings') return 'Settings';
    return 'Job Prep Ai';
  };

  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm px-6 h-16 flex items-center justify-between">
      {/* Left: Back Button & Branding */}
      <div className="flex items-center gap-4 w-1/3">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
          title="Go Back"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="font-extrabold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
          job_Prep_Ai
        </div>
      </div>

      {/* Center: Page Name */}
      <div className="flex-1 flex justify-center w-1/3">
        <h2 className="text-lg font-bold text-slate-800">{getPageName()}</h2>
      </div>

      {/* Right: Profile Dropdown */}
      <div className="flex items-center justify-end w-1/3 relative">
        <div 
          className="relative"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button className="flex items-center gap-2 p-2 rounded-full hover:bg-slate-100 transition-colors">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <User size={18} />
            </div>
            <ChevronDown size={16} className="text-slate-500" />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden py-1 z-50"
              >
                <Link to="/account" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                  <User size={16} /> Account
                </Link>
                <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                  <Settings size={16} /> Settings
                </Link>
                <div className="h-px bg-slate-100 my-1"></div>
                <button 
                  onClick={handleLogoutClick}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {createPortal(
        <AnimatePresence>
          {isLogoutDialogOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-slate-100"
              >
                <div className="p-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
                    <LogOut size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Sign out</h3>
                  <p className="text-slate-500 mb-6">Are you sure you want to sign out of your account?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsLogoutDialogOpen(false)}
                      className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmLogout}
                      className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default Navbar;
