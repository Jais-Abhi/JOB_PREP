import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router';
import {
  ScanSearch,
  FileText,
  FileStack,
  History,
  Briefcase,
  BarChart3,
  GitBranch,
  GraduationCap,
  Code2,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../Redux/Slice/user.slice.js';
import api from '../../Config/api.js';
import { toast } from 'sonner';

// ─── Mega-menu data ──────────────────────────────────────────────────────────

const resumeStudioItems = [
  {
    icon: ScanSearch,
    label: 'ATS Analyzer',
    description: 'Check your resume score against any job description.',
    to: '/resume/ats-check',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    icon: FileText,
    label: 'ATS Resume Generator',
    description: 'Build an ATS-friendly resume step by step.',
    to: '/resume/create',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: FileStack,
    label: 'Resume Templates',
    description: 'Professional templates designed to impress.',
    to: '/resume/templates',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: History,
    label: 'History',
    description: 'View all your past resume analyses.',
    to: '/resume/history',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
  },
];

const careerToolsColumns = [
  {
    heading: 'Job Preparation',
    icon: Briefcase,
    color: 'text-amber-600',
    items: [
      {
        icon: Briefcase,
        label: 'Job Match Analysis',
        description: 'AI-generated interview report tailored to the role.',
        to: '/job-preparation',
        color: 'text-amber-600',
        bg: 'bg-amber-50',
      },
      {
        icon: BarChart3,
        label: 'Past Analysis',
        description: 'Review all previously generated match reports.',
        to: '/past-analysis',
        color: 'text-orange-600',
        bg: 'bg-orange-50',
      },
    ],
  },
  {
    heading: 'Roadmaps',
    icon: GitBranch,
    color: 'text-emerald-600',
    items: [
      {
        icon: GitBranch,
        label: 'Skill Roadmap',
        description: 'Personalized skill learning paths for your target role.',
        to: '/roadmaps/skill',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
      },
      {
        icon: GraduationCap,
        label: 'Placement Roadmap',
        description: 'End-to-end campus placement preparation guide.',
        to: '/roadmaps/placement',
        color: 'text-purple-600',
        bg: 'bg-purple-50',
      },
      {
        icon: Code2,
        label: 'DSA Tracker',
        description: 'Track your Data Structures & Algorithms practice.',
        to: '/roadmaps/dsa',
        color: 'text-rose-600',
        bg: 'bg-rose-50',
      },
    ],
  },
];

// ─── Dropdown wrapper ─────────────────────────────────────────────────────────

const NavDropdown = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const show = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const hide = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };
  const close = () => {
    clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-all duration-150">
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? 'rotate-180 text-indigo-600' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          /* The outer wrapper uses pt-2 to bridge the gap between the button 
             and the visible panel, eliminating the dead zone that triggers onMouseLeave */
          <div
            className="absolute left-0 top-full pt-2 z-50"
            onMouseEnter={show}
            onMouseLeave={hide}
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 3, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden"
            >
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Dropdown item ────────────────────────────────────────────────────────────

const DropdownItem = ({ icon: Icon, label, description, to, color, bg }) => (
  <Link
    to={to}
    className="group flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors duration-150 rounded-xl mx-1"
  >
    <div className={`flex-shrink-0 w-9 h-9 rounded-lg ${bg} flex items-center justify-center mt-0.5`}>
      <Icon size={18} className={color} />
    </div>
    <div className="min-w-0">
      <p className={`text-sm font-semibold text-slate-800 group-hover:${color} transition-colors`}>{label}</p>
      <p className="text-xs text-slate-500 mt-0.5 leading-snug">{description}</p>
    </div>
  </Link>
);

// ─── Main Navbar ──────────────────────────────────────────────────────────────

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const profileTimeout = useRef(null);

  const showProfile = () => {
    clearTimeout(profileTimeout.current);
    setProfileOpen(true);
  };
  const hideProfile = () => {
    profileTimeout.current = setTimeout(() => setProfileOpen(false), 80);
  };

  const handleConfirmLogout = async () => {
    try {
      await api.get('/api/user/auth/logout');
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed!');
    } finally {
      dispatch(setUser(null));
      setIsLogoutDialogOpen(false);
      navigate('/login');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-md">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900 hidden sm:block">
              PrepAI
            </span>
          </Link>

          {/* ── Primary Nav (centre-left) ── */}
          <nav className="flex items-center gap-1">
            {/* Resume Studio */}
            <NavDropdown label="Resume Studio">
              <div className="w-72 p-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 pt-1 pb-2">
                  Resume Studio
                </p>
                {resumeStudioItems.map((item) => (
                  <DropdownItem key={item.to} {...item} />
                ))}
              </div>
            </NavDropdown>

            {/* Career Tools */}
            <NavDropdown label="Career Tools">
              <div className="flex gap-0 p-2" style={{ width: 560 }}>
                {careerToolsColumns.map((col) => (
                  <div key={col.heading} className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 px-3 pt-1 pb-2">
                      <col.icon size={13} className={col.color} />
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        {col.heading}
                      </p>
                    </div>
                    {col.items.map((item) => (
                      <DropdownItem key={item.to} {...item} />
                    ))}
                  </div>
                ))}
              </div>
            </NavDropdown>
          </nav>

          {/* ── Right side ── */}
          <div className="ml-auto flex items-center gap-3">

            {/* User pill + profile dropdown */}
            <div
              className="relative"
              onMouseEnter={showProfile}
              onMouseLeave={hideProfile}
            >
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white">
                  <User size={14} />
                </div>
                <span className="text-sm font-medium text-slate-700 hidden sm:block max-w-[100px] truncate">
                  {user?.name || 'Account'}
                </span>
                <ChevronDown size={13} className="text-slate-400" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <div
                    className="absolute right-0 top-full pt-2 z-50"
                    onMouseEnter={showProfile}
                    onMouseLeave={hideProfile}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 3, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="w-52 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden py-1.5"
                    >
                      {user && (
                        <div className="px-4 py-2.5 border-b border-slate-100 mb-1">
                          <p className="text-xs font-semibold text-slate-800 truncate">{user.name}</p>
                          <p className="text-xs text-slate-400 truncate">{user.email}</p>
                        </div>
                      )}
                      <Link
                        to="/account"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                      >
                        <User size={14} /> Account
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                      >
                        <Settings size={14} /> Settings
                      </Link>
                      <div className="h-px bg-slate-100 my-1" />
                      <button
                        onClick={() => { setProfileOpen(false); setIsLogoutDialogOpen(true); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={14} /> Sign out
                      </button>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* ── Logout Confirmation Dialog ── */}
      {createPortal(
        <AnimatePresence>
          {isLogoutDialogOpen && (
            <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 sm:p-0">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex justify-center sm:justify-start mb-6">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                      <LogOut size={32} strokeWidth={2} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 text-center sm:text-left">Sign Out</h3>
                  <p className="text-slate-500 mb-8 text-center sm:text-left text-base leading-relaxed">
                    You're about to be signed out. You'll need to log back in to access your dashboard and saved plans.
                  </p>
                  <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
                    <button
                      onClick={() => setIsLogoutDialogOpen(false)}
                      className="w-full sm:w-1/2 px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all duration-200 active:scale-95"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmLogout}
                      className="w-full sm:w-1/2 px-5 py-3.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-md shadow-red-500/20 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <LogOut size={18} strokeWidth={2.5} /> Yes, Sign out
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Navbar;
