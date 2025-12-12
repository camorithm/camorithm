'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Wallet, 
  Trophy, 
  ShoppingCart,
  Settings,
  LineChart,
  GraduationCap,
  X,
  Sun,
  Moon,
  LogOut,
  BarChart3
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: 'Overview', icon: <LayoutDashboard size={20} />, href: '/dashboard', exact: true },
    { label: 'Analytics', icon: <BarChart3 size={20} />, href: '/dashboard/analytics' },
    { label: 'Journal', icon: <BookOpen size={20} />, href: '/dashboard/journal' },
    { label: 'Payouts', icon: <Wallet size={20} />, href: '/dashboard/payouts' },
    { label: 'Competitions', icon: <Trophy size={20} />, href: '/dashboard/competitions' },
    { label: 'WebTrader', icon: <LineChart size={20} />, href: '#' },
    { label: 'New Challenge', icon: <ShoppingCart size={20} />, href: '/dashboard/shop' },
    { label: 'Academy', icon: <GraduationCap size={20} />, href: '#' },
    { label: 'Settings', icon: <Settings size={20} />, href: '/dashboard/settings' },
  ];

  const isActive = (item: any) => {
    return item.exact 
      ? pathname === item.href 
      : pathname.startsWith(item.href);
  };

  return (
    <>
      {/* Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[280px] bg-white dark:bg-[#0f1115] border-r border-slate-200 dark:border-white/5 flex flex-col z-[70] lg:hidden transition-transform duration-300 shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold font-mono shadow-lg shadow-blue-500/30">
              P
            </div>
            <span className="font-['Space_Grotesk'] font-bold text-xl text-slate-900 dark:text-white">
              PropFirm
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  active 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-white/5 space-y-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            <span className="font-medium text-sm">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-sm font-bold text-slate-500">
              AT
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-bold text-slate-900 dark:text-white truncate">Alex Trader</div>
              <div className="text-xs text-slate-500 truncate">alex@propfirm.com</div>
            </div>
            <button className="text-slate-400 hover:text-red-500 transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};