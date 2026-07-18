import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  FileText,
  LayoutDashboard,
  LogOut,
  Map,
  Menu,
  Users,
  Video,
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'AI Symptom Checker', path: '/ai-symptom-checker', icon: Activity },
  { name: 'Emergency Triage', path: '/emergency', icon: AlertTriangle, color: 'text-rose-500', badge: 'Critical' },
  { name: 'Patients', path: '/patients', icon: Users },
  { name: 'Telemedicine', path: '/telemedicine', icon: Video, badge: 'Live' },
  { name: 'Hospital Finder', path: '/hospitals', icon: Map },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Settings', path: '/settings', icon: SettingsIcon },
];

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div className="flex h-full flex-col bg-[#0b0f19] text-slate-300">
      {/* Sidebar Header Brand */}
      <div className="flex h-20 items-center justify-between border-b border-slate-800/80 px-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-500/20">
            <Activity size={20} className="text-white" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-base font-extrabold tracking-tight text-transparent">
                MediReach AI
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Suite v1.4</p>
            </motion.div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white lg:flex"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
        {!collapsed && (
          <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-600">
            Command Center
          </p>
        )}
        <div className="space-y-1">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="relative block"
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute inset-0 rounded-xl bg-slate-800 border-l-[3px] border-blue-500"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <div
                  className={`relative flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={link.color || ''} />
                    {(!collapsed || mobileOpen) && <span>{link.name}</span>}
                  </div>

                  {(!collapsed || mobileOpen) && link.badge && (
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                      link.badge === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Sidebar Footer User profile */}
      <div className="border-t border-slate-800/80 p-4">
        <div className="rounded-2xl bg-slate-900/50 border border-slate-800/40 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white text-sm shadow-md">
              RA
            </div>
            {(!collapsed || mobileOpen) && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-white">Dr. Rahul</p>
                <p className="text-[10px] text-slate-500">Chief MD (Admin)</p>
              </div>
            )}
          </div>
          {(!collapsed || mobileOpen) && (
            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-750 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors">
              <LogOut size={13} />
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top navigation header */}
      <div className="fixed top-0 left-0 right-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
            <Activity size={18} className="text-white" />
          </div>
          <span className="font-extrabold text-slate-800 tracking-tight">MediReach AI</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600">
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
            <Bell size={18} />
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white"
            aria-label="Open navigation menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* Adjust Main content spacing for Mobile */}
      <div className="lg:hidden h-16 flex-shrink-0" />

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="h-full w-72 flex-col flex overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {sidebarContent}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden h-screen bg-[#0b0f19] text-white shadow-xl transition-all duration-300 lg:flex lg:flex-col ${
          collapsed ? 'w-20' : 'w-72'
        } flex-shrink-0 border-r border-slate-800`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
